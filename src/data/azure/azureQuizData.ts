import { AzureQuizQuestion } from '../../types/azureModule';

export const AZURE_QUIZ_QUESTIONS: AzureQuizQuestion[] = [
  {
    id: 'az-q-1',
    category: 'identity_entra_id_security',
    difficulty: 'Nâng cao',
    scenario: 'Bạn đang triển khai một ứng dụng Web trên Azure App Service. Ứng dụng này cần đọc chuỗi kết nối Database mật lưu trữ trong Azure Key Vault. Trưởng nhóm bảo mật yêu cầu TUYỆT ĐỐI KHÔNG ĐƯỢC lưu trữ bất kỳ username, password, client_id hay secret nào trong mã nguồn hoặc biến môi trường .env.',
    question: 'Giải pháp kiến trúc chuẩn mực và an toàn nhất trên Azure để đáp ứng yêu cầu này là gì?',
    options: [
      {
        id: 'opt-a',
        text: 'Mã hóa mật khẩu bằng thuật toán Base64 rồi lưu vào file cấu hình web.config.',
        isCorrect: false
      },
      {
        id: 'opt-b',
        text: 'Kích hoạt System-Assigned Managed Identity trên App Service và gán quyền RBAC "Key Vault Secrets User" cho Identity đó trên tài nguyên Azure Key Vault.',
        isCorrect: true
      },
      {
        id: 'opt-c',
        text: 'Tạo một tài khoản cá nhân có quyền Administrator rồi lưu mật khẩu vào file text trên ổ đĩa D của server.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Mở quyền Public Access trên Azure Key Vault cho tất cả các địa chỉ IP trên thế giới.',
        isCorrect: false
      }
    ],
    explanation: 'System-Assigned Managed Identity tự động cấp cho App Service một danh tính số an toàn trong Microsoft Entra ID. Ứng dụng sử dụng thư viện Azure SDK (`DefaultAzureCredential`) để lấy token xác thực động và truy cập Key Vault mà không cần lưu trữ bất kỳ secret tĩnh nào.'
  },
  {
    id: 'az-q-2',
    category: 'networking_vnet_hybrid',
    difficulty: 'Trung bình',
    scenario: 'Đội ngũ của bạn cần thiết lập kết nối giữa `VNet-Production` (dải IP 10.10.0.0/16 tại Region Singapore) và `VNet-Analytics` (dải IP 10.20.0.0/16 tại Region Tokyo) để truyền tải lượng lớn dữ liệu mỗi ngày với độ trễ thấp nhất và không muốn dữ liệu đi ra Internet công cộng.',
    question: 'Dịch vụ kết nối mạng nào của Azure phù hợp nhất cho bài toán này?',
    options: [
      {
        id: 'opt-a',
        text: 'Tạo VPN Gateway Point-to-Site trên từng máy tính của lập trình viên.',
        isCorrect: false
      },
      {
        id: 'opt-b',
        text: 'Global VNet Peering kết nối trực tiếp 2 VNet qua đường truyền Backbone cáp quang ngầm riêng của Microsoft.',
        isCorrect: true
      },
      {
        id: 'opt-c',
        text: 'Gán Public IP cho tất cả các máy ảo và truyền dữ liệu qua giao thức FTP thông thường.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Gửi ổ cứng vật lý qua đường bưu điện giữa 2 trung tâm dữ liệu.',
        isCorrect: false
      }
    ],
    explanation: 'Global VNet Peering cho phép liên kết 2 mạng ảo ở 2 Region khác nhau hoàn toàn riêng tư qua mạng cáp quang trục chính toàn cầu của Microsoft, đạt thông lượng cao nhất và độ trễ thấp nhất mà không cần thiết lập thiết bị VPN trung gian.'
  },
  {
    id: 'az-q-3',
    category: 'load_balancing_traffic_frontdoor',
    difficulty: 'Chuyên gia',
    scenario: 'Một cổng thông tin tài chính trực tuyến toàn cầu có máy chủ backend đặt tại 3 Region: Mỹ, Châu Âu và Châu Á. Ban giám đốc yêu cầu hệ thống phải có khả năng tăng tốc nội dung tĩnh (CDN), bảo vệ chống tấn công Web (WAF) và khi một Region gặp sự cố, lưu lượng truy cập phải tự động chuyển hướng sang Region khác trong vòng dưới 3 giây.',
    question: 'Dịch vụ cân bằng tải nào của Azure đáp ứng hoàn hảo tất cả các tiêu chí trên?',
    options: [
      {
        id: 'opt-a',
        text: 'Azure Basic Load Balancer (Layer 4).',
        isCorrect: false
      },
      {
        id: 'opt-b',
        text: 'Azure Traffic Manager dựa trên DNS.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'Azure Front Door (Global Layer 7 Anycast Network với tích hợp CDN và WAF).',
        isCorrect: true
      },
      {
        id: 'opt-d',
        text: 'Azure Network Security Group (NSG).',
        isCorrect: false
      }
    ],
    explanation: 'Azure Front Door hoạt động ở Tầng 7 trên mạng Anycast toàn cầu với hàng trăm điểm PoP rìa. Nhờ sử dụng Anycast IP và cơ chế Health Probes liên tục, Front Door có thể chuyển hướng khách hàng sang Region dự phòng chỉ trong 2-3 giây (trong khi Traffic Manager dựa vào DNS phải chờ hết thời gian DNS TTL của ISP, thường mất vài phút).'
  },
  {
    id: 'az-q-4',
    category: 'databases_sql_cosmos_db',
    difficulty: 'Nâng cao',
    scenario: 'Trong hệ thống mua sắm trực tuyến toàn cầu sử dụng Azure Cosmos DB, bạn muốn đảm bảo rằng khi một khách hàng thêm món hàng vào giỏ hàng hoặc cập nhật thông tin cá nhân, chính khách hàng đó luôn lập tức nhìn thấy dữ liệu vừa sửa của mình (Read Your Own Writes), nhưng vẫn muốn tối ưu hóa thông lượng và chi phí RU/s ở mức tốt nhất.',
    question: 'Mức độ nhất quán (Consistency Level) nào của Azure Cosmos DB là sự lựa chọn tối ưu nhất?',
    options: [
      {
        id: 'opt-a',
        text: 'Strong Consistency.',
        isCorrect: false
      },
      {
        id: 'opt-b',
        text: 'Session Consistency (Mặc định).',
        isCorrect: true
      },
      {
        id: 'opt-c',
        text: 'Eventual Consistency.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Consistent Prefix.',
        isCorrect: false
      }
    ],
    explanation: 'Session Consistency là mức độ nhất quán mặc định và phổ biến nhất của Cosmos DB. Nó đảm bảo tính chất "Read-Your-Writes" trong phạm vi phiên làm việc của người dùng hiện tại mà không phải hy sinh độ trễ hay tốn kém chi phí như Strong Consistency.'
  },
  {
    id: 'az-q-5',
    category: 'storage_blob_files_datalake',
    difficulty: 'Cơ bản',
    scenario: 'Công ty bạn cần lưu trữ 100 Terabyte tệp tin nhật ký kiểm toán (Audit Logs) để đáp ứng quy định pháp lý của chính phủ trong 5 năm. Các tệp này hầu như không bao giờ được đọc lại trừ khi có thanh tra bất ngờ và có thể chấp nhận thời gian giải phóng (Rehydration) từ 3 đến 15 giờ khi cần truy xuất.',
    question: 'Tầng lưu trữ (Access Tier) nào trong Azure Blob Storage mang lại chi phí tiết kiệm nhất?',
    options: [
      {
        id: 'opt-a',
        text: 'Hot Tier.',
        isCorrect: false
      },
      {
        id: 'opt-b',
        text: 'Cool Tier.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'Cold Tier.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Archive Tier.',
        isCorrect: true
      }
    ],
    explanation: 'Archive Tier có chi phí lưu trữ rẻ nhất (chỉ vài cent cho mỗi GB/tháng). Dữ liệu được lưu trữ ngoại tuyến và chỉ tính phí cao khi thực hiện thao tác giải nén Rehydrate lại tầng trực tuyến (Hot/Cool).'
  },
  {
    id: 'az-q-6',
    category: 'finops_well_architected_certifications',
    difficulty: 'Nâng cao',
    scenario: 'Doanh nghiệp của bạn có 20 máy ảo Azure VM (D4s_v5) chạy hệ thống ERP cốt lõi hoạt động liên tục 24/7 trong ít nhất 3 năm tới. Chi phí hiện tại trả theo giờ Pay-As-You-Go là 3.000 USD/tháng.',
    question: 'Chiến lược tài chính FinOps nào sau đây giúp công ty cắt giảm chi phí nhiều nhất mà không cần thay đổi kiến trúc ứng dụng?',
    options: [
      {
        id: 'opt-a',
        text: 'Chuyển toàn bộ máy ảo sang gói Spot Instances.',
        isCorrect: false
      },
      {
        id: 'opt-b',
        text: 'Mua Azure Reserved Virtual Machine Instances (3-Year Reservation) kết hợp với Azure Hybrid Benefit nếu đã có bản quyền Windows Server.',
        isCorrect: true
      },
      {
        id: 'opt-c',
        text: 'Tắt máy ảo mỗi đêm từ 12h đêm đến 6h sáng trên môi trường Production.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Xóa toàn bộ bản sao lưu dự phòng (Backups) của hệ thống.',
        isCorrect: false
      }
    ],
    explanation: 'Với khối lượng công việc chạy liên tục 24/7 dự đoán trước được như ERP, việc cam kết mua Azure Reserved Instances thời hạn 3 năm có thể giảm tới 72% chi phí so với Pay-As-You-Go. Kết hợp thêm Azure Hybrid Benefit sẽ giúp tiết kiệm tối đa ngân sách doanh nghiệp.'
  }
];
