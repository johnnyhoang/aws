import { SupabaseChapter } from '../../types/supabaseModule';

export const SUPABASE_CHAPTERS: SupabaseChapter[] = [
  {
    id: 'supabase-ch1-philosophy-postgres-architecture',
    chapterNumber: 1,
    title: 'Triết Lý Supabase: "The Open Source Firebase Alternative" & Sức Mạnh Postgres',
    subtitle: 'Tại sao việc xây dựng trên một cơ sở dữ liệu Postgres thực thụ giúp bạn không bao giờ bị khóa chặt (Vendor Lock-in) như Firebase NoSQL.',
    level: 'Cơ bản',
    readTimeMinutes: 14,
    category: 'overview_philosophy',
    summary: 'Supabase không phải là một công nghệ độc quyền mới lạ, mà là sự kết hợp hoàn hảo của các công cụ mã nguồn mở tốt nhất thế giới (PostgreSQL, PostgREST, GoTrue, Realtime, Kong Gateway) để cung cấp trải nghiệm Backend-as-a-Service (BaaS) đỉnh cao.',
    hookStory: 'Năm 2020, hàng ngàn công ty khởi nghiệp đau đầu vì chi phí Firebase tăng vọt không kiểm soát và cấu trúc dữ liệu NoSQL lỏng lẻo khiến việc truy vấn phân tích quan hệ (JOIN) trở thành thảm họa. Hai nhà sáng lập Paul Copplestone và Ant Wilson nảy ra ý tưởng: "Tại sao không lấy PostgreSQL — hệ cơ sở dữ liệu quan hệ mạnh mẽ, tin cậy nhất 30 năm qua — rồi bọc quanh nó một bộ API RESTful tự động sinh, hệ thống Auth và Realtime?". Supabase ra đời và trở thành dự án mã nguồn mở phát triển nhanh nhất lịch sử GitHub.',
    sections: [
      {
        heading: '1. Kiến Trúc Mở Đẳng Cấp Của Supabase',
        subheading: 'Giải mã các mảnh ghép nguồn mở bên trong',
        content: `Supabase tập hợp các công nghệ mã nguồn mở hàng đầu:
• **PostgreSQL**: Trái tim của hệ thống. Bạn có toàn quyền truy cập của một Superuser Postgres (extensions, triggers, stored procedures, RLS).
• **PostgREST**: Biến toàn bộ schema bảng SQL thành các REST API Endpoints tức thì với tốc độ C/Haskell cực nhanh.
• **GoTrue (Supabase Auth)**: Máy chủ quản lý danh tính và phiên đăng nhập (JWT, OAuth, Magic Links).
• **Realtime Engine (Elixir)**: Lắng nghe nhật ký thay đổi Postgres WAL (Write-Ahead Log) và phát sóng sự kiện qua WebSockets tới hàng triệu client.
• **Storage API**: Dịch vụ REST API quản lý file đính kèm lưu trên S3 tương thích.`,
        mindsetShift: {
          from: 'Nghĩ rằng Supabase là một công nghệ đóng như Firebase, nếu công ty lớn lên sẽ phải đập đi xây lại.',
          to: 'Hiểu rằng bên dưới Supabase là 100% PostgreSQL chuẩn. Bạn có thể xuất file SQL dump và chuyển sang AWS RDS, Docker riêng bất cứ lúc nào.',
          impact: 'Không bao giờ bị Vendor Lock-in và tự do mở rộng quy mô vô hạn.'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Cài đặt Supabase CLI toàn cục',
        command: 'npm install -g supabase',
        description: 'Cài đặt công cụ dòng lệnh chính thức để quản trị và phát triển cục bộ'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ sự khác biệt giữa kiến trúc SQL của Supabase và NoSQL của Firebase.',
      'Nắm vững các thành phần cốt lõi: PostgreSQL, PostgREST, GoTrue, Realtime Engine.',
      'Đăng ký tài khoản và khởi tạo dự án Supabase đầu tiên.'
    ]
  },
  {
    id: 'supabase-ch2-postgres-tables-views',
    chapterNumber: 2,
    title: 'Postgres SQL Nền Tảng: Tables, Foreign Keys, Views & Generated Columns',
    subtitle: 'Khai thác triệt để sức mạnh của mô hình quan hệ: Khóa ngoại ràng buộc, Generated Columns, View bảo mật và truy vấn PostgREST tự động.',
    level: 'Cơ bản',
    readTimeMinutes: 15,
    category: 'postgres_tables_views',
    summary: 'Dữ liệu có cấu trúc là nền tảng của mọi phần mềm chuyên nghiệp. Với Supabase Studio, bạn có thể thiết kế bảng trực quan hoặc viết mã SQL thuần để tận dụng tối đa sức mạnh của PostgreSQL.',
    hookStory: 'Một lập trình viên quen dùng NoSQL lưu danh sách đơn hàng vào mảng JSON trong document người dùng. Sau 6 tháng, tài liệu phình to vượt quá 16MB và không thể lọc ra "Những ai đã mua sản phẩm X". Bằng cách chuyển sang Supabase với quan hệ Khóa ngoại (Foreign Key) \`user_id REFERENCES auth.users(id)\`, các truy vấn báo cáo tài chính hàng triệu dòng chạy vèo vèo trong 5 mili-giây.',
    sections: [
      {
        heading: '1. Tạo Bảng Quan Hệ & Khóa Ngoại Khớp Với auth.users',
        subheading: 'Mô hình User Profiles chuẩn mực trong Supabase',
        content: `Trong Supabase, bảng thông tin đăng nhập của người dùng nằm ở schema nội bộ \`auth.users\`. Để lưu thông tin mở rộng của người dùng (tên, avatar, vai trò), bạn tạo bảng \`public.profiles\` liên kết khóa ngoại với \`auth.users\`.`,
        codeBlock: {
          language: 'sql',
          title: 'Khởi Tạo Bảng Profiles Và Tự Động Đồng Bộ Khi Người Dùng Đăng Ký',
          code: `-- 1. Tạo bảng profiles trong schema public
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tạo Trigger tự động sinh bản ghi profile khi có user mới đăng ký
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', 'Thành viên mới'), 
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Chạy script SQL trực tiếp trên Supabase Dashboard',
        command: 'supabase db push',
        description: 'Đẩy các file migration SQL từ máy local lên cơ sở dữ liệu đám mây'
      }
    ],
    masteryChecklist: [
      'Thiết kế bảng quan hệ chuẩn với Primary Key UUID và Foreign Key.',
      'Tạo Database Trigger đồng bộ dữ liệu tự động giữa auth.users và public.profiles.',
      'Sử dụng PostgREST để truy vấn dữ liệu quan hệ qua supabase-js client.'
    ]
  },
  {
    id: 'supabase-ch3-rls-security-policies',
    chapterNumber: 3,
    title: 'Row Level Security (RLS): Linh Hồn Bảo Mật Của Supabase',
    subtitle: 'Tại sao bạn có thể gọi Database trực tiếp từ Frontend trình duyệt mà không sợ lộ dữ liệu nhờ các chính sách RLS Policies cấp độ hàng.',
    level: 'Nâng cao',
    readTimeMinutes: 18,
    category: 'rls_security_policies',
    summary: 'Row Level Security (RLS) là tính năng bảo mật tối thượng của PostgreSQL. Khi bật RLS, Postgres sẽ tự động kiểm tra xem JWT Token của người dùng hiện tại (auth.uid()) có quyền SELECT, INSERT, UPDATE, DELETE trên từng dòng dữ liệu hay không.',
    hookStory: 'Một sinh viên hỏi thầy giáo: "Em nghe nói không bao giờ được gọi Database trực tiếp từ React hay Flutter, phải viết API Backend trung gian để kiểm tra quyền chứ?". Thầy giáo mỉm cười: "Đó là với các cơ sở dữ liệu cũ. Với Supabase RLS, chính cỗ máy PostgreSQL ở tầng sâu nhất sẽ chặn đứng mọi truy vấn bất hợp pháp bằng toán tử \`auth.uid() = user_id\`. Dù hacker có sửa code JavaScript trên trình duyệt, họ cũng không bao giờ đọc trộm được dữ liệu của người khác!".',
    sections: [
      {
        heading: '1. Bật RLS Và Bốn Thao Tác CRUD Cơ Bản',
        subheading: 'Cú pháp chuẩn của các chính sách RLS Policy',
        content: `Khi tạo một bảng mới trong schema \`public\`, mặc định RLS chưa được bật. Bạn BẮT BUỘC phải bật RLS:
\`ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;\`

Sau khi bật RLS, nếu không có chính sách nào được định nghĩa, **mặc định KHÔNG AI có quyền đọc hoặc ghi bất kỳ dữ liệu nào** (Deny All).`,
        codeBlock: {
          language: 'sql',
          title: 'Bộ Chính Sách RLS Mẫu Cho Bảng Tài Liệu Cá Nhân',
          code: `-- 1. Bật RLS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- 2. Chính sách xem: Người dùng chỉ được xem tài liệu do chính mình tạo (hoặc tài liệu công khai)
CREATE POLICY "Users can view their own documents or public ones"
ON public.documents FOR SELECT
USING (
  auth.uid() = user_id OR is_public = true
);

-- 3. Chính sách thêm mới: Người dùng chỉ được chèn bản ghi có user_id khớp với auth.uid()
CREATE POLICY "Users can insert their own documents"
ON public.documents FOR INSERT
WITH CHECK (
  auth.uid() = user_id
);

-- 4. Chính sách cập nhật: Chỉ chủ sở hữu mới được sửa
CREATE POLICY "Users can update their own documents"
ON public.documents FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 5. Chính sách xóa: Chỉ chủ sở hữu mới được xóa
CREATE POLICY "Users can delete their own documents"
ON public.documents FOR DELETE
USING (auth.uid() = user_id);`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Kiểm tra danh sách các chính sách RLS đang áp dụng trên bảng',
        command: 'SELECT * FROM pg_policies WHERE tablename = \'documents\';',
        description: 'Truy vấn danh mục các quyền RLS SELECT, INSERT, UPDATE, DELETE'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ nguyên lý hoạt động của hàm auth.uid() và auth.jwt().',
      'Phân biệt rõ ràng giữa mệnh đề USING (cho SELECT/DELETE) và WITH CHECK (cho INSERT/UPDATE).',
      'Luôn bật RLS trên tất cả các bảng trong schema public trước khi đưa vào Production.'
    ]
  },
  {
    id: 'supabase-ch4-auth-oauth-mfa',
    chapterNumber: 4,
    title: 'Supabase Auth Toàn Diện: OAuth, Magic Links & PKCE Flow',
    subtitle: 'Triển khai hệ thống đăng nhập bảo mật cấp ngân hàng: Đăng nhập Google/GitHub một chạm, Email OTP và cơ chế trao đổi mã PKCE an toàn.',
    level: 'Trung bình',
    readTimeMinutes: 16,
    category: 'auth_oauth_mfa',
    summary: 'Supabase Auth (GoTrue) cung cấp giải pháp xác thực người dùng hoàn chỉnh, hỗ trợ hơn 20 nhà cung cấp OAuth (Google, GitHub, Apple, Facebook), cơ chế Refresh Token xoay vòng tự động và chuẩn bảo mật PKCE cho Single Page Apps & Server-side Next.js.',
    hookStory: 'Bạn cần làm tính năng "Đăng nhập bằng Google" cho ứng dụng Next.js. Trước đây bạn phải loay hoay cài đặt NextAuth, cấu hình Session, tự lưu JWT vào Cookie và đau đầu xử lý CSRF. Với Supabase Auth, bạn chỉ cần gọi \`supabase.auth.signInWithOAuth({ provider: "google" })\`, hệ thống tự lo toàn bộ luồng trao đổi mã PKCE và trả về phiên đăng nhập đã được ký số an toàn.',
    sections: [
      {
        heading: '1. Luồng Xác Thực Google OAuth Trong Next.js App Router',
        subheading: 'Xử lý trao đổi mã code lấy phiên đăng nhập (Route Handler)',
        content: `Khi người dùng đăng nhập Google, Google chuyển hướng người dùng về trang callback của bạn kèm một mã \`code\`. Route Handler sẽ đổi mã này lấy Session JWT và lưu an toàn vào HttpOnly Cookie.`,
        codeBlock: {
          language: 'typescript',
          title: 'Route Handler Xử Lý OAuth Callback (app/auth/callback/route.ts)',
          code: `import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    // Đổi authorization code lấy JWT session
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Chuyển hướng người dùng vào trang Dashboard
  return NextResponse.redirect(new URL('/dashboard', request.url));
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Cài đặt bộ thư viện Supabase Client và Auth Helpers cho Next.js',
        command: 'npm install @supabase/supabase-js @supabase/ssr',
        description: 'Cài đặt bộ SDK chính thức tối ưu hóa cho Server Components và Client Components'
      }
    ],
    masteryChecklist: [
      'Triển khai thành thạo luồng đăng nhập Google OAuth với PKCE flow.',
      'Sử dụng @supabase/ssr để quản lý Cookie session nhất quán giữa Server và Client.',
      'Lấy thông tin người dùng an toàn qua supabase.auth.getUser() thay vì getSession() trên server.'
    ]
  },
  {
    id: 'supabase-ch5-realtime-cdc-broadcast',
    chapterNumber: 5,
    title: 'Realtime Subscriptions & Postgres CDC: Đồng Bộ Thời Gian Thực',
    subtitle: 'Biến cơ sở dữ liệu tĩnh thành luồng dữ liệu sống động: Lắng nghe thay đổi INSERT/UPDATE/DELETE (CDC), gửi tin nhắn Broadcast và theo dõi Presence.',
    level: 'Nâng cao',
    readTimeMinutes: 16,
    category: 'realtime_cdc_broadcast',
    summary: 'Supabase Realtime được xây dựng trên ngôn ngữ Elixir/Erlang hiệu năng cao, cho phép hàng triệu kết nối WebSocket đồng thời. Bạn có thể lắng nghe từng thay đổi trong bảng database, gửi thông điệp Broadcast ngang hàng hoặc đếm số người đang online (Presence).',
    hookStory: 'Bạn xây dựng một ứng dụng chat nhóm hoặc theo dõi vị trí tài xế giao hàng. Mỗi khi tài xế di chuyển hoặc khách hàng nhắn tin, một dòng mới được INSERT vào bảng \`messages\`. Nhờ Supabase Realtime, toàn bộ các máy điện thoại đang mở màn hình lập tức cập nhật giao diện trong vòng 15 mili-giây mà không cần người dùng phải bấm F5 tải lại trang.',
    sections: [
      {
        heading: '1. Ba Chế Độ Hoạt Động Của Supabase Realtime',
        subheading: 'Postgres Changes, Broadcast và Presence',
        content: `• **Postgres Changes (CDC - Change Data Capture)**: Lắng nghe trực tiếp các thao tác INSERT, UPDATE, DELETE trên một bảng cụ thể (có tôn trọng các chính sách bảo mật RLS!).
• **Broadcast (Ephemeral Messaging)**: Gửi các thông điệp nhẹ nhàng tức thời giữa các client mà không cần lưu vào Database (ví dụ: con trỏ chuột của người dùng đang di chuyển, hiệu ứng pháo hoa chúc mừng).
• **Presence (State Synchronization)**: Theo dõi trạng thái trực tuyến của người dùng ("Alex đang online", "Sarah đang gõ phím...").`,
        codeBlock: {
          language: 'typescript',
          title: 'Lắng Nghe Tin Nhắn Mới Thời Gian Thực Bằng supabase-js',
          code: `import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// Lắng nghe các tin nhắn mới được INSERT vào phòng chat room_102
const channel = supabase
  .channel('chat-room-102')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: 'room_id=eq.room_102',
    },
    (payload) => {
      console.log('Tin nhắn mới nhận được:', payload.new);
      // Cập nhật State React hiển thị tin nhắn ngay tức thì!
    }
  )
  .subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      console.log('Đã kết nối thành công tới kênh Realtime!');
    }
  });`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Bật tính năng Realtime cho bảng dữ liệu qua SQL',
        command: 'ALTER PUBLICATION supabase_realtime ADD TABLE messages;',
        description: 'Đưa bảng messages vào luồng phát sóng Postgres CDC của Supabase'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ cơ chế lắng nghe sự kiện qua Postgres Write-Ahead Log (WAL).',
      'Sử dụng thành thạo kênh Broadcast và Presence cho trải nghiệm cộng tác.',
      'Biết cách hủy đăng ký kênh (channel.unsubscribe()) khi component unmount để tránh rò rỉ bộ nhớ.'
    ]
  },
  {
    id: 'supabase-ch6-storage-buckets-presigned',
    chapterNumber: 6,
    title: 'Supabase Storage: Quản Lý File, RLS Policies & Presigned URLs',
    subtitle: 'Lưu trữ hàng triệu hình ảnh, video và tài liệu an toàn tuyệt đối với Public/Private Buckets, tự động nén ảnh qua Image Transformation và sinh URL tạm thời.',
    level: 'Trung bình',
    readTimeMinutes: 15,
    category: 'storage_buckets_presigned',
    summary: 'Supabase Storage kết hợp khả năng lưu trữ đối tượng (Object Storage S3-compatible) với sức mạnh phân quyền của PostgreSQL RLS. Bạn có thể viết các chính sách SQL để quy định ai được phép upload, ai được phép xem từng thư mục file.',
    hookStory: 'Một ứng dụng khám chữa bệnh cần lưu trữ ảnh chụp X-Quang của bệnh nhân. Đây là dữ liệu y tế nhạy cảm (Private). Nếu lưu trên S3 công khai, ai có link cũng xem được. Với Supabase Storage, bucket được đặt ở chế độ Private và bảo vệ bởi RLS Policy: Bác sĩ chỉ có thể tạo một Presigned URL có hạn sử dụng 60 giây để gửi cho bệnh nhân xem, sau 60 giây liên kết tự động vô hiệu hóa vĩnh viễn.',
    sections: [
      {
        heading: '1. Phân Biệt Public Bucket vs Private Bucket',
        subheading: 'Chiến lược lưu trữ an toàn cho từng loại tài nguyên',
        content: `• **Public Bucket**: Dành cho tài sản tĩnh công khai (ảnh đại diện, logo sản phẩm, banner website). Bất kỳ ai có URL đều xem được, được lưu đệm trên CDN.
• **Private Bucket**: Dành cho tài liệu nhạy cảm (hóa đơn, CMND/CCCD, hồ sơ mật). Bắt buộc phải có JWT Token hợp lệ hoặc sử dụng **Presigned URL (Signed URL)** có thời hạn hết hạn.`,
        codeBlock: {
          language: 'typescript',
          title: 'Tạo Presigned URL Cho File Riêng Tư Có Hạn 60 Giây',
          code: `// Sinh Signed URL cho file riêng tư trong Private Bucket
const { data, error } = await supabase
  .storage
  .from('medical-records')
  .createSignedUrl('patient-123/xray.png', 60); // Hết hạn sau 60 giây

if (data) {
  console.log('Link xem tạm thời an toàn:', data.signedUrl);
}`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Tải file lên Supabase Storage qua JavaScript SDK',
        command: 'await supabase.storage.from("avatars").upload("user_1.png", fileBody);',
        description: 'Thao tác upload file trực tiếp từ Client hoặc Server-side'
      }
    ],
    masteryChecklist: [
      'Phân biệt rõ bài toán sử dụng Public Bucket và Private Bucket.',
      'Viết chính sách RLS cho bảng storage.objects để kiểm soát quyền tải/xóa file.',
      'Sử dụng createSignedUrl() để chia sẻ file nhạy cảm an toàn.'
    ]
  },
  {
    id: 'supabase-ch7-edge-functions-deno',
    chapterNumber: 7,
    title: 'Supabase Edge Functions: Serverless TypeScript Trên Deno Runtime',
    subtitle: 'Chạy mã backend tùy biến gần người dùng nhất: Xử lý thanh toán Stripe Webhook, gọi OpenAI API và tích hợp Deno KV.',
    level: 'Nâng cao',
    readTimeMinutes: 16,
    category: 'edge_functions_deno',
    summary: 'Supabase Edge Functions chạy trên nền tảng Deno Runtime phân tán toàn cầu, hỗ trợ TypeScript nguyên bản mà không cần bước build, thời gian Cold Start cực nhanh và tích hợp sẵn biến môi trường kết nối Supabase.',
    hookStory: 'Bạn cần tích hợp cổng thanh toán Stripe. Khi người dùng thanh toán thành công, Stripe gửi một Webhook POST. Bạn không muốn dựng một máy chủ Node.js Express cồng kềnh chỉ để hứng webhook này. Bạn viết một Supabase Edge Function \`stripe-webhook\` chỉ với 40 dòng code TypeScript, triển khai trong 3 giây và nó tự động chạy trên 30 địa điểm biên toàn cầu.',
    sections: [
      {
        heading: '1. Cấu Trúc Một Supabase Edge Function',
        subheading: 'Xử lý request với chuẩn Web Standards (Deno.serve)',
        content: `Edge Functions sử dụng API \`Deno.serve\` tiêu chuẩn. Mỗi function có thể đọc trực tiếp các biến môi trường bí mật (Secrets) và sử dụng \`createClient\` để tương tác với Database với quyền Admin (Service Role Key) khi cần vượt qua RLS.`,
        codeBlock: {
          language: 'typescript',
          title: 'Edge Function Xử Lý Gọi AI Tạo Tóm Tắt (supabase/functions/summarize/index.ts)',
          code: `import { createClient } from 'jsr:@supabase/supabase-js@2';

Deno.serve(async (req) => {
  // Xử lý CORS cho trình duyệt
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  try {
    const { text } = await req.json();

    // Kết nối Supabase với Service Role Key để ghi log quản trị
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const summary = \`Tóm tắt: \${text.slice(0, 100)}...\`;

    return new Response(JSON.stringify({ summary }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
});`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Triển khai Edge Function lên Supabase Cloud',
        command: 'supabase functions deploy summarize',
        description: 'Build và đẩy mã nguồn function lên mạng lưới Edge toàn cầu của Supabase'
      },
      {
        title: 'Chạy thử nghiệm Edge Function trên máy cục bộ',
        command: 'supabase functions serve summarize --no-verify-jwt',
        description: 'Chạy function cục bộ trên localhost:54321 để debug nhanh'
      }
    ],
    masteryChecklist: [
      'Viết và kiểm thử Supabase Edge Functions bằng Deno và TypeScript.',
      'Quản trị biến môi trường bảo mật bằng lệnh supabase secrets set.',
      'Xử lý tiêu đề CORS chuẩn mực cho các lời gọi từ Single Page App.'
    ]
  },
  {
    id: 'supabase-ch8-pgvector-ai-embeddings',
    chapterNumber: 8,
    title: 'Vector Database Với pgvector: Xây Dựng Ứng Dụng AI & Semantic Search',
    subtitle: 'Biến Postgres thành cơ sở dữ liệu Vector mạnh mẽ: Lưu trữ Embeddings, tìm kiếm tương đồng Cosine Distance và xây dựng hệ thống RAG (Retrieval-Augmented Generation).',
    level: 'Chuyên gia',
    readTimeMinutes: 18,
    category: 'pgvector_ai_embeddings',
    summary: 'Nhờ tiện ích mở rộng pgvector, bạn không cần phải mua thêm các dịch vụ Vector Database đắt đỏ như Pinecone hay Weaviate. Bạn có thể lưu trữ trực tiếp các vector nhúng (embeddings) 1536 chiều của OpenAI ngay trong cùng một bảng dữ liệu người dùng của PostgreSQL.',
    hookStory: "Khách hàng gõ vào ô tìm kiếm: \"Bộ đồ ấm áp đi du lịch Sa Pa mùa đông\". Nếu dùng tìm kiếm từ khóa SQL truyền thống (WHERE title ILIKE '%ấm áp%'), kết quả trả về bằng 0 vì trong kho chỉ có sản phẩm tên \"Áo khoác phao lông vũ chống tuyết\". Nhưng với pgvector Semantic Search, mô hình AI hiểu được ý nghĩa ngữ nghĩa tương đồng giữa \"ấm áp\" và \"áo khoác lông vũ\" và trả về kết quả chính xác 100% trong 8 mili-giây.",
    sections: [
      {
        heading: '1. Kích Hoạt Extension pgvector & Tạo Chỉ Mục HNSW',
        subheading: 'Tối ưu hóa tốc độ tìm kiếm hàng triệu vector trong mili-giây',
        content: `1. Bật extension: \`CREATE EXTENSION IF NOT EXISTS vector;\`
2. Tạo cột kiểu \`vector(1536)\` (khớp với mô hình text-embedding-3-small của OpenAI).
3. Sử dụng toán tử tìm khoảng cách Cosine \`<=>\` hoặc Inner Product \`<#>\`.
4. Tạo chỉ mục **HNSW (Hierarchical Navigable Small World)** để tăng tốc độ tìm kiếm gấp 100 lần.`,
        codeBlock: {
          language: 'sql',
          title: 'Hàm SQL Tìm Kiếm Tài Liệu Tương Đồng Ngữ Nghĩa (Match Documents)',
          code: `-- 1. Bật extension vector
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Tạo bảng lưu trữ tài liệu kèm vector nhúng 1536 chiều
CREATE TABLE public.documents_ai (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding vector(1536)
);

-- 3. Tạo chỉ mục HNSW siêu tốc
CREATE INDEX ON public.documents_ai USING hnsw (embedding vector_cosine_ops);

-- 4. Viết hàm Database Function để gọi từ frontend
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id bigint,
  content text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    documents_ai.id,
    documents_ai.content,
    1 - (documents_ai.embedding <=> query_embedding) AS similarity
  FROM documents_ai
  WHERE 1 - (documents_ai.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Gọi hàm tìm kiếm Vector từ JavaScript client qua RPC',
        command: 'const { data } = await supabase.rpc("match_documents", { query_embedding: embeddingVector, match_threshold: 0.78, match_count: 5 });',
        description: 'Thực thi tìm kiếm ngữ nghĩa tương đồng trực tiếp qua PostgREST RPC'
      }
    ],
    masteryChecklist: [
      'Bật và sử dụng thành thạo extension pgvector trên Postgres.',
      'Tạo chỉ mục HNSW để tối ưu hóa truy vấn tìm kiếm vector.',
      'Xây dựng quy trình RAG (Retrieval-Augmented Generation) hoàn chỉnh với OpenAI và Supabase.'
    ]
  },
  {
    id: 'supabase-ch9-webhooks-triggers-automation',
    chapterNumber: 9,
    title: 'Database Triggers & Webhooks: Tự Động Hóa Xử Lý Dữ Liệu',
    subtitle: 'Kết nối cơ sở dữ liệu với thế giới bên ngoài: Tự động gửi thông báo Discord/Slack khi có đơn hàng mới, kích hoạt hàm ngầm và đồng bộ Stripe.',
    level: 'Nâng cao',
    readTimeMinutes: 16,
    category: 'webhooks_triggers_automation',
    summary: 'Supabase Database Webhooks cho phép PostgreSQL tự động phát tín hiệu HTTP POST tới bất kỳ API bên ngoài (Edge Function, Zapier, Make, Slack) mỗi khi có bản ghi mới được tạo hoặc cập nhật.',
    hookStory: 'Một khách hàng vừa đặt đơn hàng trị giá 10.000 USD trên website của bạn. Ngay khoảnh khắc dòng dữ liệu rơi vào bảng \`orders\`, một Database Webhook tự động bắn tin nhắn vào kênh Slack của ban giám đốc kèm tiếng chuông reo mừng, đồng thời gọi Edge Function kích hoạt xuất hóa đơn điện tử tự động.',
    sections: [
      {
        heading: '1. Sự Khác Biệt Giữa SQL Triggers Và Database Webhooks',
        subheading: 'Xử lý nội bộ trong DB vs Gọi API ra bên ngoài',
        content: `• **SQL Triggers (PL/pgSQL)**: Chạy đồng bộ bên trong Postgres. Phù hợp cho việc tính toán tổng tiền, tự động gán ngày \`updated_at = now()\`, kiểm tra tính toàn vẹn dữ liệu.
• **Database Webhooks (pg_net)**: Chạy bất đồng bộ, gửi HTTP Request ra mạng Internet mà không làm chậm giao dịch ghi của database.`,
        codeBlock: {
          language: 'sql',
          title: 'Gửi HTTP Request Bất Đồng Bộ Bằng Tiện Ích pg_net',
          code: `-- Kích hoạt extension pg_net
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Gửi HTTP POST request ra ngoài từ bên trong SQL Trigger
CREATE OR REPLACE FUNCTION notify_order_created()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://api.yourdomain.com/webhooks/order-created',
    body := json_build_object('order_id', NEW.id, 'amount', NEW.total_amount)::text,
    headers := '{"Content-Type": "application/json"}'::jsonb
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Xem danh sách các HTTP request đang được gửi qua pg_net',
        command: 'SELECT * FROM net._http_response;',
        description: 'Kiểm tra trạng thái phản hồi và mã lỗi của các webhook vừa gửi'
      }
    ],
    masteryChecklist: [
      'Phân biệt rõ bài toán của SQL Triggers và Database Webhooks.',
      'Sử dụng extension pg_net để gọi API bất đồng bộ từ trong database.',
      'Thiết lập Database Webhooks trực quan trên Supabase Dashboard.'
    ]
  },
  {
    id: 'supabase-ch10-cli-migrations-branching',
    chapterNumber: 10,
    title: 'Supabase CLI & Local Dev: Migrations, Seed Data & Reset Workflows',
    subtitle: 'Quy trình kỹ thuật chuẩn Enterprise: Chạy toàn bộ hệ sinh thái Supabase trên Docker cục bộ, quản lý lịch sử Migration và kịch bản Seed Data.',
    level: 'Chuyên gia',
    readTimeMinutes: 18,
    category: 'cli_migrations_branching',
    summary: 'Lập trình viên chuyên nghiệp không bao giờ sửa cấu trúc bảng trực tiếp trên Production Dashboard. Sử dụng Supabase CLI để chạy toàn bộ stack cục bộ (Docker), tạo các file migration có kiểm soát phiên bản Git và tự động hóa CI/CD testing.',
    hookStory: 'Một lập trình viên sơ ý bấm nút "Drop Column" trên giao diện Production Dashboard làm mất toàn bộ cột số điện thoại của 100.000 khách hàng. Sau sự cố đó, công ty áp dụng quy tắc nghiêm ngặt: Toàn bộ thay đổi phải được viết dưới dạng file \`supabase/migrations/timestamp_add_column.sql\`, test mượt mà trên máy local với \`supabase test db\`, mở Pull Request để Tech Lead review rồi mới chạy \`supabase db push\` lên Production.',
    sections: [
      {
        heading: '1. Vòng Đời Phát Triển Chuẩn Với Supabase CLI',
        subheading: 'Từ Local Docker đến Production Cloud',
        content: `1. **Khởi tạo dự án local**: \`supabase init\`
2. **Khởi động cụm container**: \`supabase start\` (Chạy đầy đủ Postgres, Auth, Storage, Realtime, Studio trên máy tính mà không cần Internet).
3. **Tạo file migration mới**: \`supabase migration new create_products_table\`
4. **Viết mã SQL vào file migration và áp dụng**: \`supabase db reset\` (Tự động chạy toàn bộ migrations và nạp dữ liệu mẫu từ file \`supabase/seed.sql\`).
5. **Đẩy lên Production**: \`supabase db push\`.`,
        codeBlock: {
          language: 'sql',
          title: 'File Nạp Dữ Liệu Mẫu Cục Bộ (supabase/seed.sql)',
          code: `-- Nạp sẵn người dùng mẫu để test nhanh trên máy cá nhân
INSERT INTO auth.users (id, email, raw_user_meta_data)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin@techmaster.io', '{"full_name": "Admin Tester"}'),
  ('00000000-0000-0000-0000-000000000002', 'user@techmaster.io', '{"full_name": "Normal User"}')
ON CONFLICT (id) DO NOTHING;`
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Khởi động môi trường Supabase đầy đủ trên máy cục bộ',
        command: 'supabase start',
        description: 'Kích hoạt toàn bộ cụm dịch vụ Supabase qua Docker trên máy tính'
      },
      {
        title: 'Tạo file migration ghi nhận các thay đổi cấu trúc bảng',
        command: 'supabase db diff -f add_new_features',
        description: 'Tự động so sánh sự khác biệt và sinh file migration SQL chuẩn xác'
      }
    ],
    masteryChecklist: [
      'Làm chủ quy trình phát triển Local-First với Supabase CLI và Docker.',
      'Quản lý lịch sử thay đổi cơ sở dữ liệu qua các file migrations có đánh số thứ tự.',
      'Sử dụng file seed.sql để tạo dữ liệu mẫu giúp toàn bộ đội ngũ có cùng môi trường kiểm thử.'
    ]
  }
];
