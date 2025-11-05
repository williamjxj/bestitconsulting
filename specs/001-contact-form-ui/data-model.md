# Data Model: Contact Form

## Overview
This document defines the data model for the contact form feature, including form entities, validation rules, and database schema.

## Form Entities

### ContactFormSubmission

Represents a single contact form submission.

**Fields:**
- `name` (string, required)
  - Type: `text`
  - Validation: 2-100 characters
  - Label: "Full Name"
  - Placeholder: "Enter your full name"

- `email` (string, required)
  - Type: `email`
  - Validation: Valid email format
  - Label: "Email Address"
  - Placeholder: "Enter your email address"

- `phone` (string, optional)
  - Type: `tel`
  - Validation: Valid phone format (international formats supported)
  - Label: "Phone Number"
  - Placeholder: "Enter your phone number"

- `company` (string, optional)
  - Type: `text`
  - Validation: 1-100 characters
  - Label: "Company"
  - Placeholder: "Enter your company name"

- `service` (string[], required)
  - Type: `multiselect` (dropdown with checkboxes)
  - Validation: At least one selection required
  - Label: "Service Interest"
  - Options:
    - `web-development` - "Web Development"
    - `mobile-apps` - "Mobile Apps"
    - `cloud-solutions` - "Cloud Solutions"
    - `ai-ml` - "AI & Machine Learning"
    - `devops` - "DevOps"
    - `consulting` - "Consulting"
    - `other` - "Other (specify in message)"

- `title` (string, optional)
  - Type: `text`
  - Validation: 1-200 characters
  - Label: "Title" (hidden or auto-filled)
  - Placeholder: "Auto-filled from CTA"
  - Auto-fill: From URL parameter `?title=...`
  - Examples: "Start Your Project", "Get Free Consultation", "Schedule Consultation"

- `message` (string, required)
  - Type: `textarea`
  - Validation: 20-2000 characters
  - Label: "Message"
  - Placeholder: "Tell us about your project requirements..."

### Form State

**Submission State:**
- `idle` - Form not yet submitted
- `validating` - Form validation in progress
- `submitting` - Form submission in progress
- `success` - Form submitted successfully
- `error` - Form submission failed

**Validation State (per field):**
- `valid` - Field passes validation
- `invalid` - Field fails validation
- `pending` - Validation not yet performed

**Error Messages:**
- Field-specific error messages
- Displayed inline below each field
- Accessible to screen readers

## Database Schema

### Table: `bestitconsulting_contacts`

Cloned from `bestitconsultants_contacts` with identical structure.

**Columns:**
- `id` (uuid, primary key)
  - Type: UUID
  - Default: `gen_random_uuid()`
  - Constraints: PRIMARY KEY

- `name` (varchar, not null)
  - Type: character varying
  - Constraints: NOT NULL
  - Max length: 255 (implicit)

- `email` (varchar, not null)
  - Type: character varying
  - Constraints: NOT NULL
  - Max length: 255 (implicit)

- `message` (text, not null)
  - Type: text
  - Constraints: NOT NULL

- `company` (varchar, nullable)
  - Type: character varying
  - Constraints: NULL
  - Max length: 255 (implicit)

- `phone` (varchar, nullable)
  - Type: character varying
  - Constraints: NULL
  - Max length: 255 (implicit)

- `service` (varchar, nullable)
  - Type: character varying
  - Constraints: NULL
  - Max length: 255 (implicit)
  - Storage: Comma-separated values from multiselect array

- `title` (varchar, nullable)
  - Type: character varying
  - Constraints: NULL
  - Max length: 255 (implicit)
  - Purpose: Stores CTA context (e.g., "Start Your Project")

- `submitted_at` (timestamptz, nullable)
  - Type: timestamp with time zone
  - Default: `now()`
  - Purpose: Timestamp of form submission

- `created_at` (timestamptz, nullable)
  - Type: timestamp with time zone
  - Default: `now()`
  - Purpose: Record creation timestamp

