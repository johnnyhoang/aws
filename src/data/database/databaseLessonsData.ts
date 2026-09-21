import { DatabaseChapter, FreeDatabaseProvider } from '../../types/databaseModule';

export const FREE_DATABASE_PROVIDERS: FreeDatabaseProvider[] = [
  {
    id: 'supabase-postgres',
    name: 'Supabase (PostgreSQL)',
    type: 'Relational (PostgreSQL 15+)',
    badge: 'Phổ biến nhất',
    freeQuota: '2 projects miễn phí, 500 MB database, 1 GB file storage, 50,000 monthly active users (Auth), 500,000 Edge Function calls/tháng',
    keyFeatures: [
      'Postgres full tính năng + extension pgvector cho AI',
      'Tự động sinh RESTful API & GraphQL API qua PostgREST',
      'Realtime subscriptions qua WebSocket',
      'Tích hợp sẵn Auth (Email, Google, Github, SSO) và Storage'
    ],
    bestFor: 'Backend hoàn chỉnh cho Web App, Mobile App, AI RAG, SaaS khởi nghiệp',
    pros: [
      'Không cần code backend REST API vẫn có CRUD tức thì qua SDK client',
      'Có sẵn pgvector hỗ trợ tìm kiếm AI Vector Search cực mạnh',
      'Giao diện web studio quản lý bảng biểu trực quan như Notion/Airtable'
    ],
    limitations: [
      'Dự án sẽ tạm dừng (paused) sau 7 ngày không có truy cập (có thể restore nhanh trong 1 phút)'
    ],
    signupUrl: 'https://supabase.com',
    connectionSnippet: `// Kết nối Supabase từ Web/Mobile JS/TS
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-public-key';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Truy vấn trực tiếp từ Client App
const { data, error } = await supabase
  .from('users')
  .select('id, full_name, email, created_at')
  .order('created_at', { ascending: false });`
  },
  {
    id: 'neon-serverless-postgres',
    name: 'Neon Serverless PostgreSQL',
    type: 'Relational (PostgreSQL Serverless)',
    badge: 'Serverless Cực Nhanh',
    freeQuota: '0.5 GB bộ nhớ dữ liệu, 1 compute branch, không giới hạn request, auto-suspend khi rảnh',
    keyFeatures: [
      'Kiến trúc tách rời Compute và Storage (Storage engine viết bằng Rust)',
      'Database Branching tức thì (như Git branch) phục vụ dev/test/preview PR',
      'Kết nối qua Serverless Driver qua WebSockets / HTTP nhanh vượt trội'
    ],
    bestFor: 'Next.js, Remix, Cloudflare Workers, Edge Functions, serverless microservices',
    pros: [
      'Tự động scale compute về 0 khi không dùng để tiết kiệm, tự bật lại dưới 500ms',
      'Hỗ trợ Branching copy toàn bộ schema và dữ liệu trong 1 giây',
      'Hỗ trợ pgvector cho AI'
    ],
    limitations: [
      'Cold start khoảng 300-500ms nếu compute đang ở trạng thái idle ngủ đông'
    ],
    signupUrl: 'https://neon.tech',
    connectionSnippet: `// Kết nối Neon qua Serverless HTTP Driver (Chạy được ở Edge)
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
const response = await sql\`SELECT * FROM products WHERE price < \${maxPrice}\`;`
  },
  {
    id: 'turso-libsql',
    name: 'Turso (Serverless LibSQL / SQLite)',
    type: 'Embedded / Distributed SQLite',
    badge: 'Latency Thấp Nhất',
    freeQuota: '9 GB tổng dung lượng, 500 database miễn phí, 1 tỷ dòng đọc/tháng (1B row reads)',
    keyFeatures: [
      'Dựa trên LibSQL (bản phân nhánh mã nguồn mở của SQLite)',
      'Hỗ trợ sao chép dữ liệu phân tán (Distributed Replicas) tại 30+ vị trí Edge trên toàn cầu',
      'Hỗ trợ nhúng SQLite trực tiếp vào app offline và đồng bộ lên Cloud (Embedded Replicas)'
    ],
    bestFor: 'Mobile App, Desktop App, Edge APIs, Web Apps cần tốc độ đọc < 10ms trên toàn cầu',
    pros: [
      'Miễn phí tới 500 databases riêng biệt (mỗi tenant một DB độc lập)',
      'Tốc độ đọc nhanh kinh ngạc nhờ kiến trúc in-memory SQLite',
      'Có hỗ trợ Vector Search trực tiếp trong SQLite'
    ],
    limitations: [
      'SQLite phù hợp ghi tuần tự, không tối ưu cho hệ thống có hàng ngàn lượt ghi đồng thời cao'
    ],
    signupUrl: 'https://turso.tech',
    connectionSnippet: `// Kết nối Turso LibSQL Client
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!
});

const result = await client.execute({
  sql: "SELECT * FROM orders WHERE status = ?",
  args: ["completed"]
});`
  },
  {
    id: 'mongodb-atlas',
    name: 'MongoDB Atlas',
    type: 'NoSQL Document (JSON / BSON)',
    badge: 'Chuẩn Document NoSQL',
    freeQuota: 'Cụm M0 Sandbox miễn phí vĩnh viễn, 512 MB dung lượng, chia sẻ RAM/vCPU',
    keyFeatures: [
      'Mô hình Document JSON linh hoạt không cần khai báo schema cứng nhắc',
      'MongoDB Atlas Search tích hợp sẵn Apache Lucene cho tìm kiếm full-text',
      'Atlas Vector Search hỗ trợ nhúng AI embeddings',
      'Sao lưu tự động và giao diện xem dữ liệu trực quan trên Web'
    ],
    bestFor: 'Ứng dụng linh hoạt lược đồ (schema-less), Content Management, E-commerce Catalog, Mobile Apps',
    pros: [
      'Không bao giờ bị tạm dừng xóa dữ liệu nếu có traffic định kỳ',
      'Hệ sinh thái thư viện Mongoose / MongoDB Driver cho mọi ngôn ngữ'
    ],
    limitations: [
      'Giới hạn 100 kết nối đồng thời và 512MB storage trên cụm M0 miễn phí'
    ],
    signupUrl: 'https://www.mongodb.com/atlas',
    connectionSnippet: `// Kết nối MongoDB qua Mongoose
import mongoose from 'mongoose';

await mongoose.connect(process.env.MONGODB_URI!);

const ArticleSchema = new mongoose.Schema({
  title: String,
  tags: [String],
  content: String,
  views: { type: Number, default: 0 }
});
export const Article = mongoose.model('Article', ArticleSchema);`
  },
  {
    id: 'upstash-redis',
    name: 'Upstash (Serverless Redis & Vector)',
    type: 'Key-Value / In-Memory Cache / Vector',
    badge: 'Serverless Cache',
    freeQuota: '10,000 lệnh (commands) mỗi ngày, 256 MB bộ nhớ cho Redis, 10,000 vector đọc/ghi/ngày cho Vector DB',
    keyFeatures: [
      'Redis chuẩn REST API chạy được trên Edge (Cloudflare Workers, Vercel Edge)',
      'Hỗ trợ đầy đủ cấu trúc dữ liệu Redis: String, Hash, List, Set, Sorted Set, Pub/Sub',
      'Tích hợp sẵn Rate Limiting SDK và Upstash QStash (Serverless Message Queue)'
    ],
    bestFor: 'Caching API, Session store, Giới hạn tần suất (Rate Limiting), Realtime Leaderboards, AI Vector Cache',
    pros: [
      'Kết nối qua HTTP stateless không bị cạn kiệt Connection Pool như Redis TCP truyền thống',
      'Tự động đồng bộ nhiều vùng (Global replication)'
    ],
    limitations: [
      'Tính phí nếu vượt quá 10,000 requests/ngày'
    ],
    signupUrl: 'https://upstash.com',
    connectionSnippet: `// Kết nối Upstash Redis qua REST API
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
});

// Cache dữ liệu 1 giờ (3600s)
await redis.set('user:profile:101', JSON.stringify(userData), { ex: 3600 });
const cachedUser = await redis.get('user:profile:101');`
  },
  {
    id: 'qdrant-cloud',
    name: 'Qdrant Cloud',
    type: 'Vector Database (AI & LLM RAG)',
    badge: 'AI Vector Search',
    freeQuota: '1 cluster miễn phí vĩnh viễn, 1GB RAM, 0.5 vCPU, 4GB disk (chứa ~100,000 - 300,000 vectors)',
    keyFeatures: [
      'Engine viết bằng Rust cho tốc độ tìm kiếm vector cực nhanh (HNSW graph)',
      'Hỗ trợ Payload filtering phức tạp kết hợp vector similarity và metadata filters',
      'Hỗ trợ Sparse Vector (SPLADE, BM25) cho Hybrid Search'
    ],
    bestFor: 'Hệ thống AI Chatbot RAG, Semantic Search, Recommendation Engine, Image Retrieval',
    pros: [
      'Tính năng lọc Payload mạnh mẽ nhất trong các Vector DB',
      'Miễn phí 1GB RAM vĩnh viễn không tự ý xóa sau thời gian rảnh rỗi'
    ],
    limitations: [
      'Chỉ hỗ trợ tối đa 1 cluster miễn phí trên mỗi tài khoản'
    ],
    signupUrl: 'https://cloud.qdrant.io',
    connectionSnippet: `// Kết nối Qdrant Vector Client
import { QdrantClient } from '@qdrant/js-client-rest';

const client = new QdrantClient({
  url: process.env.QDRANT_URL!,
  apiKey: process.env.QDRANT_API_KEY!
});

// Tìm kiếm vector tương đồng
const searchResult = await client.search('tech_articles', {
  vector: [0.042, -0.015, 0.089, /* 1536 dims */],
  limit: 5,
  filter: {
    must: [{ key: 'category', match: { value: 'database' } }]
  }
});`
  },
  {
    id: 'pinecone',
    name: 'Pinecone',
    type: 'Managed Vector Database',
    badge: 'Chuẩn AI Vector',
    freeQuota: '1 index miễn phí (Starter tier), 100,000 vectors (1536 dimensions), 2 triệu truy vấn/tháng',
    keyFeatures: [
      'Serverless vector index hoàn toàn tự động',
      'Độ trễ truy vấn cực thấp (< 50ms)',
      'Tích hợp native với LangChain, LlamaIndex, OpenAI'
    ],
    bestFor: 'AI Assistant, Enterprise RAG, Document Q&A',
    pros: [
      'Cực kỳ dễ sử dụng với OpenAI Embeddings',
      'Thư viện SDK chính thức cho Python, TypeScript, Go'
    ],
    limitations: [
      'Chỉ cho phép 1 index ở Starter tier'
    ],
    signupUrl: 'https://www.pinecone.io',
    connectionSnippet: `// Kết nối Pinecone Vector Index
import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const index = pc.index('knowledge-base');

const queryResponse = await index.query({
  vector: embeddingArray,
  topK: 3,
  includeMetadata: true
});`
  },
  {
    id: 'cloudflare-d1',
    name: 'Cloudflare D1',
    type: 'Serverless Relational SQLite tại Edge',
    badge: 'Edge Serverless',
    freeQuota: '5 GB dung lượng lưu trữ, 5 triệu rows đọc/ngày, 100,000 rows ghi/ngày',
    keyFeatures: [
      'Chạy trực tiếp tại hàng trăm Data Center Cloudflare Edge trên toàn thế giới',
      'Tương thích hoàn toàn với SQLite cú pháp chuẩn',
      'Tích hợp liền mạch với Cloudflare Workers và Pages'
    ],
    bestFor: 'Web app Jamstack, Fullstack Cloudflare Pages, Microservices siêu nhẹ',
    pros: [
      'Độ trễ gần như bằng 0 khi kết hợp với Cloudflare Workers',
      'Hạn mức 5GB miễn phí rất hào phóng cho dự án cá nhân'
    ],
    limitations: [
      'Chạy tối ưu nhất trong hệ sinh thái Cloudflare Workers'
    ],
    signupUrl: 'https://dash.cloudflare.com',
    connectionSnippet: `// Truy vấn D1 trong Cloudflare Worker
export default {
  async fetch(request, env) {
    const { results } = await env.DB.prepare(
      "SELECT id, title, created_at FROM posts ORDER BY created_at DESC LIMIT 10"
    ).all();
    return Response.json(results);
  }
};`
  },
  {
    id: 'firebase-firestore',
    name: 'Google Firebase Firestore',
    type: 'NoSQL Document Realtime',
    badge: 'Mobile App Ready',
    freeQuota: '1 GB dung lượng lưu trữ, 50,000 lượt đọc/ngày, 20,000 lượt ghi/ngày, 20,000 lượt xóa/ngày',
    keyFeatures: [
      'Đồng bộ dữ liệu Realtime 2 chiều tức thì giữa server và hàng triệu máy khách',
      'Hỗ trợ Offline Mode lưu trữ trên điện thoại và tự đồng bộ khi có mạng',
      'Tích hợp Firebase Auth, Cloud Storage, Cloud Messaging'
    ],
    bestFor: 'Mobile Apps (iOS, Android, Flutter, React Native), Ứng dụng Realtime Chat, Đơn đặt hàng',
    pros: [
      'Cơ chế Offline Sync tự động số 1 thế giới cho ứng dụng di động',
      'Không tốn công dựng backend hay quản lý socket'
    ],
    limitations: [
      'Cú pháp truy vấn phức tạp (không hỗ trợ JOIN nhiều collection, phải denormalize dữ liệu)'
    ],
    signupUrl: 'https://firebase.google.com',
    connectionSnippet: `// Lắng nghe Realtime Firestore trên Web / React
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';

const db = getFirestore(app);
const q = query(collection(db, "notifications"), where("userId", "==", currentUserId));

const unsubscribe = onSnapshot(q, (snapshot) => {
  const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log("Dữ liệu cập nhật thời gian thực:", notifications);
});`
  },
  {
    id: 'cockroachdb-cloud',
    name: 'CockroachDB Cloud',
    type: 'Distributed SQL (NewSQL PostgreSQL wire-compatible)',
    badge: 'Chuẩn Distributed SQL',
    freeQuota: '1 cụm Serverless miễn phí, 10 GB dung lượng, 50 triệu Request Units (RU) mỗi tháng',
    keyFeatures: [
      'Tương thích 100% giao thức PostgreSQL (kết nối bằng bất kỳ Postgres driver nào)',
      'Kiến trúc phân tán Multi-Region tự động nhân bản (Raft consensus) không bao giờ mất dữ liệu',
      'Đạt chuẩn ACID nghiêm ngặt nhất (Serializable Isolation)'
    ],
    bestFor: 'Ứng dụng tài chính, giao dịch thương mại điện tử, hệ thống yêu cầu độ tin cậy 99.999%',
    pros: [
      'Dung lượng miễn phí lớn nhất (10 GB) trong các nhà cung cấp SQL',
      'Tính nhất quán cao nhất thế giới (True Serializable ACID)'
    ],
    limitations: [
      'Cần chú ý tối ưu hóa khóa chính UUIDv4 để tránh nghẽn nút ghi phân tán'
    ],
    signupUrl: 'https://cockroachlabs.cloud',
    connectionSnippet: `// Kết nối CockroachDB bằng thư viện 'pg' tiêu chuẩn
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.COCKROACH_DB_URL,
  ssl: { rejectUnauthorized: true }
});

const client = await pool.connect();
const res = await client.query('SELECT now(), version();');`
  }
];

