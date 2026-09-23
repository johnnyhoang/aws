import { OpenSourceQuizQuestion } from '../../types/openSourceModule';

export const OPEN_SOURCE_QUIZ_QUESTIONS: OpenSourceQuizQuestion[] = [
  {
    id: 'oss-q-1',
    category: 'foss_origins_philosophy',
    difficulty: 'Cơ bản',
    scenario: 'Bạn tạo một thư viện tiện ích JavaScript và tải lên GitHub dưới dạng Public Repository nhưng KHÔNG thêm bất kỳ tệp LICENSE nào. Về mặt pháp lý quốc tế, người khác có quyền sử dụng mã nguồn này không?',
    options: [
      { id: 'opt-a', text: 'Có, vì tải lên Public Repo đồng nghĩa với việc mặc định cấp quyền MIT cho toàn thế giới.' },
      { id: 'opt-b', text: 'Có, ai cũng được phép sao chép nhưng không được phép bán lấy tiền.' },
      { id: 'opt-c', text: 'Không. Mặc định theo luật bản quyền, "All Rights Reserved" — không ai được phép sử dụng, sao chép hay phân phối lại nếu không có giấy phép rõ ràng.' },
      { id: 'opt-d', text: 'Có, nhưng chỉ người dùng có tài khoản GitHub trả phí mới được phép tải về.' }
    ],
    correctOptionId: 'opt-c',
    explanation: {
      whyCorrect: 'Theo luật bản quyền quốc tế và điều khoản dịch vụ của GitHub, nếu repository không có tệp License, toàn bộ bản quyền thuộc về tác giả và không cấp quyền cho bất kỳ ai sao chép, sửa đổi hay thương mại hóa.',
      whyOthersIncorrect: [
        { optionId: 'opt-a', reason: 'GitHub không tự động cấp giấy phép MIT khi bạn tạo repo công khai.' },
        { optionId: 'opt-b', reason: 'Không có quyền mặc định nào cho phép sao chép nếu thiếu giấy phép.' }
      ],
      proTip: 'Luôn khởi tạo tệp LICENSE (ví dụ MIT hoặc Apache-2.0) ngay từ commit đầu tiên của dự án mở!'
    }
  },
  {
    id: 'oss-q-2',
    category: 'licenses_legal',
    difficulty: 'Trung bình',
    scenario: 'Một công ty startup thương mại phát triển ứng dụng Web SaaS đóng kín (Closed-source). Họ muốn nhúng một thư viện thuật toán vào Backend. Thư viện này sử dụng giấy phép GPLv3. Quyết định này dẫn đến rủi ro pháp lý nào?',
    options: [
      { id: 'opt-a', text: 'Không có rủi ro gì vì phần mềm chỉ chạy trên máy chủ nội bộ chứ không phân phối file nhị phân cho khách hàng cài đặt.' },
      { id: 'opt-b', text: 'Startup bắt buộc phải công khai toàn bộ mã nguồn Backend của họ ra thế giới dưới giấy phép GPLv3 nếu họ phân phối phần mềm.' },
      { id: 'opt-c', text: 'GPLv3 chỉ cho phép chạy trên hệ điều hành Linux, không được chạy trên AWS hay macOS.' },
      { id: 'opt-d', text: 'Họ chỉ cần trả 500 USD phí bản quyền cho tác giả là được phép giữ kín mã nguồn.' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'GPLv3 là giấy phép Strong Copyleft. Nếu bạn nhúng code GPLv3 vào dự án và phân phối cho người dùng (ví dụ ứng dụng Desktop, Mobile App hoặc nhúng thiết bị), toàn bộ mã nguồn sản phẩm phái sinh bắt buộc phải công khai dưới GPLv3.',
      whyOthersIncorrect: [
        { optionId: 'opt-a', reason: 'Nếu chạy thuần túy SaaS qua mạng mà không phân phối nhị phân thì GPLv3 chưa ép mở mã nguồn (nhưng nếu là AGPLv3 thì sẽ bị ép ngay lập tức).' }
      ],
      proTip: 'Đối với các sản phẩm đóng mã nguồn thương mại, hãy ưu tiên sử dụng các thư viện có giấy phép Permissive (MIT, Apache 2.0, BSD).'
    }
  },
  {
    id: 'oss-q-3',
    category: 'git_collaboration_mastery',
    difficulty: 'Trung bình',
    scenario: 'Bạn đang làm việc trên một nhánh tính năng được Fork từ dự án Kubernetes. Trong khi bạn đang code, nhánh `main` của dự án gốc (Upstream) đã có thêm 50 commit mới. Thao tác nào là chuẩn mực nhất để cập nhật code mới vào nhánh của bạn mà KHÔNG tạo ra merge commit rác?',
    options: [
      { id: 'opt-a', text: 'git merge upstream/main' },
      { id: 'opt-b', text: 'git fetch upstream && git rebase upstream/main' },
      { id: 'opt-c', text: 'Xóa toàn bộ thư mục repo, clone lại từ đầu rồi copy code qua' },
      { id: 'opt-d', text: 'git push --force origin main' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: '`git fetch upstream && git rebase upstream/main` sẽ tải các commit mới nhất về và nhấc toàn bộ nhánh của bạn đặt lên đỉnh của lịch sử mới, giữ cho cây commit luôn thẳng tắp và trong sạch.',
      whyOthersIncorrect: [
        { optionId: 'opt-a', reason: '`git merge` sẽ tạo ra một Merge Commit không cần thiết, làm rối loạn lịch sử commit của PR.' }
      ],
      proTip: 'Nếu gặp conflict trong quá trình rebase, hãy sửa lỗi conflict trong file, gõ `git add .` rồi tiếp tục bằng `git rebase --continue` (tuyệt đối không gõ git commit!).'
    }
  },
  {
    id: 'oss-q-4',
    category: 'git_collaboration_mastery',
    difficulty: 'Cơ bản',
    scenario: 'Theo quy chuẩn Conventional Commits, thông điệp commit nào dưới đây là chuẩn xác nhất khi bạn bổ sung thêm chức năng đăng nhập bằng Google OAuth2?',
    options: [
      { id: 'opt-a', text: 'Updated auth logic and added Google login button.' },
      { id: 'opt-b', text: 'feat(auth): add google oauth2 login integration' },
      { id: 'opt-c', text: 'FEAT: GOOGLE OAUTH IS WORKING NOW!!!' },
      { id: 'opt-d', text: 'WIP: google auth commit 3' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'Cú pháp chuẩn Conventional Commits gồm type chữ thường (`feat`), scope tùy chọn trong ngoặc đơn (`auth`), dấu hai chấm và mô tả thì hiện tại không viết hoa chữ đầu, không dấu chấm cuối.',
      whyOthersIncorrect: [
        { optionId: 'opt-a', reason: 'Thiếu tiền tố type, không đúng chuẩn tự động hóa changelog.' },
        { optionId: 'opt-c', reason: 'Viết hoa toàn bộ và chứa dấu cảm thán là tối kỵ trong Open Source.' }
      ]
    }
  },
  {
    id: 'oss-q-5',
    category: 'first_contribution_roadmap',
    difficulty: 'Trung bình',
    scenario: 'Bạn phát hiện một lỗi trong tài liệu của một dự án lớn có 50,000 sao trên GitHub. Hành động nào thể hiện sự chuyên nghiệp và đúng nghi thức cộng đồng nhất?',
    options: [
      { id: 'opt-a', text: 'Nhắn tin trực tiếp vào tài khoản Twitter cá nhân của người sáng lập để báo lỗi.' },
      { id: 'opt-b', text: 'Mở một Issue báo lỗi mắng Maintainer vì viết tài liệu cẩu thả.' },
      { id: 'opt-c', text: 'Đọc kỹ CONTRIBUTING.md, tạo nhánh mới trên bản Fork cá nhân, sửa chính xác lỗi tài liệu, kiểm tra linter và mở một Pull Request với mô tả rõ ràng.' },
      { id: 'opt-d', text: 'Tạo một dự án đối thủ cạnh tranh để thay thế dự án đó.' }
    ],
    correctOptionId: 'opt-c',
    explanation: {
      whyCorrect: 'Quy trình chuẩn mực là tự đọc CONTRIBUTING.md, sửa lỗi trực tiếp và gửi một Pull Request ngắn gọn, lịch sự kèm bằng chứng sửa đổi.',
      whyOthersIncorrect: [
        { optionId: 'opt-a', reason: 'Làm phiền kênh riêng tư của Maintainer là hành vi thiếu tôn trọng ranh giới cá nhân.' }
      ]
    }
  },
  {
    id: 'oss-q-6',
    category: 'supply_chain_security',
    difficulty: 'Khó',
    scenario: 'Trong vụ tấn công chuỗi cung ứng xz-utils (CVE-2024-3094), kẻ tấn công "Jia Tan" đã giấu mã độc nhị phân vào đâu để qua mặt được sự kiểm tra mã nguồn của các nhà phát triển?',
    options: [
      { id: 'opt-a', text: 'Chèn trực tiếp mã độc vào hàm `main()` trong file mã nguồn C.' },
      { id: 'opt-b', text: 'Ẩn mã độc bên trong các tệp nén kiểm thử (Test files) được giải nén trong kịch bản build của bản phát hành tarball.' },
      { id: 'opt-c', text: 'Gửi mã độc qua tin nhắn Discord cho các admin của Debian.' },
      { id: 'opt-d', text: 'Tấn công phần cứng vào nhà máy sản xuất chip CPU của Intel.' }
    ],
    correctOptionId: 'opt-b',
    explanation: {
      whyCorrect: 'Kẻ tấn công đã ngụy trang mã độc nhị phân dưới dạng các tệp test cases (test.tar.gz) trông có vẻ vô hại trong kho chứa, nhưng kịch bản M4 macro khi đóng gói bản phát hành (tarball) sẽ giải nén và chèn mã độc vào thư viện runtime.',
      whyOthersIncorrect: [
        { optionId: 'opt-a', reason: 'Nếu chèn trực tiếp vào file mã nguồn C, mã độc sẽ bị các nhà phát triển phát hiện ngay trong Code Review.' }
      ],
      proTip: 'Bài học: Không bao giờ tin tưởng mù quáng vào các file binary hoặc test artifacts không thể kiểm tra bằng mắt thường trong kho mã nguồn mở.'
    }
  },
  {
    id: 'oss-q-7',
    category: 'business_governance',
    difficulty: 'Trung bình',
    scenario: 'Tổ chức CNCF (Cloud Native Computing Foundation) phân loại mức độ trưởng thành của các dự án mở theo 3 cấp độ nào?',
    options: [
      { id: 'opt-a', text: 'Bronze ➔ Silver ➔ Gold' },
      { id: 'opt-b', text: 'Alpha ➔ Beta ➔ Stable' },
      { id: 'opt-c', text: 'Sandbox ➔ Incubating ➔ Graduated' },
      { id: 'opt-d', text: 'Free ➔ Pro ➔ Enterprise' }
    ],
    correctOptionId: 'opt-c',
    explanation: {
      whyCorrect: 'Quy trình chuẩn của CNCF gồm: Sandbox (Giai đoạn ươm mầm thử nghiệm) ➔ Incubating (Đang phát triển mạnh, có người dùng thực tế) ➔ Graduated (Cấp độ trưởng thành cao nhất, bảo đảm độ ổn định chuẩn doanh nghiệp như Kubernetes, Prometheus, Envoy).',
      whyOthersIncorrect: [
        { optionId: 'opt-a', reason: 'Đây là phân loại huy chương, không phải cấp độ CNCF.' }
      ]
    }
  },
  {
    id: 'oss-q-8',
    category: 'maintainer_community_leadership',
    difficulty: 'Chuyên gia',
    scenario: 'Bạn là Maintainer của một thư viện mã nguồn mở có 20,000 lập trình viên sử dụng. Một contributor gửi một Pull Request dài 3,000 dòng code thêm một tính năng đồ sộ nhưng hoàn toàn lệch khỏi mục tiêu tinh gọn của dự án. Cách xử lý chuyên nghiệp nhất là gì?',
    options: [
      { id: 'opt-a', text: 'Âm thầm đóng PR và block tài khoản GitHub của contributor đó.' },
      { id: 'opt-b', text: 'Merge ngay vì không muốn làm contributor thất vọng.' },
      { id: 'opt-c', text: 'Lịch sự cảm ơn công sức của contributor, giải thích rõ lý do vì sao tính năng làm phình to phạm vi cốt lõi của dự án và gợi ý họ phát hành tính năng đó dưới dạng một Plugin hoặc gói độc lập bên ngoài.' },
      { id: 'opt-d', text: 'Để PR treo vĩnh viễn không trả lời trong 3 năm.' }
    ],
    correctOptionId: 'opt-c',
    explanation: {
      whyCorrect: 'Người Maintainer xuất sắc là người biết bảo vệ tính tinh gọn của dự án bằng cách từ chối lịch sự, tôn trọng công sức của người khác và hướng dẫn giải pháp thay thế (như Plugin riêng).',
      whyOthersIncorrect: [
        { optionId: 'opt-b', reason: 'Merge một tính năng lớn không phù hợp sẽ khiến bạn phải gánh chịu nợ kỹ thuật (Technical Debt) và gánh nặng bảo trì khổng lồ trong suốt nhiều năm.' }
      ]
    }
  }
];
