import { DatabaseQuizQuestion } from '../../types/databaseModule';

export const DATABASE_QUIZ_QUESTIONS: DatabaseQuizQuestion[] = [
  {
    id: 'db-q1',
    category: 'Nguyên lý & ACID',
    difficulty: 'Cơ bản',
    scenario: 'Trong giao dịch ngân hàng chuyển tiền từ Tài khoản A sang Tài khoản B, nếu trừ tiền A thành công nhưng cộng tiền B bị lỗi mạng sập server, tính chất nào của ACID đảm bảo toàn bộ số tiền của A được hoàn trả lại nguyên vẹn?',
    options: [
      { id: 'opt-a', text: 'Atomicity (Tính nguyên tử)' },
      { id: 'opt-b', text: 'Consistency (Tính nhất quán)' },
      { id: 'opt-c', text: 'Isolation (Tính cô lập)' },
      { id: 'opt-d', text: 'Durability (Tính bền vững)' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Atomicity (All-or-Nothing) đảm bảo tất cả các câu lệnh trong một transaction hoặc cùng thành công 100%, hoặc cùng thất bại và rollback 100%, không bao giờ để lại trạng thái dở dang.',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Consistency đảm bảo dữ liệu thỏa mãn các ràng buộc schema và khóa ngoại.' },
        { optionId: 'opt-c', reason: 'Isolation kiểm soát mức độ nhìn thấy dữ liệu giữa các giao dịch chạy song song.' },
        { optionId: 'opt-d', reason: 'Durability đảm bảo dữ liệu sau khi Commit không bị mất khi mất điện.' }
      ],
      proTip: 'Trong SQL luôn gói các thao tác chuyển tiền trong BEGIN TRANSACTION ... COMMIT / ROLLBACK.'
    }
  },
  {
    id: 'db-q2',
    category: 'Chỉ mục B-Tree & Tối ưu',
    difficulty: 'Trung bình',
    scenario: 'Một bảng `orders` có Composite Index trên 3 cột `(customer_id, status, created_at)`. Câu truy vấn nào sau đây KHÔNG THỂ tận dụng được index này một cách hiệu quả?',
    options: [
      { id: 'opt-a', text: 'WHERE customer_id = 120 AND status = "shipped"' },
      { id: 'opt-b', text: 'WHERE status = "shipped" AND created_at >= "2026-01-01"' },
      { id: 'opt-c', text: 'WHERE customer_id = 120' },
      { id: 'opt-d', text: 'WHERE customer_id = 120 AND status = "pending" AND created_at > "2026-05-01"' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'Theo nguyên tắc Leftmost Prefix của B-Tree Composite Index, cây chỉ mục bắt buộc phải được tìm kiếm bắt đầu từ cột đầu tiên bên trái nhất (`customer_id`). Câu B bỏ qua `customer_id` nên Database buộc phải quét toàn bộ bảng (Seq Scan) hoặc quét toàn bộ index.',
      whyOthersIncorrect: [
        { optionId: 'opt-a', reason: 'Có chứa customer_id và status nên tận dụng tốt 2 nhánh đầu của Index.' },
        { optionId: 'opt-c', reason: 'Có chứa cột đầu tiên customer_id nên tận dụng được Index.' },
        { optionId: 'opt-d', reason: 'Chứa đầy đủ cả 3 cột theo đúng thứ tự nên tối ưu tuyệt đối.' }
      ],
      proTip: 'Khi tạo Composite Index, luôn đặt cột có tính chọn lọc cao nhất (High Cardinality) hoặc thường xuyên xuất hiện trong mệnh đề WHERE nhất ở vị trí đầu tiên bên trái.'
    }
  },
  {
    id: 'db-q3',
    category: 'Redis Caching',
    difficulty: 'Khó',
    scenario: 'Hệ thống thương mại điện tử bị sập Database chính lúc 00:00 đêm vì hàng triệu Key flash-sale cùng hết hạn tại đúng thời điểm đó và mọi request tràn thẳng xuống DB. Đây là hiện tượng gì và đâu là cách phòng tránh tốt nhất?',
    options: [
      { id: 'opt-a', text: 'Cache Penetration - Dùng Bloom Filter để lọc ID' },
      { id: 'opt-b', text: 'Cache Avalanche - Thêm độ lệch thời gian ngẫu nhiên (Jitter) vào TTL' },
      { id: 'opt-c', text: 'Cache Stampede - Tắt hoàn toàn tính năng TTL của Redis' },
      { id: 'opt-d', text: 'Deadlock - Nâng cấp RAM cho Redis' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'Hiện tượng hàng loạt cache key hết hạn cùng lúc gọi là Cache Avalanche (Tuyết lở). Giải pháp chuẩn công nghiệp là cộng thêm thời gian ngẫu nhiên (Jitter) vài chục giây đến vài phút vào mỗi Key khi ghi để phân tán thời điểm hết hạn.',
      proTip: 'Công thức an toàn: `TTL_thực_tế = Base_TTL + Math.floor(Math.random() * Jitter_Range)`.'
    }
  },
  {
    id: 'db-q4',
    category: 'Vector Database & AI',
    difficulty: 'Khó',
    scenario: 'Khi xây dựng hệ thống hỏi đáp AI RAG, tại sao tìm kiếm ngữ nghĩa Dense Vector (như Cosine Similarity trên OpenAI embeddings) đôi khi không tìm thấy tài liệu chứa mã lỗi chính xác `ERR_PG_DEADLOCK_55P03`?',
    options: [
      { id: 'opt-a', text: 'Do mô hình embedding hiểu mã lỗi thành vector ngữ nghĩa chung chung thay vì khớp chuỗi ký tự độc nhất; cần dùng Hybrid Search kết hợp BM25' },
      { id: 'opt-b', text: 'Do Vector DB không hỗ trợ lưu trữ chữ cái' },
      { id: 'opt-c', text: 'Do chỉ số Cosine Similarity chỉ chạy trên số nguyên' },
      { id: 'opt-d', text: 'Do thuật toán HNSW bị lỗi khi gặp dấu gạch dưới' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Vector Embedding biểu diễn ý nghĩa ngữ nghĩa rộng. Với các chuỗi ký tự đặc biệt, mã SKU, mã lỗi, tên biến chuyên biệt, vector search thường mờ nhạt. Hybrid Search (kết hợp Dense Vector với BM25 Full-Text Search) là tiêu chuẩn vàng giải quyết triệt để vấn đề này.',
      proTip: 'Qdrant, Pinecone, và PostgreSQL pgvector đều hỗ trợ các giải pháp Hybrid Search hiện đại.'
    }
  },
  {
    id: 'db-q5',
    category: 'Universal DB Gateway & Free Tiers',
    difficulty: 'Chuyên gia',
    scenario: 'Lợi ích cốt lõi của việc triển khai một lớp Universal Free-DB Gateway / MCP Server đứng trước các cụm cơ sở dữ liệu miễn phí (Supabase, Neon, Turso, Upstash, Qdrant) là gì?',
    options: [
      { id: 'opt-a', text: 'Cách ly ứng dụng khỏi sự phụ thuộc nhà cung cấp (Vendor Lock-in), tự động định tuyến thông minh theo quota/loại dữ liệu, và hỗ trợ chuẩn MCP cho AI mà Web/Mobile chỉ cần 1 SDK duy nhất' },
      { id: 'opt-b', text: 'Tự động biến dữ liệu SQL thành hình ảnh' },
      { id: 'opt-c', text: 'Ép các nhà cung cấp cloud phải tăng dung lượng RAM miễn phí lên gấp 10 lần' },
      { id: 'opt-d', text: 'Thay thế hoàn toàn mạng Internet bằng giao thức Bluetooth' }
    ],
    correctOptionId: 'opt-a',
    explanation: {
      whyCorrect: 'Universal Gateway đóng vai trò Adapter Pattern và Router phân tán, gom các Free Tier lại thành một khối tài nguyên khổng lồ, tự động failover và cung cấp cổng kết nối đơn giản, an toàn cho cả ứng dụng Web, Mobile và Agent AI qua MCP.',
      proTip: 'Triển khai Gateway trên Cloudflare Workers hoặc Vercel Edge để đạt độ trễ thấp nhất và chi phí vận hành 0 đồng.'
    }
  }
];
