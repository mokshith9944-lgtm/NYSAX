// Vercel Serverless Function: /api/appointment
// Dual-dispatch pipeline for Consultation Scheduling

export default async function handler(req: any, res: any) {
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
    const { name, email, selectedDate, selectedTime, service, websiteOrHandle, timezone, region, currency } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'DISPATCH ERROR: Please reach directly via mailto:contact@nysaagency.com.'
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const agencyInbox = process.env.AGENCY_INBOX_EMAIL || 'mokshith9944@gmail.com';
    const senderEmail = process.env.SENDER_EMAIL || 'Nysa Agency <onboarding@resend.dev>';

    if (resendApiKey) {
      // 1. Internal Consultation Notification to Leadership Inbox (mokshith9944@gmail.com)
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
          subject: `[Consultation Booked] ${name} (${selectedDate} @ ${selectedTime} ${timezone || ''})`,
          text: `NEW STRATEGY CONSULTATION BOOKED\n\n` +
                `Client: ${name}\n` +
                `Email: ${email}\n` +
                `Selected Date: ${selectedDate}\n` +
                `Selected Time: ${selectedTime}\n` +
                `Region & Timezone: ${region || 'Not specified'} (${timezone || 'Standard'})\n` +
                `Preferred Currency: ${currency || 'USD'}\n` +
                `Primary Focus: ${service || 'Growth Strategy'}\n` +
                `Website / Handle: ${websiteOrHandle || 'Not provided'}\n\n` +
                `Timestamp: ${new Date().toISOString()}`,
        }),
      });

      // 2. Outbound Confirmation to Client
      // In Resend sandbox mode (using onboarding@resend.dev), outbound emails can only be sent to the account owner.
      // Once custom domain (e.g. concierge@nysaagency.com) is verified, outbound emails to all clients activate automatically.
      const isSandboxSender = senderEmail.includes('resend.dev');
      const promises: Promise<any>[] = [internalMailPromise];

      if (!isSandboxSender || email.toLowerCase() === agencyInbox.toLowerCase()) {
        const outboundAckPromise = fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: senderEmail,
            to: [email],
            subject: `Consultation Confirmed: Nysa Agency (${selectedDate} at ${selectedTime})`,
            text: `Dear ${name},\n\n` +
                  `Your strategy consultation with Nysa Agency has been scheduled for ${selectedDate} at ${selectedTime}.\n\n` +
                  `Our leadership team (Nikhil, Mokshith, Amaresh) will review your digital footprint and present custom execution recommendations.\n\n` +
                  `A calendar invite with video link will arrive prior to your session.\n\n` +
                  `Sincerely,\n\n` +
                  `Nikhil (Founder)\n` +
                  `Mokshith (Co-Founder)\n` +
                  `Amaresh (Co-Founder)\n\n` +
                  `Nysa Agency\n` +
                  `contact@nysaagency.com\n`,
          }),
        });
        promises.push(outboundAckPromise);
      }

      await Promise.allSettled(promises);
    }

    return res.status(200).json({
      success: true,
      message: 'CONFIRMED: Your consultation has been scheduled. Check your inbox for details.',
      appointment: {
        id: `appt_${Date.now()}`,
        name,
        email,
        selectedDate,
        selectedTime,
        service
      }
    });
  } catch (error) {
    console.error('API Appointment Error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'DISPATCH ERROR: Please reach directly via mailto:contact@nysaagency.com.'
    });
  }
}
