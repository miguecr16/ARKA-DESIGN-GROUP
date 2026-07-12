export function companyEmailTemplate(data, leadId) {
  const { name, email, phone, city, budget, message, date, page, userAgent, ip } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Lead Notification</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F7F5F0; color: #111111; margin: 0; padding: 40px 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid rgba(197, 168, 128, 0.15); border-radius: 4px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .header { background-color: #111111; padding: 30px; text-align: center; border-bottom: 2px solid #C5A880; }
        .logo { font-size: 20px; font-weight: 300; letter-spacing: 0.15em; color: #FFFFFF; text-transform: uppercase; }
        .logo span { color: #C5A880; }
        .content { padding: 40px 30px; }
        .lead-title { font-size: 24px; font-weight: 300; color: #111111; margin-top: 0; margin-bottom: 10px; font-family: Georgia, serif; font-style: italic; }
        .lead-id { font-family: monospace; font-size: 16px; color: #C5A880; font-weight: bold; margin-bottom: 30px; }
        .info-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .info-table th, .info-table td { padding: 12px 0; border-bottom: 1px solid rgba(17, 17, 17, 0.05); text-align: left; }
        .info-table th { width: 35%; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888888; font-weight: 600; }
        .info-table td { font-size: 14px; color: #111111; }
        .message-box { background-color: #F7F5F0; border-left: 2px solid #C5A880; padding: 20px; font-size: 14px; line-height: 1.6; color: #111111; margin-bottom: 30px; }
        .footer { background-color: #111111; padding: 20px 30px; text-align: center; font-size: 11px; color: #888888; letter-spacing: 0.05em; text-transform: uppercase; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://github.com/miguecr16/ARKA-DESIGN-GROUP/raw/main/assets/images/logo.png" alt="Arka Design Group" style="height: 90px; width: auto; display: block; margin: 0 auto;">
        </div>
        <div class="content">
          <div class="lead-title">New Private Commission Intake</div>
          <div class="lead-id">Lead ID: ${leadId}</div>
          
          <table class="info-table">
            <tr>
              <th>Client Name</th>
              <td>${name}</td>
            </tr>
            <tr>
              <th>Phone Number</th>
              <td>${phone}</td>
            </tr>
            <tr>
              <th>Email Address</th>
              <td><a href="mailto:${email}" style="color: #C5A880; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <th>City / Region</th>
              <td>${city}</td>
            </tr>
            <tr>
              <th>Budget Tier</th>
              <td>${budget}</td>
            </tr>
            <tr>
              <th>Intake Date</th>
              <td>${date}</td>
            </tr>
            <tr>
              <th>Source Page</th>
              <td>${page}</td>
            </tr>
            <tr>
              <th>Client Browser</th>
              <td>${userAgent}</td>
            </tr>
            <tr>
              <th>Client IP</th>
              <td>${ip || 'N/A'}</td>
            </tr>
          </table>
          
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888888; font-weight: 600; margin-bottom: 10px;">Spatial Vision Description</div>
          <div class="message-box">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <div class="footer">
          Arka Design Group LLC &bull; Bespoke Florida Architecture
        </div>
      </div>
    </body>
    </html>
  `;
}

export function customerEmailTemplate(data, leadId) {
  const { name, budget } = data;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '18136109309';
  const isQualified = budget !== 'tier-1';
  
  const whatsappMsg = encodeURIComponent(`Hello!\nI recently submitted a request through your website.\nLead ID:\n${leadId}\nI'd like to continue the conversation.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  const introText = isQualified
    ? 'Thank you for requesting a private commission with Arka Design Group. Your project parameters align with our specialized craft scope. Our Principal Architect will review your design goals within 24 hours to coordinate a consultation.'
    : 'Thank you for requesting a private commission with Arka Design Group. Due to our current active build schedule, our studio coordinator is reviewing project scopes to ensure alignment with our specialized design-build equipment. We will contact you soon.';

  const actionButtons = `
    <div style="margin: 30px 0; text-align: center;">
      <a href="${whatsappUrl}" class="button" style="background-color: #C5A880; color: #111111; padding: 14px 28px; text-decoration: none; font-family: monospace; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; border-radius: 2px; display: inline-block;">Continue on WhatsApp</a>
    </div>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Request Received</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F7F5F0; color: #111111; margin: 0; padding: 40px 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid rgba(197, 168, 128, 0.15); border-radius: 4px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .header { background-color: #111111; padding: 30px; text-align: center; border-bottom: 2px solid #C5A880; }
        .logo { font-size: 20px; font-weight: 300; letter-spacing: 0.15em; color: #FFFFFF; text-transform: uppercase; }
        .logo span { color: #C5A880; }
        .content { padding: 40px 30px; }
        .headline { font-size: 24px; font-weight: 300; color: #111111; margin-top: 0; margin-bottom: 20px; font-family: Georgia, serif; font-style: italic; }
        .paragraph { font-size: 15px; line-height: 1.7; color: #444444; margin-bottom: 20px; }
        .card { background-color: #F7F5F0; border: 1px dashed rgba(197, 168, 128, 0.4); padding: 20px; text-align: center; margin-bottom: 30px; border-radius: 2px; }
        .lead-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888888; margin-bottom: 5px; font-weight: 600; }
        .lead-val { font-family: monospace; font-size: 20px; color: #C5A880; font-weight: bold; }
        .footer { background-color: #111111; padding: 35px 30px; text-align: center; font-size: 11px; color: #888888; line-height: 1.6; }
        .footer-logo { font-size: 14px; letter-spacing: 0.15em; color: #FFFFFF; text-transform: uppercase; margin-bottom: 10px; }
        .footer-logo span { color: #C5A880; }
        .footer-links a { color: #C5A880; text-decoration: none; margin: 0 10px; }
        @media (max-width: 480px) {
          .button { display: block !important; width: 100% !important; box-sizing: border-box !important; margin-right: 0 !important; margin-bottom: 15px !important; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://github.com/miguecr16/ARKA-DESIGN-GROUP/raw/main/assets/images/logo.png" alt="Arka Design Group" style="height: 90px; width: auto; display: block; margin: 0 auto;">
        </div>
        <div class="content">
          <div class="headline">Hello ${name},</div>
          <p class="paragraph">${introText}</p>
          
          <div class="card">
            <div class="lead-label">Your Private Commission Reference Number</div>
            <div class="lead-val">${leadId}</div>
            <div style="font-size: 11px; color: #888888; margin-top: 8px;">Please retain this Lead ID for reference when contacting our studio.</div>
          </div>
          
          ${actionButtons}
          
          <p class="paragraph" style="font-size: 13px; color: #888888; margin-top: 30px;">
            If you need immediate assistance or would like to submit architectural sketches, feel free to contact us at <strong>(813) 610-9309</strong> or message our team directly using the links above.
          </p>
        </div>
        <div class="footer">
          <div class="footer-logo">ARKA <span>DESIGN GROUP</span></div>
          <div style="margin-bottom: 15px;">Bespoke Florida Custom Architecture & Turnkey Cabinetry</div>
          <div class="footer-links">
            <a href="https://arkadesigngroup.com/portfolio.html">Portfolio</a>
            <span>&bull;</span>
            <a href="https://arkadesigngroup.com/services.html">Services</a>
            <span>&bull;</span>
            <a href="https://wa.me/${whatsappNumber}">WhatsApp</a>
          </div>
          <div style="margin-top: 20px; font-size: 9px; color: #555555;">&copy; 2026 Arka Design Group LLC. All Rights Reserved.</div>
        </div>
      </div>
    </body>
    </html>
  `;
}
