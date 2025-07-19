import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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
      from: 'BestIT Consulting <onboarding@resend.dev>',
      to: [process.env.BUSINESS_EMAIL || 'contact@bestitconsulting.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">New Contact Form Submission</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">From BestIT Consulting Website</p>
          </div>

          <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <div style="border-left: 4px solid #3b82f6; padding-left: 20px; margin-bottom: 25px;">
              <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 20px;">Contact Information</h2>
              <p style="margin: 5px 0; color: #475569;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0; color: #475569;"><strong>Email:</strong> ${email}</p>
              ${company ? `<p style="margin: 5px 0; color: #475569;"><strong>Company:</strong> ${company}</p>` : ''}
              ${phone ? `<p style="margin: 5px 0; color: #475569;"><strong>Phone:</strong> ${phone}</p>` : ''}
            </div>

            ${
              service || projectType || budget || timeline
                ? `
            <div style="border-left: 4px solid #10b981; padding-left: 20px; margin-bottom: 25px;">
              <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 20px;">Project Details</h2>
              ${service ? `<p style="margin: 5px 0; color: #475569;"><strong>Service:</strong> ${service}</p>` : ''}
              ${projectType ? `<p style="margin: 5px 0; color: #475569;"><strong>Project Type:</strong> ${projectType}</p>` : ''}
              ${budget ? `<p style="margin: 5px 0; color: #475569;"><strong>Budget:</strong> ${budget}</p>` : ''}
              ${timeline ? `<p style="margin: 5px 0; color: #475569;"><strong>Timeline:</strong> ${timeline}</p>` : ''}
            </div>
            `
                : ''
            }

            <div style="border-left: 4px solid #8b5cf6; padding-left: 20px;">
              <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 20px;">Message</h2>
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; color: #374151; line-height: 1.6;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                This email was sent from the contact form on <strong>bestitconsulting.vercel.app</strong>
              </p>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">
                Reply directly to this email to respond to ${name}
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: email,
    })

    // Send confirmation email to the customer
    const customerEmailResult = await resend.emails.send({
      from: 'BestIT Consulting <onboarding@resend.dev>',
      to: [email],
      subject: 'Thank you for contacting BestIT Consulting',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Thank You!</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">We've received your message</p>
          </div>

          <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Hi <strong>${name}</strong>,
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Thank you for reaching out to BestIT Consulting! We've received your message and appreciate your interest in our services.
            </p>

            <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #0c4a6e; margin: 0 0 10px 0; font-size: 18px;">What happens next?</h3>
              <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li>Our team will review your inquiry within 2-4 business hours</li>
                <li>We'll prepare a personalized response based on your specific needs</li>
                <li>You can expect a detailed reply within 24 hours</li>
                <li>We may schedule a free consultation call to discuss your project</li>
              </ul>
            </div>

            <div style="background: #f0fdf4; border: 1px solid #22c55e; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #15803d; margin: 0 0 10px 0; font-size: 18px;">Your Message Summary:</h3>
              <p style="color: #374151; margin: 5px 0;"><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
              <p style="color: #374151; margin: 5px 0;"><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
              <p style="color: #374151; margin: 5px 0;"><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0;">
              In the meantime, feel free to explore our case studies and learn more about how we've helped other businesses transform their operations with cutting-edge technology solutions.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://bestitconsulting.vercel.app/portfolio" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                View Our Portfolio
              </a>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #374151; margin: 0 0 10px 0;">
                <strong>Need immediate assistance?</strong>
              </p>
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                📞 Call us: +1 (555) 123-4567<br>
                📧 Email: contact@bestitconsulting.com<br>
                🌐 Website: bestitconsulting.vercel.app
              </p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                Best regards,<br>
                <strong>The BestIT Consulting Team</strong>
              </p>
            </div>
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
