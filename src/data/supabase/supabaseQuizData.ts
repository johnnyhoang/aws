import { SupabaseQuizQuestion } from '../../types/supabaseModule';

export const SUPABASE_QUIZ_QUESTIONS: SupabaseQuizQuestion[] = [
  {
    id: 'sq-1',
    scenario: 'Bạn tạo một bảng mới "todos" trong schema public và bật Row Level Security (RLS), nhưng bạn chưa tạo bất kỳ chính sách (Policy) nào trên bảng đó. Khi một người dùng đã đăng nhập thực hiện truy vấn SELECT * FROM todos, kết quả trả về sẽ là gì?',
    question: 'Hành vi mặc định của PostgreSQL khi RLS được bật mà không có policy nào là gì?',
    options: [
      { id: 'a', text: 'Trả về toàn bộ dữ liệu trong bảng vì người dùng đã đăng nhập', isCorrect: false },
      { id: 'b', text: 'Trả về một mảng rỗng [] (Không có quyền đọc bất kỳ dòng nào)', isCorrect: true },
      { id: 'c', text: 'Báo lỗi sập cơ sở dữ liệu với mã 500', isCorrect: false },
      { id: 'd', text: 'Chỉ trả về 10 dòng đầu tiên', isCorrect: false }
    ],
    explanation: 'Khi RLS được bật trên một bảng trong PostgreSQL, chính sách mặc định là "Deny All" (Chặn tất cả). Nếu không có chính sách USING nào khớp, không ai có thể đọc hay ghi dữ liệu qua API công khai.',
    category: 'rls_security_policies',
    difficulty: 'Cơ bản'
  },
  {
    id: 'sq-2',
    scenario: 'Bạn muốn viết một chính sách RLS cho phép người dùng thực hiện cập nhật (UPDATE) các bài viết của chính mình trong bảng "posts", đảm bảo họ không thể đổi trường user_id sang ID của người khác.',
    question: 'Cấu trúc mệnh đề nào sau đây là chính xác và an toàn nhất?',
    options: [
      { id: 'a', text: 'USING (true) WITH CHECK (true)', isCorrect: false },
      { id: 'b', text: 'USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)', isCorrect: true },
      { id: 'c', text: 'USING (auth.role() = "anon")', isCorrect: false },
      { id: 'd', text: 'WITH CHECK (user_id IS NOT NULL)', isCorrect: false }
    ],
    explanation: 'Mệnh đề USING kiểm tra xem dòng dữ liệu trước khi sửa có thuộc về người dùng không, còn mệnh đề WITH CHECK kiểm tra xem dữ liệu mới sau khi sửa có vẫn thỏa mãn điều kiện auth.uid() = user_id hay không.',
    category: 'rls_security_policies',
    difficulty: 'Nâng cao'
  },
  {
    id: 'sq-3',
    scenario: 'Ứng dụng của bạn lưu trữ các hóa đơn PDF nhạy cảm của khách hàng trong một Private Storage Bucket "invoices". Bạn muốn tạo một liên kết cho phép khách hàng tải hóa đơn của họ nhưng liên kết này phải tự động hết hạn sau 10 phút.',
    question: 'Phương thức SDK nào của Supabase Storage thực hiện việc này chuẩn xác nhất?',
    options: [
      { id: 'a', text: 'supabase.storage.from("invoices").getPublicUrl(filePath)', isCorrect: false },
      { id: 'b', text: 'supabase.storage.from("invoices").createSignedUrl(filePath, 600)', isCorrect: true },
      { id: 'c', text: 'supabase.storage.from("invoices").download(filePath)', isCorrect: false },
      { id: 'd', text: 'Đổi bucket sang Public để lấy link vĩnh viễn', isCorrect: false }
    ],
    explanation: 'Phương thức createSignedUrl(filePath, expiresInSeconds) tạo ra một Presigned URL có chữ ký số xác thực và tự động vô hiệu hóa sau số giây được chỉ định (600 giây = 10 phút).',
    category: 'storage_buckets_presigned',
    difficulty: 'Trung bình'
  },
  {
    id: 'sq-4',
    scenario: 'Bạn đang xây dựng tính năng tìm kiếm ngữ nghĩa (Semantic Search) cho ứng dụng tài liệu với 500.000 bài viết sử dụng extension pgvector. Truy vấn tìm kiếm khoảng cách vector hiện tại đang mất 1.5 giây vì phải quét toàn bộ bảng (Sequential Scan).',
    question: 'Loại chỉ mục (Index) nào của pgvector nên được tạo để tăng tốc độ truy vấn vector lên dưới 10 mili-giây?',
    options: [
      { id: 'a', text: 'Chỉ mục B-Tree truyền thống', isCorrect: false },
      { id: 'b', text: 'Chỉ mục HNSW (Hierarchical Navigable Small World) hoặc IVFFlat', isCorrect: true },
      { id: 'c', text: 'Chỉ mục Hash Index', isCorrect: false },
      { id: 'd', text: 'Chỉ mục GIN trên cột ID', isCorrect: false }
    ],
    explanation: 'HNSW là thuật toán đồ thị đa tầng hiện đại nhất trong pgvector, cho phép tìm kiếm láng giềng gần nhất (Nearest Neighbor) với độ chính xác cao và tốc độ cực nhanh trong vài mili-giây.',
    category: 'pgvector_ai_embeddings',
    difficulty: 'Chuyên gia'
  }
];