**Indexes:**
- Primary key on `id`
- Consider adding index on `email` for queries (optional)
- Consider adding index on `submitted_at` for sorting (optional)

**Row Level Security (RLS):**
- Currently disabled (RLS_ENABLED: false)
- Consider enabling for production if needed

## Data Flow

### Form Submission Flow

1. **User Input**
   - User fills form fields
   - Real-time validation on blur/change
   - Errors displayed inline

2. **Form Submission**
   - Client-side validation
   - Form data serialized to JSON
   - POST request to `/api/contact`

3. **API Processing**
   - Server-side validation
   - Data sanitization
   - Insert into `bestitconsulting_contacts` table
   - Send email via Resend
   - Return success/error response

4. **Client Response**
   - Display success message
   - Reset form (or show confirmation)
   - Scroll to success message

### URL Parameter Flow

1. **CTA Click**
   - User clicks CTA with `?title=...` parameter
   - Navigation to `/contact?title=Start%20Your%20Project#contact-form`

2. **Page Load**
   - Client component reads `useSearchParams()`
   - Extract `title` parameter
   - Decode URL encoding
   - Auto-fill title field

3. **Form Display**
   - Title field pre-filled
   - Smooth scroll to `#contact-form` section
   - User can edit title if needed

## Validation Rules

### Client-Side Validation

**Name:**
- Required: Yes
- Min length: 2 characters
- Max length: 100 characters
- Pattern: No special characters required (allow spaces, hyphens, apostrophes)

**Email:**
- Required: Yes
- Format: Valid email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Domain validation: Basic (no deep domain checking)

**Phone:**
- Required: No
- Format: International phone formats supported
- Pattern: Flexible (allows various formats)

**Company:**
- Required: No
- Min length: 1 character (if provided)
- Max length: 100 characters

**Service:**
- Required: Yes
- Min selections: 1
- Max selections: No limit (all options allowed)
- Storage: Convert array to comma-separated string

**Title:**
- Required: No
- Min length: 1 character (if provided)
- Max length: 200 characters
- Auto-fill: From URL parameter

**Message:**
- Required: Yes
- Min length: 20 characters
- Max length: 2000 characters
- Character counter displayed

### Server-Side Validation

- Repeat all client-side validations
- Additional sanitization
- SQL injection protection (Supabase handles)
- XSS protection (sanitize HTML if needed)

## State Transitions

### Form Lifecycle

```
[Initial State]
    ↓
[User Input] → [Validation] → [Valid/Invalid]
    ↓
[Submit] → [Submitting] → [Success/Error]
    ↓
[Success State] or [Error State with Retry]
```

### URL Parameter Handling

```
[Page Load] → [Read URL Params] → [Extract Title] → [Auto-fill Field]
    ↓
[User Can Edit] → [Form Submission] → [Title Included in Data]
```

## Relationships

- **ContactFormSubmission → Email Notification**: One-to-one (each submission triggers one email)
- **ContactFormSubmission → Database Record**: One-to-one (each submission creates one record)
- **CTA → Title Value**: Many-to-one (multiple CTAs can map to same title value)

## Data Migration

### Table Cloning Strategy

1. **Create New Table**
   ```sql
   CREATE TABLE bestitconsulting_contacts AS
   SELECT * FROM bestitconsultants_contacts WHERE 1=0;
   ```

2. **Verify Structure**
   - Compare column definitions
   - Verify constraints
   - Check defaults

3. **Update Application**
   - Update API route to use new table
   - Test insert operations
   - Verify data integrity

4. **Optional: Data Migration**
   - If needed, migrate existing data
   - `INSERT INTO bestitconsulting_contacts SELECT * FROM bestitconsultants_contacts;`

## Summary

- **Form Fields:** 7 fields (name, email, phone, company, service, title, message)
- **Required Fields:** 3 (name, email, message, service)
- **Optional Fields:** 3 (phone, company, title)
- **Database Table:** `bestitconsulting_contacts` (cloned structure)
- **Validation:** Client-side and server-side
- **URL Integration:** Title auto-fill from query parameter

