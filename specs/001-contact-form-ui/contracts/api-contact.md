# API Contract: Contact Form Submission

## Endpoint
`POST /api/contact`

## Description
Handles contact form submissions, saves data to Supabase, and sends email notifications.

## Request

### Headers
```
Content-Type: application/json
```

### Body Schema
```typescript
{
  name: string;        // Required, 2-100 characters
  email: string;       // Required, valid email format
  phone?: string;      // Optional, valid phone format
  company?: string;    // Optional, 1-100 characters
  service: string;      // Required, comma-separated string from multiselect
  title?: string;      // Optional, 1-200 characters (from CTA)
  message: string;     // Required, 20-2000 characters
}
```

### Example Request
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1 (555) 123-4567",
  "company": "Acme Corp",
  "service": "web-development, cloud-solutions",
  "title": "Start Your Project",
  "message": "I'm interested in discussing a web application project for our company."
}
```

## Response

### Success Response (200 OK)
```typescript
{
  message: string;
  businessEmailId?: string;
  customerEmailId?: string;
}
```

### Example Success Response
```json
{
  "message": "Email sent successfully",
  "businessEmailId": "abc123",
  "customerEmailId": "def456"
}
```

### Error Responses

#### 400 Bad Request - Validation Error
```typescript
{
  error: string;
  details?: {
    field: string;
    message: string;
  }[];
}
```

**Example:**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    },
    {
      "field": "message",
      "message": "Message must be at least 20 characters"
    }
  ]
}
```

#### 500 Internal Server Error
```typescript
{
  error: string;
}
```

**Example:**
```json
{
  "error": "Failed to send email. Please try again later."
}
```

## Validation Rules

### Client-Side Validation
- All required fields must be present
- Email format validation
- Phone format validation (if provided)
- Message length validation (20-2000 characters)
- Service selection validation (at least one)

### Server-Side Validation
- Repeat all client-side validations
- Additional sanitization
- SQL injection protection (Supabase handles)
- XSS protection

## Database Operations

### Insert Record
```sql
INSERT INTO bestitconsulting_contacts (
  name,
  email,
  phone,
  company,
  service,
  title,
  message,
  submitted_at,
  created_at
) VALUES (
  $1,  -- name
  $2,  -- email
  $3,  -- phone (nullable)
  $4,  -- company (nullable)
  $5,  -- service (comma-separated)
  $6,  -- title (nullable)
  $7,  -- message
  NOW(),
  NOW()
)
RETURNING id;
```

## Email Notifications

### Business Email (Internal)
- **To:** `process.env.BUSINESS_EMAIL`
- **From:** `process.env.FROM_EMAIL`
- **Subject:** `New Contact Form Submission from {name}`
- **Reply-To:** User's email address
- **Content:** HTML template with all form fields

### Customer Confirmation Email
- **To:** User's email address
- **From:** `process.env.FROM_EMAIL`
- **Subject:** `Thank you for contacting Best IT Consulting`
- **Content:** HTML template with confirmation message

## Error Handling

### Database Errors
- Log error details
- Return generic error message to client
- Do not expose database structure

### Email Errors
- Log error details
- Still save to database if possible
- Return success if database save succeeded
- Log email failure for manual follow-up

### Network Errors
- Return appropriate HTTP status code
- Include helpful error message
- Preserve form data for retry

## Rate Limiting
- Consider implementing rate limiting (future enhancement)
- Prevent abuse while allowing legitimate submissions

## Security Considerations
- Input sanitization on all fields
- SQL injection protection (Supabase parameterized queries)
- XSS protection (escape HTML in emails)
- CSRF protection (Next.js handles)
- No sensitive data in error messages

## Testing Scenarios

### Success Cases
1. Complete form with all fields
2. Complete form with only required fields
3. Form with title from CTA
4. Form with multiple service selections

### Error Cases
1. Missing required fields
2. Invalid email format
3. Message too short
4. Message too long
5. Database connection failure
6. Email service failure
7. Network timeout

## Migration Notes

### From Old Table
- Old table: `bestitconsultants_contacts`
- New table: `bestitconsulting_contacts`
- Structure identical, direct migration possible
- Update API route to use new table name

## Version History
- **v1.0.0** (2025-01-27): Initial contract with title field support

