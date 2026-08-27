export interface FinOpsChallenge {
  id: string;
  title: string;
  titleEn: string;
  initialMonthlyCost: number;
  targetCost: number;
  department: string;
  items: {
    id: string;
    resourceName: string;
    resourceNameEn: string;
    currentCost: number;
    currentConfig: string;
    currentConfigEn: string;
    options: {
      id: string;
      title: string;
      titleEn: string;
      newCost: number;
      savings: number;
      isOptimal: boolean;
      explanation: string;
      explanationEn: string;
    }[];
  }[];
}

export const FINOPS_CHALLENGES: FinOpsChallenge[] = [
  {
    id: 'finops-1',
    title: 'Cắt Giảm Hóa Đơn AWS Trường Đại Học Từ $25,400 Xuống < $15,000/Tháng',
    titleEn: 'Campus FinOps Battle: Slash AWS Monthly Bill from $25,400 to < $15,000',
    initialMonthlyCost: 25400,
    targetCost: 15000,
    department: 'Kent State University IT & LMS Cloud Infrastructure',
    items: [
      {
        id: 'res-1',
        resourceName: '4 Máy Chủ Ứng Dụng EC2 m5.4xlarge Chạy 24/7 (CPU Trung Bình Chỉ 8%)',
        resourceNameEn: '4x EC2 m5.4xlarge On-Demand instances running 24/7 (Avg CPU 8%)',
        currentCost: 2300,
        currentConfig: '4x m5.4xlarge On-Demand (64 vCPU, 256GB RAM) - Chạy liên tục ngày đêm',
        currentConfigEn: '4x m5.4xlarge On-Demand instances (64 vCPU, 256GB RAM) running unscaled',
        options: [
          {
            id: 'opt-1a',
            title: 'Chuyển sang 2x c7g.xlarge (AWS Graviton3) + Auto Scaling Group + 1-Năm Savings Plans',
            titleEn: 'Migrate to 2x c7g.xlarge (AWS Graviton3) + Auto Scaling + 1-Year Compute Savings Plans',
            newCost: 380,
            savings: 1920,
            isOptimal: true,
            explanation: '✅ TIẾT KIỆM $1,920/tháng! Chip ARM Graviton3 rẻ hơn 20% và mạnh hơn 25%, kết hợp Auto-Scaling tắt bớt máy chủ ban đêm và Savings Plans giảm thêm 40%.',
            explanationEn: '✅ SAVED $1,920/mo! Graviton3 delivers 25% better price-performance, Auto Scaling stops idle nighttime nodes, and Savings Plans cut costs by 40%.'
          },
          {
            id: 'opt-1b',
            title: 'Giữ nguyên m5.4xlarge và nâng cấp lên m5.8xlarge cho mạnh hơn',
            titleEn: 'Upgrade to larger m5.8xlarge instances',
            newCost: 4600,
            savings: -2300,
            isOptimal: false,
            explanation: '❌ LÃNG PHÍ! Máy chủ đang nhàn rỗi (CPU 8%), nâng cấp lớn hơn chỉ làm tăng gấp đôi hóa đơn vô ích.',
            explanationEn: '❌ WASTE OF MONEY! Instances are already underutilized (8% CPU).'
          }
        ]
      },
      {
        id: 'res-2',
        resourceName: '200TB Dữ Liệu Hồ Sơ Sinh Viên Cũ Lưu Trên S3 Standard (Không Ai Đọc Trong 3 Năm)',
        resourceNameEn: '200TB Alumni Historical Records in S3 Standard (Zero reads in 3 years)',
        currentCost: 4600,
        currentConfig: '200TB S3 Standard ($0.023/GB/tháng) = $4,600/tháng',
        currentConfigEn: '200TB S3 Standard tier ($0.023/GB/month) = $4,600/month',
        options: [
          {
            id: 'opt-2a',
            title: 'Chuyển toàn bộ 200TB sang S3 Glacier Deep Archive ($0.00099/GB/tháng)',
            titleEn: 'Apply S3 Lifecycle Rule to transition 200TB to S3 Glacier Deep Archive ($0.00099/GB)',
            newCost: 198,
            savings: 4402,
            isOptimal: true,
            explanation: '✅ TIẾT KIỆM KHỔNG LỒ $4,402/tháng! S3 Glacier Deep Archive giảm chi phí lưu trữ hơn 95% mà vẫn đảm bảo tuân thủ lưu trữ dữ liệu 10 năm theo luật liên bang.',
            explanationEn: '✅ MASSIVE SAVINGS $4,402/mo! Deep Archive cuts 95% of storage fees while preserving immutable 10-year academic compliance.'
          },
          {
            id: 'opt-2b',
            title: 'Xóa vĩnh viễn toàn bộ hồ sơ sinh viên cũ để không tốn tiền lưu trữ',
            titleEn: 'Delete all student alumni records permanently',
            newCost: 10000,
            savings: -5400,
            isOptimal: false,
            explanation: '❌ PHẠT VI PHẠM PHÁP LUẬT! Xóa hồ sơ sinh viên vi phạm quy định kiểm toán của Bộ Giáo Dục, bị phạt tiền nặng hơn tiền lưu trữ.',
            explanationEn: '❌ REGULATORY FINES! Deleting academic records breaches federal accreditation laws.'
          }
        ]
      },
      {
        id: 'res-3',
        resourceName: '12 NAT Gateways Triển Khai Dư Thừa Ở 4 VPC Không Sử Dụng',
        resourceNameEn: '12x Redundant NAT Gateways across test/dev VPCs with minimal traffic',
        currentCost: 3900,
        currentConfig: '12 NAT Gateways ($0.045/giờ + phí dữ liệu) = ~$3,900/tháng',
        currentConfigEn: '12 NAT Gateways ($0.045/hr + data processing fees) = ~$3,900/month',
        options: [
          {
            id: 'opt-3a',
            title: 'Hợp nhất về 2 NAT Gateways dùng chung qua AWS Transit Gateway + Bật VPC Endpoints cho S3/DynamoDB (Miễn phí)',
            titleEn: 'Consolidate to 2 shared NAT Gateways via Transit Gateway + Free Gateway VPC Endpoints for S3',
            newCost: 450,
            savings: 3450,
            isOptimal: true,
            explanation: '✅ TIẾT KIỆM $3,450/tháng! VPC Endpoint cho S3/DynamoDB chuyển toàn bộ lưu lượng nội bộ miễn phí, không tốn phí NAT Gateway xử lý dữ liệu.',
            explanationEn: '✅ SAVED $3,450/mo! Gateway VPC Endpoints route S3 traffic free of charge without hitting NAT data fees.'
          },
          {
            id: 'opt-3b',
            title: 'Tạo thêm 8 NAT Gateways mới cho mỗi Subnet để dự phòng',
            titleEn: 'Deploy 8 additional NAT Gateways per subnet',
            newCost: 6500,
            savings: -2600,
            isOptimal: false,
            explanation: '❌ LÃNG PHÍ GẤP ĐÔI! Các VPC thử nghiệm không cần số lượng NAT Gateway dày đặc như vậy.',
            explanationEn: '❌ OVER-PROVISIONED! Dev VPCs do not need dozens of dedicated NAT gateways.'
          }
        ]
      },
      {
        id: 'res-4',
        resourceName: '50TB Ổ Đĩa Ảo EBS gp2 Đời Cũ Chưa Chuyển Sang gp3',
        resourceNameEn: '50TB Legacy EBS gp2 Block Storage volumes',
        currentCost: 5000,
        currentConfig: '50TB EBS gp2 ($0.10/GB) = $5,000/tháng',
        currentConfigEn: '50TB EBS gp2 ($0.10/GB) = $5,000/month',
        options: [
          {
            id: 'opt-4a',
            title: 'Nâng cấp toàn bộ ổ đĩa từ gp2 lên gp3 ($0.08/GB) bằng 1 click (Không cần dừng máy chủ)',
            titleEn: 'Modify all EBS volumes from gp2 to gp3 ($0.08/GB) with zero downtime',
            newCost: 4000,
            savings: 1000,
            isOptimal: true,
            explanation: '✅ TIẾT KIỆM NGAY $1,000/tháng! gp3 rẻ hơn gp2 đúng 20% và cung cấp sẵn 3,000 IOPS miễn phí mà không cần tắt máy chủ.',
            explanationEn: '✅ INSTANT $1,000/mo SAVING! gp3 is 20% cheaper than gp2 and includes 3,000 IOPS baseline for free.'
          },
          {
            id: 'opt-4b',
            title: 'Chuyển sang ổ đĩa EBS io2 Block Express giá đắt nhất ($0.125/GB + $0.065/IOPS)',
            titleEn: 'Switch to ultra-expensive io2 Block Express volumes',
            newCost: 11000,
            savings: -6000,
            isOptimal: false,
            explanation: '❌ QUÁ ĐẮT ĐỎ! io2 Block Express chỉ dành cho các hệ thống SAP/Oracle đặc thù chịu tải hàng trăm ngàn IOPS.',
            explanationEn: '❌ EXCESSIVE! io2 is only for mission-critical sub-millisecond databases.'
          }
        ]
      }
    ]
  }
];
