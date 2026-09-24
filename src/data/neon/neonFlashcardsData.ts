import { NeonFlashcard } from '../../types/neonModule';

export const NEON_FLASHCARDS: NeonFlashcard[] = [
  {
    id: 'n-fc-1',
    term: 'Tách Rời Compute & Storage',
    definition: 'Kiến trúc phân tách máy chủ tính toán (CPU/RAM phi trạng thái) khỏi cỗ máy lưu trữ (Pageserver & S3), cho phép hai thành phần này mở rộng độc lập.',
    category: 'storage_compute_separation',
    exampleOrAnalogy: 'Như việc tách biệt chiếc máy tính xách tay của bạn khỏi ổ đĩa đám mây Google Drive: Bạn có thể đổi máy tính mới bất kỳ lúc nào mà dữ liệu vẫn nguyên vẹn.',
    proTip: 'Giúp tiết kiệm chi phí tối đa vì bạn có thể tắt Compute khi không dùng trong khi Storage vẫn an toàn trên S3.'
  },
  {
    id: 'n-fc-2',
    term: 'Database Branching (Copy-on-Write)',
    definition: 'Khả năng tạo một nhánh Database mới độc lập chứa toàn bộ dữ liệu từ nhánh chính trong vòng 1 giây mà không tốn thêm dung lượng lưu trữ ban đầu.',
    category: 'database_branching',
    exampleOrAnalogy: 'Như việc tạo một nhánh git branch mới: Bạn có thể thoải mái sửa code và test thử mà nhánh main không hề bị ảnh hưởng.',
    proTip: 'Tích hợp tự động với GitHub Actions để mỗi Pull Request có một nhánh Database riêng biệt để kiểm thử.'
  },
  {
    id: 'n-fc-3',
    term: 'Scale-to-Zero (Suspend)',
    definition: 'Cơ chế tự động tắt máy tính toán (Compute) về mức 0 CU khi không có kết nối nào trong 5 phút và tự động đánh thức trong 500ms khi có kết nối mới.',
    category: 'autoscaling_scale_to_zero',
    exampleOrAnalogy: 'Như chiếc đèn cảm ứng thông minh ở hành lang: Tự tắt khi không có người và tự bật sáng ngay khi bạn bước tới.',
    proTip: 'Bật Scale-to-Zero cho tất cả các môi trường Staging và Dev để chi phí tính toán bằng $0 vào ban đêm.'
  },
  {
    id: 'n-fc-4',
    term: 'Transaction Pooling (PgBouncer)',
    definition: 'Bộ gom kết nối tích hợp sẵn hoạt động ở chế độ Transaction, cho phép mượn và trả kết nối vật lý ngay sau mỗi transaction để phục vụ hàng ngàn kết nối Serverless.',
    category: 'connection_pooling_pgbouncer',
    exampleOrAnalogy: 'Như một quán ăn có 20 chiếc bàn: Khách ăn xong một món là nhường bàn ngay cho người tiếp theo, giúp phục vụ hàng ngàn lượt khách mỗi ngày.',
    proTip: 'Luôn dùng chuỗi kết nối có tiền tố -pooler cho ứng dụng Next.js trên Vercel.'
  },
  {
    id: 'n-fc-5',
    term: 'Point-in-Time Recovery (PITR)',
    definition: 'Khả năng tái tạo và khôi phục trạng thái cơ sở dữ liệu về chính xác từng giây hoặc từng mã vị trí nhật ký LSN trong quá khứ.',
    category: 'point_in_time_recovery_time_travel',
    exampleOrAnalogy: 'Như cỗ máy thời gian quay lại đúng 5 giây trước khi bạn lỡ tay làm đổ cốc nước lên tài liệu quan trọng.',
    proTip: 'Tạo một nhánh mới từ mốc thời gian trước sự cố để cứu dữ liệu mà không cần restore backup.'
  },
  {
    id: 'n-fc-6',
    term: 'Neon Serverless Driver (@neondatabase/serverless)',
    definition: 'Thư viện client cho phép thực thi truy vấn SQL qua giao thức WebSockets và HTTP Fetch trong các môi trường Edge Runtime không hỗ trợ TCP Sockets.',
    category: 'serverless_driver_websockets',
    exampleOrAnalogy: 'Như một chiếc radio đặc biệt có thể bắt được sóng ở những nơi mà điện thoại di động thông thường không có sóng.',
    proTip: 'Dùng hàm neon() cho các truy vấn đơn lẻ trong Vercel Edge Middleware để có độ trễ thấp nhất.'
  }
];
