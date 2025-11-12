import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

interface ContactFormPayload {
  userType: 'doctor' | 'patient' | null;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  city: string;
  pincode: string;
  message: string;
  agreeToContact: boolean;
}

function setCorsHeaders(res: VercelResponse, origin: string | undefined) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  // If origin is provided and matches allowed origin, use it; otherwise use allowed origin from env
  const originToUse = origin && (allowedOrigin === '*' || origin === allowedOrigin) ? origin : allowedOrigin;
  res.setHeader('Access-Control-Allow-Origin', originToUse);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const origin = req.headers.origin;
  setCorsHeaders(res, origin);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body: ContactFormPayload = req.body;

    // Validation
    const errors: string[] = [];
    
    if (!body.fullName || typeof body.fullName !== 'string' || body.fullName.trim() === '') {
      errors.push('fullName is required');
    }
    
    if (!body.phoneNumber || typeof body.phoneNumber !== 'string' || body.phoneNumber.trim() === '') {
      errors.push('phoneNumber is required');
    }
    
    if (!body.emailAddress || typeof body.emailAddress !== 'string' || body.emailAddress.trim() === '') {
      errors.push('emailAddress is required');
    }
    
    if (!body.agreeToContact) {
      errors.push('agreeToContact must be true');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Validation error',
        details: errors
      });
    }

    // Initialize Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const resend = new Resend(resendApiKey);
    const targetEmail = process.env.TARGET_EMAIL || 'jignesh.motwani@gmail.com';

    // Format user type
    const userTypeLabel = body.userType === 'doctor' ? 'Doctor' : body.userType === 'patient' ? 'Patient' : 'Not specified';

    // Create HTML email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #1190ff;
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background-color: #f9f9f9;
              padding: 20px;
              border: 1px solid #ddd;
              border-top: none;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 15px;
              padding-bottom: 15px;
              border-bottom: 1px solid #eee;
            }
            .field:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: bold;
              color: #555;
              display: block;
              margin-bottom: 5px;
            }
            .value {
              color: #333;
            }
            .message-box {
              background-color: white;
              padding: 15px;
              border-left: 4px solid #1190ff;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>Kiora Website</p>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">User Type:</span>
              <span class="value">${userTypeLabel}</span>
            </div>
            <div class="field">
              <span class="label">Full Name:</span>
              <span class="value">${escapeHtml(body.fullName)}</span>
            </div>
            <div class="field">
              <span class="label">Phone Number:</span>
              <span class="value">${escapeHtml(body.phoneNumber)}</span>
            </div>
            <div class="field">
              <span class="label">Email Address:</span>
              <span class="value">${escapeHtml(body.emailAddress)}</span>
            </div>
            <div class="field">
              <span class="label">City:</span>
              <span class="value">${escapeHtml(body.city || 'Not provided')}</span>
            </div>
            <div class="field">
              <span class="label">Pincode:</span>
              <span class="value">${escapeHtml(body.pincode || 'Not provided')}</span>
            </div>
            <div class="field">
              <span class="label">Message:</span>
              <div class="message-box">
                ${body.message ? escapeHtml(body.message).replace(/\n/g, '<br>') : 'No message provided'}
              </div>
            </div>
            <div class="field">
              <span class="label">Agreed to Contact:</span>
              <span class="value">${body.agreeToContact ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    const emailResult = await resend.emails.send({
      from: 'Kiora Care <onboarding@resend.dev>',
      to: targetEmail,
      subject: 'New Contact Form Submission from Kiora Website',
      html: htmlContent,
    });

    if (emailResult.error) {
      console.error('Resend API error:', emailResult.error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ message: 'Email sent successfully' });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

