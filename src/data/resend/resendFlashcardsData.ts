import { ResendFlashcard } from '../../types/resendModule';

export const RESEND_FLASHCARDS: ResendFlashcard[] = [
  {
    id: 'r-fc-1',
    term: 'React Email',
    definition: 'Bộ thư viện React components chuẩn TypeScript giúp thiết kế template email dạng component tái sử dụng, tương thích 100% các ứng dụng đọc email toàn cầu.',
    category: 'react_email_templates',
    exampleOrAnalogy: 'Như các khối xếp hình Lego: Bạn ghép các thẻ <Html>, <Container>, <Button> lại để tạo thành giao diện email hoàn chỉnh mà không cần viết thẻ table lồng nhau.',
    proTip: 'Sử dụng lệnh npx email dev để xem trước giao diện và kiểm tra hiển thị trên thiết bị di động.'
  },
  {
    id: 'r-fc-2',
    term: 'Idempotency Key',
    definition: 'Khóa định danh bất biến truyền trong Header giúp Resend đảm bảo một yêu cầu gửi email chỉ được thực thi DUY NHẤT 1 LẦN ngay cả khi client gửi lại nhiều lần.',
    category: 'idempotency_batch_limits',
    exampleOrAnalogy: 'Như chiếc vé xem phim có in số ghế: Dù bạn có chìa chiếc vé đó ra 10 lần tại cửa soát vé, bạn cũng chỉ được vào ngồi đúng 1 ghế đó.',
    proTip: 'Luôn sinh Idempotency Key duy nhất cho các luồng gửi OTP, hóa đơn và biên lai thanh toán.'
  },
  {
    id: 'r-fc-3',
    term: 'Resend Webhooks (Svix)',
    definition: 'Cơ chế đẩy thông báo sự kiện thời gian thực (delivered, bounced, complained, opened, clicked) từ Resend về máy chủ của bạn có xác thực chữ ký bảo mật.',
    category: 'webhooks_event_pipeline',
    exampleOrAnalogy: 'Như chuông báo bưu tá: Ngay khi thư đến tay người nhận hoặc bị trả về vì sai địa chỉ, bưu tá lập tức nhấn chuông báo cho bạn biết.',
    proTip: 'Luôn dùng thư viện svix để xác thực chữ ký svix-signature tránh bị giả mạo request.'
  },
  {
    id: 'r-fc-4',
    term: 'Inbound Email Parsing',
    definition: 'Tính năng tiếp nhận email gửi đến tên miền của bạn, tự động bóc tách tiêu đề, người gửi, nội dung chữ và file đính kèm thành dữ liệu JSON gửi về webhook.',
    category: 'inbound_routing_parsing',
    exampleOrAnalogy: 'Như một trợ lý thư ký tự động mở phong bì thư, đọc nội dung và nhập liệu vào bảng tính cho bạn.',
    proTip: 'Rất hữu ích cho các tính năng "Reply to comment" qua email hoặc tự động nạp vé hỗ trợ (Ticket).'
  },
  {
    id: 'r-fc-5',
    term: 'Batch Sending (resend.batch.send)',
    definition: 'Khả năng gửi đồng thời lên tới 100 email với nội dung và người nhận khác nhau trong đúng MỘT lời gọi API duy nhất.',
    category: 'idempotency_batch_limits',
    exampleOrAnalogy: 'Như việc gom 100 phong bì thư vào một chiếc thùng bưu phẩm lớn để gửi đi trong một chuyến xe thay vì chạy 100 chuyến riêng lẻ.',
    proTip: 'Giúp giảm thiểu độ trễ mạng và không lo vượt ngưỡng Rate Limit khi gửi thông báo hàng loạt.'
  },
  {
    id: 'r-fc-6',
    term: 'Resend Audiences & Broadcasts',
    definition: 'Hệ thống quản lý danh bạ khách hàng, phân khúc nhóm và gửi các chiến dịch bản tin tiếp thị qua API kèm cơ chế tự động xử lý Hủy đăng ký (Unsubscribe).',
    category: 'audiences_broadcasts',
    exampleOrAnalogy: 'Như danh bạ điện thoại thông minh tự động phân nhóm bạn bè, đồng nghiệp và khách hàng để gửi tin nhắn thông báo chung.',
    proTip: 'Đồng bộ người dùng mới vào Audience ngay khi họ đăng ký tài khoản qua API resend.contacts.create().'
  }
];
