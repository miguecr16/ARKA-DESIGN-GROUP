import { Resend } from 'resend';
import { generateLeadId } from './_lib/lead-id.js';
import { companyEmailTemplate, customerEmailTemplate } from './_lib/templates.js';

export default async function handler(req, res) {
  // 1. Enable CORS / Method check
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  // 2. Extract and validate parameters
  const { name, email, phone, city, budget, message, page } = req.body || {};

  // Log intake start
  console.log(`[Intake Start] Received request from ${name || 'unknown'} (${email || 'unknown'})`);

  // Basic sanitization function
  const sanitize = (str) => {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .trim();
  };

  const sName = sanitize(name);
  const sEmail = sanitize(email);
  const sPhone = sanitize(phone);
  const sCity = sanitize(city);
  const sBudget = sanitize(budget);
  const sMessage = sanitize(message);
  const sPage = sanitize(page) || 'contact';

  // Server-side validation
  if (!sName || !sEmail || !sPhone || !sCity || !sBudget || !sMessage) {
    console.warn('[Validation Fail] Missing required parameters');
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sEmail)) {
    console.warn(`[Validation Fail] Invalid email format: ${sEmail}`);
    return res.status(400).json({ success: false, error: 'Invalid email address format' });
  }

  // Phone validation (ensure there are at least 7 digits)
  const digitCount = sPhone.replace(/\D/g, '').length;
  if (digitCount < 7 || digitCount > 15) {
    console.warn(`[Validation Fail] Invalid phone format: ${sPhone}`);
    return res.status(400).json({ success: false, error: 'Invalid phone number format' });
  }

  // Character limits
  if (sName.length > 100 || sMessage.length > 5000) {
    console.warn('[Validation Fail] Parameters exceed character limits');
    return res.status(400).json({ success: false, error: 'Character limit exceeded' });
  }

  // 3. Generate unique Lead ID
  const leadId = generateLeadId();
  console.log(`[Lead Generated] Lead ID: ${leadId} for ${sName}`);

  // 4. Resolve environment variables
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL || 'sales@arkadg.com';
  const fromEmail = process.env.FROM_EMAIL || 'info@arkadg.com';
  const companyName = process.env.COMPANY_NAME || 'Arka Design Group';

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const userAgent = req.headers['user-agent'] || '';
  const dateStr = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST';

  const payload = {
    name: sName,
    email: sEmail,
    phone: sPhone,
    city: sCity,
    budget: sBudget,
    message: sMessage,
    date: dateStr,
    page: sPage,
    userAgent,
    ip: clientIp
  };

  // 5. Send Emails via Resend
  if (!apiKey) {
    console.warn('[Resend Warning] RESEND_API_KEY environment variable is not defined. Simulating successful mail send.');
    console.log(`[Mock Send] Notification sent to ${contactEmail} for Lead ${leadId}`);
    console.log(`[Mock Send] Confirmation sent to ${sEmail} for Lead ${leadId}`);
    
    return res.status(200).json({
      success: true,
      leadId,
      message: 'Request processed successfully (Simulated mode).'
    });
  }

  try {
    const resend = new Resend(apiKey);

    // Dispatch company notification email
    const companyEmailResult = await resend.emails.send({
      from: `${companyName} <${fromEmail}>`,
      to: contactEmail,
      subject: `New Lead - ${leadId}`,
      html: companyEmailTemplate(payload, leadId)
    });

    if (companyEmailResult.error) {
      throw new Error(`Resend Company Email error: ${companyEmailResult.error.message}`);
    }

    // Dispatch customer confirmation email
    const customerEmailResult = await resend.emails.send({
      from: `${companyName} <${fromEmail}>`,
      to: sEmail,
      subject: `We've Received Your Request - ${leadId}`,
      html: customerEmailTemplate(payload, leadId)
    });

    if (customerEmailResult.error) {
      throw new Error(`Resend Customer Email error: ${customerEmailResult.error.message}`);
    }

    console.log(`[Lead Complete] Lead ID: ${leadId} successfully dispatched to company and customer.`);

    return res.status(200).json({
      success: true,
      leadId,
      message: 'Request submitted successfully.'
    });

  } catch (error) {
    console.error(`[API Error] Failed to process lead ${leadId}:`, error.message);
    return res.status(500).json({
      success: false,
      leadId,
      error: 'Failed to process email delivery. Please contact customer support.',
      message: error.message
    });
  }
}
