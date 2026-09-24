import { SupabaseFlashcard } from '../../types/supabaseModule';

export const SUPABASE_FLASHCARDS: SupabaseFlashcard[] = [
  {
    id: 's-fc-1',
    term: 'Row Level Security (RLS)',
    definition: 'Cơ chế kiểm soát truy cập cấp độ hàng dữ liệu của PostgreSQL, tự động lọc bản ghi dựa trên JWT Token của người dùng (auth.uid()).',
    category: 'rls_security_policies',
    exampleOrAnalogy: 'Như các ngăn kéo riêng biệt trong một tủ đồ chung: Mỗi người chỉ có chìa khóa để mở đúng ngăn kéo mang tên mình.',
    proTip: 'Bắt buộc chạy ALTER TABLE table_name ENABLE ROW LEVEL SECURITY trên mọi bảng công khai.'
  },
  {
    id: 's-fc-2',
    term: 'PostgREST',
    definition: 'Máy chủ Web độc lập tự động biến schema PostgreSQL thành một API RESTful đầy đủ chức năng với hiệu năng cực cao.',
    category: 'overview_philosophy',
    exampleOrAnalogy: 'Như một phiên dịch viên tự động ngồi giữa cơ sở dữ liệu và ứng dụng, biến mọi bảng SQL thành các endpoint JSON trong nháy mắt.',
    proTip: 'Không cần viết mã API backend CRUD thủ công khi sử dụng PostgREST.'
  },
  {
    id: 's-fc-3',
    term: 'Postgres CDC (Change Data Capture)',
    definition: 'Kỹ thuật đọc trực tiếp nhật ký Write-Ahead Log (WAL) của PostgreSQL để phát hiện và phát sóng sự kiện thay đổi dữ liệu thời gian thực.',
    category: 'realtime_cdc_broadcast',
    exampleOrAnalogy: 'Như chiếc máy bay không người lái theo dõi trực tiếp mọi chuyển động trên công trường và gửi tín hiệu về trung tâm chỉ huy.',
    proTip: 'Bật Realtime cho bảng bằng lệnh ALTER PUBLICATION supabase_realtime ADD TABLE table_name.'
  },
  {
    id: 's-fc-4',
    term: 'Presigned URL (Signed URL)',
    definition: 'Đường dẫn liên kết tải file tạm thời có kèm chữ ký số và thời hạn hết hạn, cho phép truy cập an toàn vào file trong Private Storage Bucket.',
    category: 'storage_buckets_presigned',
    exampleOrAnalogy: 'Như chiếc thẻ khách tham quan có thời hạn 15 phút: Hết 15 phút bảo vệ sẽ từ chối không cho vào cửa.',
    proTip: 'Sử dụng supabase.storage.from("bucket").createSignedUrl(path, 60) cho các file bảo mật.'
  },
  {
    id: 's-fc-5',
    term: 'pgvector (Extension)',
    definition: 'Tiện ích mở rộng biến PostgreSQL thành Vector Database, hỗ trợ lưu trữ vector nhúng AI và tìm kiếm khoảng cách Cosine Distance.',
    category: 'pgvector_ai_embeddings',
    exampleOrAnalogy: 'Như một chiếc kính hiển vi AI giúp cơ sở dữ liệu hiểu được ý nghĩa sâu xa của từ ngữ thay vì chỉ so khớp từng chữ cái.',
    proTip: 'Tạo chỉ mục HNSW trên cột vector để tăng tốc độ tìm kiếm Semantic Search lên gấp 100 lần.'
  },
  {
    id: 's-fc-6',
    term: 'Supabase Edge Functions',
    definition: 'Các hàm Serverless viết bằng TypeScript chạy trên Deno Runtime phân tán toàn cầu với độ trễ cực thấp và Cold Start nhanh.',
    category: 'edge_functions_deno',
    exampleOrAnalogy: 'Như những người lính phản ứng nhanh đóng quân tại khắp các thành phố lớn trên thế giới, sẵn sàng xử lý yêu cầu ngay tại chỗ.',
    proTip: 'Chạy supabase functions serve trên máy local để debug mà không cần deploy lên cloud.'
  }
];
