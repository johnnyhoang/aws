import { AzureFlashcard } from '../../types/azureModule';

export const AZURE_FLASHCARDS: AzureFlashcard[] = [
  {
    id: 'az-fc-1',
    term: 'Azure Region & Availability Zones (AZ)',
    definition: 'Region là khu vực địa lý chứa các trung tâm dữ liệu kết nối độ trễ thấp (<2ms). Availability Zone là trung tâm dữ liệu vật lý độc lập bên trong một Region có nguồn điện, mạng và làm mát riêng biệt để chống sự cố thảm họa.',
    category: 'overview_global_infrastructure',
    exampleOrAnalogy: 'Như các tòa nhà chung cư độc lập trong cùng một khu đô thị: nếu một tòa mất điện máy phát thì các tòa khác vẫn sáng đèn bình thường.',
    proTip: 'Triển khai ứng dụng trên tối thiểu 2 hoặc 3 AZs trong cùng Region để đạt chuẩn SLA sẵn sàng 99.99% của Microsoft.'
  },
  {
    id: 'az-fc-2',
    term: 'Region Pairs',
    definition: 'Mỗi Azure Region luôn được ghép đôi cố định với một Region khác cùng khu vực địa lý cách nhau ít nhất 480km để cập nhật hạ tầng tuần tự và đồng bộ sao lưu dữ liệu chống thảm họa.',
    category: 'overview_global_infrastructure',
    exampleOrAnalogy: 'Như hai phi công trên cùng một chuyến bay: không bao giờ ăn cùng một món ăn để tránh rủi ro ngộ độc thực phẩm đồng thời.',
    proTip: 'Khi cấu hình Geo-Redundant Storage (GRS), dữ liệu tự động được sao chép sang Region được ghép cặp này.'
  },
  {
    id: 'az-fc-3',
    term: 'Microsoft Entra ID (Azure AD)',
    definition: 'Giải pháp quản lý định danh và truy cập đám mây (IDaaS) dựa trên các giao thức Web hiện đại như OAuth2, OpenID Connect và SAML, bảo vệ tài nguyên đa nền tảng.',
    category: 'identity_entra_id_security',
    exampleOrAnalogy: 'Như hộ chiếu điện tử sinh trắc học toàn cầu, dùng được ở mọi cửa khẩu sân bay và dịch vụ trực tuyến.',
    proTip: 'Sử dụng Conditional Access để bắt buộc xác thực đa yếu tố (MFA) khi nhân viên đăng nhập từ mạng ngoài công ty.'
  },
  {
    id: 'az-fc-4',
    term: 'Managed Identities for Azure Resources',
    definition: 'Tính năng cấp danh tính tự động trong Entra ID cho các tài nguyên Azure (VM, App Service, Functions), giúp ứng dụng xác thực với Key Vault hoặc SQL mà không cần lưu password/secret trong code.',
    category: 'identity_entra_id_security',
    exampleOrAnalogy: 'Như hệ thống nhận diện khuôn mặt tự động mở cửa cho nhân viên công ty mà không cần cầm theo thẻ từ hay nhớ mật mã.',
    proTip: 'Ưu tiên sử dụng System-Assigned Managed Identity cho từng tài nguyên đơn lẻ để Azure tự động thu hồi khi xóa tài nguyên.'
  },
  {
    id: 'az-fc-5',
    term: 'Azure Virtual Network (VNet) & Peering',
    definition: 'Mạng riêng ảo cô lập trên đám mây Azure. VNet Peering cho phép liên kết 2 mạng ảo với nhau thông qua mạng trục xương sống của Microsoft với độ trễ siêu thấp mà không đi qua Internet công cộng.',
    category: 'networking_vnet_hybrid',
    exampleOrAnalogy: 'Như việc đào đường hầm bí mật tốc độ cao nối thông tầng hầm của 2 tòa nhà cạnh nhau mà không phải đi ra đường phố lớn.',
    proTip: 'Hai VNet có dải địa chỉ IP trùng lặp (Overlapping CIDR) sẽ không thể thiết lập VNet Peering.'
  },
  {
    id: 'az-fc-6',
    term: 'Azure Bastion',
    definition: 'Dịch vụ PaaS được quản lý hoàn toàn cho phép kết nối điều khiển từ xa an toàn (RDP/SSH) tới các máy ảo thông qua trình duyệt Web mã hóa TLS mà không cần cấp Public IP cho máy ảo.',
    category: 'networking_vnet_hybrid',
    exampleOrAnalogy: 'Như phòng tiếp khách an ninh tại cổng bảo vệ: khách gặp chủ nhà qua vách kính an toàn mà không cần bước chân vào phòng ngủ riêng.',
    proTip: 'Loại bỏ hoàn toàn rủi ro bị tấn công dò quét cổng 22/3389 (Port Scanning / Brute-force) từ Internet.'
  },
  {
    id: 'az-fc-7',
    term: 'Azure App Service & Deployment Slots',
    definition: 'Nền tảng PaaS lưu trữ ứng dụng Web/API tự động co giãn. Deployment Slots cho phép triển khai phiên bản mới lên môi trường Staging và tráo đổi (Swap) lên Production với Zero-Downtime.',
    category: 'compute_vms_appservice_serverless',
    exampleOrAnalogy: 'Như đường ray xe lửa có đoạn rẽ ray dự phòng: tàu mới chạy song song kiểm tra tốc độ trước khi tráo sang đường ray chính mà hành khách không hề cảm nhận gián đoạn.',
    proTip: 'Cấu hình Slot-specific App Settings (Deployment Slot Setting) để các biến môi trường như DB Connection không bị tráo đổi sang Prod.'
  },
  {
    id: 'az-fc-8',
    term: 'Azure Container Apps (ACA)',
    definition: 'Nền tảng Serverless Containers xây dựng trên nền Kubernetes, tích hợp sẵn KEDA (co giãn theo sự kiện về 0) và Dapr, giúp chạy Microservices mà không cần quản trị cụm K8s phức tạp.',
    category: 'compute_vms_appservice_serverless',
    exampleOrAnalogy: 'Như dịch vụ gọi xe tự lái theo yêu cầu: xe tự động xuất hiện khi có khách đặt và tự quay về bãi đỗ khi hết khách, bạn chỉ trả tiền cho quãng đường chạy.',
    proTip: 'Rất lý tưởng cho các worker xử lý nền tiêu thụ tin nhắn từ Azure Service Bus hoặc RabbitMQ.'
  },
  {
    id: 'az-fc-9',
    term: 'Blob Storage Lifecycle Management',
    definition: 'Chính sách tự động hóa vòng đời dữ liệu dựa trên quy tắc JSON, tự động di chuyển tệp tin giữa các tầng Hot -> Cool -> Cold -> Archive và xóa tệp cũ theo thời gian.',
    category: 'storage_blob_files_datalake',
    exampleOrAnalogy: 'Như quy trình văn thư lưu trữ: hồ sơ mới để trên bàn làm việc (Hot), sau 1 tháng cất vào tủ sắt (Cool), sau 1 năm chuyển xuống kho ngầm (Archive).',
    proTip: 'Giúp các doanh nghiệp tiết kiệm 80-90% chi phí lưu trữ log và file sao lưu mà không cần viết script xóa thủ công.'
  },
  {
    id: 'az-fc-10',
    term: 'Azure Cosmos DB & 5 Consistency Levels',
    definition: 'Cơ sở dữ liệu NoSQL phân tán toàn cầu với độ trễ <10ms và SLA 99.999%, cung cấp 5 mức độ nhất quán dữ liệu: Strong, Bounded Staleness, Session (mặc định), Consistent Prefix và Eventual.',
    category: 'databases_sql_cosmos_db',
    exampleOrAnalogy: 'Như các mức độ phát sóng trực tiếp bóng đá: từ xem tại sân bóng không trễ (Strong) đến xem qua truyền hình số trễ 5 giây (Bounded Staleness) và đọc tóm tắt báo sáng hôm sau (Eventual).',
    proTip: 'Chọn Session Consistency cho 90% ứng dụng thương mại điện tử để vừa đảm bảo người dùng thấy đơn hàng của họ vừa đạt thông lượng tối đa.'
  },
  {
    id: 'az-fc-11',
    term: 'Azure SQL Hyperscale',
    definition: 'Kiến trúc cơ sở dữ liệu quan hệ SQL tách rời Compute và Storage, hỗ trợ dung lượng mở rộng lên tới 100TB, sao lưu tức thì và bổ sung Read Replicas trong vài giây.',
    category: 'databases_sql_cosmos_db',
    exampleOrAnalogy: 'Như nhà máy có kho nguyên liệu vô tận ở bên cạnh, khi cần tăng công suất chỉ việc cắm thêm động cơ mới vào mà không cần di dời nhà xưởng.',
    proTip: 'Thời gian phục hồi và sao lưu của Hyperscale là hằng số tính bằng phút, bất kể kích thước DB là 10GB hay 50TB.'
  },
  {
    id: 'az-fc-12',
    term: 'Azure Application Gateway (WAF_v2)',
    definition: 'Bộ cân bằng tải Tầng 7 (HTTP/HTTPS) cấp khu vực (Regional) hỗ trợ SSL Termination, định tuyến dựa trên đường dẫn URL (Path-based) và tường lửa bảo vệ ứng dụng Web (WAF).',
    category: 'load_balancing_traffic_frontdoor',
    exampleOrAnalogy: 'Như lễ tân trưởng của tòa nhà khách sạn: vừa kiểm tra vé vào cửa, vừa phân luồng khách lên thang máy đúng tầng theo nhu cầu.',
    proTip: 'Bắt buộc phải triển khai trong một Dedicated Subnet riêng và hỗ trợ tự động co giãn từ 2 đến 125 instance.'
  },
  {
    id: 'az-fc-13',
    term: 'Azure Front Door',
    definition: 'Nền tảng mạng phân phối toàn cầu (Global Layer 7 CDN) sử dụng mạng Anycast của Microsoft, kết hợp tăng tốc truyền tải, SSL Offloading, cân bằng tải đa vùng và bảo mật WAF.',
    category: 'load_balancing_traffic_frontdoor',
    exampleOrAnalogy: 'Như mạng lưới bưu điện có chi nhánh ở mọi góc phố toàn cầu: tiếp nhận thư ngay tại địa phương và chuyển qua đường ống chân không riêng tới trụ sở chính.',
    proTip: 'Chuyển hướng dự phòng sự cố (Failover) gần như tức thì (<3s) do không phụ thuộc vào bộ nhớ đệm DNS TTL của nhà mạng.'
  },
  {
    id: 'az-fc-14',
    term: 'Log Analytics & KQL (Kusto Query Language)',
    definition: 'Kho lưu trữ nhật ký tập trung và ngôn ngữ truy vấn mạnh mẽ dạng đường ống (`|`), cho phép phân tích hàng tỷ dòng log sự kiện, metrics và telemetry chỉ trong vài giây.',
    category: 'monitoring_governance_bicep',
    exampleOrAnalogy: 'Như kính hiển vi điện tử siêu phóng đại có khả năng quét hàng triệu tế bào và chỉ ra đúng tế bào có dấu hiệu bất thường.',
    proTip: 'Sử dụng lệnh `summarize count() by bin(timestamp, 1h)` để vẽ biểu đồ tần suất lỗi theo từng giờ.'
  },
  {
    id: 'az-fc-15',
    term: 'Azure Bicep (Infrastructure as Code)',
    definition: 'Ngôn ngữ DSL hiện đại, tinh gọn do Microsoft phát triển riêng cho Azure Resource Manager (ARM), thay thế các file ARM Templates JSON cồng kềnh.',
    category: 'monitoring_governance_bicep',
    exampleOrAnalogy: 'Như bản vẽ thiết kế kỹ thuật số chuẩn xác: đưa vào máy in 3D là tự động xây ra đúng tòa nhà với các thông số vật liệu khai báo.',
    proTip: 'Không cần quản lý file lưu trữ State như Terraform, Bicep tương tác trực tiếp với API của Azure và hỗ trợ tính năng xem trước `what-if`.'
  },
  {
    id: 'az-fc-16',
    term: 'Azure OpenAI Service (Enterprise SLA)',
    definition: 'Dịch vụ cung cấp các mô hình GPT-4o, DALL-E 3 trên hạ tầng Microsoft Cloud với cam kết bảo mật không lưu dữ liệu người dùng để tái huấn luyện và hỗ trợ kết nối qua VNet Private Endpoint.',
    category: 'ai_openai_cognitive',
    exampleOrAnalogy: 'Như việc thuê giáo sư thông thái về làm việc trong căn phòng bảo mật của riêng công ty bạn, mọi bí mật kinh doanh không bao giờ bị lộ ra ngoài.',
    proTip: 'Sử dụng Managed Identity với vai trò `Cognitive Services OpenAI User` để gọi API mà không cần API Key trong code.'
  },
  {
    id: 'az-fc-17',
    term: 'Azure AI Search & Hybrid Search RAG',
    definition: 'Công cụ tìm kiếm thông minh kết hợp tìm kiếm từ khóa BM25, tìm kiếm ngữ nghĩa Vector Search và Semantic Reranker để cung cấp dữ liệu chính xác cho hệ thống RAG doanh nghiệp.',
    category: 'ai_openai_cognitive',
    exampleOrAnalogy: 'Như thủ thư thiên tài nhớ từng câu chữ trong hàng vạn cuốn sách và có thể tìm ra chính xác đoạn văn trả lời đúng câu hỏi hóc búa của bạn.',
    proTip: 'Kết hợp Vector Embeddings với Semantic Reranking giúp tăng độ chính xác của câu trả lời AI lên hơn 35%.'
  },
  {
    id: 'az-fc-18',
    term: 'Azure Reservations & Savings Plans',
    definition: 'Chiến lược tối ưu chi phí FinOps bằng cách cam kết sử dụng tài nguyên (1 hoặc 3 năm) để nhận mức giảm giá từ 40% đến 72% so với giá trả theo giờ Pay-As-You-Go.',
    category: 'finops_well_architected_certifications',
    exampleOrAnalogy: 'Như việc ký hợp đồng thuê nhà dài hạn 3 năm để được chủ nhà giảm 50% tiền thuê so với thuê theo ngày ở khách sạn.',
    proTip: 'Áp dụng cho các máy chủ Production và cơ sở dữ liệu chạy liên tục 24/7/365 để tiết kiệm ngân sách khổng lồ cho công ty.'
  }
];
