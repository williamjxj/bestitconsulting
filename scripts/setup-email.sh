#!/bin/bash

# BestIT Consulting Email Setup Script
# This script helps you configure email functionality

echo "🚀 BestIT Consulting Email Setup"
echo "=================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Creating .env.local from template..."
    cp .env.local.example .env.local
    echo "✅ Created .env.local file"
fi

echo "📧 Email Configuration Setup"
echo ""
echo "To complete the email setup, you need to:"
echo ""
echo "1. 📝 Sign up for Resend (free): https://resend.com"
echo "2. 🔑 Get your API key: https://resend.com/api-keys"
echo "3. ✏️  Edit .env.local and add your:"
echo "   - RESEND_API_KEY=re_your_api_key_here"
echo "   - BUSINESS_EMAIL=your-email@gmail.com"
echo ""
echo "4. 🚀 For Vercel deployment, add these environment variables:"
echo "   - Go to: https://vercel.com/dashboard"
echo "   - Select your project > Settings > Environment Variables"
echo "   - Add: RESEND_API_KEY and BUSINESS_EMAIL"
echo ""
echo "5. 🧪 Test the contact form at: /contact"
echo ""
echo "📚 Full documentation: docs/EMAIL_SETUP.md"
echo ""
echo "✨ Once configured, your contact form will:"
echo "   ✅ Send professional notifications to your business email"
echo "   ✅ Send confirmation emails to customers"
echo "   ✅ Include beautiful HTML templates"
echo "   ✅ Work seamlessly on Vercel"
echo ""
echo "🆘 Need help? Check the troubleshooting section in EMAIL_SETUP.md"
