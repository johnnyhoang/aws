import { QuizQuestion } from '../../types';

export const CLF_QUESTIONS: QuizQuestion[] = [
  {
    id: 'clf-1',
    certCode: 'CLF-C02',
    category: 'Mô hình Trách nhiệm Chung (Shared Responsibility)',
    difficulty: 'Cơ bản',
    scenario: 'Theo Mô hình Trách nhiệm Chung của AWS (AWS Shared Responsibility Model), trách nhiệm nào sau đây thuộc về Khách hàng (Customer) khi triển khai một cơ sở dữ liệu trên máy chủ ảo Amazon EC2?',
    options: [
      { id: 'A', text: 'Bảo trì phần cứng vật lý và hệ thống làm mát trung tâm dữ liệu AWS.' },
      { id: 'B', text: 'Cài đặt bản vá lỗi (Patching) cho hệ điều hành Guest OS và cấu hình sao lưu cơ sở dữ liệu.' },
      { id: 'C', text: 'Bảo vệ an ninh vật lý cho các tòa nhà Data Center.' },
      { id: 'D', text: 'Thay thế các ổ đĩa cứng hoặc RAM bị hỏng trên giá đỡ server của AWS.' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'Khi tự cài đặt ứng dụng hoặc cơ sở dữ liệu trên máy chủ ảo Amazon EC2 (mô hình IaaS), khách hàng chịu trách nhiệm toàn bộ tầng từ Hệ điều hành (Guest OS), cài đặt bản vá bảo mật, cấu hình phần mềm cơ sở dữ liệu, quản lý tài khoản người dùng và thực hiện sao lưu dữ liệu (Security IN the Cloud).',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Bảo trì phần cứng vật lý thuộc 100% trách nhiệm của AWS (Security OF the Cloud).' },
        { optionId: 'C', reason: 'An ninh vật lý của trung tâm dữ liệu thuộc trách nhiệm của AWS.' },
        { optionId: 'D', reason: 'Thay thế linh kiện phần cứng hỏng thuộc trách nhiệm của AWS.' }
      ],
      examTip: 'Ghi nhớ quy tắc cốt lõi: AWS chịu trách nhiệm "Security OF the Cloud" (phần cứng, nhà trạm, hạ tầng mạng toàn cầu). Khách hàng chịu trách nhiệm "Security IN the Cloud" (OS trên EC2, cấu hình Firewall Security Group, mã hóa và dữ liệu).'
    }
  },
  {
    id: 'clf-2',
    certCode: 'CLF-C02',
    category: 'Quản lý Chi phí & Ngân sách (Billing & Pricing)',
    difficulty: 'Cơ bản',
    scenario: 'Phòng Quản lý Tài chính của trường đại học muốn nhận thông báo qua email bất cứ khi nào chi phí sử dụng AWS của tháng hiện tại dự kiến (forecasted) sẽ vượt quá ngân sách $500 USD được duyệt. Dịch vụ nào đáp ứng chính xác yêu cầu này với chi phí $0?',
    options: [
      { id: 'A', text: 'AWS Budgets' },
      { id: 'B', text: 'AWS Cost Explorer' },
      { id: 'C', text: 'AWS Pricing Calculator' },
      { id: 'D', text: 'Amazon CloudWatch Synthetics' }
    ],
    correctOptionId: 'A',
    explanation: {
      whyCorrect: 'AWS Budgets cho phép bạn thiết lập các mức ngân sách tùy chỉnh và tạo cảnh báo (Alerts) gửi qua email hoặc Amazon SNS khi chi phí thực tế (Actual) HOẶC chi phí dự báo (Forecasted) vượt qua ngưỡng bạn chỉ định. Hai ngân sách đầu tiên là hoàn toàn miễn phí.',
      whyOthersIncorrect: [
        { optionId: 'B', reason: 'AWS Cost Explorer là công cụ trực quan hóa và phân tích xu hướng chi phí trong quá khứ, không phải là công cụ chủ động kích hoạt gửi cảnh báo email khi vượt ngưỡng.' },
        { optionId: 'C', reason: 'AWS Pricing Calculator là công cụ ước tính chi phí trước khi triển khai hệ thống.' },
        { optionId: 'D', reason: 'CloudWatch Synthetics dùng để kiểm tra độ khả dụng của website (Canary tests), không liên quan đến chi phí thanh toán.' }
      ],
      examTip: 'Nhắc đến "Cảnh báo khi chi phí thực tế hoặc dự báo vượt ngưỡng ngân sách" -> Đáp án luôn là AWS Budgets.'
    }
  },
  {
    id: 'clf-3',
    certCode: 'CLF-C02',
    category: 'Hạ tầng Toàn cầu (Global Infrastructure)',
    difficulty: 'Cơ bản',
    scenario: 'Một trường đại học muốn phân phối các tệp video bài giảng tĩnh cho sinh viên quốc tế đang học trực tuyến từ khắp nơi trên thế giới với độ trễ thấp nhất. Thành phần hạ tầng toàn cầu nào của AWS hỗ trợ việc này?',
    options: [
      { id: 'A', text: 'AWS Edge Locations (Điểm rìa mạng CDN)' },
      { id: 'B', text: 'AWS Availability Zones trong cùng một Region' },
      { id: 'C', text: 'AWS Outposts' },
      { id: 'D', text: 'AWS Local Zones' }
    ],
    correctOptionId: 'A',
    explanation: {
      whyCorrect: 'AWS Edge Locations là mạng lưới hàng trăm điểm hiện diện (Points of Presence - PoP) trên toàn cầu được dịch vụ Amazon CloudFront sử dụng để lưu bộ nhớ đệm (Cache) nội dung tĩnh và phân phối tới người dùng cuối với độ trễ mạng thấp nhất.',
      whyOthersIncorrect: [
        { optionId: 'B', reason: 'Availability Zones chỉ nằm trong 1 vùng địa lý cụ thể, không giải quyết được độ trễ cho sinh viên ở các quốc gia khác.' },
        { optionId: 'C', reason: 'AWS Outposts là thiết bị phần cứng AWS đặt tại trung tâm dữ liệu On-premise của trường.' },
        { optionId: 'D', reason: 'AWS Local Zones dùng để mở rộng tài nguyên Compute/Storage tới các khu vực đô thị lớn cụ thể, không phải mạng lưới CDN phân phối toàn cầu.' }
      ],
      examTip: 'Phân phối nội dung toàn cầu với độ trễ thấp nhất -> Amazon CloudFront kết hợp mạng lưới AWS Edge Locations.'
    }
  },
  {
    id: 'clf-4',
    certCode: 'CLF-C02',
    category: 'Các Gói Hỗ Trợ Kỹ Thuật (AWS Support Plans)',
    difficulty: 'Cơ bản',
    scenario: 'Trường đại học cần một gói hỗ trợ của AWS cho phép liên hệ với Kỹ sư hỗ trợ đám mây (Cloud Support Engineers) 24/7 qua điện thoại và chat trực tuyến, với cam kết thời gian phản hồi cho các sự cố nghiêm trọng (Business-critical system down) là dưới 15 phút, đồng thời có một Quản lý Kỹ thuật Tài khoản riêng (Designated Technical Account Manager - TAM). Gói hỗ trợ nào đáp ứng yêu cầu này?',
    options: [
      { id: 'A', text: 'AWS Basic Support' },
      { id: 'B', text: 'AWS Developer Support' },
      { id: 'C', text: 'AWS Business Support' },
      { id: 'D', text: 'AWS Enterprise Support' }
    ],
    correctOptionId: 'D',
    explanation: {
      whyCorrect: 'AWS Enterprise Support là gói hỗ trợ cao cấp nhất của AWS cung cấp: Chỉ định riêng một Technical Account Manager (TAM), thời gian phản hồi sự cố khẩn cấp dưới 15 phút cho các hệ thống sống còn (Business-critical), hỗ trợ 24/7 qua điện thoại/chat và đánh giá kiến trúc chuyên sâu.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'Basic Support miễn phí chỉ hỗ trợ về thanh toán và tài khoản, không hỗ trợ kỹ thuật.' },
        { optionId: 'B', reason: 'Developer Support chỉ hỗ trợ qua email trong giờ hành chính, không có TAM.' },
        { optionId: 'C', reason: 'Business Support hỗ trợ 24/7 nhưng thời gian phản hồi sự cố khẩn cấp là 1 giờ (Production down) và không có Dedicated TAM riêng.' }
      ],
      examTip: 'Gói hỗ trợ có Technical Account Manager (TAM) + phản hồi dưới 15 phút -> Luôn là AWS Enterprise Support.'
    }
  },
  {
    id: 'clf-5',
    certCode: 'CLF-C02',
    category: 'Mô hình Mua Máy chủ EC2 (Pricing Models)',
    difficulty: 'Cơ bản',
    scenario: 'Khoa Công nghệ Thông tin cần chạy các bài tập huấn luyện mô hình Trí tuệ Nhân tạo (AI Training) cho sinh viên. Các tác vụ này có thể bị tạm dừng và tiếp tục lại sau mà không làm mất kết quả cuối cùng. Mô hình mua máy chủ EC2 nào giúp tiết kiệm tới 90% chi phí so với giá thông thường?',
    options: [
      { id: 'A', text: 'On-Demand Instances' },
      { id: 'B', text: 'Spot Instances' },
      { id: 'C', text: 'Reserved Instances kỳ hạn 3 năm' },
      { id: 'D', text: 'Dedicated Hosts' }
    ],
    correctOptionId: 'B',
    explanation: {
      whyCorrect: 'Amazon EC2 Spot Instances tận dụng dung lượng máy chủ nhàn rỗi (Spare compute capacity) của AWS với mức giá giảm tới 90% so với giá On-Demand. Đổi lại, AWS có thể thu hồi (interrupt) máy chủ với cảnh báo trước 2 phút khi khách hàng trả giá cao hơn cần đến.',
      whyOthersIncorrect: [
        { optionId: 'A', reason: 'On-Demand linh hoạt nhưng có mức giá cao nhất theo giờ/giây.' },
        { optionId: 'C', reason: 'Reserved Instances yêu cầu cam kết thời hạn 1 hoặc 3 năm, không linh hoạt cho các tác vụ sinh viên chạy ngắt quãng.' },
        { optionId: 'D', reason: 'Dedicated Hosts là máy chủ vật lý riêng biệt, chi phí đắt đỏ nhất.' }
      ],
      examTip: 'Tác vụ chịu được gián đoạn (Fault-tolerant/Interruptible workloads), giảm chi phí tối đa tới 90% -> Chọn EC2 Spot Instances.'
    }
  }
];
