import { VercelFlashcard } from '../../types/vercelModule';

export const VERCEL_FLASHCARDS: VercelFlashcard[] = [
  {
    id: 'v-fc-1',
    term: 'Frontend Cloud',
    definition: 'Mô hình điện toán đám mây tối ưu hóa chuyên biệt cho tầng giao diện và trải nghiệm người dùng, tự động hóa hạ tầng theo framework (Framework-Defined Infrastructure).',
    category: 'overview_architecture',
    exampleOrAnalogy: 'Như một dây chuyền đóng gói và giao hàng tự động: Bạn chỉ cần đưa món đồ (code), cỗ máy tự lo toàn bộ xe tải, kho bãi và vận chuyển.',
    proTip: 'Không cần viết Dockerfile hay cấu hình Nginx khi triển khai ứng dụng chuẩn Frontend trên Vercel.'
  },
  {
    id: 'v-fc-2',
    term: 'ISR (Incremental Static Regeneration)',
    definition: 'Cơ chế tạo trang tĩnh theo yêu cầu và tự động tái sinh ngầm trong nền trên Edge CDN sau một khoảng thời gian revalidate định trước.',
    category: 'rendering_rendering_strategies',
    exampleOrAnalogy: 'Như một quán trà sữa luôn có sẵn ly trà đá trên quầy (Instant Cache), khi có khách lấy đi, nhân viên âm thầm pha ly mới đặt vào lại.',
    proTip: 'Kết hợp revalidateTag() để xóa cache tức thì khi dữ liệu trong Database thay đổi.'
  },
  {
    id: 'v-fc-3',
    term: 'Edge Functions',
    definition: 'Các đoạn mã máy chủ siêu nhẹ chạy trên động cơ V8 Isolates tại hàng trăm địa điểm biên (Edge PoP) toàn cầu với thời gian Cold Start bằng 0ms.',
    category: 'edge_serverless',
    exampleOrAnalogy: 'Như một nhân viên bảo vệ đứng ngay cửa nhà bạn để kiểm tra vé, không cần phải gọi điện về trụ sở chính cách nửa vòng trái đất.',
    proTip: 'Dùng Edge Runtime cho Auth checking, A/B testing và Geolocation headers.'
  },
  {
    id: 'v-fc-4',
    term: 'Preview Deployments',
    definition: 'Mỗi nhánh Git hoặc Pull Request được Vercel tự động build thành một môi trường độc lập với URL riêng biệt để kiểm thử trước khi lên Production.',
    category: 'git_preview_environments',
    exampleOrAnalogy: 'Như việc xem bản vẽ 3D ngôi nhà hoàn chỉnh trước khi thợ chính thức đặt viên gạch đầu tiên.',
    proTip: 'Sử dụng Vercel Toolbar để bình luận và chụp ảnh lỗi trực tiếp trên giao diện Preview.'
  },
  {
    id: 'v-fc-5',
    term: 'Anycast DNS (76.76.21.21)',
    definition: 'Địa chỉ IP Anycast duy nhất của Vercel phân giải tự động tới máy chủ Edge gần nhất với vị trí địa lý của người dùng.',
    category: 'domains_dns_cdn',
    exampleOrAnalogy: 'Như số điện thoại cấp cứu 115: Dù bạn ở Hà Nội hay TP.HCM, gọi cùng 1 số sẽ nối máy tới bệnh viện gần bạn nhất.',
    proTip: 'Cấu hình bản ghi A trỏ về 76.76.21.21 cho Apex Domain.'
  },
  {
    id: 'v-fc-6',
    term: 'Edge Config',
    definition: 'Kho lưu trữ cấu hình dạng Key-Value toàn cầu được đồng bộ tới mọi Edge server với tốc độ đọc cực nhanh dưới 1ms.',
    category: 'storage_kv_blob_postgres',
    exampleOrAnalogy: 'Như cuốn sổ tay quy định chung được photo sẵn đặt trên bàn làm việc của mọi nhân viên khắp thế giới.',
    proTip: 'Cực kỳ lý tưởng cho Feature Flags (bật tắt tính năng khẩn cấp) và IP Whitelist/Blacklist.'
  },
  {
    id: 'v-fc-7',
    term: 'Vercel Blob',
    definition: 'Dịch vụ lưu trữ file nhị phân tĩnh (ảnh, video, PDF) Serverless chuẩn S3-compatible nhưng thao tác trực tiếp qua SDK TypeScript đơn giản.',
    category: 'storage_kv_blob_postgres',
    exampleOrAnalogy: 'Như một chiếc tủ đồ vô tận trên mây, chỉ cần ném đồ vào là nhận lại một chiếc chìa khóa link tải công khai.',
    proTip: 'Tích hợp hàm put() trực tiếp trong API Routes hoặc Server Actions.'
  },
  {
    id: 'v-fc-8',
    term: 'Turborepo Remote Caching',
    definition: 'Cơ chế lưu trữ và chia sẻ kết quả Build / Test của Monorepo lên đám mây Vercel để đồng nghiệp và CI/CD không bao giờ phải build lại mã nguồn cũ.',
    category: 'monorepo_turborepo_cli',
    exampleOrAnalogy: 'Như một bài toán đã có người giải sẵn và lưu vào sổ giải chung, người sau chỉ cần tra cứu đáp án mà không cần tính lại từ đầu.',
    proTip: 'Chạy npx turbo link để kích hoạt Remote Caching cho toàn đội ngũ.'
  }
];
