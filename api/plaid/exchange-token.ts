export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { public_token } = req.body;

    if (!public_token) {
      return res.status(400).json({ 
        error: 'Missing public_token',
        error_message: 'public_token is required'
      });
    }

    // Use server-side environment variables (without VITE_ prefix for security)
    const clientId = process.env.PLAID_CLIENT_ID || process.env.VITE_PLAID_CLIENT_ID;
    const secret = process.env.PLAID_SECRET_KEY || process.env.VITE_PLAID_SECRET_KEY;
    const env = process.env.PLAID_ENV || process.env.VITE_PLAID_ENV || 'sandbox';

    if (!clientId || !secret) {
      return res.status(500).json({ 
        error: 'Plaid credentials not configured',
        error_message: 'Server configuration error: Plaid credentials are missing'
      });
    }

    const plaidUrl = env === 'production' 
      ? 'https://production.plaid.com' 
      : 'https://sandbox.plaid.com';

    const response = await fetch(`${plaidUrl}/item/public_token/exchange`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        secret: secret,
        public_token: public_token,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: 'Failed to exchange token',
        error_message: errorData.error_message || errorData.error?.error_message || 'Unknown error from Plaid'
      });
    }

    const data = await response.json();
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error exchanging Plaid token:', error);
    return res.status(500).json({
      error: 'Internal server error',
      error_message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}
