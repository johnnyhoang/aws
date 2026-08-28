import type { IncomingMessage, ServerResponse } from 'http';
import { getUserProfile, saveUserProfile, getUserProgress } from './_db';

export default async function handler(req: IncomingMessage & { body?: any; query?: any }, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  try {
    if (req.method === 'POST') {
      let bodyData = '';
      for await (const chunk of req) {
        bodyData += chunk;
      }
      const body = bodyData ? JSON.parse(bodyData) : {};
      const { email, name, careerTrack } = body;

      if (!email || typeof email !== 'string') {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Vui lòng cung cấp địa chỉ email hợp lệ.' }));
        return;
      }

      const normalizedEmail = email.toLowerCase().trim();
      let profile = await getUserProfile(normalizedEmail);

      if (!profile) {
        profile = {
          email: normalizedEmail,
          name: name?.trim() || normalizedEmail.split('@')[0] || 'Học viên AWS',
          careerTrack: careerTrack || 'cloud_engineer',
          createdAt: new Date().toISOString(),
          lastActiveAt: new Date().toISOString()
        };
        await saveUserProfile(profile);
      } else if (name || careerTrack) {
        profile = {
          ...profile,
          name: name?.trim() || profile.name,
          careerTrack: careerTrack || profile.careerTrack,
          lastActiveAt: new Date().toISOString()
        };
        await saveUserProfile(profile);
      }

      const progress = await getUserProgress(normalizedEmail);

      res.statusCode = 200;
      res.end(JSON.stringify({
        success: true,
        message: 'Đăng nhập và đồng bộ tài khoản thành công.',
        user: profile,
        progress
      }));
      return;
    }

    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Phương thức không được hỗ trợ.' }));
  } catch {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Không thể xử lý yêu cầu xác thực. Vui lòng thử lại sau.' }));
  }
}
