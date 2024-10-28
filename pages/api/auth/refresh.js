// pages/api/auth/refresh.js
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_DRIVE_CLIENT_ID,
  process.env.GOOGLE_DRIVE_CLIENT_SECRET,
  process.env.GOOGLE_DRIVE_REDIRECT_URI
);

export default async function refreshHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    oauth2Client.setCredentials({ refresh_token: decoded.refreshToken });

    const { credentials } = await oauth2Client.refreshAccessToken();

    const sessionToken = jwt.sign(
      { ...decoded, accessToken: credentials.access_token },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.setHeader('Set-Cookie', serialize('auth_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 604800, // 7 days
    }));

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({ error: 'Failed to refresh token' });
  }
}
