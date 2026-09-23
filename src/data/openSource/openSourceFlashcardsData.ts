import { OpenSourceFlashcard } from '../../types/openSourceModule';

export const OPEN_SOURCE_FLASHCARDS: OpenSourceFlashcard[] = [
  {
    id: 'oss-fc-1',
    term: 'FOSS (Free and Open Source Software)',
    category: 'Triết lý & Khái niệm',
    definition: 'Phần mềm tự do nguồn mở, tôn trọng 4 quyền tự do cơ bản của người dùng: Chạy, Nghiên cứu sửa đổi, Sao chép phân phối và Công bố bản cải tiến.',
    practicalUsage: 'Là nền tảng của 96% hệ sinh thái phần mềm toàn cầu như Linux, Git, React, PostgreSQL.',
    proTip: '"Free" ở đây là tự do ngôn luận (Free Speech), không đồng nghĩa với miễn phí 0 đồng (Free Beer).'
  },
  {
    id: 'oss-fc-2',
    term: 'Permissive License (MIT / Apache 2.0 / BSD)',
    category: 'Giấy phép & Pháp lý',
    definition: 'Trường phái giấy phép thông thoáng cho phép người dùng làm mọi thứ (kể cả đóng gói bán thương mại độc quyền), chỉ yêu cầu giữ lại dòng ghi nhận tác giả.',
    practicalUsage: 'Phù hợp nhất khi bạn tạo ra các thư viện hoặc công cụ muốn cộng đồng và doanh nghiệp tích hợp tối đa mà không e ngại rào cản pháp lý.',
    proTip: 'Khác với MIT, Apache 2.0 có thêm điều khoản cấp quyền sáng chế (Patent Grant), bảo vệ người dùng khỏi nguy cơ bị tác giả kiện vi phạm bằng sáng chế.'
  },
  {
    id: 'oss-fc-3',
    term: 'Copyleft (GPL / AGPL)',
    category: 'Giấy phép & Pháp lý',
    definition: 'Cơ chế pháp lý mang tính kế thừa bắt buộc: Bất kỳ phần mềm nào mở rộng hoặc nhúng mã nguồn Copyleft thì toàn bộ sản phẩm đó CŨNG PHẢI ĐƯỢC MỞ MÃ NGUỒN dưới cùng giấy phép.',
    practicalUsage: 'Bảo vệ mã nguồn không bị các công ty độc quyền lấy đi làm của riêng mà không đóng góp lại cho xã hội.',
    proTip: 'GPLv2/v3 bảo vệ khi phân phối phần mềm dạng nhị phân, còn AGPLv3 (Affero GPL) bảo vệ ngay cả khi phần mềm chỉ chạy ngầm làm dịch vụ SaaS qua mạng.'
  },
  {
    id: 'oss-fc-4',
    term: 'Upstream vs Origin Remote',
    category: 'Kỹ thuật Git OSS',
    definition: 'Upstream là repository gốc chính thức của tổ chức (nơi chỉ Core Team có quyền ghi), còn Origin là bản Fork cá nhân của bạn trên tài khoản GitHub cá nhân.',
    practicalUsage: 'Thao tác `git fetch upstream && git rebase upstream/main` để luôn giữ nhánh làm việc của bạn song hành với mã nguồn mới nhất.',
    proTip: 'Không bao giờ commit trực tiếp lên nhánh `main` của bản Fork cá nhân để tránh bị xung đột khi đồng bộ với Upstream.'
  },
  {
    id: 'oss-fc-5',
    term: 'Git Rebase Interactive (`git rebase -i`)',
    category: 'Kỹ thuật Git OSS',
    definition: 'Chế độ tương tác cho phép bạn sửa đổi lịch sử commit: gộp nhiều commit (squash/fixup), đổi tên thông điệp (reword), sắp xếp lại thứ tự hoặc xóa commit thừa.',
    practicalUsage: 'Trước khi gửi PR, dùng `git rebase -i HEAD~N` để gộp 10 commit vụn vặt thành 1 commit chuẩn chỉnh duy nhất.',
    proTip: 'Dùng lệnh `f` (fixup) thay vì `s` (squash) nếu bạn chỉ muốn gộp commit vào commit trước mà không muốn giữ lại nội dung commit log rác.'
  },
  {
    id: 'oss-fc-6',
    term: 'Conventional Commits',
    category: 'Quy chuẩn đóng góp',
    definition: 'Quy chuẩn đặt tên thông điệp commit theo cú pháp `<type>(<scope>): <subject>` giúp con người dễ đọc và máy móc tự động sinh CHANGELOG.',
    practicalUsage: 'Ví dụ: `feat(auth): add google oauth2 login provider` hoặc `fix(parser): handle null input without crashing`.',
    proTip: 'Nếu có thay đổi làm hỏng API cũ, hãy thêm dấu chấm than hoặc dòng `BREAKING CHANGE:` để bot tự động nhảy MAJOR version.'
  },
  {
    id: 'oss-fc-7',
    term: 'Good First Issue',
    category: 'Hành trình Contributor',
    definition: 'Nhãn đặc biệt (Label) được các Maintainer gắn cho các đầu việc có phạm vi rõ ràng, độ khó vừa phải, phù hợp cho người mới bắt đầu đóng góp lần đầu.',
    practicalUsage: 'Tìm kiếm trên GitHub bằng cú pháp: `is:issue is:open label:"good first issue"`.',
    proTip: 'Trước khi bắt tay vào code, hãy để lại bình luận: "Hi! I would like to work on this issue. Could you please assign it to me?" để tránh làm trùng với người khác.'
  },
  {
    id: 'oss-fc-8',
    term: 'RFC (Request for Comments)',
    category: 'Quản trị cộng đồng',
    definition: 'Bản đề xuất thiết kế kỹ thuật chi tiết bằng văn bản trước khi hiện thực hóa một tính năng lớn hoặc thay đổi kiến trúc trong dự án mã nguồn mở.',
    practicalUsage: 'Được áp dụng tại Rust, React, Kubernetes, Vue để toàn bộ cộng đồng cùng phản biện và tìm ra phương án tối ưu nhất.',
    proTip: 'Viết RFC giúp bạn nhận được góp ý sớm từ Core Team, tiết kiệm hàng tuần code lãng phí nếu thiết kế không phù hợp với định hướng chung.'
  },
  {
    id: 'oss-fc-9',
    term: 'Open Core Business Model',
    category: 'Mô hình kinh doanh',
    definition: 'Mô hình phần mềm cốt lõi (Core) hoàn toàn mở và miễn phí, trong khi các tính năng nâng cao cho doanh nghiệp lớn (SSO, Audit Logs, RBAC, Multi-Tenancy) được bán độc quyền.',
    practicalUsage: 'Mô hình thành công của GitLab, Supabase, Grafana, HashiCorp, Docker.',
    proTip: 'Giúp dự án vừa tận dụng được sức mạnh lan tỏa của cộng đồng, vừa có nguồn thu hàng triệu USD để nuôi sống đội ngũ phát triển toàn thời gian.'
  },
  {
    id: 'oss-fc-10',
    term: 'SBOM (Software Bill of Materials)',
    category: 'Bảo mật chuỗi cung ứng',
    definition: 'Bảng kê danh mục toàn bộ nguyên vật liệu cấu thành phần mềm, bao gồm tất cả các thư viện trực tiếp, gián tiếp và phiên bản của chúng.',
    practicalUsage: 'Được tạo tự động bằng Syft hoặc Trivy để kiểm toán lỗ hổng bảo mật và tuân thủ giấy phép trong môi trường doanh nghiệp.',
    proTip: 'Chính phủ Mỹ đã ban hành sắc lệnh bắt buộc mọi nhà cung cấp phần mềm phải có SBOM để chống lại các cuộc tấn công chuỗi cung ứng.'
  },
  {
    id: 'oss-fc-11',
    term: 'Sigstore / Cosign',
    category: 'Bảo mật chuỗi cung ứng',
    definition: 'Tiêu chuẩn mã nguồn mở ký số và xác minh danh tính của mã nguồn và container artifacts mà không cần lưu trữ private key phức tạp (Keyless Signing qua OIDC).',
    practicalUsage: 'Đảm bảo rằng container image tải từ Docker Hub / GitHub Registry chính xác 100% được sinh ra từ GitHub Actions của dự án, không bị kẻ gian tráo mã độc.',
    proTip: 'Được bảo trợ bởi Linux Foundation và tích hợp chuẩn mực trong Kubernetes Admission Controller.'
  },
  {
    id: 'oss-fc-12',
    term: 'Typosquatting Attack',
    category: 'Bảo mật chuỗi cung ứng',
    definition: 'Hình thức tấn công đặt tên gói phần mềm trên npm/PyPI gần giống với các gói phổ biến nhằm lừa các lập trình viên gõ sai chính tả tải về mã độc.',
    practicalUsage: 'Ví dụ: Kẻ gian tạo gói `crossenv` để nhại theo `cross-env`, bên trong chứa mã đánh cắp biến môi trường và token bí mật.',
    proTip: 'Luôn sử dụng `npm ci` kèm tệp `package-lock.json` được khóa chặt và quét dự án bằng công cụ `osv-scanner`.'
  },
  {
    id: 'oss-fc-13',
    term: 'CLA (Contributor License Agreement)',
    category: 'Giấy phép & Pháp lý',
    definition: 'Văn bản thỏa thuận pháp lý ký giữa Contributor và Tổ chức dự án, trao quyền cho tổ chức được phép phân phối hoặc đổi giấy phép mã nguồn của bạn trong tương lai.',
    practicalUsage: 'Được các tập đoàn như Google, Meta yêu cầu khi đóng góp vào TensorFlow, React để tránh rủi ro tranh chấp bản quyền sau này.',
    proTip: 'Một số dự án ưa chuộng DCO (Developer Certificate of Origin) nhẹ nhàng hơn, chỉ cần bạn gắn cờ `git commit -s` (Signed-off-by).'
  },
  {
    id: 'oss-fc-14',
    term: 'Linus\'s Law (Định luật Linus)',
    category: 'Triết lý & Khái niệm',
    definition: '"Given enough eyeballs, all bugs are shallow" — Khi có đủ số lượng cặp mắt cùng soi vào mã nguồn mở, mọi lỗi lầm dù tinh vi đến đâu cũng sẽ trở nên nông cạn và dễ phát hiện.',
    practicalUsage: 'Triết lý chứng minh sức mạnh của mô hình cộng tác đám đông so với việc kiểm thử khép kín trong phòng kín.',
    proTip: 'Được đặt tên bởi Eric S. Raymond trong tác phẩm "The Cathedral and the Bazaar".'
  },
  {
    id: 'oss-fc-15',
    term: 'Semantic Release',
    category: 'Tự động hóa phát hành',
    definition: 'Hệ thống tự động hóa hoàn toàn quy trình phát hành phần mềm: phân tích commit, tự tăng version theo semver, sinh changelog và đẩy bản phát hành lên registry.',
    practicalUsage: 'Loại bỏ hoàn toàn sai sót do con người khi phát hành phiên bản mới trên GitHub và NPM.',
    proTip: 'Chỉ hoạt động hoàn hảo khi toàn bộ nhóm phát triển tuân thủ 100% chuẩn Conventional Commits.'
  },
  {
    id: 'oss-fc-16',
    term: 'Maintainer Burnout',
    category: 'Quản trị cộng đồng',
    definition: 'Hội chứng kiệt sức về thể chất và tinh thần của người duy trì dự án khi phải gánh vác kỳ vọng khổng lồ từ hàng triệu người dùng mà thiếu sự hỗ trợ tài chính và nhân lực.',
    practicalUsage: 'Nguyên nhân dẫn đến các vụ sập thư viện chấn động như `faker.js` hay `colors.js` năm 2021.',
    proTip: 'Giải pháp phòng ngừa: Tự động hóa triage, nhanh chóng trao quyền cho các co-maintainer và từ chối dứt khoát các yêu cầu ngoài phạm vi cốt lõi.'
  }
];
