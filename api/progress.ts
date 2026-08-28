import type { IncomingMessage, ServerResponse } from 'http';
import { getUserProgress, saveUserProgress } from './_db';
import { URL } from 'url';

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
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
    const parsedUrl = new URL(req.url || '', 'http://localhost');
    const emailParam = parsedUrl.searchParams.get('email');

    if (req.method === 'GET') {
      if (!emailParam) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Thiếu thông tin tài khoản email.' }));
        return;
      }
      const progress = await getUserProgress(emailParam);
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, progress }));
      return;
    }

    if (req.method === 'POST') {
      let bodyData = '';
      for await (const chunk of req) {
        bodyData += chunk;
      }
      const body = bodyData ? JSON.parse(bodyData) : {};
      const { email, progress } = body;

      if (!email || !progress) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Dữ liệu đồng bộ không đầy đủ.' }));
        return;
      }

      const saved = await saveUserProgress({
        ...progress,
        email: email.toLowerCase().trim()
      });

      res.statusCode = 200;
      res.end(JSON.stringify({
        success: true,
        message: 'Đã lưu tiến độ học tập lên đám mây.',
        progress: saved
      }));
      return;
    }

    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Phương thức không được hỗ trợ.' }));
  } catch {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Lỗi máy chủ khi truy xuất tiến độ.' }));
  }
}
