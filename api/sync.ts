import type { IncomingMessage, ServerResponse } from 'http';
import { mergeUserProgress, UserProgressData } from './_db';

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
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
      const { email, progress } = body;

      if (!email || !progress) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Thiếu thông tin đồng bộ hợp nhất.' }));
        return;
      }

      const merged = await mergeUserProgress(email, progress);

      res.statusCode = 200;
      res.end(JSON.stringify({
        success: true,
        message: 'Hợp nhất dữ liệu giữa các thiết bị thành công.',
        progress: merged
      }));
      return;
    }

    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Phương thức không được hỗ trợ.' }));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Không thể đồng bộ hợp nhất dữ liệu.' }));
  }
}
