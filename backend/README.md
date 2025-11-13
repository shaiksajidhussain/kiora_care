# Kiora Backend

Backend API for the Kiora website contact form. This project uses Vercel serverless functions to handle contact form submissions and send emails via Resend.

## Overview

This backend exposes a single API endpoint that receives contact form submissions from the frontend and sends formatted email notifications using the Resend email service.

## Required Environment Variables

Set these in your Vercel project settings or via `vercel env`:

- `RESEND_API_KEY` - Your Resend API key (get one at https://resend.com)
- `TARGET_EMAIL` - Email address to receive contact form submissions (defaults to care@kiora.care)
- `ALLOWED_ORIGIN` - The frontend domain URL for CORS (e.g., https://your-frontend-domain.vercel.app)

## Local Development

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Fill in your environment variables in `.env`

4. Run the development server:
   ```bash
   vercel dev
   ```

5. The API endpoints will be available at:
   - `http://localhost:3000/api/health` - Health check endpoint
   - `http://localhost:3000/api/send-contact-email` - Contact form submission endpoint

## Deployment

1. Deploy to Vercel:
   ```bash
   cd backend
   vercel
   ```

2. Set environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add all required variables listed above

3. Your API will be available at: `https://your-backend-name.vercel.app/api/...`

## API Endpoints

### GET /api/health

Health check endpoint. Returns `{ status: "ok" }`.

### POST /api/send-contact-email

Accepts contact form submissions and sends an email notification.

**Request Body:**
```json
{
  "userType": "doctor" | "patient" | null,
  "fullName": "string",
  "phoneNumber": "string",
  "emailAddress": "string",
  "city": "string",
  "pincode": "string",
  "message": "string",
  "agreeToContact": true
}
```

**Response:**
- `200 OK`: `{ message: "Email sent successfully" }`
- `400 Bad Request`: `{ error: "Validation error", details: [...] }`
- `500 Internal Server Error`: `{ error: "Failed to send email" }`

## CORS

The API includes CORS headers to allow requests from the frontend. The `ALLOWED_ORIGIN` environment variable controls which origin is allowed to make requests.

