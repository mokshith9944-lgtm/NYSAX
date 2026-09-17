// Vercel Serverless Function: /api/contact
// Dual-dispatch pipeline:
// 1. Internal self-mail notification to AGENCY_INBOX_EMAIL with lead details & reply_to: client_email
// 2. Outbound plain-text acknowledgment to prospective client confirming receipt from leadership

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'DISPATCH ERROR: Please reach directly via mailto:contact@nysaagency.com.'
    });
  }

  try {
    const { name, email, service, budget, websiteOrHandle, message } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'DISPATCH ERROR: Please reach directly via mailto:contact@nysaagency.com.'
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const agencyInbox = process.env.AGENCY_INBOX_EMAIL || 'contact@nysaagency.com';
    const senderEmail = process.env.SENDER_EMAIL || 'Nysa Agency <onboarding@resend.dev>';

    // If Resend API Key is configured, execute dual dispatch via HTTP
    if (resendApiKey) {
      // 1. Internal Self-Mail to Leadership
      const internalMailPromise = fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [agencyInbox],
          reply_to: email,
          subject: `[New Inquiry] ${name} - ${service || 'General Inbound'}`,
          text: `NEW INQUIRY RECEIVED AT NYSA AGENCY DESK\n\n` +
                `Client Name: ${name}\n` +
                `Email: ${email}\n` +
                `Service Needed: ${service || 'Not specified'}\n` +
                `Approximate Budget: ${budget || 'Not specified'}\n` +
                `Website / Handle: ${websiteOrHandle || 'Not provided'}\n\n` +
                `Project Brief / Message:\n${message || 'No additional note'}\n\n` +
                `Timestamp: ${new Date().toISOString()}\n` +
                `Direct reply to this email will reach: ${email}`,
        }),
      });

      // 2. Outbound Acknowledgment to Prospective Client
      const outboundAckPromise = fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [email],
          subject: `Inquiry Received: Nysa Agency`,
          text: `Dear ${name},\n\n` +
                `Your project brief has reached our desk. Our leadership team has received your submission and is reviewing your specifications.\n\n` +
                `Expect a direct response from our desk within 24 hours.\n\n` +
                `Sincerely,\n\n` +
                `Nikhil (Founder)\n` +
                `Mokshith (Co-Founder)\n` +
                `Amaresh (Co-Founder)\n\n` +
                `Nysa Agency\n` +
                `Direct: contact@nysaagency.com\n` +
                `Instagram: https://www.instagram.com/nysax.agency\n`,
        }),
      });

      await Promise.allSettled([internalMailPromise, outboundAckPromise]);
    } else {
      console.warn('RESEND_API_KEY is not configured in Vercel environment variables. Inbound lead logged to serverless stdout:', {
        name, email, service, budget, websiteOrHandle, message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'CONFIRMED: Your brief has reached our desk. Expect a response within 24 hours.',
      lead: {
        id: `lead_${Date.now()}`,
        name,
        email,
        service,
        budget,
        websiteOrHandle,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('API Contact Dispatch Error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'DISPATCH ERROR: Please reach directly via mailto:contact@nysaagency.com.'
    });
  }
}
