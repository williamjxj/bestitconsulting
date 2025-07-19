#!/bin/bash

echo "� BestIT Consulting Email Setup"
echo "================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "Creating .env.local from template..."
    cp .env.local.example .env.local
    echo "✅ Created .env.local file"
fi

echo "Setup Steps:"
echo "1. Sign up at https://resend.com (free)"
echo "2. Get API key from dashboard"
echo "3. Edit .env.local with your credentials"
echo "4. For Vercel: Add environment variables in project settings"
echo ""
echo "📚 Full guide: docs/EMAIL.md"
