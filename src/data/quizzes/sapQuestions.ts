import { QuizQuestion } from '../../types';

export const SAP_QUESTIONS: QuizQuestion[] = [
  {
    id: 'sap-1',
    certCode: 'SAP-C02',
    category: 'Mạng Hybrid Quy mô Lớn (Transit Gateway & Direct Connect)',
    difficulty: 'Chuyên gia',
    scenario: 'Một trường đại học lớn có 80 VPCs trên AWS thuộc các khoa nghiên cứu và 2 trung tâm dữ liệu On-premise tại 2 khuôn viên trường khác nhau kết nối qua mạng AWS Direct Connect 10 Gbps. Kiến trúc sư trưởng cần thiết lập mô hình định tuyến mạng tập trung (Hub-and-Spoke) cho phép các máy chủ On-premise kết nối an toàn với toàn bộ 80 VPCs và giữa các VPCs có thể giao tiếp với nhau theo chính sách kiểm soát tập trung. Giải pháp tối ưu nhất là gì?',
    options: [
      { id: 'A', text: 'Tạo 80 kết nối Virtual Private Gateway (VGW) riêng biệt trên từng VPC và tạo 80 Private Virtual Interfaces (VIF) trên Direct Connect.' },
      { id: 'B', text: 'Triển khai AWS Transit Gateway, tạo Transit Gateway attachments tới 80 VPCs, gắn Direct Connect Gateway với Transit Gateway bằng một Transit Virtual Interface (Transit VIF).' },
      { id: 'C', text: 'Tạo mạng lưới hình mạng nhện (Full-mesh) bằng VPC Peering giữa 80 VPCs và đặt máy chủ VPN EC2 trên từng VPC.' },
      { id: 'D', text: 'Sử dụng AWS PrivateLink để tạo Endpoints riêng cho từng máy chủ trong 80 VPCs.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'AWS Transit Gateway hoạt động như một Cloud Router tập trung theo mô hình Hub-and-Spoke. Kết hợp Transit Gateway với Direct Connect Gateway thông qua một Transit VIF cho phép hàng trăm VPC và nhiều trung tâm dữ liệu On-premise kết nối qua một điểm định tuyến duy nhất, hỗ trợ bảng định tuyến linh hoạt và loại bỏ giới hạn của Virtual Private Gateway.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Mỗi đường Direct Connect chỉ hỗ trợ tối đa 50 Private VIFs và việc quản lý 80 VGWs riêng rẽ là cơn ác mộng về vận hành.' },
        { optionId: 'C', reason: '80 VPCs kết nối full-mesh sẽ cần `(80 * 79) / 2 = 3,160` kết nối VPC Peering, không thể mở rộng và duy trì.' },
        { optionId: 'D', reason: 'PrivateLink chỉ dành cho việc chia sẻ từng dịch vụ microservice cụ thể, không dùng cho việc liên kết toàn diện hạ tầng mạng.' }
      ],
      examTip: 'Kết nối mạng quy mô lớn (hàng chục đến hàng trăm VPC) với Direct Connect / On-premise -> AWS Transit Gateway kết hợp Transit VIF trên Direct Connect Gateway.'
    }
  },
  {
    id: 'sap-2',
    certCode: 'SAP-C02',
    category: 'Di chuyển Cơ sở Dữ liệu & Hạn chế Downtime (DMS & SCT)',
    difficulty: 'Chuyên gia',
    scenario: 'Một viện nghiên cứu y sinh học tại trường đại học cần di chuyển hệ thống cơ sở dữ liệu quan hệ Oracle 12TB từ máy chủ On-premise sang Amazon Aurora PostgreSQL. Ứng dụng nghiên cứu chỉ cho phép thời gian gián đoạn (Downtime) tối đa 30 phút trong một đêm cuối tuần. Kiến trúc chuyển đổi nào đáp ứng yêu cầu này?',
    options: [
      { id: 'A', text: 'Sử dụng công cụ Oracle Data Pump xuất file dump 12TB, nén lại và tải lên S3 qua mạng Internet rồi import vào Aurora.' },
      { id: 'B', text: 'Dùng AWS Schema Conversion Tool (SCT) để chuyển đổi cấu trúc schema và stored procedures sang PostgreSQL; sau đó dùng AWS Database Migration Service (DMS) với chế độ Full Load + Ongoing Replication (CDC) đồng bộ liên tục trước khi chuyển đổi DNS trong 15 phút.' },
      { id: 'C', text: 'Đặt hàng một thiết bị AWS Snowball Edge để sao chép dữ liệu và gửi cho AWS import.' },
      { id: 'D', text: 'Sử dụng AWS Backup tạo bản sao lưu máy chủ On-premise và khôi phục trực tiếp sang Aurora PostgreSQL.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'Di chuyển giữa hai hệ quản trị CSDL khác nhau (Heterogeneous Migration từ Oracle sang PostgreSQL) cần AWS SCT để chuyển đổi cú pháp SQL/Schema. Sau đó, AWS DMS chạy chế độ Full Load (tải dữ liệu ban đầu) và liên tục lắng nghe các thay đổi mới qua Change Data Capture (CDC). Vào đêm cutover, cả hai database đã đồng bộ 100% dữ liệu thực, chỉ cần đổi chuỗi kết nối DNS trong 5-10 phút là hoàn tất mà không làm mất giao dịch nào.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'File dump 12TB qua Internet sẽ mất nhiều ngày và xuất dữ liệu Oracle không thể tự động nạp thẳng vào PostgreSQL do khác biệt cấu trúc.' },
        { optionId: 'C', reason: 'Snowball chỉ chuyển dữ liệu tĩnh, trong những ngày gửi thiết bị các giao dịch mới phát sinh trên On-premise sẽ bị bỏ sót.' },
        { optionId: 'D', reason: 'AWS Backup không hỗ trợ chuyển đổi định dạng engine cơ sở dữ liệu từ Oracle sang Aurora PostgreSQL.' }
      ],
      examTip: 'Di chuyển khác Engine Database (Heterogeneous) với thời gian chết tối thiểu (Near-zero downtime) -> Công thức vàng: AWS SCT (Schema) + AWS DMS (Full Load + CDC).'
    }
  },
  {
    id: 'sap-3',
    certCode: 'SAP-C02',
    category: 'Di chuyển Dữ liệu Lớn & Băng thông Thấp (Snowball Edge)',
    difficulty: 'Chuyên gia',
    scenario: 'Một viện nghiên cứu thiên văn học trực thuộc đại học sở hữu 800TB dữ liệu ảnh chụp vũ trụ tại máy chủ On-premise. Viện muốn di chuyển toàn bộ dữ liệu này lên Amazon S3 một lần duy nhất trong thời gian dưới 1 tuần nhưng đường truyền Internet tại trường chỉ có băng thông 100 Mbps. Giải pháp nào vừa tiết kiệm thời gian, vừa đảm bảo an toàn bảo mật dữ liệu?',
    options: [
      { id: 'A', text: 'Tải trực tiếp qua mạng Internet bằng lệnh `aws s3 sync` chạy liên tục ngày đêm.' },
      { id: 'B', text: 'Đặt hàng nhiều thiết bị vật lý AWS Snowball Edge Storage Optimized, sao chép dữ liệu cục bộ qua mạng LAN nội bộ tốc độ cao và gửi chuyển phát nhanh về trung tâm dữ liệu AWS.' },
      { id: 'C', text: 'Thiết lập AWS Storage Gateway Tape Gateway qua đường truyền Internet 100 Mbps.' },
      { id: 'D', text: 'Nén toàn bộ 800TB thành các file zip nhỏ và gửi email đính kèm lên AWS Support.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'Với 800TB dữ liệu trên đường truyền 100 Mbps, việc truyền tải qua Internet sẽ mất hơn 740 ngày (hơn 2 năm) để hoàn thành! AWS Snowball Edge Storage Optimized (mỗi thiết bị chứa ~80TB) cho phép sao chép dữ liệu qua mạng LAN 10 Gbps trong vài giờ và vận chuyển vật lý bằng dịch vụ bưu chính bảo mật tới AWS để nạp trực tiếp vào S3 trong vòng vài ngày.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Giới hạn vật lý của băng thông mạng 100 Mbps không thể truyền tải 800TB trong 1 tuần.' },
        { optionId: 'C', reason: 'Storage Gateway vẫn phụ thuộc vào đường truyền mạng 100 Mbps, không giải quyết được vấn đề băng thông.' },
        { optionId: 'D', reason: 'Email không hỗ trợ gửi file dung lượng lớn và vi phạm quy trình vận hành bảo mật.' }
      ],
      examTip: 'Quy tắc ngón tay cái trong đề thi AWS: Dữ liệu từ hàng chục TB đến dưới 10PB với băng thông mạng hạn chế -> Chọn AWS Snowball Edge. Dữ liệu trên 10PB -> Chọn AWS Snowmobile.'
    }
  }
];