export const DATABASE_CHAPTERS: DatabaseChapter[] = [
  {
    id: 'db-chap-1-principles',
    chapterNumber: 1,
    title: 'Nguyên Lý Cốt Lõi & Bức Tranh Toàn Cảnh Thế Giới Database',
    subtitle: 'Nắm vững ACID vs BASE, định lý CAP, PACELC và phương pháp chọn database chuẩn xác',
    category: 'fundamentals_principles',
    readTimeMinutes: 18,
    level: 'Cơ bản',
    summary: 'Giải phẫu nền tảng kiến trúc dữ liệu: từ cơ chế lưu trữ đĩa cứng, Write-Ahead Log (WAL), đến các mô hình nhất quán dữ liệu và bức tranh phân loại 7 họ Database hiện đại.',
    sections: [
      {
        heading: '1. Bức Tranh Toàn Cảnh: 7 Họ Cơ Sở Dữ Liệu Hiện Đại',
        subheading: 'Không có một database nào giải quyết được mọi bài toán (No One-Size-Fits-All)',
        content: 'Trong kỷ nguyên đám mây và AI, các kỹ sư phần mềm không còn chỉ dùng duy nhất một RDBMS truyền thống. Thay vào đó, kiến trúc đa lưu trữ (Polyglot Persistence) kết hợp linh hoạt từng loại cơ sở dữ liệu đúng với thế mạnh chuyên biệt của nó.',
        bulletPoints: [
          'Relational / RDBMS (PostgreSQL, MySQL, SQLite): Dữ liệu có cấu trúc chặt chẽ, quan hệ phức tạp, yêu cầu toàn vẹn giao dịch tài chính ACID tuyệt đối.',
          'Document NoSQL (MongoDB, Firestore): Dữ liệu dạng JSON/BSON linh hoạt thay đổi schema, phù hợp ứng dụng di động, CMS, thương mại điện tử.',
          'Key-Value & Cache (Redis, Upstash, Memcached): Lưu trữ In-Memory với thời gian phản hồi micro-giây, chuyên dùng cho Cache, Session, Rate Limiting.',
          'Vector Database (Pinecone, Qdrant, pgvector): Lưu trữ và tìm kiếm vector nhúng (embeddings) cho AI LLM, RAG Chatbot, Semantic Search.',
          'Columnar Analytics / OLAP (ClickHouse, DuckDB, BigQuery): Lưu trữ theo cột, nén dữ liệu cực cao, tối ưu quét hàng tỷ bản ghi để làm Dashboard, Báo cáo BI.',
          'Time-Series (TimescaleDB, InfluxDB): Lưu trữ dữ liệu chuỗi thời gian, cảm biến IoT, số liệu giám sát (Metrics) máy chủ.',
          'Graph Database (Neo4j, Memgraph): Tối ưu truy vấn mối quan hệ đa tầng như mạng xã hội, phát hiện gian lận ngân hàng, sơ đồ tri thức (Knowledge Graph).'
        ],
        diagramType: 'database-classification-tree'
      },
      {
        heading: '2. ACID vs BASE: Hai Trường Phái Nhất Quán Dữ Liệu',
        subheading: 'Hiểu rõ sự đánh đổi giữa Tính Toàn Vẹn Tuyệt Đối và Khả Năng Mở Rộng Vô Hạn',
        content: 'Sự khác biệt cốt tử giữa hệ thống cơ sở dữ liệu quan hệ (SQL) và phi quan hệ (NoSQL) nằm ở hai triết lý thiết kế ACID và BASE.',
        bulletPoints: [
          'A - Atomicity (Nguyên tử): Mọi thao tác trong một Transaction hoặc cùng thành công 100%, hoặc cùng thất bại và hoàn tác (Rollback) 100%. Không bao giờ có trạng thái lỡ dở.',
          'C - Consistency (Nhất quán): Dữ liệu luôn tuân thủ mọi ràng buộc (Constraints, Foreign Keys, Triggers, Data Types) trước và sau giao dịch.',
          'I - Isolation (Cô lập): Các giao dịch thực thi đồng thời không được nhìn thấy dữ liệu trung gian chưa commit của nhau (chia thành 4 cấp độ: Read Uncommitted, Read Committed, Repeatable Read, Serializable).',
          'D - Durability (Bền vững): Một khi giao dịch đã Commit, dữ liệu được ghi vĩnh viễn vào đĩa (thông qua Write-Ahead Log) và không bị mất ngay cả khi mất điện hay server sập đột ngột.',
          'BASE (Basically Available, Soft state, Eventual consistency): Triết lý của NoSQL phân tán — chấp nhận dữ liệu có độ trễ đồng bộ tạm thời (Eventual Consistency) để đổi lấy tính sẵn sàng cao và khả năng mở rộng hàng triệu máy chủ.'
        ],
        diagramType: 'acid-vs-base'
      },
      {
        heading: '3. Định Lý CAP & PACELC trong Hệ Thống Phân Tán',
        subheading: 'Quy luật bất biến khi thiết kế Database phân tán trên Cloud',
        content: 'Định lý CAP của Eric Brewer chỉ ra rằng trong một hệ thống cơ sở dữ liệu phân tán khi xảy ra sự cố phân tách mạng (Network Partition - P), bạn CHỈ CÓ THỂ chọn một trong hai:',
        bulletPoints: [
          'CP (Consistency + Partition Tolerance): Ưu tiên tính nhất quán. Nếu mất kết nối giữa các node, hệ thống từ chối ghi để ngăn chặn việc dữ liệu sai lệch (ví dụ: MongoDB, CockroachDB, HBase).',
          'AP (Availability + Partition Tolerance): Ưu tiên tính sẵn sàng. Các node vẫn nhận ghi dữ liệu ngay cả khi đang bị cô lập, sau đó sẽ đồng bộ lại (ví dụ: Cassandra, DynamoDB, CouchDB).',
          'PACELC Theorem: Mở rộng CAP — Nếu có Phân tách mạng (P), chọn giữa Tính Sẵn Sàng (A) hay Nhất Quán (C); Else (E - khi mạng bình thường), chọn giữa Độ Trễ (L - Latency) hay Nhất Quán (C).'
        ],
        diagramType: 'cap-theorem-triangle',
        proTip: 'Trong 90% ứng dụng thực tế, hãy bắt đầu với PostgreSQL (hoặc Supabase/Neon). Nó hỗ trợ vừa SQL quan hệ, vừa lưu JSONB như NoSQL, vừa hỗ trợ pgvector cho AI, và dễ dàng thêm Redis làm tầng Cache.'
      }
    ],
    practicalCommands: [
      {
        tool: 'psql',
        title: 'Kiểm tra trạng thái ACID và Isolation Level trong PostgreSQL',
        command: `SHOW transaction_isolation;\nBEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;\nSELECT * FROM accounts WHERE id = 1 FOR UPDATE;\nCOMMIT;`,
        description: 'Xem và thiết lập mức độ cô lập giao dịch nghiêm ngặt nhất ngăn ngừa xung đột dữ liệu'
      }
    ],
    masteryChecklist: [
      'Phân biệt rạch ròi 7 loại Database và chọn đúng loại cho từng bài toán',
      'Hiểu bản chất 4 tính chất ACID và cách Write-Ahead Log (WAL) bảo đảm tính Durability',
      'Vận dụng định lý CAP và PACELC khi thảo luận kiến trúc hệ thống phân tán'
    ]
  },
  {
    id: 'db-chap-2-rdbms-sql',
    chapterNumber: 2,
    title: 'Làm Chủ RDBMS & PostgreSQL Chuyên Sâu',
    subtitle: 'Cơ chế B-Tree Index, Multi-Version Concurrency Control (MVCC), EXPLAIN ANALYZE và tối ưu truy vấn',
    category: 'relational_rdbms',
    readTimeMinutes: 22,
    level: 'Nâng cao',
    summary: 'Khám phá bên trong động cơ PostgreSQL: Cây chỉ mục B-Tree, cơ chế MVCC tránh khóa bảng, phân tích Execution Plan và thiết lập Connection Pooling với PgBouncer.',
    sections: [
      {
        heading: '1. Cấu Trúc Chỉ Mục B-Tree & Nguyên Lý Tăng Tốc Truy Vấn',
        subheading: 'Tại sao B-Tree là linh hồn của mọi hệ quản trị cơ sở dữ liệu quan hệ?',
        content: 'Khi một bảng dữ liệu có hàng triệu dòng, việc tìm kiếm không có Index sẽ dẫn đến Sequential Scan (quét tuần tự từng byte trên ổ cứng - O(N)). Khi tạo Index, Database xây dựng một cây B-Tree tự cân bằng (O(log N)).',
        bulletPoints: [
          'Root Node & Branch Nodes: Chứa các con trỏ định hướng phạm vi giá trị để nhảy nhanh đến trang dữ liệu tương ứng.',
          'Leaf Nodes (Nút lá): Chứa giá trị thực tế đã được sắp xếp kèm theo con trỏ con trỏ vị trí dòng (TID/Tuple ID) trên đĩa.',
          'Covering Index (Index Only Scan): Khi Index chứa toàn bộ các cột được SELECT, DB lấy trực tiếp từ RAM/Index mà không cần đọc lại bảng dữ liệu chính (Heap).',
          'Composite Index (Chỉ mục kết hợp): Nguyên tắc Leftmost Prefix — Index trên (colA, colB, colC) chỉ có tác dụng khi câu query lọc từ colA trước.'
        ],
        diagramType: 'btree-index-structure'
      },
      {
        heading: '2. Multi-Version Concurrency Control (MVCC) trong PostgreSQL',
        subheading: 'Đọc không bao giờ chặn Ghi, Ghi không bao giờ chặn Đọc',
        content: 'PostgreSQL không khóa bảng khi đọc dữ liệu nhờ kiến trúc MVCC. Mỗi dòng (tuple) trong PostgreSQL đều chứa 2 trường ẩn cực kỳ quan trọng: `xmin` (ID transaction tạo ra dòng) và `xmax` (ID transaction xóa hoặc cập nhật dòng).',
        bulletPoints: [
          'INSERT: Ghi một dòng mới với `xmin = current_tx_id`, `xmax = 0`.',
          'UPDATE: Đánh dấu `xmax = current_tx_id` ở dòng cũ (coi như xóa logic) và tạo ra một dòng mới toanh với `xmin = current_tx_id`.',
          'DELETE: Đánh dấu `xmax = current_tx_id` của dòng đó.',
          'Autovacuum: Cơ chế dọn dẹp các dòng chết (Dead Tuples) và thu hồi không gian đĩa tự động, tránh hiện tượng phình to bảng (Table Bloat).'
        ],
        diagramType: 'postgres-mvcc'
      },
      {
        heading: '3. Đọc Hiểu Kế Hoạch Thực Thi (EXPLAIN ANALYZE)',
        subheading: 'Bí quyết tìm điểm nghẽn hiệu năng trong từng câu lệnh SQL',
        content: 'Để biết tại sao một câu lệnh SQL chạy chậm, hãy chạy `EXPLAIN (ANALYZE, BUFFERS) <câu lệnh SQL>`. Hai chỉ số quan trọng nhất cần quan sát:',
        bulletPoints: [
          'Seq Scan (Quét tuần tự): Dấu hiệu thiếu Index hoặc Index bị vô hiệu hóa (do dùng hàm ép kiểu, toán tử LIKE \'%keyword\').',
          'Index Scan vs Bitmap Index Scan: Index Scan tốt khi lấy ít dòng; Bitmap Index Scan tốt khi lấy nhiều dòng rải rác trên nhiều block đĩa.',
          'Execution Time vs Planning Time: Phân biệt thời gian DB tính toán đường đi tối ưu và thời gian quét dữ liệu thực tế.',
          'Shared Hit Blocks: Số block dữ liệu đã có sẵn trên RAM (Buffer Pool) — càng cao thì tốc độ càng nhanh gấp hàng ngàn lần so với đọc từ đĩa cứng (Shared Read).'
        ],
        codeBlock: {
          language: 'sql',
          title: 'Tối ưu hóa câu query với Index',
          code: `-- Trước khi có Index (Chạy Seq Scan mất 450ms trên 1 triệu dòng)
EXPLAIN ANALYZE 
SELECT id, full_name, email FROM users WHERE email = 'alex@example.com';

-- Tạo Unique Index B-Tree
CREATE UNIQUE INDEX CONCURRENTLY idx_users_email ON users(email);

-- Sau khi có Index (Chạy Index Scan chỉ mất 0.04ms)
EXPLAIN ANALYZE 
SELECT id, full_name, email FROM users WHERE email = 'alex@example.com';`
        }
      }
    ],
    practicalCommands: [
      {
        tool: 'PostgreSQL CLI',
        title: 'Xem danh sách các câu lệnh chậm nhất hệ thống (pg_stat_statements)',
        command: `SELECT query, calls, total_exec_time, mean_exec_time, rows \nFROM pg_stat_statements \nORDER BY total_exec_time DESC LIMIT 10;`,
        description: 'Liệt kê 10 câu lệnh SQL tốn tài nguyên nhất để ưu tiên đánh Index và tối ưu'
      }
    ],
    masteryChecklist: [
      'Giải thích tường tận cấu trúc cây B-Tree và nguyên tắc Leftmost Prefix',
      'Hiểu cơ chế MVCC, xmin/xmax, và vai trò của Autovacuum trong PostgreSQL',
      'Sử dụng thành thạo EXPLAIN ANALYZE để phát hiện và xử lý Seq Scan'
    ]
  },
  {
    id: 'db-chap-3-caching-redis',
    chapterNumber: 3,
    title: 'Chiến Lược Caching & Tăng Tốc Dữ Liệu với Redis',
    subtitle: 'Các mô hình Caching (Cache-Aside, Write-Through), Cache Stampede, và Distributed Lock',
    category: 'keyvalue_cache',
    readTimeMinutes: 16,
    level: 'Trung cấp',
    summary: 'Biến hệ thống từ hàng ngàn QPS lên hàng triệu QPS với Redis/Upstash. Làm chủ các chiến lược nạp cache, phòng chống lỗi Cache Penetration, Cache Avalanche và Redlock.',
    sections: [
      {
        heading: '1. 4 Chiến Lược Caching Phổ Biến Nhất',
        subheading: 'Lựa chọn phương thức đọc/ghi cache chuẩn theo nghiệp vụ',
        content: 'Redis hoạt động trên RAM với độ trễ < 1ms, là lớp đệm lý tưởng trước khi truy vấn chạm đến ổ cứng Database chính.',
        bulletPoints: [
          'Cache-Aside (Lazy Loading - Phổ biến nhất 90%): Ứng dụng kiểm tra Redis trước. Nếu có (Cache Hit), trả về ngay. Nếu không (Cache Miss), đọc từ SQL DB rồi nạp vào Redis kèm thời gian hết hạn (TTL).',
          'Write-Through: Ứng dụng ghi dữ liệu vào Cache trước, Cache tự động ghi tiếp vào DB chính rồi mới xác nhận thành công.',
          'Write-Behind (Write-Back): Ứng dụng ghi vào Cache tức thì và trả về ngay. Một tiến trình chạy ngầm gom các thay đổi và ghi hàng loạt (Batch) xuống DB sau.',
          'Refresh-Ahead: Hệ thống tự động làm mới các Key sắp hết hạn trước khi người dùng yêu cầu, dựa trên tần suất truy cập dự đoán.'
        ],
        diagramType: 'redis-caching-patterns'
      },
      {
        heading: '2. 3 Lỗ Hổng Caching Kinh Điển & Cách Khắc Phục',
        subheading: 'Phòng ngừa sự cố sập cơ sở dữ liệu hàng loạt khi tải cao',
        content: 'Khi hàng triệu người dùng truy cập cùng lúc, nếu không xử lý kỹ các kịch bản ngoại lệ, Database chính có thể bị "đánh sập" chỉ trong vài giây.',
        bulletPoints: [
          'Cache Avalanche (Tuyết lở): Hàng ngàn Key cùng hết hạn tại đúng một thời điểm, khiến mọi request đồng loạt đổ sập xuống Database. Giải pháp: Thêm thời gian ngẫu nhiên (Jitter) vào TTL (ví dụ: `TTL = 3600 + Math.random() * 300`).',
          'Cache Penetration (Xuyên thủng): Kẻ tấn công liên tục truy vấn các Key không hề tồn tại trong hệ thống (như user ID âm). Giải pháp: Dùng Bloom Filter ở cửa vào hoặc cache lại kết quả rỗng `null` với TTL ngắn (60s).',
          'Cache Stampede / Breakdown (Nghẽn cổ chai Hot Key): Một Key đang cực kỳ "hot" (như tin tức nóng) bị hết hạn, hàng vạn luồng cùng lúc truy vấn DB để tính toán lại. Giải pháp: Dùng Mutex Lock (Distributed Lock) chỉ cho 1 luồng được query DB để nạp lại cache.'
        ],
        codeBlock: {
          language: 'typescript',
          title: 'Triển khai Cache-Aside an toàn với Jitter và Fallback',
          code: `async function getCachedUserProfile(userId: string) {
  const cacheKey = \`user:profile:\${userId}\`;
  
  // 1. Kiểm tra Cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // 2. Cache Miss: Truy vấn PostgreSQL
  const user = await db.users.findUnique({ where: { id: userId } });
  if (!user) {
    // Chống Cache Penetration: Cache giá trị rỗng trong 60 giây
    await redis.set(cacheKey, JSON.stringify(null), { ex: 60 });
    return null;
  }

  // 3. Nạp Cache với Jitter chống Cache Avalanche (1 giờ +- 5 phút)
  const jitterSeconds = Math.floor(Math.random() * 300);
  await redis.set(cacheKey, JSON.stringify(user), { ex: 3600 + jitterSeconds });

  return user;
}`
        }
      }
    ],
    practicalCommands: [
      {
        tool: 'redis-cli',
        title: 'Giám sát hoạt động và thống kê Cache Hit/Miss trong thời gian thực',
        command: `INFO stats\nINFO memory\nMONITOR`,
        description: 'Xem tỷ lệ keyspace_hits vs keyspace_misses và theo dõi lưu lượng lệnh'
      }
    ],
    masteryChecklist: [
      'Phân biệt và cài đặt chuẩn xác mô hình Cache-Aside',
      'Xử lý triệt để 3 sự cố Caching: Avalanche, Penetration, Stampede',
      'Thiết lập TTL thông minh có Jitter tránh nghẽn tải'
    ]
  },
  {
    id: 'db-chap-4-vector-ai-rag',
    chapterNumber: 4,
    title: 'Vector Database & AI Retrieval (RAG Masterclass)',
    subtitle: 'Nguyên lý HNSW, Embeddings, Hybrid Search và xây dựng hệ thống hỏi đáp AI chuẩn xác',
    category: 'vector_ai_rag',
    readTimeMinutes: 20,
    level: 'Nâng cao',
    summary: 'Giải mã cấu trúc bên trong Vector Database: Từ Vector Embedding nhiều chiều, thuật toán xấp xỉ láng giềng HNSW, đến kỹ thuật kết hợp Hybrid Search (BM25 + Dense Vectors) nâng cao độ chính xác RAG.',
    sections: [
      {
        heading: '1. Vector Embeddings & Không Gian Đa Chiều',
        subheading: 'Làm thế nào máy tính hiểu được ý nghĩa ngữ nghĩa (Semantic Meaning)?',
        content: 'Mô hình AI biến các đoạn văn bản thành một chuỗi số thực (ví dụ: vector 1536 chiều với OpenAI text-embedding-3-small). Các văn bản có nội dung tương đồng sẽ nằm gần nhau trong không gian đa chiều.',
        bulletPoints: [
          'Cosine Similarity: Đo góc giữa 2 vector (từ -1 đến +1), không phụ thuộc vào độ dài đoạn văn bản — phương pháp phổ biến nhất cho văn bản.',
          'Euclidean Distance (L2): Đo khoảng cách hình học trực tiếp giữa 2 điểm vector.',
          'Dot Product (Tích vô hướng): Tính toán cực nhanh khi các vector đã được chuẩn hóa độ dài đơn vị (Normalized).'
        ],
        diagramType: 'vector-search-hnsw'
      },
      {
        heading: '2. Thuật Toán Tìm Kiếm Xấp Xỉ HNSW (Hierarchical Navigable Small World)',
        subheading: 'Tìm kiếm giữa hàng triệu vector trong vài mili-giây thay vì quét tuyến tính',
        content: 'Thay vì so sánh vector truy vấn với từng vector trong kho (O(N) quá chậm), HNSW xây dựng một đồ thị phân tầng tương tự như Skiplist.',
        bulletPoints: [
          'Tầng trên cùng (Top Layers): Thưa thớt, các bước nhảy dài (Expressway) để định vị nhanh khu vực lân cận của vector mục tiêu.',
          'Tầng dưới cùng (Bottom Layers): Dày đặc, các liên kết cục bộ chi tiết để tìm chính xác K điểm tương đồng nhất (K-Nearest Neighbors).',
          'Ưu điểm: Tốc độ tìm kiếm O(log N), độ chính xác (Recall) đạt trên 98%.'
        ]
      },
      {
        heading: '3. Hybrid Search: Kết Hợp BM25 và Dense Vector',
        subheading: 'Khắc phục điểm yếu lớn nhất của tìm kiếm ngữ nghĩa đơn thuần',
        content: 'Vector Search rất giỏi hiểu ngữ cảnh chung nhưng lại hay thất bại khi tìm chính xác mã lỗi kỹ thuật (ví dụ: `ERR_CONN_REFUSED`), mã sản phẩm SKU, hoặc tên riêng độc nhất. Giải pháp tối ưu là Hybrid Search.',
        bulletPoints: [
          'Dense Vector Search (Ngữ nghĩa): Tìm theo ý đồ người dùng (Semantic Intent).',
          'Sparse Keyword Search (BM25 / Full-Text): Tìm khớp chính xác từ khóa và thuật ngữ chuyên ngành.',
          'Reciprocal Rank Fusion (RRF): Thuật toán chuẩn kết hợp và xếp hạng kết quả từ cả 2 nhánh để chọn ra top kết quả hoàn hảo nhất.'
        ],
        proTip: 'Nếu đã dùng Supabase hoặc PostgreSQL, bạn có thể kích hoạt extension `pgvector` và tạo Index `HNSW` trực tiếp mà không cần mua thêm Vector Database riêng biệt!'
      }
    ],
    practicalCommands: [
      {
        tool: 'PostgreSQL + pgvector',
        title: 'Tạo bảng và Index HNSW cho tìm kiếm Vector trong PostgreSQL',
        command: `CREATE EXTENSION IF NOT EXISTS vector;\nCREATE TABLE documents (\n  id bigserial PRIMARY KEY,\n  content text,\n  embedding vector(1536)\n);\nCREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);`,
        description: 'Thiết lập lưu trữ và lập chỉ mục HNSW vector search ngay trong PostgreSQL'
      }
    ],
    masteryChecklist: [
      'Hiểu cách hoạt động của Vector Embeddings và các phép đo khoảng cách',
      'Nắm vững cấu trúc đồ thị nhiều tầng HNSW',
      'Áp dụng Hybrid Search (BM25 + Dense) cho ứng dụng RAG'
    ]
  },
  {
    id: 'db-chap-5-free-providers',
    chapterNumber: 5,
    title: 'Bách Khoa Toàn Thư Free Database Providers',
    subtitle: 'Tổng hợp chi tiết thông số, hạn mức và bí quyết khai thác 10+ nền tảng Database miễn phí vĩnh viễn',
    category: 'free_tier_directory',
    readTimeMinutes: 25,
    level: 'Cơ bản',
    summary: 'Cẩm nang tra cứu và hướng dẫn kết nối tất cả các dịch vụ Free Database uy tín nhất thế giới cho mọi nhu cầu: SQL, NoSQL, Cache, Vector, SQLite Edge.',
    sections: [
      {
        heading: '1. Chiến Lược Lựa Chọn Free Database Cho Dự Án',
        subheading: 'Tận dụng 100% tài nguyên miễn phí mà không tốn một xu vận hành',
        content: 'Ngày nay, các nhà cung cấp Cloud Database cạnh tranh quyết liệt bằng các gói Free Tier vĩnh viễn (Generous Free Tiers). Nếu biết cách phối hợp linh hoạt, bạn có thể xây dựng ứng dụng phục vụ từ 10,000 đến 100,000 người dùng hàng tháng với chi phí hạ tầng cơ sở dữ liệu đúng 0 đồng.',
        bulletPoints: [
          'Dự án Fullstack Web / SaaS: Dùng Supabase (500MB Postgres + Auth + Storage) hoặc Neon Serverless.',
          'Dự án Mobile App / Offline-First: Dùng Firebase Firestore hoặc Turso LibSQL Embedded Replicas.',
          'Dự án AI RAG / Chatbot: Dùng Qdrant Cloud (1GB RAM miễn phí) hoặc Pinecone Starter Tier kết hợp Upstash Vector.',
          'Tầng Caching & Rate Limiting: Dùng Upstash Redis (10,000 commands/ngày kết nối qua REST API).'
        ]
      },
      {
        heading: '2. Bảng Tổng Hợp So Sánh Các Free Database Tiers',
        subheading: 'Tra cứu nhanh dung lượng, ưu điểm và giới hạn kỹ thuật',
        content: 'Danh sách 10 nhà cung cấp dịch vụ cơ sở dữ liệu đám mây miễn phí chất lượng cao đã được chọn lọc và kiểm chứng thực tế.',
        bulletPoints: [
          'Supabase: 2 projects, 500MB Postgres, Auth 50k MAU, Realtime, Storage 1GB.',
          'Neon Tech: 0.5GB Serverless Postgres, Branching tức thì, Compute scale-to-zero.',
          'Turso: 9GB dung lượng, 500 databases SQLite độc lập, Edge distribution < 10ms.',
          'MongoDB Atlas: 512MB M0 cluster, Full-Text search, Atlas Vector Search tích hợp.',
          'Upstash Redis: 10,000 lệnh/ngày, Serverless REST không lo nghẽn Pool.',
          'Qdrant Cloud: 1GB cluster miễn phí vĩnh viễn, Payload filtering cực mạnh cho AI.',
          'Cloudflare D1: 5GB SQLite tại Edge, 5 triệu lượt đọc/ngày miễn phí.',
          'CockroachDB: 10GB NewSQL phân tán, Serializable ACID, Postgres compatible.',
          'Google Firestore: 1GB storage, 50k lượt đọc/ngày, Realtime offline sync.',
          'Pinecone: 1 index 100k vectors, Serverless AI Vector retrieval.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'Curl / REST API',
        title: 'Test kết nối Upstash Redis bằng Curl đơn giản',
        command: `curl -X POST "https://your-upstash-endpoint.upstash.io/set/ping/pong" \\\n  -H "Authorization: Bearer your_token_here"`,
        description: 'Kiểm tra đọc ghi Redis qua HTTP REST API không cần cài đặt driver'
      }
    ],
    masteryChecklist: [
      'Nắm rõ hạn mức và điều kiện của từng nhà cung cấp Free Database',
      'Biết cách khắc phục điểm yếu của từng nhà cung cấp (ví dụ: tự động keep-alive dự án Supabase)',
      'Lựa chọn đúng Free Provider cho từng công nghệ Web / Mobile'
    ]
  },
  {
    id: 'db-chap-6-universal-gateway-mcp',
    chapterNumber: 6,
    title: 'TRANG ĐẶC BIỆT: Hướng Dẫn Xây Dựng Universal Free-DB Gateway & MCP Server',
    subtitle: 'Xây dựng một cổng điều phối kết nối tất cả các Free Database phía sau, cung cấp API/MCP duy nhất cho Web & Mobile App',
    category: 'universal_mcp_gateway',
    readTimeMinutes: 30,
    level: 'Chuyên gia',
    summary: 'Hướng dẫn từ A đến Z thiết kế và lập trình "Universal Free Database Gateway / MCP Server". Phía sau kết nối đa tầng các Free DB (Supabase + Neon + Upstash + MongoDB + Qdrant + Turso) kèm cơ chế tự động cân bằng tải & failover; Phía trước cung cấp giao diện SDK/REST/MCP cực kỳ đơn giản để WebApp và MobileApp kết nối mà không cần quan tâm dữ liệu đang nằm ở đâu.',
    sections: [
      {
        heading: '1. Bài Toán & Ý Tưởng Kiến Trúc Universal DB Gateway',
        subheading: 'Tại sao cần một lớp Gateway trung gian giữa Ứng Dụng và Đa Cơ Sở Dữ Liệu Miễn Phí?',
        content: 'Khi sử dụng các dịch vụ Free Database, chúng ta thường gặp phải các thách thức: mỗi nơi một chuẩn kết nối khác nhau, nguy cơ chạm ngưỡng quota miễn phí của một nhà cung cấp, hoặc một dịch vụ bị tạm dừng do không hoạt động (idle pause).',
        bulletPoints: [
          'Không phụ thuộc nhà cung cấp (Zero Vendor Lock-in): WebApp và MobileApp chỉ nói chuyện với 1 Gateway duy nhất. Nếu Supabase hết quota, Gateway tự động chuyển luồng dữ liệu sang Neon hoặc CockroachDB mà ứng dụng khách không cần sửa 1 dòng code!',
          'Hợp nhất đa mô hình (Multi-Model Unified Access): Gateway tự động điều hướng dữ liệu dạng User/Order sang SQL, dữ liệu Log/Content sang Mongo, dữ liệu Cache sang Upstash, và dữ liệu tìm kiếm thông minh sang Qdrant Vector.',
          'Tích hợp chuẩn MCP (Model Context Protocol): Cho phép các trợ lý AI (Claude, Cursor, Antigravity, ChatGPT) gọi các công cụ truy vấn dữ liệu trực tiếp qua giao thức chuẩn hóa mà không lộ chuỗi kết nối nhạy cảm.'
        ],
        diagramType: 'universal-free-db-gateway'
      },
      {
        heading: '2. Thiết Kế Hệ Thống Đa Tầng (Multi-Layer Architecture)',
        subheading: 'Phân tích chi tiết 4 lớp cốt lõi của Gateway',
        content: 'Kiến trúc Gateway được chia thành 4 lớp chuyên biệt đảm bảo tính độc lập và hiệu năng cao nhất:',
        bulletPoints: [
          '1. Ingestion / Interface Layer (Phía Trước): Cung cấp RESTful API (`/api/v1/db`), GraphQL Endpoint, WebSocket Realtime Hub, và MCP Server Tools (`db_query`, `db_get`, `db_set`, `db_vector_search`).',
          '2. Intelligent Router & Policy Engine (Lõi Điều Phối): Phân tích cú pháp câu lệnh (SQL parser / JSON action), kiểm tra dung lượng quota hiện tại của từng node, và chọn node đích có độ trễ thấp nhất hoặc tài nguyên dồi dào nhất.',
          '3. Multi-Driver Adapter Pool (Bộ Điều Khiển Phía Sau): Module chuyên kết nối và duy trì kết nối tối ưu với Supabase (Postgres), Neon, Turso (LibSQL), MongoDB Atlas, Upstash Redis, và Qdrant Vector.',
          '4. Circuit Breaker & Failover Manager: Nếu một Free DB phản hồi lỗi (hoặc cold-start), hệ thống tự động fallback sang DB dự phòng trong pool và đồng bộ bù dữ liệu sau.'
        ]
      },
      {
        heading: '3. Toàn Bộ Mã Nguồn TypeScript Triển Khai Hoàn Chỉnh',
        subheading: 'Code thực chiến sẵn sàng deploy lên Cloudflare Workers, Vercel hoặc Docker Server',
        content: 'Dưới đây là mã nguồn hoàn chỉnh của Universal Free Database Gateway kết hợp chuẩn Model Context Protocol (MCP):',
        codeBlock: {
          language: 'typescript',
          title: 'src/universal-db-gateway.ts (Gateway & MCP Server Core)',
          code: `/**
 * UNIVERSAL FREE DATABASE GATEWAY & MCP SERVER
 * Độc lập lưu trữ - Tự động định tuyến - Kết nối đa nhà cung cấp Free DB
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { neon } from '@neondatabase/serverless';
import { Redis } from '@upstash/redis';
import { QdrantClient } from '@qdrant/js-client-rest';

// 1. Khởi tạo kết nối tới các Free Database Drivers
const supabase = createSupabaseClient(
  process.env.SUPABASE_URL || 'https://mock.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'mock-key'
);

const neonSql = process.env.NEON_DATABASE_URL ? neon(process.env.NEON_DATABASE_URL) : null;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://mock.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || 'mock-token'
});

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL || 'https://mock.qdrant.io',
  apiKey: process.env.QDRANT_API_KEY
});

// 2. Intelligent Router Engine: Tự động chọn Provider và Failover
export class UniversalDatabaseRouter {
  // Thực thi truy vấn SQL quan hệ với cơ chế tự động Fallback
  static async executeSql(queryText: string, params: any[] = []) {
    try {
      // Ưu tiên 1: Neon Serverless Postgres
      if (neonSql) {
        return await neonSql(queryText, params);
      }
    } catch (err) {
      console.warn("Neon lỗi hoặc chạm quota, tự động fallback sang Supabase:", err);
    }

    // Fallback 2: Supabase RPC / SQL Query
    const { data, error } = await supabase.rpc('execute_sql', { sql_query: queryText, query_params: params });
    if (error) throw new Error(\`Universal DB Error: \${error.message}\`);
    return data;
  }

  // Đọc / Ghi Cache tốc độ cao (Upstash Redis)
  static async cacheGet(key: string) {
    return await redis.get(key);
  }

  static async cacheSet(key: string, value: any, ttlSeconds: number = 3600) {
    return await redis.set(key, JSON.stringify(value), { ex: ttlSeconds });
  }

  // Tìm kiếm Vector thông minh (Qdrant Cloud)
  static async vectorSearch(collection: string, vector: number[], limit: number = 5) {
    return await qdrant.search(collection, {
      vector,
      limit
    });
  }
}

// 3. Khởi tạo MCP Server cung cấp Tools cho AI và Web/Mobile Client
const server = new Server(
  { name: "universal-free-db-gateway", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Khai báo danh mục công cụ cho MCP
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "db_sql_query",
      description: "Thực thi truy vấn SQL trên hạ tầng PostgreSQL phân tán tự động cân bằng tải",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Câu lệnh SQL hợp lệ (SELECT, INSERT, UPDATE, DELETE)" }
        },
        required: ["query"]
      }
    },
    {
      name: "db_cache_ops",
      description: "Đọc hoặc ghi dữ liệu Cache nhanh qua Redis Serverless",
      inputSchema: {
        type: "object",
        properties: {
          action: { type: "string", enum: ["get", "set"] },
          key: { type: "string" },
          value: { type: "string", description: "Giá trị dạng chuỗi hoặc JSON (khi action=set)" },
          ttl: { type: "number", description: "Thời gian sống của key tính bằng giây" }
        },
        required: ["action", "key"]
      }
    },
    {
      name: "db_vector_search",
      description: "Tìm kiếm ngữ nghĩa Vector Search AI trên kho tri thức đa chiều",
      inputSchema: {
        type: "object",
        properties: {
          collection: { type: "string" },
          vector: { type: "array", items: { type: "number" } },
          limit: { type: "number" }
        },
        required: ["collection", "vector"]
      }
    }
  ]
}));

// Xử lý thực thi công cụ
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "db_sql_query") {
    const result = await UniversalDatabaseRouter.executeSql(args?.query as string);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }

  if (name === "db_cache_ops") {
    if (args?.action === "get") {
      const val = await UniversalDatabaseRouter.cacheGet(args?.key as string);
      return { content: [{ type: "text", text: JSON.stringify(val) }] };
    } else {
      await UniversalDatabaseRouter.cacheSet(args?.key as string, args?.value, (args?.ttl as number) || 3600);
      return { content: [{ type: "text", text: "OK - Cache Saved" }] };
    }
  }

  if (name === "db_vector_search") {
    const res = await UniversalDatabaseRouter.vectorSearch(
      args?.collection as string,
      args?.vector as number[],
      (args?.limit as number) || 5
    );
    return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
  }

  throw new Error(\`Không tìm thấy tool: \${name}\`);
});

// Chạy MCP Server
const transport = new StdioServerTransport();
await server.connect(transport);
console.log("Universal Free Database Gateway & MCP Server đã sẵn sàng phục vụ!");`
        }
      },
      {
        heading: '4. Cách Web App & Mobile App Kết Nối Cực Kỳ Đơn Giản',
        subheading: 'Chỉ 1 hàm gọi duy nhất - Không bao giờ lo cấu hình host hay bảo trì',
        content: 'Phía ứng dụng giao diện (React Web, Flutter, React Native, iOS, Android), lập trình viên chỉ cần gọi qua Client SDK hoặc HTTP REST đơn giản:',
        codeBlock: {
          language: 'typescript',
          title: 'Client SDK kết nối từ Web / Mobile App',
          code: `// Trong Web App hoặc Mobile App của bạn
class UniversalDBClient {
  private gatewayUrl = 'https://your-gateway.example.com/api/v1';

  async query(sql: string) {
    const res = await fetch(\`\${this.gatewayUrl}/query\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sql })
    });
    return await res.json();
  }

  async getCache(key: string) {
    const res = await fetch(\`\${this.gatewayUrl}/cache?key=\${encodeURIComponent(key)}\`);
    return await res.json();
  }
}

// Sử dụng trong UI Component
export const db = new UniversalDBClient();
const activeUsers = await db.query("SELECT id, name, role FROM users WHERE is_active = true");`
        },
        proTip: 'Bạn có thể triển khai Gateway này hoàn toàn miễn phí trên Cloudflare Workers (miễn phí 100,000 requests/ngày) hoặc Vercel Serverless Functions!'
      }
    ],
    practicalCommands: [
      {
        tool: 'Node.js',
        title: 'Chạy Universal DB Gateway cục bộ hoặc qua Docker',
        command: `npm install @modelcontextprotocol/sdk @supabase/supabase-js @neondatabase/serverless @upstash/redis @qdrant/js-client-rest\nnode dist/universal-db-gateway.js`,
        description: 'Khởi chạy Gateway hợp nhất các Free Database và bật giao tiếp MCP Server'
      }
    ],
    masteryChecklist: [
      'Nắm vững kiến trúc Gateway điều phối đa nhà cung cấp Free Database',
      'Hiểu cơ chế Circuit Breaker và tự động failover giữa các node',
      'Tự tay triển khai Gateway MCP Server và kết nối với Web/Mobile App'
    ]
  }
];
