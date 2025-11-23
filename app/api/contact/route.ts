import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Configurable sender and business recipient. Use a verified domain (e.g. service@bestitconsulting.ca)
// or Resend-managed address (bestitconsulting@resend.dev) until your domain is verified.
const FROM_EMAIL = process.env.FROM_EMAIL || 'service@bestitconsulting.ca'
const BUSINESS_EMAIL =
  process.env.BUSINESS_EMAIL || 'service@bestitconsulting.ca'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      company,
      phone,
      service,
      projectType,
      budget,
      timeline,
      message,
    } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Send email to your business email
    const businessEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: [BUSINESS_EMAIL],
      subject: `New Contact Form Submission from ${name}`,
      html: `
      <div style="font-family: 'Inter', 'Segoe UI', Tahoma, sans-serif; max-width: 640px; margin: 0 auto; background-color: #f9fafb; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0b62e2 0%, #2563eb 100%); color: white; text-align: center; padding: 32px 20px;">
          <img src="https://www.bestitconsulting.ca/logo.png" alt="Best IT Consulting" width="64" style="margin-bottom: 12px; border-radius: 8px;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">New Contact Submission</h1>
          <p style="margin: 8px 0 0 0; font-size: 16px; color: #e2e8f0;">From Best IT Consulting Website</p>
        </div>

        <!-- Content -->
        <div style="background: #ffffff; padding: 32px;">

          <!-- Contact Info -->
          <h2 style="font-size: 18px; color: #1e293b; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 12px;">Contact Information</h2>
          <table style="width:100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 6px 0; color:#475569;"><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td style="padding: 6px 0; color:#475569;"><strong>Email:</strong></td><td>${email}</td></tr>
            ${company ? `<tr><td style="padding: 6px 0; color:#475569;"><strong>Company:</strong></td><td>${company}</td></tr>` : ''}
            ${phone ? `<tr><td style="padding: 6px 0; color:#475569;"><strong>Phone:</strong></td><td>${phone}</td></tr>` : ''}
          </table>

          ${
            service || projectType || budget || timeline
              ? `
            <!-- Project Info -->
            <h2 style="font-size: 18px; color: #1e293b; border-left: 4px solid #10b981; padding-left: 12px; margin-bottom: 12px;">Project Details</h2>
            <table style="width:100%; border-collapse: collapse; margin-bottom: 24px;">
              ${service ? `<tr><td style="padding: 6px 0; color:#475569;"><strong>Service:</strong></td><td>${service}</td></tr>` : ''}
              ${projectType ? `<tr><td style="padding: 6px 0; color:#475569;"><strong>Project Type:</strong></td><td>${projectType}</td></tr>` : ''}
              ${budget ? `<tr><td style="padding: 6px 0; color:#475569;"><strong>Budget:</strong></td><td>${budget}</td></tr>` : ''}
              ${timeline ? `<tr><td style="padding: 6px 0; color:#475569;"><strong>Timeline:</strong></td><td>${timeline}</td></tr>` : ''}
            </table>
            `
              : ''
          }

          <!-- Message -->
          <h2 style="font-size: 18px; color: #1e293b; border-left: 4px solid #8b5cf6; padding-left: 12px; margin-bottom: 12px;">Message</h2>
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; color: #374151; line-height: 1.6; white-space: pre-line;">
            ${message}
          </div>

          <!-- Footer -->
          <div style="margin-top: 36px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="font-size: 14px; color: #64748b; margin: 4px 0;">
              This message was sent via <strong>bestitconsulting.ca</strong>
            </p>
            <p style="font-size: 14px; color: #64748b; margin: 0;">
              Reply directly to contact <strong>${name}</strong> at <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
            </p>
          </div>
        </div>

        <!-- Signature -->
        <div style="background: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 13px; color: #475569; margin: 0;">
            <strong>Best IT Consulting Inc.</strong> — Empowering Businesses with AI & Automation
          </p>
          <p style="font-size: 13px; color: #64748b; margin: 4px 0 0 0;">
            🌐 <a href="https://www.bestitconsulting.ca" style="color:#2563eb; text-decoration:none;">bestitconsulting.ca</a> |
            📧 <a href="mailto:service@bestitconsulting.ca" style="color:#2563eb; text-decoration:none;">service@bestitconsulting.ca</a>
          </p>
        </div>
      </div>
    `,
      replyTo: email,
    })

    // Send confirmation email to the customer
    const customerEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: 'Thank you for contacting Best IT Consulting',
      html: `
      <div style="font-family: 'Inter', 'Segoe UI', Tahoma, sans-serif; max-width: 640px; margin: 0 auto; background-color: #f9fafb; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0b62e2 0%, #2563eb 100%); padding: 36px 24px; text-align: center; color: white;">
          <img src="https://www.bestitconsulting.ca/logo.png" alt="Best IT Consulting" width="70" style="border-radius: 10px; margin-bottom: 10px;">
          <h1 style="margin: 0; font-size: 26px; font-weight: 700;">Thank You for Reaching Out!</h1>
          <p style="margin: 8px 0 0; color: #e2e8f0; font-size: 16px;">We’ve received your message and will contact you soon.</p>
        </div>

        <!-- Content -->
        <div style="background: #ffffff; padding: 32px;">
          <p style="font-size: 16px; color: #334155; margin: 0 0 20px 0;">
            Hi <strong>${name}</strong>,
          </p>

          <p style="font-size: 16px; color: #334155; line-height: 1.6; margin-bottom: 24px;">
            Thank you for contacting <strong>Best IT Consulting Inc.</strong> — we appreciate your interest in our AI, automation, and software solutions.
            Our team will review your message and respond shortly with details tailored to your needs.
          </p>

          <!-- What's Next -->
          <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 10px; padding: 20px; margin-bottom: 28px;">
            <h3 style="margin: 0 0 10px 0; color: #1d4ed8; font-size: 18px;">What Happens Next?</h3>
            <ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 1.6;">
              <li>We’ll review your inquiry within 2–4 business hours.</li>
              <li>Expect a personalized reply or proposal within 24 hours.</li>
              <li>If needed, we’ll arrange a free consultation call to discuss details.</li>
            </ul>
          </div>

          <!-- Summary -->
          <div style="background: #f0fdf4; border: 1px solid #22c55e; border-radius: 10px; padding: 20px; margin-bottom: 28px;">
            <h3 style="margin: 0 0 10px 0; color: #15803d; font-size: 18px;">Your Submission Summary</h3>
            <p style="margin: 5px 0; color: #374151;"><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
            <p style="margin: 5px 0; color: #374151;"><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
            <p style="margin: 5px 0; color: #374151;"><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
          </div>

          <!-- CTA -->
          <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
            While you wait, explore some of our latest work and success stories that showcase how we help clients accelerate their digital transformation.
          </p>

          <div style="text-align: center; margin-bottom: 36px;">
            <a href="https://bestitconsulting.ca/portfolio" style="background: linear-gradient(135deg, #0b62e2 0%, #2563eb 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              🌐 View Our Portfolio
            </a>
          </div>

          <!-- Contact Info -->
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
            <p style="margin: 0 0 8px 0; color: #334155;"><strong>Need immediate assistance?</strong></p>
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              📞 +1 (236) 992-3846<br>
              📧 <a href="mailto:service@bestitconsulting.ca" style="color:#2563eb; text-decoration:none;">service@bestitconsulting.ca</a><br>
              🌐 <a href="https://www.bestitconsulting.ca" style="color:#2563eb; text-decoration:none;">www.bestitconsulting.ca</a>
            </p>
          </div>

          <!-- Signature -->
          <div style="margin-top: 30px; padding-top: 18px; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              Warm regards,<br>
              <strong>Best IT Consulting Team</strong>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f1f5f9; padding: 18px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 13px; color: #475569; margin: 0;">
            <strong>Best IT Consulting Inc.</strong> – Empowering Businesses with AI & Automation
          </p>
          <p style="font-size: 13px; color: #64748b; margin: 4px 0 0 0;">
            Vancouver, Canada | <a href="https://www.bestitconsulting.ca" style="color:#2563eb; text-decoration:none;">bestitconsulting.ca</a>
          </p>
        </div>
      </div>
    `,
    })

    return NextResponse.json(
      {
        message: 'Email sent successfully',
        businessEmailId: businessEmailResult.data?.id,
        customerEmailId: customerEmailResult.data?.id,
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
