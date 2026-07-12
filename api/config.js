export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  return res.status(200).json({
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '18136109309',
    calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/miguelangel16cr/30min',
    companyName: process.env.COMPANY_NAME || 'Arka Design Group'
  });
}
