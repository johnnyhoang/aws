import { DatabaseFlashcard } from '../../types/databaseModule';

export const DATABASE_FLASHCARDS: DatabaseFlashcard[] = [
  {
    id: 'db-fc-1',
    term: 'ACID',
    category: 'Nguyên Lý Cơ Bản',
    definition: 'Bộ 4 đặc tính nền tảng của giao dịch cơ sở dữ liệu quan hệ: Atomicity (Nguyên tử), Consistency (Nhất quán), Isolation (Cô lập), Durability (Bền vững).',
    practicalUsage: 'Đảm bảo các nghiệp vụ thanh toán, chuyển khoản, đặt hàng không bao giờ bị mất tiền hoặc sai lệch dữ liệu.',
    proTip: 'Trong phỏng vấn luôn nêu ví dụ giao dịch chuyển khoản giữa 2 tài khoản A và B để giải thích Atomicity và Isolation.'
  },
  {
    id: 'db-fc-2',
    term: 'Write-Ahead Log (WAL)',
    category: 'Động Cơ Lưu Trữ',
    definition: 'Cơ chế ghi nhật ký thay đổi tuần tự vào đĩa cứng TRƯỚC KHI dữ liệu thực sự được ghi vào các bảng chính.',
    practicalUsage: 'Giúp cơ sở dữ liệu khôi phục lại 100% dữ liệu đã commit khi server bị sập nguồn đột ngột mà không cần ghi đĩa ngẫu nhiên quá tốn kém.',
    proTip: 'WAL là nền tảng của tính chất Durability trong ACID và công nghệ Replication nhân bản dữ liệu.'
  },
  {
    id: 'db-fc-3',
    term: 'B-Tree Index',
    category: 'Chỉ Mục & Tối Ưu',
    definition: 'Cấu trúc cây tự cân bằng lưu trữ dữ liệu có thứ tự, cho phép tìm kiếm, chèn, xóa trong thời gian O(log N).',
    practicalUsage: 'Chỉ mục mặc định của PostgreSQL, MySQL, SQLite, Oracle cho các phép so sánh =, <, <=, >, >=, BETWEEN.',
    proTip: 'Đừng tạo quá nhiều Index trên các bảng ghi nhiều (Heavy Write) vì mỗi lần INSERT/UPDATE đều phải cập nhật lại toàn bộ cây B-Tree.'
  },
  {
    id: 'db-fc-4',
    term: 'MVCC (Multi-Version Concurrency Control)',
    category: 'PostgreSQL & Động Cơ',
    definition: 'Cơ chế quản lý đồng thời bằng đa phiên bản dữ liệu, trong đó mỗi bản ghi có các mốc thời gian/ID giao dịch (xmin, xmax).',
    practicalUsage: 'Cho phép các câu lệnh đọc (SELECT) chạy cực nhanh mà không bao giờ phải đợi câu lệnh ghi (UPDATE/DELETE) nhả khóa bảng.',
    proTip: 'Cần cấu hình Autovacuum chạy định kỳ để dọn dẹp các tuple chết (Dead Tuples) do MVCC tạo ra.'
  },
  {
    id: 'db-fc-5',
    term: 'Cache Stampede / Breakdown',
    category: 'Redis Caching',
    definition: 'Hiện tượng một Cache Key cực nóng (Hot Key) bị hết hạn, khiến hàng ngàn yêu cầu đồng thời cùng query xuống DB chính để tính toán lại.',
    practicalUsage: 'Xảy ra trên các trang sản phẩm hot, tin tức nóng, hoặc bảng xếp hạng thời gian thực.',
    proTip: 'Khắc phục bằng Distributed Mutex Lock (chỉ 1 tiến trình được query DB) hoặc tính năng Probabilistic Early Expiration (XFetch).'
  },
  {
    id: 'db-fc-6',
    term: 'HNSW (Hierarchical Navigable Small World)',
    category: 'Vector Database & AI',
    definition: 'Cấu trúc đồ thị phân tầng xấp xỉ láng giềng gần nhất (Approximate Nearest Neighbors), là tiêu chuẩn vàng của các Vector Database hiện đại.',
    practicalUsage: 'Tìm kiếm hàng triệu vector nhúng AI (Embeddings) trong vài mili-giây với độ chính xác trên 98%.',
    proTip: 'Trong PostgreSQL, bạn có thể tạo index `USING hnsw (embedding vector_cosine_ops)` với pgvector.'
  },
  {
    id: 'db-fc-7',
    term: 'Universal DB Gateway & MCP Server',
    category: 'Kiến Trúc & Tích Hợp',
    definition: 'Lớp phần mềm trung gian gom nhiều nhà cung cấp Free Database phía sau, tự động điều phối, failover và cung cấp cổng API / Model Context Protocol cho Web, Mobile và AI.',
    practicalUsage: 'Giúp ứng dụng đạt độ sẵn sàng cao, không bị Vendor Lock-in, tiết kiệm 100% chi phí hạ tầng và cho phép AI tương tác trực tiếp với dữ liệu.',
    proTip: 'Triển khai Gateway trên Cloudflare Workers hoặc Vercel Edge để tận dụng mạng lưới phân tán toàn cầu miễn phí.'
  }
];
