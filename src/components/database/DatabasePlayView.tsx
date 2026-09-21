import React, { useState } from 'react';
import { 
  Server, 
  Layers, 
  Terminal, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Zap, 
  RotateCcw,
  Sparkles,
  Share2,
  Cpu,
  Copy,
  Check
} from 'lucide-react';
import { VisualDiagram } from '../diagrams/VisualDiagram';

export const DatabasePlayView: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'gateway_sandbox' | 'db_selector' | 'query_analyzer'>('gateway_sandbox');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // 1. Gateway Live Sandbox Simulator State
  const [selectedOperation, setSelectedOperation] = useState<'sql_query' | 'cache_get_set' | 'vector_search'>('sql_query');
  const [simulateFailover, setSimulateFailover] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [gatewayLog, setGatewayLog] = useState<{
    status: 'success' | 'failover' | 'error';
    providerUsed: string;
    latencyMs: number;
    responsePayload: any;
    trace: string[];
  } | null>(null);

  // 2. DB Selector State
  const [dataType, setDataType] = useState<'structured_relational' | 'flexible_json' | 'in_memory_cache' | 'vector_embeddings' | 'edge_sqlite'>('structured_relational');
  const [workload, setWorkload] = useState<'read_heavy' | 'write_heavy' | 'realtime_sync' | 'ai_rag'>('read_heavy');

  // 3. Query Analyzer State
  const [queryScenario, setQueryScenario] = useState<'missing_index' | 'composite_index' | 'full_text_search'>('missing_index');

  // Handle Gateway Execution Simulation
  const handleExecuteGateway = () => {
    setIsExecuting(true);
    setGatewayLog(null);

    setTimeout(() => {
      setIsExecuting(false);

      if (selectedOperation === 'sql_query') {
        if (simulateFailover) {
          setGatewayLog({
            status: 'failover',
            providerUsed: 'Supabase Postgres (Backup Node)',
            latencyMs: 142,
            responsePayload: [
              { id: 101, name: 'Alice Walker', role: 'admin', created_at: '2026-09-18' },
              { id: 102, name: 'Bob Dylan', role: 'engineer', created_at: '2026-09-19' }
            ],
            trace: [
              '1. Client App gọi API: POST /api/v1/db/query ("SELECT * FROM users")',
              '2. Gateway kiểm tra node chính: Neon Postgres ➔ Phản hồi 503 (Compute Cold Start / Quota Limit)',
              '3. Circuit Breaker kích hoạt: Tự động chuyển luồng sang Supabase Backup Node',
              '4. Supabase thực thi thành công trả về 2 bản ghi (ACID Verified)',
              '5. Gateway cache kết quả tạm vào Upstash Redis (TTL 60s)'
            ]
          });
        } else {
          setGatewayLog({
            status: 'success',
            providerUsed: 'Neon Serverless Postgres (Primary Node)',
            latencyMs: 38,
            responsePayload: [
              { id: 101, name: 'Alice Walker', role: 'admin', created_at: '2026-09-18' },
              { id: 102, name: 'Bob Dylan', role: 'engineer', created_at: '2026-09-19' }
            ],
            trace: [
              '1. Client App gọi API: POST /api/v1/db/query ("SELECT * FROM users")',
              '2. Gateway Router định tuyến trực tiếp tới Neon Serverless Driver qua WebSocket',
              '3. Truy vấn thực thi trên Index Scan B-Tree: 38ms',
              '4. Trả về kết quả JSON chuẩn hóa cho Web / Mobile Client'
            ]
          });
        }
      } else if (selectedOperation === 'cache_get_set') {
        setGatewayLog({
          status: 'success',
          providerUsed: 'Upstash Serverless Redis REST',
          latencyMs: 9,
          responsePayload: { key: 'session:user:101', status: 'active', ttl_remaining: 3540 },
          trace: [
            '1. Client App gọi API: GET /api/v1/cache?key=session:user:101',
            '2. Gateway kết nối Upstash Redis qua HTTP REST API (Stateless - Không lo cạn Connection Pool)',
            '3. In-Memory RAM Cache Hit: 9ms',
            '4. Trả về dữ liệu phiên đăng nhập tức thì'
          ]
        });
      } else {
        setGatewayLog({
          status: 'success',
          providerUsed: 'Qdrant Cloud Free Cluster (1GB RAM)',
          latencyMs: 44,
          responsePayload: {
            collection: 'tech_knowledge',
            top_matches: [
              { score: 0.942, title: 'Hướng dẫn tối ưu B-Tree Index', doc_id: 'doc-89' },
              { score: 0.887, title: 'Cơ chế MVCC trong PostgreSQL', doc_id: 'doc-42' }
            ]
          },
          trace: [
            '1. AI Agent gọi MCP Tool: db_vector_search(vector: [0.042, ...], limit: 2)',
            '2. Gateway định tuyến tới Qdrant Cloud HNSW Vector Graph Engine',
            '3. Tính toán Cosine Similarity trên không gian 1536 chiều + Payload Filter',
            '4. Trả về Top 2 tài liệu tương đồng ngữ nghĩa nhất cho LLM Context'
          ]
        });
      }
    }, 450);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-300">
      
      {/* Header & Sub-tool Nav */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTool('gateway_sandbox')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTool === 'gateway_sandbox'
                ? 'bg-slate-800 text-amber-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Sandbox Universal Free-DB Gateway</span>
          </button>
          <button
            onClick={() => setActiveTool('db_selector')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTool === 'db_selector'
                ? 'bg-slate-800 text-amber-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Trình Khuyến Nghị Cơ Sở Dữ Liệu</span>
          </button>
          <button
            onClick={() => setActiveTool('query_analyzer')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTool === 'query_analyzer'
                ? 'bg-slate-800 text-amber-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Mô Phỏng EXPLAIN Query & Index</span>
          </button>
        </div>
      </div>

      {/* 1. UNIVERSAL GATEWAY LIVE SANDBOX SIMULATOR */}
      {activeTool === 'gateway_sandbox' && (
        <div className="space-y-6">
          
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Phòng Thí Nghiệm Điều Phối: Universal Free Database Gateway & MCP</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Trải nghiệm thực tế cách một Gateway trung gian nhận yêu cầu từ Web/Mobile App và tự động chọn Free DB phù hợp, tự chuyển luồng khi có sự cố.
            </p>
          </div>

          {/* Visual Architecture Diagram */}
          <VisualDiagram type="universal-free-db-gateway" />

          {/* Control Panel */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              
              {/* Operation Selector */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase font-mono">1. Loại Yêu Cầu Truy Vấn</label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedOperation('sql_query')}
                    className={`w-full p-2 rounded-md border text-left cursor-pointer transition-colors ${
                      selectedOperation === 'sql_query'
                        ? 'bg-blue-950/40 border-blue-600 text-blue-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    SQL Query (Neon / Supabase)
                  </button>
                  <button
                    onClick={() => setSelectedOperation('cache_get_set')}
                    className={`w-full p-2 rounded-md border text-left cursor-pointer transition-colors ${
                      selectedOperation === 'cache_get_set'
                        ? 'bg-amber-950/40 border-amber-600 text-amber-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Cache Ops (Upstash Redis)
                  </button>
                  <button
                    onClick={() => setSelectedOperation('vector_search')}
                    className={`w-full p-2 rounded-md border text-left cursor-pointer transition-colors ${
                      selectedOperation === 'vector_search'
                        ? 'bg-purple-950/40 border-purple-600 text-purple-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Vector Search AI (Qdrant Cloud)
                  </button>
                </div>
              </div>

              {/* Simulation Options */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase font-mono">2. Kịch Bản Thử Nghiệm</label>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={simulateFailover}
                      onChange={(e) => setSimulateFailover(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-400 cursor-pointer"
                    />
                    <span>Giả lập Node chính gặp sự cố (Tự kích hoạt Auto-Failover)</span>
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Kiểm nghiệm khả năng tự chuyển từ Neon sang Supabase mà không gián đoạn người dùng.
                  </p>
                </div>
              </div>

              {/* Run Action */}
              <div className="space-y-1 flex flex-col justify-between">
                <label className="text-[11px] font-semibold text-slate-400 uppercase font-mono">3. Thực Thi Qua Gateway</label>
                <button
                  onClick={handleExecuteGateway}
                  disabled={isExecuting}
                  className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isExecuting ? <Zap className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  <span>{isExecuting ? 'Đang điều phối...' : 'Gửi Request Đến Gateway'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Realtime Gateway Execution Trace Log */}
          {gatewayLog && (
            <div className="space-y-3 p-5 rounded-xl bg-slate-900 border border-slate-800 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    gatewayLog.status === 'failover' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}>
                    {gatewayLog.status === 'failover' ? 'FAILOVER ĐÃ KÍCH HOẠT' : 'THỰC THI THÀNH CÔNG'}
                  </span>
                  <span className="text-slate-300 font-semibold">{gatewayLog.providerUsed}</span>
                </div>
                <div className="text-amber-400 font-bold">
                  Độ trễ toàn trình: {gatewayLog.latencyMs}ms
                </div>
              </div>

              {/* Step by Step Trace */}
              <div className="space-y-1.5 text-xs font-mono text-slate-300">
                <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Nhật ký xử lý chi tiết (Execution Trace):</div>
                {gatewayLog.trace.map((t, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800/80 text-slate-200">
                    {t}
                  </div>
                ))}
              </div>

              {/* JSON Response Payload */}
              <div className="space-y-1 pt-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Dữ liệu Web / Mobile App nhận được:</span>
                  <button
                    onClick={() => handleCopyCode(JSON.stringify(gatewayLog.responsePayload, null, 2))}
                    className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                    title="Sao chép JSON"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <code>{JSON.stringify(gatewayLog.responsePayload, null, 2)}</code>
                </pre>
              </div>
            </div>
          )}

        </div>
      )}

      {/* 2. DATABASE SELECTOR MATRIX */}
      {activeTool === 'db_selector' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-400" />
              <span>Trình Tư Vấn Lựa Chọn Database & Free Tier Phù Hợp Nhất</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Chọn cấu trúc dữ liệu và đặc điểm tải để hệ thống phân tích lựa chọn tối ưu về chi phí và hiệu năng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <label className="font-semibold text-slate-300 font-mono uppercase text-[11px]">Đặc điểm dữ liệu chính:</label>
              <div className="space-y-1.5">
                {[
                  { id: 'structured_relational', label: 'Bảng quan hệ, giao dịch ACID chặt chẽ' },
                  { id: 'flexible_json', label: 'Document JSON linh hoạt, không cố định schema' },
                  { id: 'in_memory_cache', label: 'Dữ liệu tạm, Session, Rate Limit, tốc độ cực cao' },
                  { id: 'vector_embeddings', label: 'Vector nhúng AI (Embeddings), Semantic Search' },
                  { id: 'edge_sqlite', label: 'Phân tán toàn cầu tại Edge, độ trễ < 10ms' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setDataType(opt.id as any)}
                    className={`w-full p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      dataType === opt.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <label className="font-semibold text-slate-300 font-mono uppercase text-[11px]">Đặc điểm lưu lượng tải:</label>
              <div className="space-y-1.5">
                {[
                  { id: 'read_heavy', label: 'Đọc nhiều gấp hàng chục lần Ghi (Read-heavy 95%)' },
                  { id: 'write_heavy', label: 'Ghi liên tục số lượng lớn (Log, Sensor)' },
                  { id: 'realtime_sync', label: 'Cần đồng bộ 2 chiều Realtime cho Mobile App' },
                  { id: 'ai_rag', label: 'Tích hợp Trợ lý AI hỏi đáp RAG / LLM' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setWorkload(opt.id as any)}
                    className={`w-full p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      workload === opt.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Recommendation Result */}
          <div className="p-5 rounded-xl bg-slate-900 border border-amber-500/40 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Gợi Ý Kiến Trúc Tối Ưu Cho Dự Án:</span>
            </div>

            {dataType === 'structured_relational' && (
              <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong>Lựa chọn số 1:</strong> <span className="text-amber-300 font-bold">PostgreSQL trên Supabase hoặc Neon Serverless</span>.
                </p>
                <p className="text-slate-400 text-xs">
                  Cung cấp 500MB miễn phí, hỗ trợ đầy đủ ACID giao dịch tài chính, tự động sinh REST API và có thể bật thêm pgvector khi cần làm tính năng AI.
                </p>
              </div>
            )}

            {dataType === 'in_memory_cache' && (
              <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong>Lựa chọn số 1:</strong> <span className="text-amber-300 font-bold">Upstash Serverless Redis</span> (10,000 commands/ngày miễn phí).
                </p>
                <p className="text-slate-400 text-xs">
                  Độ trễ &lt; 1ms, kết nối qua REST API stateless, tương thích hoàn toàn với Next.js, Cloudflare Workers và Vercel Edge.
                </p>
              </div>
            )}

            {dataType === 'vector_embeddings' && (
              <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong>Lựa chọn số 1:</strong> <span className="text-amber-300 font-bold">Qdrant Cloud Free Cluster (1GB RAM)</span> hoặc <span className="text-amber-300 font-bold">Pinecone Starter Tier</span>.
                </p>
                <p className="text-slate-400 text-xs">
                  Chứa từ 100,000 - 300,000 vector embeddings, hỗ trợ thuật toán HNSW tìm kiếm ngữ nghĩa siêu tốc cho AI Chatbot.
                </p>
              </div>
            )}

            {dataType === 'edge_sqlite' && (
              <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong>Lựa chọn số 1:</strong> <span className="text-amber-300 font-bold">Turso LibSQL (9GB, 500 DBs miễn phí)</span> hoặc <span className="text-amber-300 font-bold">Cloudflare D1 (5GB)</span>.
                </p>
                <p className="text-slate-400 text-xs">
                  Dữ liệu được nhân bản phân tán tới 30+ vị trí Edge trên toàn cầu, phản hồi truy vấn dưới 10ms.
                </p>
              </div>
            )}

            {dataType === 'flexible_json' && (
              <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong>Lựa chọn số 1:</strong> <span className="text-amber-300 font-bold">MongoDB Atlas M0 (512MB)</span> hoặc <span className="text-amber-300 font-bold">Google Firebase Firestore (1GB)</span>.
                </p>
                <p className="text-slate-400 text-xs">
                  Thích hợp cho dữ liệu Document JSON biến đổi liên tục và ứng dụng di động có chế độ hoạt động offline.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* 3. QUERY ANALYZER SIMULATOR */}
      {activeTool === 'query_analyzer' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>Mô Phỏng Kế Hoạch Thực Thi (EXPLAIN ANALYZE) & Cây Chỉ Mục B-Tree</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Trực quan hóa sự khác biệt giữa Sequential Scan (quét toàn bộ đĩa) và B-Tree Index Scan (nhảy nhanh theo cây O(log N)).
            </p>
          </div>

          <VisualDiagram type="btree-index-structure" />

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setQueryScenario('missing_index')}
                className={`px-3 py-1.5 rounded-md border transition-colors cursor-pointer ${
                  queryScenario === 'missing_index'
                    ? 'bg-red-950/40 border-red-600 text-red-300 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Khi thiếu Index (Seq Scan)
              </button>
              <button
                onClick={() => setQueryScenario('composite_index')}
                className={`px-3 py-1.5 rounded-md border transition-colors cursor-pointer ${
                  queryScenario === 'composite_index'
                    ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Khi có B-Tree Index (Index Scan)
              </button>
            </div>

            <div className="space-y-2">
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                <code>
                  {queryScenario === 'missing_index'
                    ? `EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'alex@example.com';\n\n-- KẾT QUẢ:\nSeq Scan on users  (cost=0.00..18420.00 rows=1 width=128) (actual time=485.120..485.122 rows=1 loops=1)\n  Filter: (email = 'alex@example.com'::text)\n  Rows Removed by Filter: 999999\nPlanning Time: 0.082 ms\nExecution Time: 485.148 ms ❌ (Quét 1 triệu dòng trên đĩa cứng)`
                    : `EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'alex@example.com';\n\n-- KẾT QUẢ:\nIndex Scan using idx_users_email on users  (cost=0.42..8.44 rows=1 width=128) (actual time=0.038..0.040 rows=1 loops=1)\n  Index Cond: (email = 'alex@example.com'::text)\nPlanning Time: 0.075 ms\nExecution Time: 0.052 ms 🚀 (Nhanh gấp 9,300 lần nhờ cây B-Tree)`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
