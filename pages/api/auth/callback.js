// pages/api/auth/callback.js
import { google } from 'googleapis';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_DRIVE_CLIENT_ID,
  process.env.GOOGLE_DRIVE_CLIENT_SECRET,
  process.env.GOOGLE_DRIVE_REDIRECT_URI
);

export default async function callbackHandler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, state } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    const sessionToken = jwt.sign(
      {
        email: userInfo.data.email,
        name: userInfo.data.name,
        picture: userInfo.data.picture,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      },
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

    res.redirect(state || '/');
  } catch (error) {
    console.error('Auth callback error:', error);
    res.redirect('/auth/error');
  }
}
