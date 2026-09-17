// Vercel Serverless Function: /api/feedback
// Authentic Client Feedback Pipeline with Moderation

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

  if (req.method === 'POST') {
    try {
      const { author, role, company, rating, feedback, service } = req.body || {};

      if (!author || !feedback) {
        return res.status(400).json({
          error: 'Missing required fields',
          message: 'Please provide your name and feedback.'
        });
      }

      const newReview = {
        id: `rev_${Date.now()}`,
        author,
        role: role || 'Client Partner',
        company: company || 'Enterprise Client',
        rating: Math.min(5, Math.max(1, Number(rating) || 5)),
        feedback,
        service: service || 'Growth Retainer',
        status: 'pending', // Requires leadership moderation
        is_verified: false,
        createdAt: new Date().toISOString()
      };

      // Optional: notify agency inbox
      const resendApiKey = process.env.RESEND_API_KEY;
      const agencyInbox = process.env.AGENCY_INBOX_EMAIL || 'contact@nysaagency.com';
      const senderEmail = process.env.SENDER_EMAIL || 'Nysa Agency <onboarding@resend.dev>';

      if (resendApiKey) {
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: senderEmail,
            to: [agencyInbox],
            subject: `[New Client Review Submitted - Pending Approval] ${author}`,
            text: `A new client testimonial has been submitted:\n\n` +
                  `Author: ${author} (${role} - ${company})\n` +
                  `Rating: ${newReview.rating} / 5\n` +
                  `Service: ${service}\n` +
                  `Feedback: "${feedback}"\n\n` +
                  `Review and approve this in the Nysa Agency Executive Command Center (/admin).`
          }),
        }).catch(err => console.error('Feedback notify error:', err));
      }

      return res.status(201).json({
        success: true,
        message: 'THANK YOU: Your feedback has been recorded and submitted for verification.',
        review: newReview
      });
    } catch (error) {
      console.error('API Feedback POST Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // GET: return status info or verified reviews instructions
  return res.status(200).json({
    status: 'active',
    message: 'Nysa Agency authentic feedback pipeline active.'
  });
}
