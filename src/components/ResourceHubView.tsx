import React from 'react';

export const ResourceHubView: React.FC = () => {
  const topInstructors = [
    {
      name: 'Stephane Maarek',
      badge: 'Udemy Bestseller',
      focus: 'Khóa học lý thuyết xúc tích, bám sát 100% đề thi, cập nhật liên tục theo chuẩn kỳ thi mới nhất.',
      recommendedFor: 'Tất cả các chứng chỉ từ CLF-C02, SAA-C03, SOA-C02, DVA-C02 đến SAP-C02.',
      tips: 'Nên xem video ở tốc độ 1.25x - 1.5x, ghi chép lại các slide tóm tắt cuối mỗi chương.'
    },
    {
      name: 'Adrian Cantrill',
      badge: 'Chuyên Sâu Kiến Trúc',
      focus: 'Khóa học có chiều sâu kỹ thuật vô đối (40-70 giờ/khóa), sơ đồ kiến trúc hoạt hình cực kỳ trực quan và bài Lab thực hành thực tế.',
      recommendedFor: 'Đặc biệt xuất sắc cho Solutions Architect Associate (SAA-C03) và Professional (SAP-C02).',
      tips: 'Phù hợp để hiểu bản chất luồng gói tin và cấu trúc mạng chuyên sâu.'
    },
    {
      name: 'Jon Bonso (Tutorials Dojo)',
      badge: 'Tiêu Chuẩn Đề Thi',
      focus: 'Bộ đề thi thử sát với đề thi thật nhất thế giới. Mỗi câu hỏi đều có giải thích chi tiết tại sao đúng và sai.',
      recommendedFor: 'Bắt buộc phải làm trước ngày thi chính thức 2 tuần.',
      tips: 'Luyện đề theo chế độ Timed Mode hoặc Review Mode trên trang web tutorialsdojo.com.'
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
      pillar: 'Bảo Mật & Tuân Thủ',
      description: 'Mô hình đa tài khoản (AWS Organizations), phân quyền IAM Identity Center, mã hóa dữ liệu với KMS.',
      importance: 'Cực kỳ hữu ích khi trả lời phỏng vấn.'
    },
    {
      title: 'Overview of Amazon Web Services (AWS Whitepaper)',
      pillar: 'Tổng Quan Dịch Vụ',
      description: 'Bản đồ tổng thể tất cả các nhóm dịch vụ Compute, Storage, Database, Networking, AI/ML của AWS.',
      importance: 'Dành cho người mới bắt đầu (CLF-C02).'
    }
  ];

  const jobPortals = [
    {
      name: 'HigherEdJobs.com',
      description: 'Cổng thông tin việc làm chuyên ngành giáo dục đại học tại Mỹ. Tìm theo từ khóa "Cloud Engineer", "Systems Administrator".'
    },
    {
      name: 'EDUCAUSE Career Center',
      description: 'Hiệp hội công nghệ thông tin đại học lớn nhất thế giới, thường xuyên đăng tuyển các vị trí IT tại các trường đại học Mỹ.'
    },
    {
      name: 'Kent State University Jobs Portal (jobs.kent.edu)',
      description: 'Trang tuyển dụng chính thức của Đại học Kent State. Kiểm tra mục "Division of Information Technology (IT)".'
    }
  ];

  return (
    <div className="space-y-8 text-slate-300">
      
      {/* Title */}
      <div className="space-y-2 pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-slate-100 tracking-tight">
          Tài Liệu Ôn Luyện & Kênh Tuyển Dụng Uy Tín
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Tập hợp các tài liệu chính thức, giảng viên uy tín và các cổng thông tin tìm kiếm việc làm IT tại Mỹ.
        </p>
      </div>

      {/* Instructors */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Top 3 Giảng Viên & Nền Tảng Luyện Đề
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topInstructors.map((inst, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-100 text-sm">{inst.name}</h4>
                <span className="text-[10px] font-mono text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{inst.badge}</span>
              </div>
              <p className="text-slate-400 leading-relaxed">{inst.focus}</p>
              <div className="text-slate-300 pt-1 border-t border-slate-800/80">
                <strong>Khuyên dùng:</strong> {inst.recommendedFor}
              </div>
              <div className="text-slate-400 italic">
                <strong>Mẹo:</strong> {inst.tips}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Whitepapers */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          AWS Whitepapers Bắt Buộc Đọc
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {whitepapers.map((wp, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5 text-xs">
              <div className="text-[10px] text-amber-400 uppercase font-mono">{wp.pillar}</div>
              <h4 className="font-semibold text-slate-100 text-sm">{wp.title}</h4>
              <p className="text-slate-400 leading-relaxed">{wp.description}</p>
              <div className="text-slate-300 pt-1">
                <strong>Tầm quan trọng:</strong> {wp.importance}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Portals */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Cổng Tuyển Dụng Đại Học Mỹ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobPortals.map((job, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 text-xs">
              <h4 className="font-semibold text-slate-100 text-sm">{job.name}</h4>
              <p className="text-slate-400 leading-relaxed">{job.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
