import { VercelChapter } from '../../types/vercelModule';

export const VERCEL_CHAPTERS: VercelChapter[] = [
  {
    id: 'vercel-ch1-history-architecture',
    chapterNumber: 1,
    title: 'Bình Minh Frontend Cloud: Từ ZEIT Now Đến Đế Chế Vercel',
    subtitle: 'Hành trình thay đổi hoàn toàn cách thế giới triển khai ứng dụng Web: Từ máy chủ VPS thủ công đến kiến trúc Serverless Edge bất khả chiến bại.',
    level: 'Cơ bản',
    readTimeMinutes: 14,
    category: 'overview_architecture',
    summary: 'Vercel không chỉ là một nhà cung cấp hosting mà là một Frontend Cloud Platform được tối ưu hóa sâu rộng cho các Framework hiện đại (Next.js, Svelte, Nuxt, Remix), kết hợp mạng lưới Edge Network toàn cầu để đưa mã nguồn đến gần người dùng nhất với độ trễ dưới 50ms.',
    hookStory: 'Năm 2015, kỹ sư trẻ Guillermo Rauch (tác giả của Socket.io lừng danh) nhận ra một nghịch lý cay đắng: Các lập trình viên có thể viết xong một ứng dụng React tuyệt đẹp chỉ trong vài giờ, nhưng lại mất hàng ngày trời loay hoay cấu hình Nginx, cài chứng chỉ SSL Let\'s Encrypt, thiết lập CI/CD Jenkins và canh chừng máy chủ VPS bị sập nguồn. Ông thốt lên: "Tại sao việc đẩy một trang web lên Internet không thể đơn giản như một lệnh git push?". ZEIT ra đời với tôn chỉ "Triển khai trong chớp mắt (Deployment in seconds)", sau này đổi tên thành Vercel và tái định nghĩa toàn bộ ngành công nghiệp Web hiện đại.',
    sections: [
      {
        heading: '1. Frontend Cloud: Mô Hình Điện Toán Thế Hệ Mới',
        subheading: 'Sự khác biệt bản chất giữa Máy Chủ Truyền Thống, Cloud IaaS và Vercel',
        content: `Trong mô hình điện toán truyền thống (như thuê VPS Ubuntu trên DigitalOcean hay tự dựng EC2 trên AWS), lập trình viên phải gánh vác toàn bộ trách nhiệm:
• Cấu hình Reverse Proxy (Nginx / Caddy)
• Tự cấp phát và gia hạn chứng chỉ SSL/TLS
• Cấu hình quy trình Build, PM2 tiến trình nền, và khởi động lại khi crash
• Tự thiết lập cụm máy chủ đa vùng (Multi-region) nếu muốn phục vụ người dùng toàn cầu.

**Vercel giải quyết toàn bộ bài toán này bằng mô hình Frontend Cloud:**
1. **Developer Experience (DX) số 1**: Kết nối kho mã nguồn GitHub/GitLab, mỗi lần gõ \`git push\` là một bản dựng độc lập được triển khai tự động.
2. **Global Edge Network**: Tự động phân tán tài nguyên tĩnh (Static Assets) và tính toán biên (Edge Compute) tới hơn 300+ PoP (Point of Presence) trên toàn cầu.
3. **Framework-Defined Infrastructure (FDI)**: Vercel tự động đọc cấu trúc mã nguồn (Next.js, Vite, Astro) và tự sinh hạ tầng Serverless / Edge tương ứng mà bạn không cần viết một dòng Terraform hay Dockerfile nào.`,
        mindsetShift: {
          from: 'Nghĩ rằng phải học Docker, Kubernetes, Nginx và Linux Sysadmin mới có thể đưa website lên mạng chạy an toàn.',
          to: 'Tận dụng Framework-Defined Infrastructure của Vercel để hạ tầng tự động co giãn theo mã nguồn, tập trung 100% thời gian vào trải nghiệm người dùng.',
          impact: 'Rút ngắn thời gian từ ý tưởng đến sản phẩm (Time-to-Market) từ nhiều tuần xuống còn vài phút.'
        }
      },
      {
        heading: '2. Bản Đồ Kiến Trúc Toàn Cầu Của Vercel',
        subheading: 'Cách một HTTP Request được định tuyến từ trình duyệt đến Edge Network',
        content: `Mỗi khi người dùng nhập tên miền trang web chạy trên Vercel:
1. **Anycast DNS Routing**: Hệ thống định tuyến Anycast DNS của Vercel dẫn người dùng tới máy chủ Edge gần nhất về mặt địa lý.
2. **Vercel Edge Network (Smart CDN)**:
   - Nếu tài nguyên là file tĩnh (HTML, CSS, JS, Ảnh WebP) hoặc trang đã được Prerender, Edge Server trả về ngay lập tức với thời gian phản hồi cực nhanh (Cache Hit - dưới 20ms).
   - Nếu yêu cầu cần tính toán động, Edge Middleware sẽ chặn bắt request để kiểm tra Geolocation, A/B Testing hoặc Auth Header.
3. **Serverless Origin Compute**: Đối với các API nặng hoặc Server-side Rendering phức tạp, request được chuyển tới các Serverless Functions chạy trong khu vực máy chủ (Region) gần cơ sở dữ liệu nhất để hạn chế độ trễ kết nối DB.`,
        storyQuote: {
          quote: 'Mục tiêu của chúng tôi là biến toàn bộ hành tinh thành một chiếc máy tính khổng lồ, nơi mã nguồn của bạn chạy ngay sát cạnh người dùng cuối.',
          speaker: 'Guillermo Rauch',
          role: 'CEO & Founder tại Vercel',
          year: '2020'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Cài đặt Vercel CLI toàn cục trên máy tính',
        command: 'npm install -g vercel',
        description: 'Cài đặt công cụ dòng lệnh chính thức để quản trị dự án Vercel từ Terminal'
      },
      {
        title: 'Đăng nhập vào tài khoản Vercel qua Terminal',
        command: 'vercel login',
        description: 'Xác thực tài khoản qua trình duyệt hoặc email để đồng bộ dự án'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ sự khác biệt giữa Frontend Cloud và Cloud IaaS truyền thống.',
      'Giải thích được khái niệm Framework-Defined Infrastructure (FDI).',
      'Nắm vững luồng đi của một HTTP Request qua Anycast DNS, Edge Network và Serverless Functions.',
      'Cài đặt và đăng nhập thành công công cụ Vercel CLI.'
    ]
  },
  {
    id: 'vercel-ch2-rendering-strategies',
    chapterNumber: 2,
    title: 'Nghệ Thuật Render Đỉnh Cao: SSG, SSR, ISR & Partial Prerendering (PPR)',
    subtitle: 'Giải mã bí quyết cân bằng hoàn hảo giữa tốc độ tải trang tức thì (Static Speed) và tính năng dữ liệu động thời gian thực (Dynamic Freshness).',
    level: 'Trung bình',
    readTimeMinutes: 16,
    category: 'rendering_rendering_strategies',
    summary: 'Lựa chọn đúng chiến lược render quyết định sống còn đến trải nghiệm người dùng và chi phí máy chủ. Vercel là nền tảng hoàn hảo nhất hiện thực hóa Incremental Static Regeneration (ISR) và Partial Prerendering (PPR) trên Next.js.',
    hookStory: 'Một trang báo điện tử có 5 triệu bài viết. Nếu dùng SSG (Static Site Generation), mỗi lần đổi giao diện header họ phải mất 6 tiếng để build lại 5 triệu file HTML. Nếu dùng SSR (Server-Side Rendering), mỗi khi có tin sốt dẻo hàng triệu độc giả ùa vào khiến CPU máy chủ bốc khói và database sập nguồn. Vercel đã giải cứu họ bằng phát minh ISR: Bài viết được tạo tĩnh theo nhu cầu, lưu đệm trên Edge CDN và tự động tái sinh ngầm trong nền sau mỗi 60 giây.',
    sections: [
      {
        heading: '1. Bốn Chiến Lược Render Cốt Lõi Trên Vercel',
        subheading: 'Từ Static thuần túy đến Dynamic theo yêu cầu',
        content: `Trên Vercel, các chiến lược render được ánh xạ trực tiếp vào hạ tầng:

• **SSG (Static Site Generation)**:
  - Cơ chế: Tạo file HTML/CSS/JS tại thời điểm Build Time (\`next build\`).
  - Phù hợp: Landing page, tài liệu hướng dẫn, trang giới thiệu công ty.
  - Ưu điểm: Tốc độ tải trang 100/100 Google Lighthouse, chi phí vận hành $0 trên Edge CDN.

• **SSR (Server-Side Rendering / Dynamic Rendering)**:
  - Cơ chế: Mỗi khi có request, Vercel Serverless Function sẽ chạy mã nguồn, truy vấn Database và sinh ra mã HTML gửi về.
  - Phù hợp: Trang thông tin cá nhân, giỏ hàng, bảng điều khiển quản trị (Dashboard) phụ thuộc vào phiên đăng nhập.

• **ISR (Incremental Static Regeneration - Đột phá của Vercel)**:
  - Cơ chế: Trang được tạo tĩnh và lưu đệm trên Edge CDN. Khi hết hạn thời gian \`revalidate: 60\`, người dùng đầu tiên vẫn nhận được bản cache cũ ngay tức thì, trong khi Vercel âm thầm kích hoạt Serverless Function ngầm để tạo bản HTML mới và cập nhật lên toàn bộ Edge CDN toàn cầu (Stale-While-Revalidate).

• **PPR (Partial Prerendering - Thế hệ mới nhất)**:
  - Cơ chế: Kết hợp Static Shell (vỏ tĩnh tải siêu nhanh) và Streaming Dynamic Holes (các khối dữ liệu động stream qua Suspense) trong cùng MỘT trang duy nhất.`,
        codeBlock: {
          language: 'typescript',
          title: 'Cấu Hình ISR & On-Demand Revalidation trong Next.js App Router',
          code: `// app/products/[id]/page.tsx
export const revalidate = 3600; // Tự động làm mới dữ liệu sau mỗi 1 giờ

export default async function ProductPage({ params }: { params: { id: string } }) {
  const res = await fetch(\`https://api.example.com/products/\${params.id}\`, {
    next: { tags: ['products', \`product-\${params.id}\`] }
  });
  const product = await res.json();

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Giá: {product.price} USD</p>
    </div>
  );
}

// Server Action hoặc API Route làm mới tức thì khi có cập nhật trong DB
import { revalidateTag } from 'next/cache';

export async function updateProductAction(id: string) {
  // Cập nhật DB xong...
  revalidateTag(\`product-\${id}\`); // Xóa cache Edge CDN ngay lập tức!
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Build thử nghiệm cục bộ mô phỏng môi trường Vercel',
        command: 'npx vercel build',
        description: 'Biên dịch dự án theo đúng tiêu chuẩn hạ tầng Vercel Output File System (.vercel/output)'
      }
    ],
    masteryChecklist: [
      'Phân biệt rạch ròi giữa SSG, SSR, ISR và PPR.',
      'Hiểu rõ cơ chế Stale-While-Revalidate của ISR.',
      'Sử dụng thành thạo On-demand Revalidation qua revalidatePath và revalidateTag.'
    ]
  },
  {
    id: 'vercel-ch3-edge-vs-serverless',
    chapterNumber: 3,
    title: 'Serverless Functions vs Edge Functions: Tối Ưu Tốc Độ & Cold Start',
    subtitle: 'Mổ xẻ hai engine tính toán cốt lõi của Vercel: Node.js Serverless Container vs V8 Isolate Edge Runtime.',
    level: 'Nâng cao',
    readTimeMinutes: 16,
    category: 'edge_serverless',
    summary: 'Edge Functions chạy trên V8 Isolates siêu nhẹ với thời gian khởi động Cold Start gần bằng 0ms ở hơn 300 địa điểm toàn cầu, trong khi Serverless Functions chạy Node.js runtime đầy đủ hỗ trợ toàn bộ thư viện npm.',
    hookStory: 'Bạn cần chặn các truy cập độc hại từ một số quốc gia hoặc thực hiện phân nhánh A/B Testing cho 1 triệu khách hàng. Nếu dùng Serverless Function tại vùng us-east-1, người dùng từ Việt Nam phải chịu độ trễ 250ms chỉ để đợi máy chủ phản hồi. Bằng cách chuyển sang Vercel Edge Middleware, mã nguồn JavaScript chạy ngay tại PoP Singapore với độ trễ chỉ 12ms, loại bỏ hoàn toàn Cold Start.',
    sections: [
      {
        heading: '1. So Sánh Bản Chất: Node.js Serverless vs V8 Edge Runtime',
        subheading: 'Hai triết lý điện toán cho hai bài toán khác biệt',
        content: `Trên Vercel, bạn có hai môi trường tính toán backend:

• **Serverless Functions (Node.js / Python / Go / Ruby Runtime)**:
  - Bản chất: Chạy trong các MicroVM container độc lập (AWS Lambda phía sau).
  - Khởi động (Cold Start): ~150ms - 500ms khi container được đánh thức.
  - Vị trí: Đặt tại một Region cố định (ví dụ \`sin1\` - Singapore, hoặc \`iad1\` - Washington DC) - thường chọn gần Database.
  - Giới hạn: Thời gian chạy tối đa 10s (Hobby) hoặc 60s - 300s (Pro/Enterprise), hỗ trợ đầy đủ các module Node.js原生 (\`fs\`, \`child_process\`, TCP sockets).

• **Edge Functions & Edge Middleware (V8 Isolate Runtime)**:
  - Bản chất: Chạy trên động cơ V8 Isolates phân tán (tương tự Cloudflare Workers).
  - Khởi động (Cold Start): **0ms (gần như tức thì)**.
  - Vị trí: Chạy phân tán trên toàn cầu tại hàng trăm Edge PoPs gần người dùng nhất.
  - Giới hạn: Chỉ hỗ trợ Web Standard APIs (Fetch, Request, Response, Crypto, WebSockets), không hỗ trợ các thư viện Node.js can thiệp sâu hệ thống (\`fs\`, \`net\`).`,
        codeBlock: {
          language: 'typescript',
          title: 'Ví Dụ Edge Middleware Tự Động Định Tuyến & Geolocation (middleware.ts)',
          code: `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  // Lấy vị trí địa lý của người dùng trực tiếp từ Vercel Edge Headers
  const country = request.geo?.country || 'US';
  const city = request.geo?.city || 'Unknown';

  // Chặn hoặc chuyển hướng dựa trên vị trí
  if (country === 'VN') {
    const response = NextResponse.next();
    response.headers.set('x-user-region', 'Vietnam');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Chạy mô phỏng Serverless & Edge cục bộ với Vercel Dev',
        command: 'vercel dev',
        description: 'Chạy toàn bộ môi trường Serverless, Edge Middleware và biến môi trường ngay trên localhost'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ ưu thế và nhược điểm giữa V8 Edge Isolates và Node.js Serverless Containers.',
      'Biết cách chọn đúng Region cho Serverless Function để giảm thiểu độ trễ kết nối Database.',
      'Viết thành thạo Edge Middleware để xử lý Auth, Geolocation và Rewrite đường dẫn.'
    ]
  },
  {
    id: 'vercel-ch4-git-preview-deployments',
    chapterNumber: 4,
    title: 'Git Integration, Preview Deployments & Quy Trình CI/CD Tự Động',
    subtitle: 'Nền tảng của văn hóa cộng tác hiện đại: Mỗi nhánh Git, mỗi Pull Request là một môi trường Preview độc lập kèm URL riêng biệt.',
    level: 'Cơ bản',
    readTimeMinutes: 14,
    category: 'git_preview_environments',
    summary: 'Preview Deployments là "vũ khí bí mật" của Vercel giúp đội ngũ lập trình viên, thiết kế UI và quản lý sản phẩm (Product Managers) kiểm thử tính năng trên URL thực tế trước khi gộp vào nhánh production.',
    hookStory: 'Trước kỷ nguyên Vercel, các lập trình viên thường tranh cãi nảy lửa: "Tính năng này trên máy tôi chạy mượt lắm!". Để khách hàng hoặc sếp duyệt, cả team phải xếp hàng chờ giải phóng "môi trường Staging duy nhất". Với Vercel, mỗi khi bạn mở một Pull Request, một con bot tự động thả vào một đường link Preview sống động. Designer bấm vào để soi từng pixel, QA bấm vào để test dữ liệu thật, và CEO có thể duyệt sản phẩm ngay trên điện thoại khi đang uống cà phê.',
    sections: [
      {
        heading: '1. Ba Môi Trường Triển Khai Cốt Lõi Trên Vercel',
        subheading: 'Production, Preview và Development',
        content: `Vercel phân chia môi trường rõ ràng và tự động hóa 100%:

• **Production Deployment**:
  - Gắn liền với nhánh chính (thường là \`main\` hoặc \`master\`).
  - Tự động trỏ các tên miền chính thức (\`yourdomain.com\`).
  - Dùng bộ biến môi trường Production (\`process.env.DATABASE_URL_PROD\`).

• **Preview Deployment**:
  - Tự động sinh ra mỗi khi có commit trên bất kỳ nhánh nào khác (hoặc Pull Request).
  - Sở hữu một URL bất biến duy nhất (ví dụ \`project-git-feature-cart-team.vercel.app\`).
  - Tích hợp tính năng **Vercel Toolbar & Visual Comments**: Cho phép đồng nghiệp bình luận, ghim ghi chú trực tiếp lên các phần tử giao diện như Figma!

• **Development Deployment**:
  - Chạy trên máy lập trình viên qua \`vercel dev\`, kết nối với biến môi trường Development.`,
        codeBlock: {
          language: 'json',
          title: 'Cấu Hình Dự Án Tùy Biến (vercel.json)',
          code: `{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Triển khai nhanh mã nguồn hiện tại lên môi trường Preview',
        command: 'vercel',
        description: 'Tải mã nguồn lên và nhận ngay một URL Preview trong vài giây'
      },
      {
        title: 'Triển khai trực tiếp lên môi trường Production',
        command: 'vercel --prod',
        description: 'Build và gán tên miền chính thức cho bản triển khai mới nhất'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ cơ chế tự động kích hoạt Build khi có commit trên GitHub/GitLab.',
      'Sử dụng Vercel Toolbar để để lại Feedback trực quan trên Preview URL.',
      'Cấu hình các chỉ thị tùy biến nâng cao qua file vercel.json.'
    ]
  },
  {
    id: 'vercel-ch5-domains-dns-ssl',
    chapterNumber: 5,
    title: 'Quản Trị Tên Miền Tùy Chỉnh, Anycast DNS & Chứng Chỉ SSL',
    subtitle: 'Nghệ thuật trỏ tên miền doanh nghiệp vào Vercel qua bản ghi A, CNAME, Apex Domains và tự động hóa SSL Let\'s Encrypt.',
    level: 'Trung bình',
    readTimeMinutes: 15,
    category: 'domains_dns_cdn',
    summary: 'Vercel cung cấp hệ thống quản lý tên miền thông minh, tự động cấu hình chứng chỉ SSL/TLS miễn phí, hỗ trợ chuyển hướng 301 tự động từ www sang non-www và tối ưu hóa phân giải Anycast DNS toàn cầu.',
    hookStory: 'Một lập trình viên lo lắng khi chuẩn bị ra mắt website: "Làm sao để người dùng gõ cả yourdomain.com và www.yourdomain.com đều vào được mà không bị lỗi SSL hay trùng lặp SEO?". Trên Vercel, bạn chỉ cần gõ tên miền, Vercel sẽ tự động phát hiện Apex Domain, cấu hình chuyển hướng 301 chuẩn SEO và tự sinh 2 chứng chỉ SSL riêng biệt trong vòng chưa đầy 60 giây.',
    sections: [
      {
        heading: '1. Hai Phương Thức Cấu Hình DNS Vào Vercel',
        subheading: 'Sử dụng Vercel Nameservers hay Cấu hình bản ghi A/CNAME truyền thống',
        content: `Khi gắn tên miền riêng vào dự án Vercel:

• **Phương Thức 1: Bản Ghi DNS Thủ Công (Khuyên dùng khi tên miền dùng chung nhiều dịch vụ)**:
  - **Apex Domain (Tên miền gốc, ví dụ: \`example.com\`)**:
    + Type: \`A\` | Host: \`@\` | Value: \`76.76.21.21\` (Vercel Anycast IP)
  - **Subdomain (Tên miền phụ, ví dụ: \`app.example.com\` hoặc \`www.example.com\`)**:
    + Type: \`CNAME\` | Host: \`app\` | Value: \`cname.vercel-dns.com.\`

• **Phương Thức 2: Ủy Quyền Toàn Bộ Nameservers (Vercel DNS)**:
  - Trỏ NS của tên miền về: \`ns1.vercel-dns.com\` và \`ns2.vercel-dns.com\`.
  - Vercel sẽ tự động quản lý DNS, tự tối ưu Wildcard SSL (\`*.example.com\`) và kích hoạt tính năng Anycast DNS tốc độ cao nhất thế giới.`,
        bulletPoints: [
          'Tự động cấp phát chứng chỉ SSL/TLS Let\'s Encrypt hoặc ZeroSSL hoàn toàn miễn phí.',
          'Tự động gia hạn SSL trước khi hết hạn 30 ngày mà không cần can thiệp con người.',
          'Hỗ trợ cấu hình Apex Domain Redirect tự động (www -> non-www hoặc ngược lại).'
        ]
      }
    ],
    practicalCommands: [
      {
        title: 'Thêm tên miền mới vào dự án qua CLI',
        command: 'vercel domains add mycustomdomain.com',
        description: 'Đăng ký tên miền vào tài khoản Vercel trực tiếp từ dòng lệnh'
      },
      {
        title: 'Kiểm tra trạng thái cấu hình DNS của tên miền',
        command: 'vercel domains inspect mycustomdomain.com',
        description: 'Kiểm tra bản ghi DNS đã trỏ đúng IP 76.76.21.21 hay chưa'
      }
    ],
    masteryChecklist: [
      'Cấu hình thành thạo bản ghi A (76.76.21.21) và CNAME (cname.vercel-dns.com).',
      'Hiểu rõ cơ chế tự động sinh và gia hạn chứng chỉ SSL trên Vercel.',
      'Thiết lập chuyển hướng tự động chuẩn SEO giữa tên miền gốc và tiền tố www.'
    ]
  },
  {
    id: 'vercel-ch6-environment-secrets',
    chapterNumber: 6,
    title: 'Quản Trị Biến Môi Trường, Bí Mật (Secrets) & Phân Tách Môi Trường',
    subtitle: 'Bảo vệ an toàn tuyệt đối các API Keys nhạy cảm, phân định rạch ròi Production, Preview, Development và đồng bộ về máy local.',
    level: 'Trung bình',
    readTimeMinutes: 14,
    category: 'environment_secrets',
    summary: 'Quản lý biến môi trường là bài toán then chốt trong bảo mật ứng dụng. Vercel cung cấp hệ thống Secrets Vault mã hóa an toàn, hỗ trợ phân chia biến theo từng môi trường và đồng bộ 1 lệnh về file .env.local.',
    hookStory: 'Một lập trình viên vô tình commit file chứa OpenAI API Key và Secret Database Password lên GitHub công khai. Chỉ trong 10 phút, bot quét mã độc đã rút cạn 5.000 USD tài khoản OpenAI của công ty. Với Vercel, toàn bộ biến môi trường nhạy cảm được lưu trong Secrets Vault mã hóa cấp quân sự, chỉ được nạp vào lúc runtime và không bao giờ xuất hiện trong mã nguồn Git.',
    sections: [
      {
        heading: '1. Phân Tách Biến Môi Trường Theo 3 Môi Trường',
        subheading: 'Production vs Preview vs Development',
        content: `Trên Vercel Project Settings:

• **Production**: Dùng cho bản live chính thức. Chứa kết nối Database Production thật, Stripe Live API Keys, Resend Production Domain.
• **Preview**: Dùng cho các bản Pull Request. Thường kết nối Database Staging/Branching (như Neon Branch) hoặc Stripe Test Mode để thử nghiệm an toàn mà không làm bẩn dữ liệu thật.
• **Development**: Dùng khi chạy \`vercel dev\` trên máy cá nhân.

**Kỹ thuật đồng bộ Biến Môi Trường về máy cục bộ:**
Thay vì copy-paste thủ công file \`.env\` qua chat Telegram hay Zalo (cực kỳ nguy hiểm), bạn chỉ cần gõ đúng một câu lệnh:
\`vercel env pull .env.local\`
Vercel CLI sẽ tự động tải các biến môi trường Development tương ứng về máy bạn một cách an toàn!`,
        mindsetShift: {
          from: 'Gửi file .env chứa mật khẩu cho đồng nghiệp mới qua tin nhắn chat.',
          to: 'Thêm thành viên vào Vercel Team và hướng dẫn họ chạy lệnh "vercel env pull" để lấy biến môi trường chuẩn xác.',
          impact: 'Triệt tiêu 100% rủi ro rò rỉ thông tin đăng nhập và mật khẩu hệ thống.'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Tải biến môi trường từ Vercel về file .env.local',
        command: 'vercel env pull .env.local',
        description: 'Đồng bộ biến môi trường Development an toàn về máy tính cá nhân'
      },
      {
        title: 'Thêm một biến môi trường mới lên Vercel qua Terminal',
        command: 'vercel env add DATABASE_URL production',
        description: 'Tạo biến môi trường bảo mật cho môi trường Production mà không cần mở trình duyệt'
      }
    ],
    masteryChecklist: [
      'Phân biệt và cấu hình đúng phạm vi biến môi trường cho Production, Preview và Development.',
      'Sử dụng thành thạo lệnh vercel env pull để làm việc an toàn trong nhóm.',
      'Tuyệt đối không bao giờ đưa biến môi trường nhạy cảm có tiền tố NEXT_PUBLIC_ nếu không cần thiết.'
    ]
  },
  {
    id: 'vercel-ch7-storage-kv-blob-postgres',
    chapterNumber: 7,
    title: 'Hệ Sinh Thái Vercel Storage: KV, Blob, Postgres & Edge Config',
    subtitle: 'Giải pháp lưu trữ Serverless toàn diện tích hợp sẵn: Redis tốc độ cao, S3 Object Storage thay thế, Postgres SQL và biến toàn cầu Edge Config.',
    level: 'Nâng cao',
    readTimeMinutes: 18,
    category: 'storage_kv_blob_postgres',
    summary: 'Vercel Storage mang lại khả năng lưu trữ không cần quản trị máy chủ: Vercel KV cho Cache/Rate Limiting, Vercel Blob cho upload ảnh/file tĩnh, Vercel Postgres cho quan hệ dữ liệu chuẩn, và Edge Config để đọc cấu hình toàn cầu dưới 1ms.',
    hookStory: 'Bạn muốn làm tính năng "Tạm dừng thanh toán để bảo trì" hoặc cập nhật thông báo khẩn cấp cho 10 triệu người dùng. Nếu lưu trạng thái này trong Database, mỗi lượt truy cập sẽ tốn 1 truy vấn DB. Nếu deploy lại code, bạn mất 2 phút build. Vercel sáng chế ra **Edge Config**: Dữ liệu JSON toàn cầu được sao chép đến tất cả 300+ Edge PoP. Khi bạn sửa một giá trị trên Dashboard, toàn bộ người dùng thế giới nhận được giá trị mới trong vòng chưa tới 1 mili-giây mà không cần truy vấn DB!',
    sections: [
      {
        heading: '1. Bốn Mảnh Ghép Lưu Trữ Của Vercel Storage',
        subheading: 'Chọn đúng công cụ lưu trữ cho từng nghiệp vụ',
        content: `• **Vercel KV (Powered by Upstash Redis)**:
  - Lưu trữ Key-Value trong bộ nhớ RAM cực nhanh.
  - Phù hợp: Quản lý Session người dùng, Rate Limiting chống spam API, bộ nhớ đệm Cache tạm thời, đếm số lượt xem trang thời gian thực.

• **Vercel Blob (S3-compatible Storage)**:
  - Lưu trữ file nhị phân lớn (ảnh đại diện, PDF, video, tài liệu đính kèm).
  - Tích hợp hàm \`put()\` và \`del()\` siêu đơn giản trong code TypeScript mà không cần cấu hình AWS IAM rối rắm.

• **Vercel Postgres (Powered by Neon)**:
  - Cơ sở dữ liệu quan hệ SQL chuẩn Serverless Postgres với tính năng tự động co giãn và ngủ đông khi không có kết nối.

• **Vercel Edge Config**:
  - Lưu trữ cấu hình dạng Key-Value được đồng bộ toàn cầu với tốc độ đọc **dưới 1ms**.
  - Phù hợp: Feature Flags (bật/tắt tính năng), danh sách đen IP, bảo trì hệ thống, cấu hình A/B test.`,
        codeBlock: {
          language: 'typescript',
          title: 'Code Upload File Lên Vercel Blob Trực Tiếp Bằng SDK (@vercel/blob)',
          code: `import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || 'avatar.png';

  // Upload trực tiếp luồng file nhị phân lên Vercel Blob
  const blob = await put(filename, request.body!, {
    access: 'public',
  });

  return NextResponse.json({
    url: blob.url,
    downloadUrl: blob.downloadUrl,
    pathname: blob.pathname
  });
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Cài đặt bộ thư viện Vercel Storage vào dự án',
        command: 'npm install @vercel/blob @vercel/kv @vercel/postgres @vercel/edge-config',
        description: 'Cài đặt các gói SDK chính thức để tương tác với kho lưu trữ của Vercel'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ bài toán ứng dụng của Vercel KV, Blob, Postgres và Edge Config.',
      'Sử dụng Edge Config cho Feature Flags với thời gian đọc dưới 1ms.',
      'Triển khai tính năng upload file an toàn với Vercel Blob SDK.'
    ]
  },
  {
    id: 'vercel-ch8-security-waf-firewall',
    chapterNumber: 8,
    title: 'Lá Chắn An Ninh: Vercel WAF, DDoS Mitigation & Security Headers',
    subtitle: 'Bảo vệ ứng dụng trước các cuộc tấn công Layer 7, chặn đứng Bot độc hại, giới hạn Rate Limit và cấu hình HTTP Security Headers cấp cao.',
    level: 'Chuyên gia',
    readTimeMinutes: 16,
    category: 'security_firewall_waf',
    summary: 'Mỗi ngày Vercel xử lý hàng chục tỷ request và tự động đánh chặn hàng triệu cuộc tấn công mạng. Tận dụng Vercel Web Application Firewall (WAF) và Attack Challenge Mode giúp bảo vệ doanh nghiệp an toàn tuyệt đối.',
    hookStory: 'Một trang web bán vé xem ca nhạc vừa mở bán thì bị một mạng lưới bot độc hại gửi 500.000 request/giây nhằm vét sạch vé. Thay vì máy chủ bị sập, Vercel Anycast Edge Network lập tức kích hoạt "Attack Challenge Mode": Các bot tự động bị chặn lại bởi thử thách Javascript ngầm, trong khi người dùng thật vẫn truy cập và mua vé bình thường mà không hề nhận ra cơn bão DDoS vừa quét qua.',
    sections: [
      {
        heading: '1. Các Tầng Phòng Thủ Của Vercel Firewall',
        subheading: 'Bảo vệ đa tầng từ tầng mạng đến tầng ứng dụng',
        content: `Hệ thống phòng thủ của Vercel bao gồm:

• **Automatic DDoS Mitigation**: Tự động hấp thụ và phân tán các cuộc tấn công từ chối dịch vụ tầng L3/L4 và L7 trên mạng lưới Anycast toàn cầu.
• **Vercel WAF Custom Rules**: Cho phép bạn tự tạo các quy tắc chặn:
  - Chặn IP hoặc dải mạng ASN đáng ngờ.
  - Chặn theo vị trí địa lý (Geo-blocking).
  - Chặn theo User-Agent hoặc Custom Request Headers.
• **Rate Limiting**: Giới hạn số lượng request tối đa một địa chỉ IP được phép gọi vào một API Route trong 1 phút (ví dụ: tối đa 5 lần thử mật khẩu/phút).
• **Security Headers Chuẩn Mực**: Cấu hình CSP (Content Security Policy), HSTS, X-Content-Type-Options và Permissions-Policy qua file cấu hình.`,
        codeBlock: {
          language: 'javascript',
          title: 'Cấu Hình Security Headers Chuẩn Trong next.config.js',
          code: `// next.config.js
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Kiểm tra điểm bảo mật HTTP Headers của trang web',
        command: 'curl -I https://yourdomain.com',
        description: 'Kiểm tra các tiêu đề bảo mật HSTS, X-Frame-Options trả về từ Edge'
      }
    ],
    masteryChecklist: [
      'Nắm vững cơ chế đánh chặn DDoS tự động của Vercel Edge Network.',
      'Thiết lập các quy tắc WAF Rules chặn Bot độc hại và Rate Limiting.',
      'Cấu hình đầy đủ bộ Security Headers trong next.config.js hoặc vercel.json.'
    ]
  },
  {
    id: 'vercel-ch9-observability-speed-insights',
    chapterNumber: 9,
    title: 'Giám Sát Toàn Diện: Speed Insights, Realtime Logs & Core Web Vitals',
    subtitle: 'Nghệ thuật đo lường trải nghiệm người dùng thực tế (RUM), phân tích chỉ số LCP, FID, CLS, INP và gỡ lỗi Serverless Logs trực tiếp.',
    level: 'Trung bình',
    readTimeMinutes: 15,
    category: 'observability_speed_insights',
    summary: 'Bạn không thể cải thiện những gì bạn không thể đo lường. Vercel cung cấp bộ công cụ Speed Insights thu thập dữ liệu người dùng thực (Real Experience Score) và hệ thống Live Runtime Logs giúp truy vết lỗi tức thì.',
    hookStory: 'Website của bạn đạt điểm 100/100 khi test trên máy tính tại văn phòng mạng cáp quang. Nhưng khi khách hàng ở vùng nông thôn dùng mạng 4G chập chờn truy cập, trang web bị giật và mất 8 giây mới hiển thị. Nhờ Vercel Speed Insights (Real User Monitoring), biểu đồ hiển thị chính xác chỉ số LCP (Largest Contentful Paint) bị tụt do một tấm ảnh banner chưa được nén định dạng WebP, giúp đội ngũ sửa lỗi ngay trong ngày.',
    sections: [
      {
        heading: '1. Bộ Ba Chỉ Số Core Web Vitals Sống Còn',
        subheading: 'Tiêu chuẩn xếp hạng tìm kiếm của Google và trải nghiệm người dùng',
        content: `Vercel Speed Insights theo dõi trực tiếp các chỉ số:

• **LCP (Largest Contentful Paint)**: Thời gian phần tử lớn nhất trên màn hình xuất hiện. Chuẩn tốt: **< 2.5 giây**.
• **INP (Interaction to Next Paint - Thay thế FID)**: Thời gian trang web phản hồi khi người dùng bấm nút hay tương tác. Chuẩn tốt: **< 200 mili-giây**.
• **CLS (Cumulative Layout Shift)**: Mức độ giật/nhảy của giao diện khi tải trang. Chuẩn tốt: **< 0.1**.

**Hệ thống Runtime Logs & Drains**:
Khi một Serverless Function gặp lỗi \`500 Internal Server Error\`, Vercel Logs ghi nhận chi tiết:
- Request ID, Timestamp, Region thực thi.
- Memory Usage, Execution Duration (ms).
- Toàn bộ console.log và Stack Trace lỗi.
- Khả năng xuất Log Drains sang Datadog, Axiom, Better Stack hoặc Logflare.`,
        codeBlock: {
          language: 'tsx',
          title: 'Tích Hợp Vercel Speed Insights & Analytics Vào React / Next.js',
          code: `// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {children}
        {/* Tự động thu thập chỉ số Core Web Vitals của người dùng thực */}
        <SpeedInsights />
        {/* Thu thập lưu lượng truy cập và hành vi không cần Cookie Banner */}
        <Analytics />
      </body>
    </html>
  );
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Theo dõi luồng nhật ký log thời gian thực của dự án qua CLI',
        command: 'vercel logs my-deployment-url.vercel.app -f',
        description: 'Xem trực tiếp log Serverless Functions đang chạy trên môi trường live'
      }
    ],
    masteryChecklist: [
      'Đọc hiểu và tối ưu hóa 3 chỉ số Core Web Vitals: LCP, INP, CLS.',
      'Tích hợp gói @vercel/speed-insights và @vercel/analytics vào ứng dụng.',
      'Thành thạo kỹ năng đọc log và debug lỗi runtime trên Vercel Dashboard & CLI.'
    ]
  },
  {
    id: 'vercel-ch10-monorepo-turborepo-cli',
    chapterNumber: 10,
    title: 'Turborepo Monorepos & Vercel CLI: Vũ Khí Cho Doanh Nghiệp Lớn',
    subtitle: 'Quản lý hàng chục ứng dụng trong một Repository duy nhất với Remote Caching siêu tốc và kịch bản tự động hóa Production.',
    level: 'Chuyên gia',
    readTimeMinutes: 18,
    category: 'monorepo_turborepo_cli',
    summary: 'Khi dự án phát triển quy mô lớn với nhiều ứng dụng (Web, Admin, Mobile, API) và thư viện dùng chung (UI Components, Config, Utils), việc kết hợp Turborepo và Vercel Remote Caching giúp giảm thời gian Build từ 20 phút xuống còn 15 giây.',
    hookStory: 'Một công ty công nghệ có 8 ứng dụng Web dùng chung một thư viện UI. Mỗi lần một lập trình viên sửa một dòng CSS trong UI component và đẩy lên Git, hệ thống CI/CD phải build lại toàn bộ 8 ứng dụng mất 30 phút. Sau khi tích hợp Turborepo với Vercel Remote Cache, hệ thống nhận diện chỉ có 1 ứng dụng bị ảnh hưởng, các ứng dụng còn lại lấy bản build sẵn từ Vercel Cloud Cache. Thời gian build rút ngắn kỷ lục xuống còn đúng 18 giây!',
    sections: [
      {
        heading: '1. Turborepo & Remote Caching Trên Vercel',
        subheading: 'Không bao giờ phải build lại những gì không thay đổi',
        content: `Turborepo là công cụ xây dựng Monorepo tốc độ cao do chính Vercel phát triển:

• **Computation Caching (Bộ nhớ đệm tính toán)**: Turborepo tạo ra mã băm (Hash) dựa trên mã nguồn đầu vào và môi trường. Nếu không có gì thay đổi, nó lập tức phát lại kết quả từ Cache.
• **Remote Caching trên Vercel**: Thay vì chỉ lưu Cache trên máy tính của bạn, kết quả Build và Test được tải lên Vercel Cloud Cache. Khi đồng nghiệp của bạn hoặc con bot CI/CD chạy build, nó sẽ tải ngay kết quả đó về mà không cần tốn 1 chu kỳ CPU nào.
• **Affected Apps Detection**: Vercel chỉ kích hoạt Deployment cho ứng dụng thực sự có thay đổi mã nguồn trong Monorepo, bỏ qua các ứng dụng không liên quan.`,
        codeBlock: {
          language: 'json',
          title: 'File Cấu Hình turbo.json Chuẩn Doanh Nghiệp',
          code: `{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Liên kết dự án Monorepo với Vercel Remote Cache',
        command: 'npx turbo link',
        description: 'Kích hoạt chia sẻ bộ nhớ đệm đám mây cho toàn bộ thành viên trong nhóm'
      },
      {
        title: 'Chạy build Monorepo tận dụng Remote Cache',
        command: 'npx turbo run build',
        description: 'Biên dịch toàn bộ ứng dụng trong monorepo với tốc độ tối đa'
      }
    ],
    masteryChecklist: [
      'Thiết lập kiến trúc Monorepo hiệu quả với Turborepo và pnpm workspaces.',
      'Kích hoạt tính năng Vercel Remote Caching để tối ưu hóa thời gian CI/CD.',
      'Làm chủ quy trình quản lý dự án quy mô lớn từ Local đến Production trên Vercel.'
    ]
  }
];
