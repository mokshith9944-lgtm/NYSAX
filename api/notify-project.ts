// Vercel Serverless Function: /api/notify-project
// Automated Transactional Notifications for Project Milestones & Deliverables

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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      clientEmail,
      clientName,
      projectTitle,
      updateType, // 'deliverable_completed' | 'progress_updated' | 'status_announcement'
      deliverableTitle,
      progress,
      message,
    } = req.body || {};

    if (!clientEmail || !projectTitle) {
      return res.status(400).json({
        error: 'Missing required parameters',
        message: 'clientEmail and projectTitle are required.',
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const agencyInbox = process.env.AGENCY_INBOX_EMAIL || 'mokshith9944@gmail.com';
    const senderEmail = process.env.SENDER_EMAIL || 'Nysa Agency <onboarding@resend.dev>';

    let subject = `[Project Update] ${projectTitle}`;
    let headline = 'Project Sprint Update';
    let detailText = message || 'Your campaign roadmap has been updated.';

    if (updateType === 'deliverable_completed') {
      subject = `[Deliverable Released] ${deliverableTitle || 'Milestone'} - ${projectTitle}`;
      headline = 'Deliverable Verified & Completed';
      detailText = `The leadership engineering team has finalized and verified: "${deliverableTitle}".`;
    } else if (updateType === 'progress_updated') {
      subject = `[Milestone Velocity] ${progress}% Completed - ${projectTitle}`;
      headline = `Campaign Progress: ${progress}%`;
      detailText = `Sprint velocity updated to ${progress}% completion on your active engagement roadmap.`;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #000000; color: #ffffff; padding: 40px 20px; margin: 0; }
            .container { max-width: 540px; margin: 0 auto; background: #08080a; border: 1px solid #1f1f23; padding: 36px; }
            .badge { font-family: monospace; font-size: 10px; color: #708238; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 12px; }
            .title { font-size: 22px; font-weight: 700; margin: 0 0 16px 0; color: #ffffff; letter-spacing: -0.02em; }
            .project-tag { font-family: monospace; font-size: 12px; color: #9bb355; background: #141a0d; border: 1px solid #3d4928; padding: 6px 12px; display: inline-block; margin-bottom: 20px; }
            .content { font-size: 14px; line-height: 1.7; color: #d4d4d8; font-family: monospace; background: #111113; border: 1px solid #27272a; padding: 20px; margin-bottom: 24px; }
            .metric { font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 8px; }
            .btn-wrap { text-align: center; margin: 32px 0 20px 0; }
            .btn { background: #708238; color: #000000; font-family: monospace; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; padding: 14px 28px; text-decoration: none; display: inline-block; }
            .footer { font-size: 11px; color: #71717a; border-top: 1px solid #222222; padding-top: 20px; margin-top: 32px; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="badge">NYSA AGENCY // CLIENT CAMPAIGN DISPATCH</div>
            <h1 class="title">${headline}</h1>
            <div class="project-tag">${projectTitle}</div>
            
            <div class="content">
              <div class="metric">Hello ${clientName || 'Partner'},</div>
              <p style="margin: 0;">${detailText}</p>
              ${progress !== undefined ? `<p style="margin: 12px 0 0 0; color: #a1a1aa;">Current Sprint Completion: <strong style="color: #ffffff;">${progress}%</strong></p>` : ''}
            </div>

            <div class="btn-wrap">
              <a href="https://nysax.vercel.app/portal/client" class="btn">Open Client Portal</a>
            </div>

            <div class="footer">
              Nysa Agency Executive Command &bull; Direct Partner Desk (Nikhil, Mokshith, Amaresh)<br>
              Inquiries: contact@nysaagency.com
            </div>
          </div>
        </body>
      </html>
    `;

    if (resendApiKey) {
      // 1. Dispatch to client
      const clientEmailPromise = fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [clientEmail],
          subject,
          html: htmlContent,
          text: `[NYSA AGENCY PROJECT UPDATE]\n\nProject: ${projectTitle}\n${headline}\n\n${detailText}\n\nAccess your client portal at: https://nysax.vercel.app/portal/client`,
        }),
      });

      // 2. Dispatch internal audit copy to agency inbox
      const adminCopyPromise = fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [agencyInbox],
          subject: `[Audit Dispatch Copy] ${subject} -> ${clientEmail}`,
          text: `AUTOMATED PROJECT NOTIFICATION DISPATCHED\n\nClient: ${clientName || 'Client'} (${clientEmail})\nProject: ${projectTitle}\nHeadline: ${headline}\nDetails: ${detailText}\nProgress: ${progress || 'N/A'}%\nTimestamp: ${new Date().toISOString()}`,
        }),
      });

      await Promise.allSettled([clientEmailPromise, adminCopyPromise]);
    }

    return res.status(200).json({
      success: true,
      message: `Project notification dispatched to ${clientEmail}`,
    });
  } catch (error: any) {
    console.error('[Notify Project Error]:', error);
    return res.status(500).json({
      error: 'Failed to dispatch notification',
      message: error?.message || 'Server error',
    });
  }
}
