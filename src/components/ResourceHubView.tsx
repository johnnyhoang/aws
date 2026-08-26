import React from 'react';
import { 
  Library, 
  ExternalLink, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Calculator,
  CheckCircle2,
  Award,
  Globe2
} from 'lucide-react';

export const ResourceHubView: React.FC = () => {
  const topInstructors = [
    {
      name: 'Stephane Maarek',
      badge: 'Bestseller Toàn Cầu trên Udemy',
      focus: 'Khóa học lý thuyết xúc tích, bám sát 100% đề thi, cập nhật liên tục theo chuẩn kỳ thi mới nhất.',
      recommendedFor: 'Tất cả các chứng chỉ từ CLF-C02, SAA-C03, SOA-C02, DVA-C02 đến SAP-C02.',
      tips: 'Nên xem video ở tốc độ 1.25x - 1.5x, ghi chép lại các slide tóm tắt cuối mỗi chương.'
    },
    {
      name: 'Adrian Cantrill',
      badge: 'Chuyên Gia Hình Ảnh & Kiến Trúc Sâu',
      focus: 'Khóa học có chiều sâu kỹ thuật vô đối (40-70 giờ/khóa), sơ đồ kiến trúc hoạt hình cực kỳ trực quan và bài Lab thực hành thực tế.',
      recommendedFor: 'Đặc biệt xuất sắc cho Solutions Architect Associate (SAA-C03) và Professional (SAP-C02).',
      tips: 'Nếu bạn muốn hiểu bản chất từng gói tin mạng di chuyển như thế nào thay vì chỉ học vẹt để thi, khóa của Adrian là số 1.'
    },
    {
      name: 'Jon Bonso (Tutorials Dojo)',
      badge: 'Tiêu Chuẩn Vàng Về Đề Thi Thử',
      focus: 'Bộ đề thi thử sát với đề thi thật nhất thế giới. Mỗi câu hỏi đều có giải thích chi tiết tại sao đúng và tại sao từng phương án khác sai.',
      recommendedFor: 'Bắt buộc phải làm trước ngày thi chính thức 2 tuần.',
      tips: 'Luyện đề theo chế độ Timed Mode hoặc Review Mode trên trang web tutorialsdojo.com để quen với áp lực thời gian.'
    }
  ];

  const whitepapers = [
    {
      title: 'AWS Well-Architected Framework',
      pillar: '6 Trụ Cột Kiến Trúc Chuẩn',
      description: 'Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability.',
      importance: 'Bắt buộc đọc cho kỳ thi SAA-C03 và SAP-C02.'
    },
    {
      title: 'AWS Security Best Practices for Higher-Ed & Enterprise',
      pillar: 'Bảo Mật & Tuân Thủ FERPA',
      description: 'Mô hình đa tài khoản (AWS Organizations), phân quyền IAM Identity Center, mã hóa dữ liệu với KMS.',
      importance: 'Cực kỳ hữu ích khi trả lời phỏng vấn các trường đại học Mỹ.'
    },
    {
      title: 'Overview of Amazon Web Services (AWS Whitepaper)',
      pillar: 'Tổng Quan Dịch Vụ',
      description: 'Bản đồ tổng thể tất cả các nhóm dịch vụ Compute, Storage, Database, Networking, AI/ML của AWS.',
      importance: 'Dành cho người mới bắt đầu lấy đà (CLF-C02).'
    }
  ];

  const jobPortals = [
    {
      name: 'HigherEdJobs.com',
      description: 'Cổng thông tin việc làm số 1 chuyên ngành giáo dục đại học tại Mỹ. Tìm kiếm theo từ khóa "Cloud Engineer", "Systems Administrator", "AWS".'
    },
    {
      name: 'EDUCAUSE Career Center',
      description: 'Hiệp hội công nghệ thông tin đại học lớn nhất thế giới, thường xuyên đăng tuyển các vị trí IT cấp cao tại các trường đại học Mỹ.'
    },
    {
      name: 'Kent State University Jobs Portal (jobs.kent.edu)',
      description: 'Trang tuyển dụng chính thức của Đại học Kent State. Kiểm tra mục "Division of Information Technology (IT)".'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-slate-100">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-6 md:p-8 shadow-2xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          <Library className="w-3.5 h-3.5" />
          Kho Tài Nguyên Học Tập Được Tuyển Chọn
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          Tài Liệu Ôn Luyện & Kênh Tuyển Dụng Uy Tín
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
          Tập hợp các tài liệu, giảng viên hàng đầu thế giới và các cổng thông tin tìm kiếm việc làm IT tại các trường đại học Mỹ.
        </p>
      </div>

      {/* Top 3 Instructors */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          Top 3 Giảng Viên & Nền Tảng Luyện Đề Tốt Nhất
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topInstructors.map((inst, idx) => (
            <div key={idx} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4 shadow-lg flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {inst.badge}
                </span>
                <h3 className="text-lg font-black text-white">{inst.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{inst.focus}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <strong className="text-sky-300 block mb-0.5">Khuyên dùng cho:</strong>
                  <span className="text-slate-400">{inst.recommendedFor}</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-slate-300">
                  <strong className="text-amber-400 block mb-0.5">Mẹo học hiệu quả:</strong>
                  {inst.tips}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AWS Official Whitepapers */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sky-400" />
          Tài Liệu Kỹ Thuật Chính Thức Cần Đọc (AWS Whitepapers)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {whitepapers.map((wp, idx) => (
            <div key={idx} className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider bg-sky-500/10 px-2 py-0.5 rounded">
                {wp.pillar}
              </span>
              <h3 className="font-bold text-white text-sm leading-snug">{wp.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{wp.description}</p>
              <div className="text-[11px] text-amber-300 font-medium pt-2 border-t border-slate-800">
                {wp.importance}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Portals for US Universities */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-emerald-400" />
          Cổng Tuyển Dụng IT Các Trường Đại Học Mỹ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobPortals.map((job, idx) => (
            <div key={idx} className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-emerald-300 text-sm">{job.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{job.description}</p>
              </div>
              <div className="text-xs text-slate-500 pt-2 flex items-center gap-1">
                <span>Trang web chính thức</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AWS Free Tier Cost Optimization Guide */}
      <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
          <Calculator className="w-5 h-5" />
          Mẹo Thực Hành Không Mất Tiền Trên AWS Free Tier (12 Tháng Miễn Phí)
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-amber-100/90">
          <li className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-bold">1.</span>
            <span>Luôn thiết lập <strong>AWS Billing Alarm & AWS Budgets</strong> cảnh báo khi chi phí vượt quá $1.00 USD.</span>
          </li>
          <li className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-bold">2.</span>
            <span>Dùng loại máy chủ <code>t2.micro</code> hoặc <code>t3.micro</code> cho EC2 và <code>db.t3.micro / db.t4g.micro</code> cho RDS.</span>
          </li>
          <li className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-bold">3.</span>
            <span>Sau khi hoàn thành bài thực hành Terraform, luôn chạy <code>terraform destroy</code> để giải phóng NAT Gateway và Load Balancer.</span>
          </li>
          <li className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-bold">4.</span>
            <span>Tận dụng dịch vụ Serverless: AWS Lambda (1 triệu lượt gọi miễn phí mỗi tháng vĩnh viễn), DynamoDB (25GB miễn phí vĩnh viễn).</span>
          </li>
        </ul>
      </div>

    </div>
  );
};
