import { AzureChapter } from '../../types/azureModule';

export const AZURE_CHAPTERS: AzureChapter[] = [
  {
    id: 'az-ch-1',
    chapterNumber: 1,
    title: 'Khởi Nguyên Microsoft Azure & Bản Đồ Địa Lý Toàn Cầu',
    subtitle: 'Từ Dự Án Project Red Dog Đến Mạng Lưới Đám Mây Doanh Nghiệp Lớn Nhất Thế Giới',
    level: 'Cơ bản',
    readTimeMinutes: 16,
    category: 'overview_global_infrastructure',
    summary: 'Giải mã lịch sử chuyển mình của Microsoft dưới thời Satya Nadella, hiểu rõ kiến trúc phân cấp quản trị doanh nghiệp (Management Groups -> Subscriptions -> Resource Groups) và cấu trúc vật lý Regions, Availability Zones, Region Pairs.',
    hookStory: 'Năm 2008, tại hội nghị PDC, Ray Ozzie công bố bí mật "Project Red Dog" – một canh bạc sinh tử của Microsoft khi AWS đang độc chiếm thị trường đám mây. Ít ai ngờ rằng, quyết định tái sinh tập đoàn bằng triết lý "Cloud First, Mobile First" của Satya Nadella vào năm 2014 đã biến Azure thành động cơ nghìn tỷ đô la, phục vụ 95% các tập đoàn Fortune 500.',
    sections: [
      {
        heading: '1. Kiến Trúc Địa Lý Vật Lý Của Azure (Physical Infrastructure)',
        subheading: 'Regions, Availability Zones và Cơ Chế Tự Động Ghép Cặp (Region Pairs)',
        content: 'Khác với quan niệm sai lầm rằng đám mây là một khối máy chủ vô hình, Microsoft Azure được xây dựng trên hơn 60+ vùng địa lý (Regions) với hàng trăm trung tâm dữ liệu siêu quy mô (Hyperscale Datacenters) kết nối bằng mạng lưới cáp quang ngầm riêng biệt dài hơn 280.000 km.\n\nMột Region (ví dụ: Southeast Asia tại Singapore, East US tại Virginia) là một tập hợp các trung tâm dữ liệu được triển khai trong phạm vi độ trễ dưới 2 mili-giây. Mỗi Region hiện đại đều bao gồm tối thiểu 3 Availability Zones (AZs) độc lập về nguồn điện, hệ thống làm mát và kết nối mạng để chống chịu sự cố thiên tai vật lý.',
        bulletPoints: [
          'Region Pairs: Mỗi Azure Region luôn được ghép cặp cố định với một Region khác cùng khu vực địa lý (cách nhau ít nhất 480 km). Khi Microsoft nâng cấp hạ tầng hoặc xảy ra sự cố diện rộng, Azure chỉ cập nhật một Region tại một thời điểm để bảo đảm dịch vụ không bị gián đoạn toàn bộ.',
          'Sovereign Clouds (Đám Mây Chuyên Biệt): Azure Government (dành riêng cho chính phủ và quân đội Mỹ), Azure China 21Vianet (vận hành độc lập theo luật pháp Trung Quốc).',
          'Data Residency & Compliance: Cam kết dữ liệu khách hàng lưu trữ tại Region nào sẽ ở nguyên tại quốc gia đó, đáp ứng tiêu chuẩn GDPR, HIPAA và ISO 27001.'
        ],
        mindsetShift: {
          from: 'Coi đám mây là một server vô định và chỉ tạo máy ảo ở bất kỳ Region nào giá rẻ nhất.',
          to: 'Thiết kế hệ thống Multi-AZ và tận dụng Region Pairs để bảo đảm chỉ số SLA sẵn sàng 99.99% và tuân thủ luật an ninh mạng dữ liệu.',
          impact: 'Loại bỏ hoàn toàn rủi ro sập toàn bộ dịch vụ khi một trung tâm dữ liệu gặp sự cố mất điện hoặc cháy nổ.'
        }
      },
      {
        heading: '2. Phân Cấp Quản Trị Doanh Nghiệp (Enterprise Hierarchy Model)',
        subheading: 'Cấu Trúc 4 Tầng: Management Groups -> Subscriptions -> Resource Groups -> Resources',
        content: 'Để quản lý hàng nghìn tài nguyên cho các tập đoàn đa quốc gia mà không rơi vào hỗn loạn, Azure cung cấp mô hình phân cấp quản trị 4 tầng cực kỳ chặt chẽ.\n\nMọi tài nguyên trong Azure (máy ảo, database, mạng) bắt buộc phải nằm trong đúng một Resource Group. Resource Group nằm trong một Subscription (tài khoản thanh toán), và các Subscriptions được gom nhóm dưới các Management Groups để áp đặt chính sách bảo mật đồng bộ.',
        codeBlock: {
          language: 'bash',
          title: 'Tạo Resource Group và kiểm tra danh sách Regions khả dụng',
          code: `# Đăng nhập tài khoản Azure
az login

# Liệt kê danh sách các Region hỗ trợ Availability Zones tại Đông Nam Á
az account list-locations --query "[?contains(name, 'asia')].{Name:name, DisplayName:displayName, Zones:availabilityZoneMappings}" -o table

# Tạo một Resource Group mới chuẩn quy chuẩn doanh nghiệp tại Singapore
az group create --name rg-production-southeastasia-001 --location southeastasia --tags Environment=Production Department=Engineering CostCenter=1042`
        },
        proTip: 'Resource Group không đại diện cho phạm vi mạng (VNet). Bạn có thể đặt tài nguyên ở Region Nhật Bản vào một Resource Group có vị trí khai báo tại Singapore. Vị trí của Resource Group chỉ là nơi lưu trữ metadata quản trị.'
      }
    ],
    practicalCommands: [
      {
        title: 'Đăng nhập và chọn Subscription làm việc',
        command: 'az account set --subscription "Azure-Enterprise-Production-Sub"',
        description: 'Chuyển ngữ cảnh làm việc của Azure CLI sang đúng Subscription mong muốn.'
      },
      {
        title: 'Xem tổng số Resource Groups đang hoạt động',
        command: 'az group list --output table',
        description: 'Liệt kê danh sách toàn bộ các Resource Group kèm trạng thái ProvisioningState.'
      }
    ],
    masteryChecklist: [
      'Phân biệt rõ ràng giữa Region, Availability Zone, Region Pair và Geography.',
      'Hiểu sâu cấu trúc phân tầng quản trị 4 cấp của Azure.',
      'Sử dụng thành thạo Azure CLI để khởi tạo Resource Group chuẩn quy ước gắn Tags.'
    ]
  },
  {
    id: 'az-ch-2',
    chapterNumber: 2,
    title: 'Danh Tính & Bảo Mật Microsoft Entra ID (Azure AD)',
    subtitle: 'Kiểm Soát Quyền Truy Cập Doanh Nghiệp Với RBAC, PIM & Managed Identities',
    level: 'Trung bình',
    readTimeMinutes: 18,
    category: 'identity_entra_id_security',
    summary: 'Nắm vững trái tim bảo mật của Microsoft Cloud: Sự khác biệt giữa On-Premises AD và Entra ID, kiến trúc Zero Trust, phân quyền RBAC tinh vi, đặc quyền Just-In-Time qua PIM và xóa sổ mật khẩu cứng bằng Managed Identities.',
    hookStory: 'Trong một cuộc kiểm toán bảo mật năm 2021, hơn 80% sự cố rò rỉ dữ liệu đám mây bắt nguồn từ việc lập trình viên lỡ tay commit API Key và Connection String có quyền quản trị viên tối cao lên GitHub. Microsoft Entra ID ra đời để kết liễu hoàn toàn kỷ nguyên mật khẩu tĩnh bằng định danh phần mềm Managed Identity.',
    sections: [
      {
        heading: '1. Microsoft Entra ID (Trước đây là Azure AD) vs Active Directory Truyền Thống',
        subheading: 'Từ Giao Thức Cũ (Kerberos/LDAP) Đến Kỷ Nguyên Web Hiện Đại (OAuth2/OIDC/SAML)',
        content: 'Nhiều kỹ sư nhầm lẫn Entra ID là phiên bản sao chép của Windows Server Active Directory trên đám mây. Thực tế, chúng là hai công nghệ hoàn toàn khác nhau:\n\n- Active Directory truyền thống hoạt động dựa trên cấu trúc cây phân cấp (OU, Domain Forest) và sử dụng giao thức Kerberos/NTLM/LDAP phù hợp với mạng LAN nội bộ.\n- Microsoft Entra ID là một giải pháp Identity-as-a-Service (IDaaS) toàn cầu, sử dụng các giao thức Web RESTful chuẩn hiện đại như OpenID Connect (OIDC), OAuth 2.0 và SAML 2.0, được thiết kế để xác thực người dùng trên mọi thiết bị và ứng dụng SaaS (Office 365, Salesforce, AWS, custom apps).',
        bulletPoints: [
          'Conditional Access (Truy Cập Có Điều Kiện): "Bộ não" Zero Trust đánh giá ngữ cảnh đăng nhập (IP người dùng, mức độ rủi ro của thiết bị, vị trí địa lý, ứng dụng truy cập) để bắt buộc xác thực MFA hoặc chặn truy cập.',
          'Self-Service Password Reset (SSPR): Cho phép người dùng tự đổi mật khẩu có xác thực OTP, giảm tải 40% khối lượng yêu cầu cho đội ngũ IT Helpdesk.'
        ]
      },
      {
        heading: '2. Phân Quyền RBAC & Managed Identities (Tuyệt Đối Không Lưu Password)',
        subheading: 'System-Assigned vs User-Assigned Identity & Privileged Identity Management (PIM)',
        content: 'Role-Based Access Control (RBAC) của Azure hoạt động dựa trên công thức 3 thành phần:\nSecurity Principal (Ai? User, Group, Service Principal) + Role Definition (Quyền gì? Owner, Contributor, Reader, hoặc Custom Role) + Scope (Phạm vi ở đâu? Management Group, Subscription, RG, Resource).\n\nĐột phá lớn nhất cho kỹ sư phần mềm là Managed Identities: Azure tự động cấp một danh tính số trong Entra ID cho máy ảo (VM) hoặc Web App. Ứng dụng của bạn có thể gọi Azure Key Vault hoặc Azure SQL mà không cần bất kỳ mật khẩu nào trong file cấu hình .env.',
        codeBlock: {
          language: 'bash',
          title: 'Kích hoạt System-Assigned Managed Identity cho Web App và gán quyền đọc Key Vault',
          code: `# Kích hoạt Managed Identity trên App Service
az webapp identity assign --name app-fintech-prod --resource-group rg-production-southeastasia-001

# Lấy Identity ID (Principal ID) vừa sinh ra
PRINCIPAL_ID=$(az webapp identity show --name app-fintech-prod --resource-group rg-production-southeastasia-001 --query principalId -o tsv)

# Cấp quyền "Key Vault Secrets User" chỉ cho phép ứng dụng đọc Secret mà không được sửa xóa
az role assignment create \\
  --assignee $PRINCIPAL_ID \\
  --role "Key Vault Secrets User" \\
  --scope "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-production-southeastasia-001/providers/Microsoft.KeyVault/vaults/kv-fintech-prod"`
        },
        proTip: 'Luôn áp dụng nguyên tắc đặc quyền tối thiểu (Least Privilege). Tuyệt đối không gán quyền Owner hoặc Contributor ở cấp Subscription cho các Service Principal phục vụ CI/CD tự động.'
      }
    ],
    practicalCommands: [
      {
        title: 'Liệt kê các Role Assignment của người dùng hiện tại',
        command: 'az role assignment list --assignee me --output table',
        description: 'Kiểm tra các quyền hạn cụ thể đang được gán trên các tài nguyên Azure.'
      },
      {
        title: 'Tạo Service Principal cho CI/CD GitHub Actions',
        command: 'az ad sp create-for-rbac --name "sp-github-actions-deploy" --role contributor --scopes /subscriptions/{sub-id}/resourceGroups/{rg-name} --sdk-auth',
        description: 'Tạo tài khoản tự động hóa có phạm vi giới hạn trong một Resource Group duy nhất.'
      }
    ],
    masteryChecklist: [
      'Giải thích rành mạch điểm khác biệt giữa Active Directory và Microsoft Entra ID.',
      'Thiết lập cấu trúc RBAC 3 thành phần (Principal + Role + Scope).',
      'Ứng dụng System-Assigned và User-Assigned Managed Identity vào ứng dụng thực tế.'
    ]
  },
  {
    id: 'az-ch-3',
    chapterNumber: 3,
    title: 'Mạng Lưới Đám Mây Azure Virtual Network (VNet) & Hybrid Connectivity',
    subtitle: 'Thiết Kế Mạng Cô Lập, VNet Peering, Azure Bastion & Cáp Quang Riêng ExpressRoute',
    level: 'Nâng cao',
    readTimeMinutes: 20,
    category: 'networking_vnet_hybrid',
    summary: 'Làm chủ hạ tầng mạng cốt lõi: Quy hoạch dải IP CIDR với Subnet, bảo vệ cổng mạng bằng NSG & ASG, kết nối liên vùng không qua Internet bằng VNet Peering, truy cập an toàn qua Azure Bastion và đường truyền doanh nghiệp ExpressRoute.',
    hookStory: 'Khi một ngân hàng đa quốc gia chuyển đổi hệ thống Core Banking lên Azure, rào cản lớn nhất không phải là CPU hay RAM, mà là làm sao để các máy chủ Database tuyệt đối không có Public IP nhưng vẫn nhận lệnh an toàn từ Data Center On-Premises với độ trễ dưới 5ms. Mạng lưới Azure VNet và ExpressRoute chính là chìa khóa mở cánh cửa này.',
    sections: [
      {
        heading: '1. Kiến Trúc Mạng Cô Lập Azure VNet & Subnetting',
        subheading: 'Quy Hoạch Dải Mạng CIDR, Network Security Groups (NSG) & Application Security Groups (ASG)',
        content: 'Azure Virtual Network (VNet) là viên gạch nền móng tạo ra một mạng riêng ảo hoàn toàn độc lập cho doanh nghiệp trên hạ tầng Microsoft.\n\nMột VNet điển hình được chia thành nhiều Subnets theo chức năng (Web Subnet, App Subnet, Database Subnet). Mọi luồng giao thông (Traffic) ra vào Subnet đều được kiểm soát bởi Network Security Group (NSG) – bức tường lửa Stateful Firewall hoạt động ở Tầng 3 và 4 (IP, Port, Protocol) với thứ tự ưu tiên từ 100 đến 4096 (số nhỏ hơn được ưu tiên xử lý trước).',
        bulletPoints: [
          '5 IP Bị Azure Giữ Chỗ Mặc Định: Trong bất kỳ Subnet nào của Azure, 5 địa chỉ IP đầu và cuối luôn được hệ thống giữ lại (.0 Network, .1 Default Gateway, .2/.3 Azure DNS, .255 Broadcast). Do đó, Subnet /24 (256 IP) thực tế chỉ sử dụng được 251 IP.',
          'Application Security Groups (ASG): Cho phép bạn gom các máy ảo có cùng vai trò (ví dụ: `asg-web-servers`) vào một nhóm logic để viết luật NSG trực quan thay vì phải quản lý danh sách IP thủ công.'
        ]
      },
      {
        heading: '2. Kết Nối Mạng Nâng Cao: VNet Peering, Azure Bastion & Hybrid ExpressRoute',
        subheading: 'Từ Hub-and-Spoke Topology Đến Đường Cáp Quang Riêng Biệt',
        content: 'Mô hình chuẩn của mọi doanh nghiệp lớn trên Azure là Hub-and-Spoke Topology:\n- Hub VNet: Chứa các tài nguyên chia sẻ trung tâm như Azure Firewall, VPN Gateway, ExpressRoute Gateway và DNS Server.\n- Spoke VNets: Chứa từng hệ thống nghiệp vụ (Phát triển, Kiểm thử, Sản xuất), kết nối về Hub thông qua VNet Peering.\n\nVNet Peering cho phép 2 VNet trao đổi dữ liệu với băng thông siêu cao và độ trễ cực thấp qua đường trục Backbone ngầm của Microsoft mà không bao giờ đi ra Internet công cộng.',
        codeBlock: {
          language: 'bash',
          title: 'Thiết lập VNet Peering 2 chiều giữa Hub VNet và Production Spoke VNet',
          code: `# Tạo Peering từ Hub sang Spoke
az network vnet peering create \\
  --name peer-hub-to-spoke-prod \\
  --resource-group rg-networking-hub \\
  --vnet-name vnet-hub-southeastasia \\
  --remote-vnet /subscriptions/0000/resourceGroups/rg-production/providers/Microsoft.Network/virtualNetworks/vnet-spoke-prod \\
  --allow-vnet-access --allow-forwarded-traffic

# Tạo Peering đối ứng từ Spoke về Hub để hoàn tất kết nối 2 chiều
az network vnet peering create \\
  --name peer-spoke-prod-to-hub \\
  --resource-group rg-production \\
  --vnet-name vnet-spoke-prod \\
  --remote-vnet /subscriptions/0000/resourceGroups/rg-networking-hub/providers/Microsoft.Network/virtualNetworks/vnet-hub-southeastasia \\
  --allow-vnet-access`
        },
        proTip: 'Tuyệt đối không mở cổng SSH (22) hay RDP (3389) ra Internet công cộng. Hãy triển khai Azure Bastion Subnet (`AzureBastionSubnet`) để đăng nhập và điều khiển VM an toàn qua trình duyệt Web bằng giao thức TLS mã hóa.'
      }
    ],
    practicalCommands: [
      {
        title: 'Tạo VNet kèm Subnet mặc định qua CLI',
        command: 'az network vnet create --resource-group rg-production --name vnet-production-sea --address-prefix 10.100.0.0/16 --subnet-name snet-apps --subnet-prefix 10.100.1.0/24',
        description: 'Tạo mạng ảo VNet dải /16 kèm Subnet ứng dụng dải /24.'
      },
      {
        title: 'Kiểm tra trạng thái kết nối VNet Peering',
        command: 'az network vnet peering list --resource-group rg-production --vnet-name vnet-production-sea -o table',
        description: 'Xem trạng thái PeeringState (phải là Connected ở cả 2 đầu).'
      }
    ],
    masteryChecklist: [
      'Tính toán chính xác dải IP CIDR và ghi nhớ 5 IP dự trữ mặc định của Azure.',
      'Thiết kế kiến trúc Hub-and-Spoke với VNet Peering.',
      'Hiểu rõ sự khác biệt giữa VPN Gateway Site-to-Site và Azure ExpressRoute.'
    ]
  },
  {
    id: 'az-ch-4',
    chapterNumber: 4,
    title: 'Điện Toán Toàn Diện: Azure Compute Engines',
    subtitle: 'Virtual Machines, App Service, Container Apps, Functions Serverless & AKS',
    level: 'Trung bình',
    readTimeMinutes: 22,
    category: 'compute_vms_appservice_serverless',
    summary: 'Toàn cảnh các mô hình điện toán trên Azure từ IaaS đến PaaS và Serverless: Chọn đúng VM Series (B, D, E, F), làm chủ Azure App Service với Deployment Slots, kiến trúc Microservices với Azure Container Apps và mở rộng quy mô lớn với Azure Kubernetes Service (AKS).',
    hookStory: 'Năm 2012, các kỹ sư phải mất 3 tuần để viết tài liệu xin cấp phát 10 máy chủ vật lý, cài đặt hệ điều hành và gắn cáp mạng. Ngày nay với Azure Bicep và App Service, một lệnh CLI duy nhất tạo ra một cụm máy chủ tự động mở rộng từ 2 lên 50 node khi lượng truy cập tăng vọt chỉ trong vòng 40 giây.',
    sections: [
      {
        heading: '1. Máy Ảo Azure Virtual Machines & Virtual Machine Scale Sets (VMSS)',
        subheading: 'Giải Mã Các Dòng VM Series (B-Series, D-Series, E-Series) & Spot Instances Tiết Kiệm 90%',
        content: 'Azure cung cấp hàng trăm kích cỡ máy ảo (VM Sizes) được tối ưu hóa cho từng khối lượng công việc cụ thể:\n\n- B-Series (Burstable): Chi phí cực thấp, tích lũy CPU Credits khi nhàn rỗi và bứt phá công suất khi có tác vụ ngắn (thích hợp cho Web thử nghiệm, DB phát triển).\n- D-Series (General Purpose): Tỷ lệ CPU/RAM cân bằng, dòng máy phổ biến nhất cho Web Application doanh nghiệp.\n- E-Series (Memory Optimized): Tỷ lệ RAM cực lớn, dành riêng cho In-Memory Cache (Redis) và Cơ sở dữ liệu lớn (SQL Server/PostgreSQL).\n- F-Series (Compute Optimized): CPU tốc độ cao cho xử lý tính toán số liệu và batch processing.',
        bulletPoints: [
          'Virtual Machine Scale Sets (VMSS): Tự động tăng hoặc giảm số lượng máy ảo dựa trên ngưỡng sử dụng CPU hoặc lịch trình thời gian.',
          'Azure Spot VMs: Tận dụng phần cứng dư thừa chưa sử dụng của Microsoft với mức giảm giá lên đến 90%. Tuy nhiên Azure có quyền thu hồi máy trong vòng 30 giây khi có khách hàng trả giá đầy đủ.'
        ]
      },
      {
        heading: '2. Azure App Service, Container Apps & Serverless Azure Functions',
        subheading: 'Từ PaaS Quản Trị Trọn Gói Đến Serverless Sự Kiện Không Cần Quản Trị Máy Chủ',
        content: 'Đối với đại đa số ứng dụng Web hiện đại (Node.js, .NET, Python, Java, Docker), Azure App Service là lựa chọn PaaS số 1 giúp loại bỏ hoàn toàn gánh nặng vá lỗ hổng HĐH:\n\n- Deployment Slots (Blue/Green Deployment): Cho phép triển khai phiên bản mới lên slot Staging để kiểm thử tải thật sự, sau đó thực hiện "Swap Slot" sang Production với Zero-Downtime chỉ trong 1 giây.\n- Azure Functions: Mô hình Serverless Event-driven tính cước theo mili-giây thực thi. Lắng nghe sự kiện từ Blob Storage, Service Bus, Cosmos DB hoặc HTTP Webhooks.\n- Azure Container Apps (ACA): Nền tảng Serverless Containers xây dựng trên nền Kubernetes nhưng trừu tượng hóa độ phức tạp, tích hợp sẵn KEDA (tự động co giãn theo số lượng tin nhắn trong queue về 0) và Dapr.',
        codeBlock: {
          language: 'bash',
          title: 'Tạo App Service Plan và Web App hỗ trợ Node.js 20 LTS',
          code: `# Tạo App Service Plan chuẩn Premium v3 (P1v3) trên Linux
az appservice plan create \\
  --name plan-ecommerce-prod \\
  --resource-group rg-production-southeastasia-001 \\
  --location southeastasia \\
  --sku P1v3 --is-linux

# Tạo Web App chạy Node.js 20 LTS
az webapp create \\
  --name app-ecommerce-frontend-prod \\
  --plan plan-ecommerce-prod \\
  --resource-group rg-production-southeastasia-001 \\
  --runtime "NODE:20-lts"

# Tạo một Staging Deployment Slot để kiểm thử an toàn
az webapp deployment slot create \\
  --name app-ecommerce-frontend-prod \\
  --resource-group rg-production-southeastasia-001 \\
  --slot staging`
        },
        proTip: 'Trên môi trường Production của App Service, hãy luôn cấu hình Always On để ứng dụng không bị tình trạng Cold Start khi không có lượt truy cập trong 20 phút.'
      }
    ],
    practicalCommands: [
      {
        title: 'Thực hiện tráo đổi Slot (Swap Slot) không gián đoạn',
        command: 'az webapp deployment slot swap --resource-group rg-production --name app-ecommerce-prod --slot staging --target-slot production',
        description: 'Hoán đổi môi trường Staging đã test hoàn tất lên Production tức thì.'
      },
      {
        title: 'Xem log streaming theo thời gian thực của Web App',
        command: 'az webapp log tail --resource-group rg-production --name app-ecommerce-prod',
        description: 'Bắt trực tiếp console.log hoặc stdout của ứng dụng đang chạy.'
      }
    ],
    masteryChecklist: [
      'Chọn đúng dòng máy ảo Azure VM Series phù hợp với ngân sách và hiệu năng.',
      'Triển khai quy trình CI/CD Zero-Downtime với App Service Deployment Slots.',
      'Phân biệt bài toán khi nào nên dùng Azure Functions, Container Apps hay AKS.'
    ]
  },
  {
    id: 'az-ch-5',
    chapterNumber: 5,
    title: 'Lưu Trữ Đa Hình: Azure Storage & Data Lake',
    subtitle: 'Blob Storage Lifecycle, Azure Files SMB/NFS, Managed Disks & ADLS Gen2',
    level: 'Cơ bản',
    readTimeMinutes: 18,
    category: 'storage_blob_files_datalake',
    summary: 'Khám phá thế giới lưu trữ bền vững 99.999999999% (11 số 9): 4 tầng lưu trữ Blob (Hot, Cool, Cold, Archive), chính sách tự động hạ tầng Lifecycle Management, Azure Files cho hệ thống chia sẻ tệp và Azure Data Lake Gen2 cho Big Data.',
    hookStory: 'Một công ty bảo hiểm toàn cầu lưu trữ 500 Terabyte hồ sơ bồi thường hàng năm. Nếu để toàn bộ ở tầng Hot Storage, họ phải chi trả 10.000 USD mỗi tháng. Bằng cách thiết lập chính sách Lifecycle tự động chuyển dữ liệu sau 30 ngày sang Cool và sau 90 ngày sang Archive Tier, chi phí lưu trữ đã giảm xuống chỉ còn chưa đầy 500 USD/tháng.',
    sections: [
      {
        heading: '1. Kiến Trúc Azure Blob Storage & 4 Tầng Chi Phí (Access Tiers)',
        subheading: 'Hot, Cool, Cold, Archive & Chính Sách Tự Động Hóa Vòng Đời (Lifecycle Management)',
        content: 'Azure Blob Storage là dịch vụ lưu trữ đối tượng phi cấu trúc (Object Storage) quy mô Exabyte, hỗ trợ hình ảnh, video, tài liệu, backup và dữ liệu IoT.\n\nĐiểm then chốt để làm chủ Azure Storage là hiểu rõ 4 Tầng Truy Cập (Access Tiers):\n1. Hot Tier: Chi phí lưu trữ cao nhất, nhưng chi phí đọc/ghi dữ liệu thấp nhất (dành cho dữ liệu truy cập hàng ngày).\n2. Cool Tier: Chi phí lưu trữ thấp hơn 50%, thời gian lưu tối thiểu 30 ngày (cho dữ liệu đọc 1-2 lần/tháng).\n3. Cold Tier: Chi phí lưu trữ cực rẻ, thời gian lưu tối thiểu 90 ngày (cho dữ liệu hiếm khi đọc).\n4. Archive Tier: Chi phí lưu trữ rẻ nhất (chỉ vài cent/GB), dữ liệu được đưa vào trạng thái offline. Khi cần đọc, phải thực hiện quá trình Rehydrate mất từ vài phút đến vài giờ.',
        bulletPoints: [
          'Chính Sách Lifecycle Management: Quy tắc JSON tự động di chuyển tệp tin từ Hot -> Cool sau 30 ngày -> Cold sau 90 ngày -> Archive sau 180 ngày -> Xóa vĩnh viễn sau 365 ngày.',
          'Các Chế Độ Dự Phòng (Redundancy): LRS (3 bản copy trong 1 datacenter), ZRS (3 bản copy ở 3 AZs khác nhau), GRS (sao chép sang Region thứ 2 cách 500km), GZRS (kết hợp cả ZRS và GRS).'
        ]
      },
      {
        heading: '2. Azure Files, Managed Disks & Data Lake Storage Gen2',
        subheading: 'Chia Sẻ Thư Mục Đa Nền Tảng Với SMB/NFS & Không Gian Phân Cấp Hierarchical Namespace',
        content: 'Bên cạnh Blob Storage, Azure cung cấp các giải pháp lưu trữ chuyên biệt:\n- Azure Files: Cung cấp ổ đĩa mạng chia sẻ chuẩn giao thức SMB 3.0 và NFS. Hàng trăm máy ảo Windows và Linux có thể đồng thời mount chung một thư mục file như ổ đĩa nội bộ.\n- Azure Managed Disks: Ổ cứng gắn trực tiếp vào máy ảo (OS Disk, Data Disk) với các dòng: Standard HDD, Standard SSD, Premium SSD v2 (tùy biến độc lập IOPS và Throughput) và Ultra Disk cho DB tốc độ cực cao.\n- Azure Data Lake Storage (ADLS) Gen2: Mở rộng Blob Storage với tính năng Không gian tên phân cấp (Hierarchical Namespace), cho phép đổi tên hoặc di chuyển thư mục chứa hàng triệu file trong thời gian tức thì (O(1)).',
        codeBlock: {
          language: 'bash',
          title: 'Tạo Storage Account có bảo mật cao và kích hoạt Data Lake Gen2',
          code: `# Tạo Storage Account chuẩn ZRS hỗ trợ Data Lake Gen2 (Hierarchical Namespace)
az storage account create \\
  --name stfinancereportsprod01 \\
  --resource-group rg-production-southeastasia-001 \\
  --location southeastasia \\
  --sku Standard_ZRS \\
  --kind StorageV2 \\
  --enable-hierarchical-namespace true \\
  --https-only true \\
  --min-tls-version TLS1_2 \\
  --allow-blob-public-access false`
        },
        proTip: 'Luôn bật cấm truy cập công khai (`--allow-blob-public-access false`) trên tất cả Storage Account môi trường doanh nghiệp. Sử dụng Shared Access Signature (SAS Token) có thời hạn giới hạn để cấp quyền download an toàn cho người dùng.'
      }
    ],
    practicalCommands: [
      {
        title: 'Tạo Blob Container mới',
        command: 'az storage container create --name invoices --account-name stfinancereportsprod01 --auth-mode login',
        description: 'Tạo container lưu trữ sử dụng xác thực Entra ID an toàn.'
      },
      {
        title: 'Tải tệp tin lên Blob Storage với phân tầng Cool',
        command: 'az storage blob upload --account-name stfinancereportsprod01 --container-name invoices --name backup-2026.tar.gz --file ./backup.tar.gz --tier Cool --auth-mode login',
        description: 'Upload file trực tiếp vào phân tầng Cool để tối ưu chi phí lưu trữ.'
      }
    ],
    masteryChecklist: [
      'Nắm vững 4 tầng lưu trữ Blob Storage và cơ chế Rehydrate dữ liệu Archive.',
      'Cấu hình chính sách tự động hóa vòng đời dữ liệu Lifecycle Management.',
      'Phân biệt rõ ràng giữa LRS, ZRS, GRS và GZRS.'
    ]
  },
  {
    id: 'az-ch-6',
    chapterNumber: 6,
    title: 'Cơ Sở Dữ Liệu: Azure SQL, Cosmos DB & Open Source DBs',
    subtitle: 'Từ Quan Hệ Siêu Co Giãn (Hyperscale) Đến NoSQL Toàn Cầu Độ Trễ Dưới 10ms',
    level: 'Chuyên gia',
    readTimeMinutes: 24,
    category: 'databases_sql_cosmos_db',
    summary: 'Làm chủ thế giới cơ sở dữ liệu trên Azure: Khám phá Azure SQL Database (DTU vs vCore, Hyperscale 100TB, Serverless), giải mã kỳ quan phân tán Azure Cosmos DB với 5 mức độ nhất quán dữ liệu (Consistency Levels) và các dịch vụ DB mã nguồn mở PostgreSQL/MySQL Flexible Server.',
    hookStory: 'Khi sự kiện Black Friday bắt đầu, hệ thống thương mại điện tử toàn cầu phải hứng chịu 500.000 lượt đặt hàng mỗi giây từ 40 quốc gia. Một cơ sở dữ liệu quan hệ truyền thống sẽ chết đứng vì nghẽn khóa ghi (Write Lock). Azure Cosmos DB với tính năng Multi-Region Write đã phân tán dữ liệu đến các trung tâm dữ liệu gần nhất, ghi nhận giao dịch với độ trễ 4 mili-giây mà không hề sai lệch dữ liệu.',
    sections: [
      {
        heading: '1. Azure SQL Database: Kiến Trúc Doanh Nghiệp & Hyperscale',
        subheading: 'Mô Hình Mua (DTU vs vCore), Tự Động Ngủ Đông (Serverless) & Co Giãn 100TB Hyperscale',
        content: 'Azure SQL Database là dịch vụ Database-as-a-Service (DBaaS) được Microsoft phát triển dựa trên nhân SQL Server enterprise đỉnh cao:\n\n- Mô Hình DTU (Database Transaction Unit): Gói tài nguyên kết hợp cố định (CPU, RAM, I/O) phù hợp cho người mới bắt đầu hoặc hệ thống có tải ổn định.\n- Mô Hình vCore: Cung cấp quyền kiểm soát độc lập giữa số lượng CPU Cores, dung lượng RAM và tốc độ Storage. Hỗ trợ tính năng Azure Hybrid Benefit giảm 55% chi phí nếu doanh nghiệp đã có sẵn bản quyền Windows/SQL Server On-Premises.\n- Azure SQL Hyperscale: Tách rời hoàn toàn tầng tính toán (Compute) và lưu trữ (Storage). Cho phép cơ sở dữ liệu mở rộng dung lượng lên đến 100TB và tự động co giãn thêm các bản sao Read Replicas chỉ trong vài giây.',
        bulletPoints: [
          'Azure SQL Serverless: Tự động co giãn số lượng vCores theo thời gian thực và tự động "Pause" (ngủ đông) khi không có kết nối trong khoảng thời gian cấu hình, giúp tiết kiệm đến 70% ngân sách cho môi trường Dev/Staging.',
          'Active Geo-Replication: Thiết lập tối đa 4 bản sao chỉ đọc (Readable Secondary) tại các Region khác nhau trên toàn thế giới để vừa phân tải truy vấn đọc vừa sẵn sàng chuyển đổi dự phòng khi có thảm họa.'
        ]
      },
      {
        heading: '2. Kỳ Quan NoSQL Phân Tán Toàn Cầu: Azure Cosmos DB',
        subheading: 'Multi-Region Writes & 5 Mức Độ Nhất Quán Dữ Liệu (Consistency Levels)',
        content: 'Azure Cosmos DB là cơ sở dữ liệu NoSQL phân tán toàn cầu (Globally Distributed Database) cung cấp cam kết SLA 99.999% về độ sẵn sàng và độ trễ đọc/ghi dưới 10ms ở phân vị 99th.\n\nĐiểm độc nhất vô nhị của Cosmos DB là cho phép kiến trúc sư chọn chính xác 1 trong 5 Mức độ nhất quán (Consistency Levels) tùy theo bài toán cân bằng giữa CAP Theorem (Độ nhất quán vs Tốc độ):\n1. Strong (Mạnh nhất): Đọc luôn thấy dữ liệu mới nhất vừa ghi, chấp nhận độ trễ cao nhất.\n2. Bounded Staleness: Cho phép đọc dữ liệu trễ hơn bản ghi tối đa K phiên bản hoặc T giây.\n3. Session (Mặc định & phổ biến nhất): Đảm bảo người dùng luôn đọc được chính xác dữ liệu do chính họ vừa tạo ra trong phiên làm việc.\n4. Consistent Prefix: Đảm bảo thứ tự của các bản ghi không bao giờ bị đảo lộn.\n5. Eventual (Yếu nhất): Tốc độ nhanh nhất, chi phí rẻ nhất, dữ liệu sẽ đồng bộ dần theo thời gian.',
        codeBlock: {
          language: 'bash',
          title: 'Khởi tạo tài khoản Azure Cosmos DB NoSQL hỗ trợ Multi-Region và Serverless',
          code: `# Tạo Cosmos DB Account chạy chế độ Serverless tối ưu chi phí
az cosmosdb create \\
  --name cdb-ecommerce-global-prod \\
  --resource-group rg-production-southeastasia-001 \\
  --locations regionName=southeastasia failoverPriority=0 isZoneRedundant=False \\
  --capabilities EnableServerless \\
  --default-consistency-level Session`
        },
        proTip: 'Đơn vị tính toán và chi phí của Cosmos DB là Request Units (RU/s). Một thao tác đọc tài liệu 1KB tương đương 1 RU. Luôn thiết kế Partition Key chuẩn xác để dữ liệu phân bổ đồng đều, tránh tạo ra Hot Partition làm nghẽn RU/s.'
      }
    ],
    practicalCommands: [
      {
        title: 'Tạo Database SQL Serverless với cấu hình tự động ngủ đông',
        command: 'az sql db create --resource-group rg-production --server srv-fintech-prod --name db-fintech-core --edition GeneralPurpose --compute-model Serverless --family Gen5 --min-capacity 0.5 --capacity 4 --auto-pause-delay 60',
        description: 'Tạo Azure SQL Serverless tự co giãn từ 0.5 đến 4 vCore và ngủ đông sau 60 phút nhàn rỗi.'
      },
      {
        title: 'Tạo Database PostgreSQL Flexible Server',
        command: 'az postgres flexible-server create --resource-group rg-production --name ps-fintech-prod --location southeastasia --tier GeneralPurpose --sku-name Standard_D2ds_v4 --storage-size 128',
        description: 'Tạo máy chủ PostgreSQL Flexible Server hiệu năng cao.'
      }
    ],
    masteryChecklist: [
      'Phân biệt rạch ròi mô hình DTU vs vCore và các kịch bản dùng Azure SQL Hyperscale.',
      'Thuộc lòng và giải thích được 5 mức độ nhất quán dữ liệu của Azure Cosmos DB.',
      'Thiết kế Partition Key chuẩn xác cho các hệ thống NoSQL quy mô lớn.'
    ]
  },
  {
    id: 'az-ch-7',
    chapterNumber: 7,
    title: 'Cân Bằng Tải, Định Tuyến & Mạng Phân Phối',
    subtitle: 'Bản Đồ Quyết Định Chọn Đúng: Load Balancer, Application Gateway, Traffic Manager & Front Door',
    level: 'Nâng cao',
    readTimeMinutes: 20,
    category: 'load_balancing_traffic_frontdoor',
    summary: 'Ma trận chọn đúng công nghệ định tuyến trên Azure: Phân biệt rành mạch giữa Layer 4 (Azure Load Balancer), Layer 7 Regional (Application Gateway + WAF), Global DNS Routing (Traffic Manager) và Global Layer 7 CDN (Azure Front Door).',
    hookStory: 'Nhiều đội ngũ kỹ thuật triển khai cùng lúc cả Load Balancer lẫn Application Gateway và Traffic Manager mà không hiểu rõ ranh giới phân tầng mạng, dẫn đến chi phí hạ tầng tăng gấp 3 và độ trễ phản hồi bị cộng dồn. Hiểu đúng ma trận 4 dịch vụ định tuyến của Azure sẽ giúp bạn tinh gọn kiến trúc chỉ trong một bản vẽ duy nhất.',
    sections: [
      {
        heading: '1. Ma Trận 4 Dịch Vụ Cân Bằng Tải Cốt Lõi Của Azure',
        subheading: 'Layer 4 vs Layer 7 • Regional vs Global • Non-HTTP vs HTTP(S)',
        content: 'Để chọn đúng dịch vụ cân bằng tải, bạn chỉ cần trả lời 2 câu hỏi:\n1. Giao thức là gì? (HTTP/HTTPS hay TCP/UDP thô?)\n2. Phạm vi định tuyến ở đâu? (Trong 1 Region hay Toàn Cầu Đa Vùng?)\n\nTừ 2 câu hỏi trên, Azure phân bổ thành 4 giải pháp rõ ràng:\n- Azure Load Balancer: Hoạt động ở Tầng 4 (TCP/UDP), phạm vi Regional. Cực kỳ nhanh, độ trễ siêu thấp, không can thiệp nội dung gói tin, thường dùng cho Database Clusters hoặc Backend VMs.\n- Azure Application Gateway: Hoạt động ở Tầng 7 (HTTP/HTTPS), phạm vi Regional. Hỗ trợ URL Path-based routing, SSL/TLS Termination và tích hợp tường lửa Web Application Firewall (WAF) chống tấn công OWASP Top 10.\n- Azure Traffic Manager: Bộ cân bằng tải toàn cầu dựa trên máy chủ DNS (DNS-based routing). Hướng người dùng về Region gần nhất hoặc chuyển hướng dự phòng khi một Region sập.\n- Azure Front Door: Dịch vụ định tuyến toàn cầu cao cấp nhất ở Tầng 7, kết hợp mạng phân phối nội dung (Global CDN), Anycast Network tăng tốc truyền tải, SSL Offloading và Enterprise WAF.',
        bulletPoints: [
          'Path-based Routing trên App Gateway: Định tuyến `/api/*` về cụm Backend Pool máy ảo Node.js, trong khi định tuyến `/static/*` về cụm Nginx hoặc Storage.',
          'Azure Front Door Fast Failover: Khác với Traffic Manager phụ thuộc vào DNS TTL của nhà mạng, Front Door sử dụng Anycast Edge PoP nên có thể chuyển hướng khách hàng sang Region dự phòng chỉ trong chưa đầy 3 giây.'
        ],
        mindsetShift: {
          from: 'Cứ thấy tải chậm là cắm thêm Azure Load Balancer phía trước mọi ứng dụng Web.',
          to: 'Dùng Azure Front Door ở tầng rìa toàn cầu cho Web/API và kết hợp Application Gateway + WAF nội bộ ở từng Region.',
          impact: 'Tăng tốc độ tải trang toàn cầu lên 300% nhờ giao thức Anycast và ngăn chặn triệt để tấn công DDoS/SQL Injection trước khi chạm tới máy chủ.'
        }
      },
      {
        heading: '2. Chiến Lược Thiết Kế Multi-Region High Availability & Disaster Recovery (DR)',
        subheading: 'Mô Hình Active-Active vs Active-Passive (Hot/Warm/Cold Standby)',
        content: 'Trong kiến trúc thảm họa cấp doanh nghiệp, hệ thống được thiết kế theo 2 mô hình chính:\n\n- Active-Active Multi-Region: Lưu lượng truy cập được chia đều cho 2 hoặc nhiều Region cùng lúc (thường kết hợp Azure Front Door + Cosmos DB Multi-Region Write). Khi 1 Region sập, 100% người dùng tự động chuyển sang Region còn lại mà không mất 1 mili-giây gián đoạn.\n- Active-Passive (Hot Standby): Region chính xử lý toàn bộ tải, Region phụ đồng bộ dữ liệu liên tục và sẵn sàng tiếp quản khi Region chính gặp sự cố (RTO dưới 5 phút, RPO gần bằng 0).',
        codeBlock: {
          language: 'bash',
          title: 'Tạo một Azure Application Gateway với tính năng SSL Termination',
          code: `# Tạo Public IP chuẩn Standard cho Application Gateway
az network public-ip create \\
  --resource-group rg-production-southeastasia-001 \\
  --name pip-appgw-prod \\
  --allocation-method Static --sku Standard

# Tạo Application Gateway WAF_v2 hỗ trợ tự động co giãn từ 2 đến 10 instance
az network application-gateway create \\
  --name appgw-ecommerce-prod \\
  --resource-group rg-production-southeastasia-001 \\
  --location southeastasia \\
  --sku WAF_v2 \\
  --capacity 2 \\
  --vnet-name vnet-spoke-prod \\
  --subnet snet-appgw \\
  --public-ip-address pip-appgw-prod \\
  --http-settings-port 80 \\
  --http-settings-protocol Http`
        },
        proTip: 'Application Gateway bắt buộc phải được đặt trong một Subnet riêng biệt chuyên dụng (ví dụ: `snet-appgw`), không được chứa bất kỳ máy ảo nào khác bên trong Subnet này.'
      }
    ],
    practicalCommands: [
      {
        title: 'Kiểm tra trạng thái sức khỏe của Backend Pool trong App Gateway',
        command: 'az network application-gateway show-backend-health --resource-group rg-production --name appgw-ecommerce-prod',
        description: 'Kiểm tra các server backend có đang phản hồi mã HTTP 200 OK từ Health Probe hay không.'
      },
      {
        title: 'Tạo Endpoint cho Azure Front Door Profile',
        command: 'az afd endpoint create --resource-group rg-production --profile-name fd-ecommerce-global --endpoint-name shop-global --enabled-state Enabled',
        description: 'Tạo điểm truy cập Edge toàn cầu cho Azure Front Door.'
      }
    ],
    masteryChecklist: [
      'Vẽ chính xác sơ đồ cây quyết định lựa chọn 4 dịch vụ cân bằng tải của Azure.',
      'Cấu hình Application Gateway WAF_v2 với SSL Termination và URL Routing.',
      'Phân biệt sự khác biệt về độ trễ chuyển đổi dự phòng giữa DNS Traffic Manager và Anycast Front Door.'
    ]
  },
  {
    id: 'az-ch-8',
    chapterNumber: 8,
    title: 'Giám Sát, Tự Động Hóa & Quản Trị Hạ Tầng',
    subtitle: 'Azure Monitor, Log Analytics Workspaces (KQL), Azure Policy & Ngôn Ngữ Bicep IaC',
    level: 'Nâng cao',
    readTimeMinutes: 22,
    category: 'monitoring_governance_bicep',
    summary: 'Xây dựng hệ thống vận hành chuẩn DevOps: Khai thác sức mạnh truy vấn Log Analytics với ngôn ngữ KQL (Kusto Query Language), thiết lập giám sát APM qua Application Insights, áp đặt chính sách tuân thủ tự động với Azure Policy và định nghĩa hạ tầng hiện đại bằng Azure Bicep.',
    hookStory: 'Khi một lỗi bộ nhớ (Memory Leak) làm treo dịch vụ thanh toán vào lúc 2 giờ sáng, đội ngũ SRE không cần SSH vào từng máy chủ để đọc log. Họ chỉ cần viết 3 dòng truy vấn KQL trên Azure Monitor Log Analytics để chỉ ra chính xác dòng code gây ra lỗi cùng biểu đồ trực quan hóa số lượng exception theo từng phút.',
    sections: [
      {
        heading: '1. Hệ Sinh Thái Quan Sát Toàn Diện: Azure Monitor & Application Insights',
        subheading: 'Làm Chủ Ngôn Ngữ Truy Vấn KQL (Kusto Query Language) Cho Nhật Ký Hoạt Động',
        content: 'Azure Monitor là trung tâm thu thập và phân tích toàn bộ dữ liệu giám sát của đám mây:\n\n- Metrics: Các chỉ số số liệu theo thời gian thực (CPU %, Network In/Out, Disk IOPS, HTTP 5xx rate) dùng để kích hoạt Alert và Auto-scaling.\n- Logs: Dữ liệu nhật ký có cấu trúc được lưu trong Log Analytics Workspace. Kỹ sư sử dụng ngôn ngữ KQL (Kusto Query Language) với cú pháp đường ống pipe (`|`) cực kỳ mạnh mẽ để tìm kiếm hàng tỷ bản ghi log chỉ trong vài giây.\n- Application Insights: Công cụ Application Performance Monitoring (APM) theo dõi sâu bên trong mã nguồn ứng dụng (Live Metrics, Application Map, End-to-end Transaction Tracking, Database Dependency Calls).',
        codeBlock: {
          language: 'kql',
          title: 'Truy vấn KQL phát hiện top 5 lỗi HTTP 500 xuất hiện nhiều nhất trong 24h qua',
          code: `// Truy vấn Kusto Query Language (KQL) trên Application Insights
requests
| where timestamp > ago(24h)
| where resultCode startswith "5"
| summarize ErrorCount = count(), AvgDurationMs = avg(duration) by name, resultCode, url
| top 5 by ErrorCount desc`
        },
        bulletPoints: [
          'Application Map: Tự động vẽ sơ đồ trực quan kết nối mạng giữa Web App, Database SQL, Redis Cache và External APIs kèm thời gian phản hồi trung bình và tỷ lệ lỗi của từng liên kết.',
          'Smart Detection: Trí tuệ nhân tạo của Azure tự động gửi email cảnh báo khi phát hiện sự bất thường trong thời gian phản hồi hoặc tỷ lệ lỗi tăng đột biến mà không cần cài đặt ngưỡng thủ công.'
        ]
      },
      {
        heading: '2. Quản Trị Tuân Thủ (Azure Policy) & Hạ Tầng Dạng Mã Nguồn (Azure Bicep)',
        subheading: 'Thay Thế ARM JSON Phức Tạp Bằng Ngôn Ngữ DSL Bicep Trong Sáng & Mạnh Mẽ',
        content: 'Trong doanh nghiệp lớn, việc thả lỏng cho kỹ sư tự do tạo tài nguyên trên Portal sẽ dẫn đến thảm họa chi phí và bảo mật. Azure Policy đóng vai trò là "Cảnh sát tự động":\n- Ngăn chặn người dùng tạo máy ảo ở ngoài khu vực cho phép (ví dụ: chỉ cho tạo tài nguyên tại Southeast Asia).\n- Bắt buộc mọi tài nguyên phải gắn thẻ `Environment` và `CostCenter`.\n- Tự động chặn tạo Storage Account nếu chưa bật tính năng mã hóa hoặc chưa tắt Public Access.\n\nVề mặt Infrastructure as Code (IaC), Microsoft đã phát minh ra Bicep – ngôn ngữ Domain-Specific Language (DSL) hiện đại, sạch sẽ và ngắn hơn 70% so với ARM Templates JSON truyền thống.',
        codeBlock: {
          language: 'bicep',
          title: 'Định nghĩa Storage Account và App Service chuẩn Production bằng Azure Bicep (main.bicep)',
          code: `// main.bicep
param location string = resourceGroup().location
param environmentName string = 'prod'

@minLength(3)
@maxLength(24)
param storageAccountName string = 'stfintech\${environmentName}01'

// Khai báo Storage Account
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_ZRS'
  }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
  }
  tags: {
    Environment: environmentName
    ManagedBy: 'Bicep'
  }
}`
        },
        proTip: 'File Bicep có thể biên dịch trực tiếp (Transpile) sang ARM JSON và được Azure Resource Manager hỗ trợ native mà không cần quản lý file lưu trạng thái State như Terraform.'
      }
    ],
    practicalCommands: [
      {
        title: 'Triển khai hạ tầng bằng file Bicep',
        command: 'az deployment group create --resource-group rg-production --template-file main.bicep --parameters environmentName=prod',
        description: 'Tự động khởi tạo toàn bộ tài nguyên được định nghĩa trong file Bicep.'
      },
      {
        title: 'Kiểm tra trước các thay đổi của hạ tầng Bicep (What-If)',
        command: 'az deployment group what-if --resource-group rg-production --template-file main.bicep',
        description: 'Xem trước danh sách tài nguyên sẽ được thêm, sửa hoặc xóa trước khi thực thi.'
      }
    ],
    masteryChecklist: [
      'Viết thành thạo các câu lệnh truy vấn KQL cơ bản để tra cứu log hệ thống.',
      'Sử dụng Application Insights để định vị điểm nghẽn hiệu năng trong mã nguồn.',
      'Viết và triển khai file hạ tầng dạng mã nguồn bằng Azure Bicep.'
    ]
  },
  {
    id: 'az-ch-9',
    chapterNumber: 9,
    title: 'Azure OpenAI & Hệ Sinh Thái AI Doanh Nghiệp',
    subtitle: 'Enterprise Generative AI, SLA Doanh Nghiệp, RAG Với Azure AI Search & Cognitive Services',
    level: 'Chuyên gia',
    readTimeMinutes: 22,
    category: 'ai_openai_cognitive',
    summary: 'Làm chủ làn sóng Trí tuệ nhân tạo thế hệ mới: Khám phá dịch vụ Azure OpenAI Service (GPT-4o, DALL-E 3) với tiêu chuẩn bảo mật dữ liệu doanh nghiệp, xây dựng hệ thống hỏi đáp tài liệu RAG chuẩn mực với Azure AI Search và tích hợp thị giác máy tính Cognitive Services.',
    hookStory: 'Khi các tập đoàn tài chính và y tế muốn áp dụng mô hình ngôn ngữ lớn (LLM) của OpenAI, nỗi sợ lớn nhất của họ là dữ liệu mật của khách hàng bị lộ ra ngoài hoặc bị dùng để huấn luyện model công cộng. Azure OpenAI Service đã giải quyết triệt để rào cản này bằng cách đưa các model đỉnh cao của OpenAI vào vùng mạng VNet biệt lập của doanh nghiệp với cam kết bảo mật cấp cao nhất.',
    sections: [
      {
        heading: '1. Azure OpenAI Service: AI Đỉnh Cao Với Tiêu Chuẩn Bảo Mật Doanh Nghiệp',
        subheading: 'Sự Khác Biệt Giữa OpenAI API Trực Tiếp Và Azure OpenAI Service',
        content: 'Azure OpenAI Service cung cấp các mô hình AI tiên tiến nhất của OpenAI (GPT-4o, GPT-4 Turbo, DALL-E 3, Text-Embedding-3) nhưng chạy trên nền tảng hạ tầng bảo mật của Microsoft Cloud:\n\n- Bảo Mật Dữ Liệu Tuyệt Đối: Dữ liệu prompt của bạn KHÔNG BAO GIỜ được gửi cho OpenAI, KHÔNG BAO GIỜ được lưu trữ lâu dài và KHÔNG BAO GIỜ được sử dụng để tái huấn luyện các mô hình cơ sở.\n- Tích Hợp Mạng Riêng (Private Endpoints): Cho phép khóa toàn bộ cổng API của OpenAI và chỉ cho phép máy chủ trong VNet nội bộ gọi tới qua Private IP.\n- Content Filtering & Safety: Hệ thống kiểm duyệt tự động lọc các nội dung độc hại, thù địch hoặc vi phạm bản quyền theo chính sách của tổ chức.',
        bulletPoints: [
          'Provisioned Throughput Units (PTU): Cam kết lưu lượng và băng thông xử lý token ổn định với độ trễ thấp nhất cho các ứng dụng tải cao.',
          'Fine-Tuning: Khả năng tùy biến và tinh chỉnh model với bộ dữ liệu riêng của doanh nghiệp trên hạ tầng Azure an toàn.'
        ]
      },
      {
        heading: '2. Xây Dựng Hệ Thống RAG Doanh Nghiệp Với Azure AI Search',
        subheading: 'Retrieval-Augmented Generation: Kết Hợp Vector Search, Semantic Kernel & Hybrid Search',
        content: 'Mô hình RAG (Retrieval-Augmented Generation) là tiêu chuẩn vàng để AI trả lời dựa trên kho dữ liệu nội bộ của công ty mà không bị ảo giác (Hallucination):\n\n1. Bước 1: Tài liệu (PDF, Word, SQL) được chia nhỏ (Chunking) và chuyển thành Vector Embeddings qua model `text-embedding-3-large`.\n2. Bước 2: Lưu trữ các vector vào Azure AI Search (trước đây là Azure Cognitive Search).\n3. Bước 3: Khi người dùng đặt câu hỏi, Azure AI Search thực hiện Hybrid Search (kết hợp cả tìm kiếm từ khóa BM25 cổ điển và tìm kiếm khoảng cách Vector Cosine Similarity) cùng bộ chấm điểm Semantic Reranker của Microsoft để chọn ra các đoạn văn bản chuẩn xác nhất.\n4. Bước 4: Ghép các đoạn tài liệu này vào ngữ cảnh (Context) gửi cho GPT-4o để sinh ra câu trả lời chính xác kèm trích dẫn số trang.',
        codeBlock: {
          language: 'python',
          title: 'Mã nguồn Python gọi Azure OpenAI Service với xác thực Token Entra ID',
          code: `# Yêu cầu cài đặt: pip install openai azure-identity
from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from openai import AzureOpenAI

# Xác thực không dùng API Key cứng thông qua Entra ID Managed Identity
token_provider = get_bearer_token_provider(
    DefaultAzureCredential(), "https://cognitiveservices.azure.com/.default"
)

client = AzureOpenAI(
    api_version="2024-02-15-preview",
    azure_endpoint="https://aoai-fintech-prod.openai.azure.com/",
    azure_ad_token_provider=token_provider
)

response = client.chat.completions.create(
    model="gpt-4o", # Tên deployment trong Azure OpenAI Studio
    messages=[
        {"role": "system", "content": "Bạn là chuyên gia tư vấn kiến trúc Azure cấp cao."},
        {"role": "user", "content": "So sánh ưu nhược điểm giữa Azure Functions và Container Apps."}
    ],
    temperature=0.2
)

print(response.choices[0].message.content)`
        },
        proTip: 'Sử dụng Semantic Reranker trong Azure AI Search có thể cải thiện độ chuẩn xác của kết quả RAG lên thêm 30-40% so với việc chỉ dùng Vector Search đơn thuần.'
      }
    ],
    practicalCommands: [
      {
        title: 'Tạo tài nguyên Azure OpenAI Account',
        command: 'az cognitiveservices account create --name aoai-fintech-prod --resource-group rg-production --location eastus --kind OpenAI --sku S0',
        description: 'Khởi tạo tài khoản dịch vụ Azure OpenAI.'
      },
      {
        title: 'Triển khai Model GPT-4o trong Azure OpenAI',
        command: 'az cognitiveservices account deployment create --resource-group rg-production --name aoai-fintech-prod --deployment-name gpt-4o --model-name gpt-4o --model-version "2024-05-13" --model-format OpenAI --sku-capacity 10 --sku-name "Standard"',
        description: 'Deploy mô hình GPT-4o sẵn sàng nhận request từ ứng dụng.'
      }
    ],
    masteryChecklist: [
      'Giải thích cam kết bảo mật dữ liệu doanh nghiệp của Azure OpenAI Service.',
      'Hiểu rõ quy trình 4 bước của kiến trúc RAG kết hợp Azure AI Search.',
      'Sử dụng xác thực Entra ID không cần mật khẩu khi gọi AI APIs.'
    ]
  },
  {
    id: 'az-ch-10',
    chapterNumber: 10,
    title: 'Tối Ưu Chi Phí, Độ Tin Cậy & Lộ Trình Master Chứng Chỉ Azure',
    subtitle: 'FinOps Đám Mây, Khung Kiến Trúc Well-Architected & Cẩm Nang Chinh Phục AZ-900 Đến AZ-305',
    level: 'Chuyên gia',
    readTimeMinutes: 24,
    category: 'finops_well_architected_certifications',
    summary: 'Tổng kết toàn diện con đường trở thành Azure Solutions Architect bậc thầy: Thực hành FinOps với Reservations và Savings Plans giảm 72% chi phí, ứng dụng 5 trụ cột của Microsoft Well-Architected Framework và lộ trình chinh phục bộ chứng chỉ danh giá (AZ-900, AZ-104, AZ-305).',
    hookStory: 'Một kiến trúc sư Azure xuất sắc không phải là người biết cách bật tất cả các dịch vụ đắt đỏ nhất trên Portal, mà là người có thể thiết kế một hệ thống xử lý hàng triệu người dùng, đạt chuẩn SLA 99.99%, phục hồi sau sự cố trong 5 phút mà chỉ tiêu tốn ngân sách bằng 1/3 so với dự toán ban đầu của ban giám đốc.',
    sections: [
      {
        heading: '1. Chiến Lược FinOps: Cắt Giảm Đến 72% Chi Phí Đám Mây',
        subheading: 'Pay-As-You-Go vs Azure Reservations (1-3 Năm), Savings Plans & Azure Hybrid Benefit',
        content: 'Thực hành FinOps (Financial Operations) là kỹ năng phân biệt giữa kỹ sư nghiệp dư và kiến trúc sư trưởng:\n\n1. Azure Reservations: Cam kết sử dụng máy ảo, SQL Database hoặc Cosmos DB cố định trong thời hạn 1 năm hoặc 3 năm để được giảm giá từ 40% đến 72% so với giá Pay-As-You-Go.\n2. Azure Savings Plans for Compute: Linh hoạt hơn Reservations, bạn chỉ cần cam kết chi tiêu một số tiền nhất định mỗi giờ (ví dụ: \$20/giờ) cho tất cả các dịch vụ tính toán (VMs, App Service, Functions, Container Apps) và nhận mức giảm giá đến 65% trên toàn bộ các Region.\n3. Azure Hybrid Benefit (AHB): Tận dụng các bản quyền Windows Server và SQL Server có bảo hiểm phần mềm (Software Assurance) hiện có từ On-Premises để chuyển lên Azure hoàn toàn miễn phí tiền bản quyền HĐH.',
        bulletPoints: [
          'Azure Cost Management & Budgets: Cài đặt hạn mức ngân sách theo từng Resource Group và tự động gửi cảnh báo webhook khi chi phí đạt ngưỡng 80% và 100%.',
          'Azure Advisor: Công cụ AI miễn phí của Microsoft liên tục quét toàn bộ tài nguyên để phát hiện các máy ảo bị bỏ quên (Underutilized VMs) hoặc các ổ đĩa không gắn vào máy nào (Unattached Disks) để đề xuất xóa/hạ size.'
        ]
      },
      {
        heading: '2. Khung Kiến Trúc Microsoft Azure Well-Architected Framework & Lộ Trình Chứng Chỉ',
        subheading: '5 Trụ Cột Vàng & Bản Đồ Chinh Phục: AZ-900 (Nền tảng) -> AZ-104 (Quản trị) -> AZ-305 (Kiến trúc)',
        content: 'Mọi thiết kế hệ thống chuyên nghiệp trên Azure đều phải được thẩm định qua 5 Trụ Cột của Well-Architected Framework:\n1. Reliability (Độ tin cậy): Khả năng tự phục hồi sau sự cố và tiếp tục hoạt động.\n2. Security (Bảo mật): Bảo vệ dữ liệu, danh tính và ứng dụng theo chuẩn Zero Trust.\n3. Cost Optimization (Tối ưu chi phí): Loại bỏ lãng phí tài nguyên và tối đa hóa giá trị kinh doanh.\n4. Operational Excellence (Vận hành xuất sắc): Tự động hóa CI/CD, giám sát tập trung và phản ứng sự cố.\n5. Performance Efficiency (Hiệu năng): Khả năng co giãn linh hoạt đáp ứng tải đột biến.\n\nLộ trình chinh phục chứng chỉ Microsoft chính quy:\n- AZ-900 (Azure Fundamentals): Dành cho người mới bắt đầu hiểu bức tranh tổng thể và thuật ngữ đám mây.\n- AZ-104 (Azure Administrator Associate): Kiểm tra thực chiến kỹ năng cấu hình VNet, Identity, Compute, Storage và Backup.\n- AZ-305 (Azure Solutions Architect Expert): Đỉnh cao kiến trúc sư, đòi hỏi khả năng thiết kế hệ thống toàn diện, đáp ứng bài toán kinh doanh phức tạp.',
        mindsetShift: {
          from: 'Coi việc lấy chứng chỉ là học vẹt các câu hỏi đề thi (Dumps) để có tấm bằng trên giấy.',
          to: 'Hiểu sâu bản chất kiến trúc, tự tay thực hành toàn bộ CLI/Bicep và ứng dụng trực tiếp vào giải quyết bài toán của doanh nghiệp.',
          impact: 'Trở thành một Solutions Architect thực thụ, tự tin dẫn dắt các dự án chuyển đổi đám mây triệu USD.'
        }
      }
    ],
    practicalCommands: [
      {
        title: 'Xem các khuyến nghị tiết kiệm chi phí từ Azure Advisor',
        command: 'az advisor recommendation list --category Cost --output table',
        description: 'Liệt kê danh sách các tài nguyên có thể cắt giảm chi phí tức thì.'
      },
      {
        title: 'Xem báo cáo tóm tắt chi phí tháng hiện tại theo Resource Group',
        command: 'az consumption usage list --start-date 2026-09-01 --end-date 2026-09-30 --output table',
        description: 'Tra cứu mức độ tiêu thụ ngân sách chi tiết của Subscription.'
      }
    ],
    masteryChecklist: [
      'Áp dụng thành thạo Reservations, Savings Plans và Azure Hybrid Benefit để tối ưu ngân sách.',
      'Đánh giá hệ thống dựa trên 5 trụ cột của Azure Well-Architected Framework.',
      'Sở hữu lộ trình rõ ràng và kiến thức vững chắc để vượt qua kỳ thi AZ-900, AZ-104 và AZ-305.'
    ]
  }
];
