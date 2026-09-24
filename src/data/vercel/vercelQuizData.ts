import { VercelQuizQuestion } from '../../types/vercelModule';

export const VERCEL_QUIZ_QUESTIONS: VercelQuizQuestion[] = [
  {
    id: 'vq-1',
    scenario: 'Bạn xây dựng một trang chi tiết bài viết tin tức với 100.000 bài. Bạn muốn người dùng mở bài viết ngay lập tức (<50ms) từ Edge CDN, nhưng khi tác giả cập nhật nội dung bài viết trong hệ thống CMS, trang web phải hiển thị bản mới trong vòng tối đa 60 giây mà không cần deploy lại toàn bộ dự án.',
    question: 'Chiến lược render nào trên Vercel / Next.js là tối ưu nhất cho bài toán này?',
    options: [
      { id: 'a', text: 'Sử dụng SSG thuần túy và chạy build lại 100.000 trang mỗi khi có tin mới', isCorrect: false },
      { id: 'b', text: 'Sử dụng SSR thuần túy (dynamic rendering) bắt database truy vấn mỗi lượt truy cập', isCorrect: false },
      { id: 'c', text: 'Sử dụng ISR (Incremental Static Regeneration) với thời gian revalidate: 60 hoặc On-demand Revalidation', isCorrect: true },
      { id: 'd', text: 'Chuyển toàn bộ việc render về Client-Side Rendering (SPA thuần)', isCorrect: false }
    ],
    explanation: 'ISR cho phép trang được lưu đệm trên Edge CDN toàn cầu với tốc độ đọc cực nhanh của Static HTML, đồng thời tự động kích hoạt Serverless Function ngầm để tái sinh trang khi hết hạn revalidate hoặc khi gọi revalidateTag/revalidatePath.',
    category: 'rendering_rendering_strategies',
    difficulty: 'Trung bình'
  },
  {
    id: 'vq-2',
    scenario: 'Ứng dụng của bạn cần kiểm tra Token xác thực trong Cookie và đọc vị trí quốc gia của người dùng để chuyển hướng (Redirect) họ sang ngôn ngữ phù hợp trước khi trang được render.',
    question: 'Bạn nên đặt logic này ở đâu để có thời gian phản hồi nhanh nhất và Cold Start bằng 0ms?',
    options: [
      { id: 'a', text: 'Trong Vercel Edge Middleware (middleware.ts) chạy trên Edge Runtime', isCorrect: true },
      { id: 'b', text: 'Trong Node.js Serverless Function tại Region us-east-1', isCorrect: false },
      { id: 'c', text: 'Trong file Dockerfile custom Nginx', isCorrect: false },
      { id: 'd', text: 'Viết logic trong useEffect trên trình duyệt của người dùng', isCorrect: false }
    ],
    explanation: 'Edge Middleware chạy trên V8 Isolates tại hàng trăm PoP của Vercel Edge Network sát cạnh người dùng, cho phép đọc Cookie, Geolocation headers và trả về NextResponse.redirect() tức thì với Cold Start 0ms.',
    category: 'edge_serverless',
    difficulty: 'Nâng cao'
  },
  {
    id: 'vq-3',
    scenario: 'Đội ngũ của bạn đang cấu hình Apex Domain (ví dụ: mycompany.com) trỏ về Vercel thông qua bảng điều khiển quản lý DNS tại nhà đăng ký tên miền.',
    question: 'Bản ghi DNS nào sau đây là chính xác theo tiêu chuẩn của Vercel?',
    options: [
      { id: 'a', text: 'Bản ghi A trỏ về IP 127.0.0.1', isCorrect: false },
      { id: 'b', text: 'Bản ghi A trỏ về Anycast IP 76.76.21.21', isCorrect: true },
      { id: 'c', text: 'Bản ghi TXT với giá trị vercel-domain-verification', isCorrect: false },
      { id: 'd', text: 'Bản ghi CNAME trỏ về 8.8.8.8', isCorrect: false }
    ],
    explanation: 'Đối với Apex Domain (tên miền gốc không có subdomain), Vercel sử dụng địa chỉ Anycast IP tĩnh toàn cầu là 76.76.21.21. Đối với Subdomain, sử dụng CNAME cname.vercel-dns.com.',
    category: 'domains_dns_cdn',
    difficulty: 'Cơ bản'
  },
  {
    id: 'vq-4',
    scenario: 'Một lập trình viên muốn đồng bộ các biến môi trường cấu hình Development từ Vercel Project Settings về file .env.local trên máy tính cá nhân để chạy thử nghiệm dự án.',
    question: 'Câu lệnh Vercel CLI nào thực hiện việc này chuẩn xác và an toàn nhất?',
    options: [
      { id: 'a', text: 'vercel pull --yes', isCorrect: false },
      { id: 'b', text: 'vercel env pull .env.local', isCorrect: true },
      { id: 'c', text: 'vercel secrets download', isCorrect: false },
      { id: 'd', text: 'git pull origin env', isCorrect: false }
    ],
    explanation: 'Lệnh vercel env pull .env.local kết nối trực tiếp với Vercel API và tải các biến môi trường thuộc phạm vi Development về file .env.local cục bộ mà không để lộ mật khẩu qua kênh chat.',
    category: 'environment_secrets',
    difficulty: 'Cơ bản'
  }
];
