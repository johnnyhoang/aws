import { OpenSourceChapter } from '../../types/openSourceModule';

export const OPEN_SOURCE_CHAPTERS: OpenSourceChapter[] = [
  {
    id: 'oss-chap-1-origins-philosophy',
    chapterNumber: 1,
    title: 'Khởi Nguyên & Triết Lý FOSS: Cuộc Nổi Loạn Định Hình Thế Giới Số',
    subtitle: 'Từ chiếc máy in Xerox bị kẹt giấy của Richard Stallman đến email khiêm tốn của Linus Torvalds trên Usenet năm 1991',
    category: 'foss_origins_philosophy',
    readTimeMinutes: 22,
    level: 'Khởi đầu',
    summary: 'Giải phẫu tư tưởng nền tảng của Mã Nguồn Mở (FOSS): 4 quyền tự do cốt lõi của Phần mềm Tự do, sự đối đầu giữa mô hình "Nhà thờ" (The Cathedral) và "Khu chợ Ba Tư" (The Bazaar), cùng lý do vì sao 96% hạ tầng đám mây và thiết bị di động toàn cầu ngày nay vận hành trên tinh hoa Open Source.',
    hookStory: 'Năm 1980 tại phòng thí nghiệm AI của đại học MIT, một hacker trẻ tên Richard Stallman nổi điên vì chiếc máy in laser Xerox 9700 liên tục kẹt giấy mà không báo động cho toàn phòng lab. Khi Stallman đề nghị xin mã nguồn driver máy in để tự viết một đoạn thông báo gửi qua mạng, hãng Xerox đã từ chối thẳng thừng với lý do "bí mật thương mại". Cơn phẫn nộ từ một chiếc máy in kẹt giấy đó đã khai sinh ra phong trào Phần mềm Tự do (Free Software Movement) làm thay đổi mãi mãi lịch sử nhân loại.',
    sections: [
      {
        heading: '1. Cơn Phẫn Nộ Chiếc Máy In & 4 Quyền Tự Do Tuyệt Đối',
        subheading: 'Hiểu đúng khái niệm "Free as in Free Speech, not as in Free Beer"',
        content: 'Nhiều người lầm tưởng "Free Software" là phần mềm miễn phí 0 đồng. Richard Stallman đã chỉ ra: Tự do ở đây là quyền tự do tư tưởng, tự do kiểm soát số phận công nghệ của chính bạn chứ không phải giá tiền. Ông lập nên Free Software Foundation (FSF) và định nghĩa 4 quyền tự do bất khả xâm phạm:',
        bulletPoints: [
          'Tự do 0 (Quyền Chạy): Quyền tự do chạy chương trình vì bất kỳ mục đích nào mà không bị bất kỳ ai kiểm duyệt hay hạn chế.',
          'Tự do 1 (Quyền Nghiên cứu & Sửa đổi): Quyền tự do đọc mã nguồn, hiểu cách nó hoạt động và sửa đổi để nó phục vụ đúng nhu cầu của bạn.',
          'Tự do 2 (Quyền Phân phối lại): Quyền tự do sao chép và chuyển giao chương trình cho bạn bè, đồng nghiệp hoặc cộng đồng khi họ cần giúp đỡ.',
          'Tự do 3 (Quyền Cải tiến & Công bố): Quyền tự do phân phối các bản vá, bản cải tiến của bạn ra công chúng để cả xã hội cùng hưởng lợi.'
        ],
        storyQuote: {
          speaker: 'Richard M. Stallman (RMS)',
          role: 'Người sáng lập GNU Project & Free Software Foundation',
          quote: 'Nếu các lập trình viên xứng đáng được tưởng thưởng cho việc tạo ra những chương trình đột phá, thì bằng lý lẽ đó, họ xứng đáng bị lên án nếu hạn chế người khác sử dụng những chương trình ấy.',
          year: '1985'
        },
        mindsetShift: {
          from: 'Người tiêu dùng phần mềm thụ động — phụ thuộc hoàn toàn vào nhà cung cấp độc quyền (Vendor Lock-in).',
          to: 'Chủ nhân công nghệ có quyền can thiệp, đọc hiểu và sửa chữa từng dòng mã nhị phân trong hệ thống.',
          impact: 'Mở khóa năng lực tự học siêu tốc và tự chủ hạ tầng số ở cấp độ kỹ sư cao cấp.'
        }
      },
      {
        heading: '2. Linus Torvalds & "Khu Chợ Ba Tư" (The Cathedral and the Bazaar)',
        subheading: 'Bài học kinh điển biến sự lộn xộn của hàng vạn lập trình viên thành kỳ quan công nghệ',
        content: 'Năm 1991, một sinh viên 21 tuổi người Phần Lan tên Linus Torvalds đăng một dòng tin ngắn lên nhóm Usenet comp.os.minix: "Tôi đang làm một hệ điều hành miễn phí (chỉ là sở thích cá nhân, sẽ không lớn và chuyên nghiệp như GNU đâu)...". Email khiêm tốn ấy đã tạo ra Linux Kernel — hạt nhân của mọi máy chủ Internet, Android, và tàu vũ trụ SpaceX ngày nay.\n\nEric S. Raymond trong cuốn sách huyền thoại "The Cathedral and the Bazaar" đã chỉ ra bước ngoặt trong cách tổ chức:',
        bulletPoints: [
          'Mô hình Nhà thờ (The Cathedral): Phần mềm độc quyền được xây dựng bí mật trong phòng kín bởi một nhóm tinh hoa, phát hành nhỏ giọt theo năm tháng (giống như xây một thánh đường).',
          'Mô hình Khu chợ (The Bazaar): Phát hành sớm, phát hành liên tục (Release Early, Release Often), để mã nguồn trần trụi giữa chợ cho hàng vạn lập trình viên khắp thế giới soi lỗi, gửi bản vá và tối ưu hóa.',
          'Định luật Linus: "Given enough eyeballs, all bugs are shallow" (Với đủ số lượng cặp mắt cùng soi, mọi lỗi đều trở nên nông cạn).'
        ],
        storyQuote: {
          speaker: 'Linus Torvalds',
          role: 'Cha đẻ Linux & Git',
          quote: 'Talk is cheap. Show me the code.',
          year: '2000'
        },
        proTip: 'Đừng ngần ngại đưa code của bạn ra ánh sáng sớm. Một repository công khai có lỗi nhưng có người đóng góp sửa chữa luôn có giá trị tiến hóa gấp trăm lần một dự án hoàn hảo nằm im ỉm trong ổ cứng cá nhân.'
      },
      {
        heading: '3. Tại Sao Mã Nguồn Mở Thống Trị 96% Thế Giới Điện Toán?',
        subheading: 'Lợi thế sinh tồn và sức mạnh cộng hưởng không đối thủ của hệ sinh thái mở',
        content: 'Tại sao các tập đoàn khổng lồ như Microsoft (từng gọi Linux là "ung thư" năm 2001) nay lại trở thành một trong những nhà tài trợ lớn nhất cho Open Source và mua lại GitHub? Hãy nhìn vào 4 trụ cột:',
        bulletPoints: [
          'Không bị rào cản độc quyền (No Vendor Lock-in): Doanh nghiệp toàn quyền kiểm soát dữ liệu, tự sửa lỗi khẩn cấp mà không cần chờ đợi vé hỗ trợ từ bên thứ ba.',
          'Hiệu ứng mạng lưới tập thể (Network Effect): Thay vì 100 công ty cùng cử 100 kỹ sư viết lại từ đầu một thư viện HTTP hay Database, họ cùng đóng góp vào một dự án mã nguồn mở duy nhất (như Postgres, Linux, Kubernetes) và chia sẻ gánh nặng bảo trì.',
          'Minh bạch bảo mật tuyệt đối: Bất kỳ backdoor hay đoạn mã độc hại nào cũng sẽ bị hàng ngàn chuyên gia bảo mật toàn cầu mổ xẻ và vạch trần chỉ sau vài phút.',
          'Tốc độ đổi mới thần tốc: Các công nghệ AI đỉnh cao (PyTorch, Transformers, vLLM, Ollama) đều sinh ra và bứt phá nhờ cộng đồng Open Source mở rộng từng giờ.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'git log & curl',
        title: 'Khám phá commit đầu tiên lịch sử của Linus Torvalds',
        command: `git clone --bare https://github.com/torvalds/linux.git\ncd linux.git\ngit log --reverse --stat | head -30`,
        description: 'Xem cách Linus Torvalds ghi chép lịch sử commit đầu tiên định hình toàn bộ nhân Linux'
      }
    ],
    masteryChecklist: [
      'Phân biệt rõ ràng triết lý Free Software (tự do tư tưởng) và Open Source (mô hình phát triển)',
      'Thuộc lòng và giải thích 4 quyền tự do cốt lõi của phần mềm',
      'Hiểu sâu định luật Linus và sức mạnh cộng hưởng của mô hình Bazaar'
    ]
  },
  {
    id: 'oss-chap-2-licenses-legal-framework',
    chapterNumber: 2,
    title: 'Bản Đồ Giấy Phép (Licenses) & Pháp Lý Mã Nguồn Mở',
    subtitle: 'Nắm vững MIT, Apache 2.0, GPL, AGPL, BSD — Hiểu rõ vũ khí bảo vệ bạn và ranh giới sinh tử của doanh nghiệp',
    category: 'licenses_legal',
    readTimeMinutes: 25,
    level: 'Thực chiến',
    summary: 'Toàn tập về pháp lý mã nguồn mở: Phân biệt bản chất Permissive (Thoáng) vs Copyleft (Bảo vệ tính mở), hiểu rõ rủi ro bản quyền bằng sáng chế Patent Grant trong Apache 2.0, bẫy dịch vụ đám mây Network Copyleft của AGPL, và bài học chuyển đổi giấy phép của Redis/MongoDB.',
    hookStory: 'Năm 2007, Cisco bị FSF kiện ra tòa vì sử dụng mã nguồn Linux và BusyBox trong các bộ phát Wi-Fi Linksys của họ nhưng từ chối cung cấp mã nguồn firmware cho người mua. Kết quả: Cisco buộc phải công khai toàn bộ mã nguồn Linksys, mở đường cho sự bùng nổ của OpenWrt — hệ điều hành router mở phổ biến nhất hành tinh ngày nay!',
    sections: [
      {
        heading: '1. Phân Loại Giấy Phép: Permissive vs Copyleft',
        subheading: 'Hai trường phái triết lý đối lập định hình cách phân phối phần mềm',
        content: 'Nếu bạn đưa code lên GitHub mà KHÔNG ĐÍNH KÈM GIẤY PHÉP (No License), mặc định theo luật bản quyền quốc tế, toàn bộ quyền thuộc về bạn và KHÔNG AI ĐƯỢC PHÉP sao chép, sử dụng hay sửa đổi code đó! Bạn bắt buộc phải chọn một License:',
        bulletPoints: [
          'Trường phái Permissive (Tự do tối đa): "Bạn làm gì với code của tôi cũng được, thương mại hóa tùy ý, chỉ cần giữ lại dòng ghi nhận tác giả (Copyright notice)". Đại diện: MIT, BSD 2-Clause, Apache 2.0.',
          'Trường phái Copyleft Mạnh (Strong Copyleft): "Bạn được dùng tự do, NHƯNG nếu bạn phân phối lại hoặc nhúng code của tôi vào phần mềm của bạn, toàn bộ sản phẩm của bạn CŨNG PHẢI CÔNG KHAI MÃ NGUỒN dưới cùng giấy phép này". Đại diện: GPLv2, GPLv3.',
          'Trường phái Copyleft Yếu (Weak Copyleft): Chỉ yêu cầu công khai mã nguồn nếu sửa đổi chính thư viện đó, cho phép liên kết động (Dynamic Link) với phần mềm đóng gói độc quyền. Đại diện: LGPL, MPL 2.0.'
        ],
        diagramType: 'oss-license-spectrum'
      },
      {
        heading: '2. Bảng So Sánh Các Giấy Phép Phổ Biến Nhất',
        subheading: 'Tra cứu nhanh để chọn đúng giấy phép cho từng bài toán thực tế',
        content: 'Hiểu cặn kẽ 4 giấy phép phổ biến nhất thống trị GitHub:',
        codeBlock: {
          language: 'markdown',
          title: 'Ma trận tra cứu quyền lợi và trách nhiệm giấy phép Open Source',
          code: `| Giấy phép | Loại | Thương mại hóa? | Đóng mã nguồn dẫn xuất? | Bảo hộ Bằng sáng chế (Patent)? |
|---|---|---|---|---|
| MIT | Permissive | Có (Toàn quyền) | Có (Được phép đóng) | Không quy định rõ |
| Apache 2.0 | Permissive | Có (Toàn quyền) | Có (Được phép đóng) | Có (Chống kiện Patent) |
| GPLv3 | Strong Copyleft | Có | KHÔNG (Bắt buộc mở code) | Có (Chống Tivoization & Patent) |
| AGPLv3 | Network Copyleft| Có | KHÔNG (Kể cả chạy qua SaaS)| Có (Chống Cloud Vendor bóc lột)|`
        },
        proTip: 'Nếu bạn xây dựng thư viện tiện ích, framework muốn lan tỏa nhanh nhất: Hãy chọn MIT hoặc Apache 2.0. Nếu bạn xây dựng phần mềm hoàn chỉnh và muốn ngăn đối thủ lấy trộm đem đóng gói bán lấy tiền: Hãy chọn GPLv3 hoặc AGPLv3.'
      },
      {
        heading: '3. Cuộc Chiến Bẻ Khóa Giấy Phép: Bẫy Cloud & Mô Hình Dual-Licensing',
        subheading: 'Vì sao Redis, ElasticSearch và MongoDB từng từ bỏ FOSS truyền thống?',
        content: 'Câu chuyện đau đớn của các công ty Open Source: Họ bỏ hàng chục triệu USD và mồ hôi nước mắt xây dựng công nghệ đỉnh cao (Redis, Elasticsearch, MongoDB), nhưng các "ông lớn" Cloud (AWS, Azure, GCP) chỉ việc lấy code về, dựng dịch vụ SaaS (như AWS OpenSearch, Elasticache) và thu hàng tỷ USD mà không hề đóng góp ngược lại cho người tạo ra nó.\n\nĐiều này dẫn đến sự ra đời của các giấy phép Source-Available (SSPL, BSL) — cho phép xem và dùng nội bộ miễn phí nhưng cấm đem làm dịch vụ Cloud cạnh tranh trực tiếp. Hiểu được ranh giới này là hiểu bản chất kinh tế vận hành thế giới công nghệ!',
        warningNote: 'Giấy phép SSPL của MongoDB hay RSAL của Redis KHÔNG ĐƯỢC OSI (Open Source Initiative) công nhận là Open Source thuần túy. Chúng được gọi chính xác là "Source-Available" (Mã nguồn có thể đọc nhưng có hạn chế thương mại).'
      }
    ],
    practicalCommands: [
      {
        tool: 'licensee / npx license-checker',
        title: 'Kiểm tra giấy phép của toàn bộ dependencies trong dự án',
        command: `npx license-checker --summary\nnpx license-checker --onlyAllow "MIT;Apache-2.0;BSD-3-Clause"`,
        description: 'Tự động quét để phát hiện các thư viện dính bản quyền GPL có nguy cơ buộc bạn phải mở mã nguồn sản phẩm'
      }
    ],
    masteryChecklist: [
      'Phân biệt bản chất Permissive (MIT, Apache 2.0) vs Copyleft (GPL, AGPL)',
      'Hiểu rõ điều khoản Patent Grant trong Apache 2.0 bảo vệ lập trình viên thế nào',
      'Biết cách quét mã bản quyền trong dependencies của dự án bằng công cụ tự động'
    ]
  },
  {
    id: 'oss-chap-3-business-ecosystem-governance',
    chapterNumber: 3,
    title: 'Mô Hình Kinh Tế & Bộ Máy Quản Trị Hệ Sinh Thái Open Source',
    subtitle: 'Cách Red Hat kiếm hàng tỷ USD từ phần mềm miễn phí và cơ chế vận hành của Linux Foundation, CNCF, Apache Foundation',
    category: 'business_governance',
    readTimeMinutes: 24,
    level: 'Thực chiến',
    summary: 'Khám phá bí mật kiếm tiền bền vững từ Mã Nguồn Mở: Các mô hình kinh doanh Open Core, Support Subscription, SaaS Managed Service, và cách các tổ chức phi lợi nhuận như Apache Software Foundation (ASF), CNCF điều phối hàng triệu lập trình viên qua quy trình RFC và Governance.',
    hookStory: 'Năm 2019, tập đoàn công nghệ IBM đã chi số tiền khổng lồ 34 tỷ USD — thương vụ thâu tóm phần mềm lớn nhất lịch sử thời điểm đó — để mua lại Red Hat. Làm thế nào một công ty mà mọi sản phẩm đều có thể tải miễn phí trên mạng lại có giá trị 34 tỷ đô la? Bí mật nằm ở mô hình kinh doanh dịch vụ hỗ trợ doanh nghiệp và bảo chứng ổn định tuyệt đối.',
    sections: [
      {
        heading: '1. 4 Mô Hình Kinh Doanh Open Source Thành Công Nhất',
        subheading: 'Từ lý tưởng phi lợi nhuận đến các kỳ lân tỷ đô',
        content: 'Làm Open Source không có nghĩa là chấp nhận nghèo khó. Các kỹ sư và công ty xuất sắc nhất đều kết hợp hoàn hảo giữa đóng góp cộng đồng và tạo ra giá trị kinh tế khổng lồ:',
        bulletPoints: [
          '1. Support & Enterprise Subscription (Mô hình Red Hat): Bản thân phần mềm là miễn phí, nhưng doanh nghiệp trả tiền mua cam kết SLA 24/7, chứng nhận bảo mật, bản vá khẩn cấp và bảo hiểm pháp lý (Indemnity).',
          '2. Open Core (Mô hình GitLab, HashiCorp, Supabase): Bản Core mã nguồn mở 100% cho mọi người dùng, các tính năng nâng cao cho doanh nghiệp lớn (SSO, Audit Log, Multi-region, RBAC sâu) được bán dưới dạng Enterprise Edition.',
          '3. Managed Cloud SaaS (Mô hình Databricks, Vercel, Confluent): Mã nguồn mở công cụ (Spark, Next.js, Kafka), nhưng cung cấp nền tảng Cloud 1-click deploy siêu tốc, tối ưu hạ tầng không cần quản trị server.',
          '4. Marketplace & Plugins (Mô hình WordPress, Grafana): Tạo hệ sinh thái mở khổng lồ và kiếm hoa hồng từ chợ ứng dụng, theme, plugin chuyên sâu.'
        ]
      },
      {
        heading: '2. Các Đại Tổ Chức Điều Phối: Linux Foundation, CNCF & Apache',
        subheading: 'Nơi giữ chiếc chìa khóa trung lập cho toàn cầu',
        content: 'Tại sao các đối thủ không đội trời chung như Google, Microsoft, AWS, Apple và Meta lại có thể cùng nhau phát triển Kubernetes hay Linux Kernel? Nhờ vào các Tổ chức Độc lập Trung lập (Foundation):',
        bulletPoints: [
          'Apache Software Foundation (ASF): Vận hành theo "The Apache Way" — tôn trọng quyền đóng góp cá nhân, mọi quyết định đều thông qua bỏ phiếu đồng thuận và minh bạch trên Mailing List.',
          'Cloud Native Computing Foundation (CNCF): "Ngôi nhà" của Kubernetes, Prometheus, Envoy, Helm. Quản lý các dự án theo 3 cấp độ trưởng thành nghiêm ngặt: Sandbox ➔ Incubating ➔ Graduated.',
          'Linux Foundation: Tổ chức bảo trợ nhân Linux, Node.js, GraphQL, PyTorch, bảo vệ bản quyền trung lập để không một công ty nào có thể độc chiếm công nghệ của nhân loại.'
        ],
        diagramType: 'cncf-maturity-funnel'
      },
      {
        heading: '3. Cơ Chế Ra Quyết Định: RFC & Mô Hình Quản Trị (Governance)',
        subheading: 'Cách một ý tưởng biến thành tính năng chính thức trong dự án triệu người dùng',
        content: 'Trong các dự án Open Source chuyên nghiệp, không ai tự ý nhảy vào viết code một tính năng lớn rồi đòi merge. Tất cả đều tuân thủ quy trình RFC (Request for Comments):',
        bulletPoints: [
          'RFC Document: Tác giả viết một bản thiết kế kỹ thuật chi tiết (Kiến trúc, API, Edge Cases, Khả năng tương thích ngược).',
          'Public Review: Toàn bộ cộng đồng nhảy vào tranh luận, phản biện, mổ xẻ rủi ro trong suốt nhiều tuần.',
          'Benevolent Dictator For Life (BDFL) vs Steering Committee: Quyết định cuối cùng được đưa ra bởi Nhà sáng lập uy tín (như Linus Torvalds, Guido van Rossum) hoặc Hội đồng kỹ thuật bầu cử dân chủ (Technical Oversight Committee).'
        ],
        proTip: 'Trước khi bắt tay vào code bất kỳ tính năng phức tạp nào trong dự án OSS, HÃY MỞ MỘT ISSUE HOẶC RFC THẢO LUẬN TRƯỚC! Điều này giúp bạn không lãng phí hàng tuần code để rồi bị Maintainer từ chối thẳng thừng vì đi ngược định hướng kiến trúc.'
      }
    ],
    practicalCommands: [
      {
        tool: 'gh api',
        title: 'Tra cứu thông tin tài trợ GitHub Sponsors và tổ chức',
        command: `gh api orgs/cncf/repos --paginate -q '.[].name' | head -20\ngh sponsor list torvalds`,
        description: 'Kiểm tra danh sách dự án trực thuộc CNCF và cơ chế tài trợ cộng đồng'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ 4 mô hình kinh doanh biến Open Source thành công ty tỷ đô',
      'Nắm vững vai trò trung lập của Apache, Linux Foundation và CNCF',
      'Hiểu quy trình viết RFC và phản biện kỹ thuật trước khi hiện thực hóa tính năng'
    ]
  },
  {
    id: 'oss-chap-4-git-github-mastery-for-oss',
    chapterNumber: 4,
    title: 'Kỹ Thuật Git & GitHub Chuyên Sâu Cho Open Source Contributor',
    subtitle: 'Làm chủ Forking Workflow, Git Rebase Interactive, Squash, Signed Commits GPG/SSH và Conventional Commits',
    category: 'git_collaboration_mastery',
    readTimeMinutes: 26,
    level: 'Thực chiến',
    summary: 'Nâng trình Git từ cơ bản lên chuẩn kỹ sư Open Source quốc tế: Làm chủ quy trình Fork-and-Pull, giữ nhánh luôn tươi mới bằng `git fetch upstream && git rebase`, gộp lịch sử commit sạch đẹp với `git rebase -i`, ký số commit bằng GPG/SSH Key để đạt Verified Badge, và tuân thủ chuẩn Conventional Commits.',
    hookStory: 'Năm 2005, công ty sở hữu BitKeeper (công cụ quản lý mã nguồn mà đội ngũ Linux Kernel đang dùng miễn phí) quyết định thu hồi quyền sử dụng vì một nhà phát triển Linux cố gắng đảo ngược kỹ thuật giao thức của họ. Tức giận vì bị hạn chế tự do, Linus Torvalds tự nhốt mình trong phòng và chỉ mất ĐÚNG 10 NGÀY để viết ra phiên bản đầu tiên của Git — công cụ thay đổi hoàn toàn cách nhân loại lập trình ngày nay!',
    sections: [
      {
        heading: '1. Quy Trình Fork-and-Pull & Quản Lý Hai Remote (Origin vs Upstream)',
        subheading: 'Bản đồ thao tác bắt buộc của mọi Contributor',
        content: 'Trong Open Source, bạn không có quyền ghi trực tiếp vào repo chính (Upstream). Bạn phải làm việc trên bản sao cá nhân (Origin) và tạo cầu nối:',
        codeBlock: {
          language: 'bash',
          title: 'Quy trình chuẩn thiết lập và đồng bộ Upstream',
          code: `# 1. Clone repository bạn đã fork về máy
git clone https://github.com/your-username/kubernetes.git
cd kubernetes

# 2. Thêm Remote trỏ về dự án gốc (gọi là upstream)
git remote add upstream https://github.com/kubernetes/kubernetes.git

# 3. Kiểm tra danh sách remotes
git remote -v
# origin   https://github.com/your-username/kubernetes.git (fetch/push)
# upstream https://github.com/kubernetes/kubernetes.git (fetch/push)

# 4. Tạo nhánh mới để làm tính năng (TUYỆT ĐỐI KHÔNG CODE TRÊN NHÁNH MAIN CỦA FORK)
git checkout -b feat/add-metrics-endpoint

# 5. Đồng bộ code mới nhất từ Upstream vào nhánh của bạn mà KHÔNG TẠO MERGE COMMIT RÁC
git fetch upstream
git rebase upstream/main`
        },
        proTip: 'Luôn dùng `git rebase upstream/main` thay vì `git merge upstream/main`. Rebase sẽ nhấc toàn bộ các commit của bạn đặt lên đỉnh mới nhất của dự án gốc, tạo ra một lịch sử thẳng tắp, sạch sẽ và không làm đau đầu Maintainer!'
      },
      {
        heading: '2. Nghệ Thuật Git Rebase Interactive & Squash Commit Sạch Đẹp',
        subheading: 'Biến 15 commit "fix typo", "fix test again" thành 1 commit duy nhất chuẩn mực',
        content: 'Khi bạn làm việc, bạn có thể tạo hàng chục commit tạm bợ. Nhưng trước khi gửi Pull Request, bạn phải gộp chúng lại:',
        codeBlock: {
          language: 'bash',
          title: 'Sử dụng Git Rebase Interactive',
          code: `# Rebase tương tác 4 commit gần nhất
git rebase -i HEAD~4

# Trình soạn thảo mở ra:
# pick e3a1f4b feat: add user validation logic
# s 4d8b91c fix: handle empty string edge case      <-- đổi 'pick' thành 's' (squash)
# s 9c2a110 test: add unit tests for validator       <-- đổi 'pick' thành 's' (squash)
# s 1f0e8a7 chore: fix linter errors                <-- đổi 'pick' thành 's' (squash)

# Sau khi lưu, Git sẽ gộp 4 commit làm 1 và cho phép bạn viết thông điệp hoàn chỉnh!`
        }
      },
      {
        heading: '3. Chuẩn Hóa Thông Điệp Commit: Conventional Commits',
        subheading: 'Ngôn ngữ giao tiếp chung giúp máy tính tự sinh CHANGELOG và tăng version',
        content: 'Các dự án Open Source lớn đều dùng bot tự động hóa phân tích commit. Cú pháp bắt buộc:',
        codeBlock: {
          language: 'text',
          title: 'Cấu trúc chuẩn Conventional Commits',
          code: `<type>(<scope>): <mô tả ngắn gọn thì hiện tại, chữ thường, không dấu chấm cuối>

[Nội dung mô tả chi tiết lý do thay đổi, vấn đề được giải quyết]

Fixes #1234
BREAKING CHANGE: <nếu có thay đổi phá vỡ API cũ>`
        },
        bulletPoints: [
          '`feat:` Thêm một tính năng mới cho người dùng.',
          '`fix:` Sửa lỗi (bug fix).',
          '`docs:` Chỉ thay đổi tài liệu, README.',
          '`test:` Thêm hoặc sửa test case.',
          '`refactor:` Sửa cấu trúc code mà không đổi logic hay fix bug.',
          '`perf:` Cải thiện hiệu năng (Performance).',
          '`chore:` Thay đổi cấu hình build, dependency, tooling.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'git & gpg',
        title: 'Ký số commit để nhận tích xanh Verified trên GitHub',
        command: `gpg --full-generate-key\ngpg --list-secret-keys --keyid-format=long\ngit config --global user.signingkey <YOUR_KEY_ID>\ngit config --global commit.gpgsign true`,
        description: 'Bảo đảm danh tính commit, chống giả mạo email tác giả trong các dự án bảo mật cao'
      }
    ],
    masteryChecklist: [
      'Thành thạo cấu hình 2 remote `origin` và `upstream` trong quy trình Fork',
      'Thành thạo dùng `git rebase -i` để squash và dọn dẹp lịch sử commit',
      'Viết commit 100% tuân thủ chuẩn Conventional Commits'
    ]
  },
  {
    id: 'oss-chap-5-first-contribution-journey',
    chapterNumber: 5,
    title: 'Bước Chân Đầu Tiên Vào Thế Giới OSS: Hành Trình Từ Zero Đến PR Merged',
    subtitle: 'Cách tìm Good First Issues, đọc mã nguồn triệu dòng, dựng Dev Environment và giao tiếp chuyên nghiệp với Maintainer',
    category: 'first_contribution_roadmap',
    readTimeMinutes: 25,
    level: 'Thực chiến',
    summary: 'Cẩm nang thực tế từng bước để có Pull Request đầu tiên được merge thành công: Chiến lược săn nhãn "good first issue", kỹ thuật đọc hiểu codebase lớn mà không bị ngợp, thiết lập môi trường bằng DevContainers/Docker, và nghệ thuật viết bình luận thảo luận tôn trọng thời gian của Maintainer.',
    hookStory: 'Nhiều lập trình viên trẻ nghĩ rằng phải là thiên tài giải thuật mới dám đóng góp cho Open Source. Nhưng bạn có biết: Hơn 40% đóng góp đầu tiên của các Core Maintainer hàng đầu hiện nay lại bắt đầu từ việc sửa một đường link bị hỏng trong tài liệu, bổ sung một test case bị thiếu, hoặc sửa một lỗi dịch thuật nhỏ. Điều quan trọng không phải bạn bắt đầu lớn thế nào, mà là bạn dám bắt đầu!',
    sections: [
      {
        heading: '1. Chiến Lược Săn Lùng "Good First Issue"',
        subheading: 'Tìm đúng dự án phù hợp với năng lực hiện tại của bạn',
        content: 'Đừng vội nhảy vào viết lại engine của Linux Kernel hay React Fiber. Hãy tìm những điểm chạm vừa sức nhưng mang lại giá trị thực sự:',
        bulletPoints: [
          'Tìm kiếm qua nhãn chuẩn: Lọc trên GitHub với từ khóa: `is:issue is:open label:"good first issue"` hoặc `label:"help wanted"`.',
          'Sử dụng các trang web tuyển chọn: GoodFirstIssue.dev, Up-For-Grabs.net, FirstContributions.github.io.',
          'Bắt đầu từ chính công cụ bạn dùng hàng ngày: Nếu bạn đang code React, Next.js, Express, Fastify và gặp một lỗi nhỏ hoặc tài liệu khó hiểu, ĐÓ CHÍNH LÀ CƠ HỘI ĐÓNG GÓP HOÀN HẢO NHẤT!',
          'Đọc kỹ tệp `CONTRIBUTING.md` và `CODE_OF_CONDUCT.md`: Đây là "luật chơi" của từng dự án. Vi phạm quy định đóng góp (như không chạy linter, không viết test) sẽ khiến PR của bạn bị từ chối ngay lập tức.'
        ]
      },
      {
        heading: '2. Kỹ Thuật Đọc Hiểu Codebase Khổng Lồ Mà Không Bị Ngợp',
        subheading: 'Phương pháp "Dò Vết Ngược" (Reverse Engineering through Tests & Entrypoints)',
        content: 'Khi mở một dự án có 500,000 dòng code, bí quyết của các chuyên gia là:',
        bulletPoints: [
          '1. Không đọc từ trên xuống dưới như tiểu thuyết: Hãy tìm tệp `package.json`, `Cargo.toml`, `go.mod` hoặc `Makefile` để xem các lệnh chạy và dependencies cốt lõi.',
          '2. Đi từ Test Cases: Đọc các file `*.test.ts` hoặc `*_test.go`. Test cases chính là tài liệu sống mô tả chính xác input, output và hành vi mong đợi của từng hàm.',
          '3. Dùng Debugger & Console Log: Đặt breakpoint hoặc log tại điểm bạn nghi ngờ xảy ra lỗi trong Issue, kích hoạt luồng chạy và theo dõi biến thay đổi từng bước.',
          '4. Tìm điểm Entrypoint: Tìm file khởi động chính (`index.ts`, `main.go`, `src/core.rs`) và vẽ sơ đồ luồng dữ liệu (Data Flow) tóm tắt.'
        ]
      },
      {
        heading: '3. Nghi Thức Giao Tiếp & Gửi Pull Request Chuẩn 5 Sao',
        subheading: 'Làm thế nào để Maintainer duyệt PR của bạn trong vòng 24 giờ?',
        content: 'Maintainer là những người vô cùng bận rộn và thường làm việc tự nguyện ngoài giờ. Hãy biến PR của bạn thành một món quà dễ chịu nhất để duyệt:',
        codeBlock: {
          language: 'markdown',
          title: 'Mẫu mô tả Pull Request chuẩn 5 sao',
          code: `## 📌 Mô tả tóm tắt thay đổi
PR này sửa lỗi hàm \`parseJSON\` bị crash khi nhận input rỗng (\`""\`), giải quyết triệt để Issue #456.

## 🔍 Nguyên nhân gốc rễ (Root Cause)
Trước đây hàm \`validateInput()\` không kiểm tra độ dài chuỗi trước khi chuyển vào JSON parser.

## ✅ Những thay đổi đã thực hiện
- Thêm kiểm tra điều kiện guard clause \`if (!str) return null;\` trong \`src/parser.ts\`.
- Bổ sung 3 unit test cases bao quát: chuỗi rỗng, chuỗi chỉ chứa dấu cách và chuỗi null.
- Đã chạy kiểm tra và pass 100%: \`npm run test\` và \`npm run lint\`.

## 🧪 Bằng chứng kiểm thử (Screenshots / Test output)
\`\`\`bash
PASS src/parser.test.ts (12 tests, 0 failures)
Coverage: 100% logic nhánh mới
\`\`\`

Closes #456`
        },
        warningNote: 'Tuyệt đối KHÔNG BAO GIỜ tag `@maintainer` dồn dập sau khi vừa mở PR 5 phút. Hãy kiên nhẫn chờ đợi ít nhất vài ngày. Nếu sau 1 tuần chưa có phản hồi, bạn có thể để lại một lời nhắn lịch sự và nhẹ nhàng.'
      }
    ],
    practicalCommands: [
      {
        tool: 'gh cli',
        title: 'Mở và quản lý Pull Request trực tiếp từ Terminal với GitHub CLI',
        command: `gh pr create --title "fix(parser): handle empty string edge case" --body-file pr_description.md\ngh pr status\ngh pr checks`,
        description: 'Tạo PR và theo dõi trạng thái CI chạy test trực tiếp ngay trên Terminal'
      }
    ],
    masteryChecklist: [
      'Biết cách tìm và nhận issue với nhãn `good first issue` đúng nghi thức',
      'Áp dụng chiến lược đọc codebase lớn qua Test Cases và Entrypoints',
      'Viết bản mô tả Pull Request mẫu mực đính kèm kết quả test và link Issue'
    ]
  },
  {
    id: 'oss-chap-6-ci-cd-quality-gates-code-review',
    chapterNumber: 6,
    title: 'Hàng Rào Chất Lượng Tự Động: CI/CD & Văn Hóa Code Review Đỉnh Cao',
    subtitle: 'GitHub Actions, Linter, Test Coverage, Codecov, và cách đón nhận phản biện kỹ thuật để nâng tầm tư duy',
    category: 'ci_cd_quality_gates',
    readTimeMinutes: 24,
    level: 'Nâng cao',
    summary: 'Làm chủ các cổng kiểm soát chất lượng tự động trong Open Source: Xây dựng GitHub Actions workflow kiểm tra đa nền tảng (Linux, macOS, Windows) và đa phiên bản Node/Python/Go, thiết lập ngưỡng phủ mã (Code Coverage), và văn hóa tiếp nhận phản biện trong Code Review như một kỹ sư trưởng thành.',
    hookStory: 'Năm 2016, lập trình viên Azer Koçulu vì mâu thuẫn tên gói đã quyết định gỡ bỏ 11 dòng code của thư viện `left-pad` khỏi npm. Trong vòng vài phút, hàng ngàn dự án khổng lồ bao gồm React, Babel và hàng triệu website trên toàn cầu bị sập hoàn toàn trong quá trình build! Sự cố này đã thúc đẩy toàn bộ ngành công nghiệp Open Source phải xây dựng các hàng rào tự động hóa và quản lý dependencies nghiêm ngặt nhất lịch sử.',
    sections: [
      {
        heading: '1. Xây Dựng GitHub Actions CI/CD Chuẩn Mực Cho Dự Án Mở',
        subheading: 'Không bao giờ để code lỗi hay không qua test lọt vào nhánh chính',
        content: 'Mọi repository mã nguồn mở chuyên nghiệp đều có hệ thống Continuous Integration tự động kích hoạt mỗi khi có PR mở ra:',
        codeBlock: {
          language: 'yaml',
          title: '.github/workflows/ci.yml',
          code: `name: CI Quality Gate
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-matrix:
    name: Test on \${{ matrix.os }} - Node \${{ matrix.node-version }}
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        node-version: [18.x, 20.x, 22.x]

    steps:
      - name: Checkout mã nguồn
        uses: actions/checkout@v4

      - name: Thiết lập môi trường Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Cài đặt dependencies sạch (Clean Install)
        run: npm ci

      - name: Kiểm tra định dạng & Linter
        run: npm run lint

      - name: Chạy Typecheck (TypeScript)
        run: npx tsc --noEmit

      - name: Chạy Unit Tests & Sinh Coverage
        run: npm run test:coverage

      - name: Tải báo cáo Coverage lên Codecov
        uses: codecov/codecov-action@v4
        with:
          token: \${{ secrets.CODECOV_TOKEN }}`
        }
      },
      {
        heading: '2. Nghệ Thuật Tiếp Nhận & Phản Biển Trong Code Review',
        subheading: 'Tách biệt cái tôi cá nhân khỏi chất lượng của mã nguồn',
        content: 'Khi Maintainer để lại 10 bình luận yêu cầu bạn sửa lại cách đặt tên, tối ưu thuật toán hoặc bổ sung test case, một kỹ thuật viên trẻ non nớt sẽ cảm thấy bị chỉ trích, trong khi một kỹ sư xuất chúng sẽ coi đó là một buổi huấn luyện (Mentorship) miễn phí 1-kèm-1 từ các chuyên gia hàng đầu thế giới:',
        bulletPoints: [
          'Không tự ái (Ego-less Programming): Maintainer không chỉ trích con người bạn, họ đang bảo vệ tính toàn vẹn của dự án mà họ chịu trách nhiệm trước hàng ngàn người dùng.',
          'Trả lời từng bình luận (Resolve Conversations): Khi đã sửa xong một góp ý, hãy commit code, để lại phản hồi "Đã cập nhật theo gợi ý tại commit abc1234" và đánh dấu Resolve.',
          'Bảo vệ quan điểm bằng dẫn chứng khoa học: Nếu bạn tin cách làm của bạn tối ưu hơn, hãy đưa ra số liệu Benchmark (thời gian chạy, dung lượng RAM tiêu tốn) hoặc trích dẫn tài liệu chính thức thay vì nói suông.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'act (Local GitHub Actions)',
        title: 'Chạy thử GitHub Actions Workflow ngay trên máy cá nhân trước khi push',
        command: `act pull_request -j test-matrix\nact -l`,
        description: 'Dùng Docker giả lập runner GitHub Actions để phát hiện lỗi CI ngay tại máy local'
      }
    ],
    masteryChecklist: [
      'Hiểu cấu trúc Ma trận (Matrix Strategy) trong GitHub Actions đa nền tảng',
      'Nắm vững 3 nguyên tắc vàng trong văn hóa Code Review không bản ngã',
      'Biết cách chạy và gỡ lỗi CI workflow trước khi tạo PR'
    ]
  },
  {
    id: 'oss-chap-7-creating-your-own-project',
    chapterNumber: 7,
    title: 'Khởi Tạo & Vận Hành Dự Án Open Source Riêng: Từ Repo Trắng Đến Ngàn Sao ⭐',
    subtitle: 'Nghệ thuật viết README thôi miên, Bộ tài liệu cộng đồng (Community Health Files), Tự động phát hành Semantic Release và Quảng bá dự án',
    category: 'creating_your_own_project',
    readTimeMinutes: 26,
    level: 'Nâng cao',
    summary: 'Bí kíp biến ý tưởng cá nhân thành một dự án mã nguồn mở chuẩn mực thu hút hàng ngàn lượt Star trên GitHub: Thiết kế README trực quan với ảnh động GIF/Demo, chuẩn bị bộ tệp sức khỏe cộng đồng (Issue/PR Templates, Security Policy), tự động hóa đánh số phiên bản và phát hành npm/PyPI/Docker với Semantic Release, và chiến lược lan tỏa trên Hacker News/Reddit.',
    hookStory: 'Năm 2013, Jordan Walke và đội ngũ tại Facebook công bố React dưới dạng Open Source tại hội nghị JSConf US. Ban đầu, cả hội trường im phăng phắc và cộng đồng mạng ném đá dữ dội vì ý tưởng "nhúng HTML vào JavaScript (JSX) là một trò hề". Nhưng nhờ tài liệu xuất sắc, tư duy component đột phá và cách xây dựng cộng đồng nhiệt thành, React đã vươn lên trở thành thư viện frontend số 1 hành tinh.',
    sections: [
      {
        heading: '1. Cấu Trúc README Đỉnh Cao: Giữ Chân Người Đọc Trong 5 Giây',
        subheading: 'README chính là trang bìa và bộ mặt của sản phẩm',
        content: 'Một dự án dù code hay đến đâu nhưng README cẩu thả sẽ không bao giờ có người dùng. Công thức README 5 phần vàng:',
        bulletPoints: [
          '1. Header cuốn hút: Logo đẹp + Tên dự án + Câu định vị độc nhất (One-line value proposition) + Badges (CI status, NPM version, License, Codecov).',
          '2. Demo trực quan: Một ảnh động GIF hoặc video ngắn 10 giây biểu diễn tính năng ấn tượng nhất ngay đầu trang.',
          '3. Cài đặt nhanh (Quickstart trong 60 giây): Lệnh cài đặt ngắn gọn nhất + Đoạn code tối thiểu (Minimal Working Example) copy-paste chạy được ngay.',
          '4. Bảng so sánh (Why Us vs Others?): Nêu bật lý do vì sao dự án của bạn nhanh hơn, nhẹ hơn hoặc dễ dùng hơn các giải pháp cũ.',
          '5. Bảng danh dự đóng góp (Contributors Hall of Fame): Tự động hiển thị avatar những người đã đóng góp bằng All-Contributors bot.'
        ]
      },
      {
        heading: '2. Bộ Tệp Sức Khỏe Cộng Đồng (Community Health Files)',
        subheading: 'Quy chuẩn chuyên nghiệp của GitHub đưa dự án lên thang điểm 100%',
        content: 'Đặt các tệp này vào thư mục `.github/` để tự động hóa hướng dẫn:',
        codeBlock: {
          language: 'text',
          title: 'Cấu trúc thư mục .github/ chuẩn mực',
          code: `.github/
├── ISSUE_TEMPLATE/
│   ├── bug_report.yml       <-- Form mẫu báo lỗi có validate
│   └── feature_request.yml  <-- Form đề xuất tính năng mới
├── PULL_REQUEST_TEMPLATE.md <-- Mẫu checklist bắt buộc khi mở PR
├── CONTRIBUTING.md           <-- Hướng dẫn setup môi trường dev & chạy test
├── CODE_OF_CONDUCT.md        <-- Quy tắc ứng xử văn minh (Contributor Covenant)
├── SECURITY.md               <-- Quy trình báo cáo lỗ hổng bảo mật bí mật
└── FUNDING.yml               <-- Nút tài trợ GitHub Sponsors / Open Collective`
        }
      },
      {
        heading: '3. Tự Động Hóa Phát Hành: Semantic Release & Versioning',
        subheading: 'Không bao giờ phải tự tay sửa số version trong package.json và gõ `git tag`',
        content: 'Kết hợp Conventional Commits với công cụ `semantic-release` để bot tự động tính toán:',
        bulletPoints: [
          'Nếu có commit dạng `fix:` ➔ Tự động tăng PATCH version (ví dụ 1.0.0 ➔ 1.0.1).',
          'Nếu có commit dạng `feat:` ➔ Tự động tăng MINOR version (ví dụ 1.0.1 ➔ 1.1.0).',
          'Nếu có `BREAKING CHANGE:` ➔ Tự động tăng MAJOR version (ví dụ 1.1.0 ➔ 2.0.0).',
          'Bot tự động viết CHANGELOG.md, tạo GitHub Release kèm file binary đính kèm, và đẩy gói lên NPM/PyPI/Docker Hub.'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'npx release-it / semantic-release',
        title: 'Cấu hình phát hành tự động 1-click',
        command: `npx release-it --dry-run\nnpx all-contributors-cli add <username> code,doc`,
        description: 'Chạy thử nghiệm quy trình phát hành phiên bản và ghi nhận công lao contributor'
      }
    ],
    masteryChecklist: [
      'Thiết kế README theo công thức 5 phần giữ chân người dùng trong 5 giây',
      'Tạo đầy đủ bộ tệp Community Health trong `.github/`',
      'Thiết lập Semantic Release tự động hóa 100% quy trình đánh phiên bản và phát hành'
    ]
  },
  {
    id: 'oss-chap-8-maintainer-community-leadership',
    chapterNumber: 8,
    title: 'Trở Thành Maintainer & Lãnh Đạo Cộng Đồng: Quản Trị Triage, Burnout & Steering',
    subtitle: 'Nghệ thuật nói "Không" khéo léo, xử lý PR rác từ các đợt Hacktoberfest, và xây dựng Core Team kế thừa',
    category: 'maintainer_community_leadership',
    readTimeMinutes: 25,
    level: 'Chuyên gia',
    summary: 'Kỹ năng lãnh đạo và quản trị khi bạn chuyển từ vai trò Contributor lên Core Maintainer: Cách thiết lập hệ thống Triage phân loại hàng trăm Issue mỗi tuần, bí quyết từ chối những tính năng làm phình to mã nguồn mà không làm tổn thương cộng đồng, phòng chống kiệt sức (Maintainer Burnout), và trao quyền xây dựng Ban điều hành kỹ thuật.',
    hookStory: 'Năm 2021, Marak Squires — tác giả của hai thư viện nổi tiếng `faker.js` và `colors.js` được hàng ngàn doanh nghiệp lớn sử dụng với hàng tỷ lượt tải — đã tự tay chèn một đoạn mã lặp vô tận in chữ "LIBERTY LIBERTY LIBERTY" làm sập hàng ngàn dự án trên toàn cầu. Đằng sau hành động cực đoan ấy là câu chuyện bi kịch về sự kiệt sức (Burnout): một mình ông phải bảo trì phần mềm phục vụ cả thế giới tỷ đô trong khi sống trong cảnh khó khăn và không nhận được một đồng hỗ trợ nào. Đây là bài học đắt giá về trách nhiệm bảo vệ người duy trì mã nguồn mở!',
    sections: [
      {
        heading: '1. Nghệ Thuật Nói "Không": Bảo Vệ Triết Lý Tinh Gọn Của Dự Án',
        subheading: 'Thêm code thì dễ, xóa một tính năng đã phát hành là điều gần như bất khả thi',
        content: 'Là một Maintainer, 80% công việc của bạn là từ chối các đề xuất tính năng không phù hợp (Scope Creep). Mỗi dòng code mới được thêm vào đồng nghĩa với việc bạn phải bảo trì, sửa bug và hỗ trợ nó trong suốt 10 năm tiếp theo:',
        bulletPoints: [
          'Từ chối tính năng, không từ chối con người: Luôn cảm ơn người đóng góp vì đã dành thời gian gửi PR.',
          'Giải thích rõ ràng lý do: "Tính năng này rất thú vị, tuy nhiên mục tiêu cốt lõi của thư viện này là siêu nhẹ và không phụ thuộc. Chúng tôi khuyến khích bạn phát hành nó dưới dạng một Plugin độc lập bên ngoài".',
          'Dùng bot tự động đóng Issue stale: Cấu hình `actions/stale` để tự động nhắc nhở và đóng các Issue không có phản hồi sau 30 ngày.'
        ]
      },
      {
        heading: '2. Chiến Lược Phòng Chống Kiệt Sức (Maintainer Burnout)',
        subheading: 'Mã nguồn mở là một cuộc chạy Marathon, không phải chạy nước rút 100m',
        content: 'Các nguyên tắc sinh tồn của những Maintainer kỳ cựu:',
        bulletPoints: [
          'Bạn không nợ ai bất cứ điều gì: Người dùng sử dụng phần mềm miễn phí theo giấy phép MIT "AS IS" (Như hiện trạng, không có bất kỳ sự bảo đảm nào). Bạn không có nghĩa vụ phải trả lời email lúc 2 giờ sáng.',
          'Tự động hóa tối đa: Để Bot làm những việc nhàm chán (Lint, Test, Auto-label, Lock spam conversations).',
          'Nhanh chóng kết nạp Triager và Co-Maintainer: Khi thấy một contributor thường xuyên đóng góp tích cực và trả lời câu hỏi của người khác, hãy trao ngay quyền Triage và mời họ vào Core Team để chia lửa!'
        ]
      }
    ],
    practicalCommands: [
      {
        tool: 'gh issue & gh pr',
        title: 'Thao tác phân loại Issue và PR hàng loạt bằng GitHub CLI',
        command: `gh issue list --label "needs-triage"\ngh issue edit 123 --add-label "bug,priority:high" --assignee "@me"\ngh pr close 456 --comment "Closed as out of scope. Thank you!"`,
        description: 'Tối ưu tốc độ quản trị repository trực tiếp từ bàn phím'
      }
    ],
    masteryChecklist: [
      'Nắm vững nghệ thuật từ chối tính năng thừa mà vẫn giữ được sự văn minh',
      'Áp dụng các biện pháp phân quyền và tự động hóa để tránh kiệt sức',
      'Biết cách phát hiện và đào tạo Contributor tiềm năng thành Core Maintainer'
    ]
  },
  {
    id: 'oss-chap-9-supply-chain-security-hardening',
    chapterNumber: 9,
    title: 'Bảo Mật Chuỗi Cung Ứng Mã Nguồn Mở (Supply Chain Security)',
    subtitle: 'Vụ tấn công xz-utils lịch sử, SBOM, Sigstore, SLSA Framework, và ngăn chặn Typosquatting',
    category: 'supply_chain_security',
    readTimeMinutes: 28,
    level: 'Chuyên gia',
    summary: 'Bảo vệ thế giới phần mềm trước các cuộc tấn công tinh vi nhất: Phân tích chi tiết cuộc tấn công Backdoor xz-utils được phát hiện bởi Andres Freund, phương thức tấn công Dependency Confusion và Typosquatting, thiết lập ký số phần mềm bằng Sigstore/Cosign, tạo Bảng kê vật liệu phần mềm (SBOM) và đạt cấp độ bảo mật SLSA.',
    hookStory: 'Tháng 3 năm 2024, một kỹ sư của Microsoft tên Andres Freund nhận thấy các phiên bản thử nghiệm của Debian và Red Hat bị trễ kết nối SSH khoảng 500 mili giây (nửa giây) và tiêu tốn CPU bất thường. Khi đào sâu phân tích vi mô, ông đã khám phá ra một cuộc tấn công chấn động lịch sử: Một hacker đội lốt contributor kiên nhẫn suốt 2 năm ("Jia Tan") đã cài cắm một backdoor cực kỳ tinh vi vào thư viện nén `xz-utils` để chiếm quyền điều khiển root từ xa của mọi máy chủ Linux trên thế giới. Nhờ sự tò mò của Andres Freund, một thảm họa an ninh mạng toàn cầu đã được chặn đứng ngay trước cửa ngõ!',
    sections: [
      {
        heading: '1. Bài Học Xương Máu Từ Vụ Tấn Công xz-utils (CVE-2024-3094)',
        subheading: 'Kỹ thuật tấn công tâm lý xã hội (Social Engineering) kết hợp kỹ thuật mã độc đa tầng',
        content: 'Cuộc tấn công xz-utils đã phơi bày điểm yếu chí tử của chuỗi cung ứng mở:',
        bulletPoints: [
          'Bước 1: Kẻ tấn công tạo nhiều tài khoản giả mạo, liên tục gửi thư phàn nàn gây áp lực lên Maintainer gốc (vốn đang bị bệnh và quá tải), đòi chuyển giao quyền bảo trì.',
          'Bước 2: Sau khi lấy được lòng tin và quyền Commit, hacker âm thầm đóng gói mã độc nhị phân ngụy trang dưới dạng tệp test cases mà không xuất hiện trong mã nguồn commit rõ ràng.',
          'Bước 3: Mã độc tự động hook vào tiến trình `sshd` thông qua cơ chế `systemd`, cho phép kẻ có khóa riêng bí mật vượt qua xác thực SSH để chạy bất kỳ lệnh root nào.'
        ]
      },
      {
        heading: '2. Các Hình Thức Tấn Công Chuỗi Cung Ứng Thường Gặp',
        subheading: 'Nhận diện các cạm bẫy trong hệ sinh thái npm, PyPI, Crates.io',
        content: 'Những hình thức tấn công nguy hiểm nhất cần phòng tránh:',
        bulletPoints: [
          'Typosquatting: Đặt tên gói gần giống các thư viện nổi tiếng để lừa người gõ nhầm (ví dụ: `cross-env` bị nhại thành `crossenv`, `colors` bị nhại thành `colourss`).',
          'Account Takeover: Hacker chiếm tài khoản npm/GitHub của Maintainer do không bật xác thực 2 lớp (2FA) hoặc bị lộ token CI.',
          'Dependency Confusion: Đặt tên gói nội bộ của công ty lên chợ công khai npm với số version cực cao (ví dụ `99.0.0`) để trình quản lý gói tự động tải gói độc hại từ internet về.'
        ]
      },
      {
        heading: '3. Bộ Khung Phòng Thủ Hiện Đại: SBOM, Cosign & SLSA',
        subheading: 'Xác thực nguồn gốc và bảo đảm tính toàn vẹn của phần mềm',
        content: 'Các tiêu chuẩn bảo mật bắt buộc của tương lai:',
        codeBlock: {
          language: 'bash',
          title: 'Tạo SBOM và ký số Artifact với Cosign',
          code: `# 1. Quét và tạo bảng kê nguyên vật liệu phần mềm (Software Bill of Materials) với Syft
syft packages dir:. -o spdx-json=sbom.spdx.json

# 2. Quét lỗ hổng bảo mật trong SBOM với Grype hoặc Trivy
trivy sbom sbom.spdx.json

# 3. Ký số Container Image bằng Sigstore / Cosign (Keyless signing qua OIDC)
cosign sign --yes ghcr.io/my-org/my-app:v1.0.0

# 4. Xác minh chữ ký số trước khi triển khai lên Kubernetes
cosign verify ghcr.io/my-org/my-app:v1.0.0 \\
  --certificate-identity "https://github.com/my-org/my-app/.github/workflows/release.yml@refs/heads/main" \\
  --certificate-oidc-issuer "https://token.actions.githubusercontent.com"`
        }
      }
    ],
    practicalCommands: [
      {
        tool: 'trivy / npm audit / osv-scanner',
        title: 'Quét toàn diện lỗ hổng bảo mật chuỗi cung ứng bằng OSV-Scanner của Google',
        command: `osv-scanner -r .\ntrivy fs --severity HIGH,CRITICAL .\nnpm audit --audit-level=high`,
        description: 'Phát hiện nhanh chóng các thư viện dính mã độc hoặc lỗ hổng CVE nghiêm trọng'
      }
    ],
    masteryChecklist: [
      'Hiểu rõ cơ chế tấn công Social Engineering và Backdoor trong vụ xz-utils',
      'Phòng tránh Typosquatting và Dependency Confusion trong dự án',
      'Tạo SBOM và ký số container artifact bằng Sigstore/Cosign'
    ]
  },
  {
    id: 'oss-chap-10-career-personal-branding-monetization',
    chapterNumber: 10,
    title: 'Xây Dựng Sự Nghiệp & Thương Hiệu Cá Nhân Toàn Cầu Từ Open Source',
    subtitle: 'Biến GitHub Profile thành tấm danh thiếp quyền lực, săn việc Remote quốc tế/FAANG và kiếm thu nhập thụ động',
    category: 'career_personal_branding',
    readTimeMinutes: 25,
    level: 'Chuyên gia',
    summary: 'Khám phá bệ phóng sự nghiệp không giới hạn từ Mã Nguồn Mở: Cách trình bày GitHub Profile như một portfolio sống động, bí quyết được các công ty công nghệ hàng đầu thế giới (Google, Meta, Vercel, Supabase) chủ động săn đón mà không cần nộp CV, và cách xây dựng dòng tiền tài trợ qua GitHub Sponsors, Open Collective và tiền thưởng giải quyết lỗi (Bounties).',
    hookStory: 'Evan You — một cựu kỹ sư tại Google Creative Lab — đã xây dựng Vue.js ban đầu như một dự án thử nghiệm cá nhân. Nhờ chất lượng vượt trội và sự ủng hộ của cộng đồng, anh đã rời bỏ công việc văn phòng để trở thành một Open Source Creator toàn thời gian. Ngày nay, thông qua GitHub Sponsors và Patreon, Evan You và hệ sinh thái Vue/Vite nhận hàng chục ngàn USD tài trợ hàng tháng, chứng minh rằng lập trình viên hoàn toàn có thể tự do tài chính và sáng tạo nhờ Open Source!',
    sections: [
      {
        heading: '1. GitHub Profile: Chiếc CV Biết Nói Quyền Lực Hơn Mọi Bằng Cấp',
        subheading: 'Nhà tuyển dụng quốc tế nhìn vào những gì bạn đã làm, không phải những gì bạn tự nhận',
        content: 'Một CV giấy có thể nói dối, nhưng biểu đồ đóng góp xanh rực (Contribution Graph) và lịch sử Pull Request trên GitHub thì không bao giờ nói dối:',
        bulletPoints: [
          'README Profile chuyên nghiệp: Sử dụng repo đặc biệt `username/username` để giới thiệu công nghệ sở trường, các dự án tiêu biểu và số liệu đóng góp.',
          'Chất lượng hơn số lượng: 3 PR được merge vào các dự án danh tiếng (như Next.js, Kubernetes, Fastify, Supabase) có sức nặng gấp trăm lần 50 dự án đồ án môn học đơn sơ.',
          'Kỹ năng viết và giao tiếp bằng tiếng Anh: Cách bạn tranh luận trong Issue và mô tả PR thể hiện chính xác khả năng làm việc từ xa (Async Remote Work) mà mọi công ty toàn cầu săn tìm.'
        ]
      },
      {
        heading: '2. Các Kênh Kiếm Tiền & Tự Do Tài Chính Với Open Source',
        subheading: 'Xây dựng nguồn thu nhập bền vững từ chính đam mê công nghệ',
        content: 'Các con đường tài chính thực tế cho Open Source Engineers:',
        bulletPoints: [
          'GitHub Sponsors & Open Collective: Nhận tài trợ định kỳ từ cá nhân và các doanh nghiệp đang dùng thư viện của bạn trong sản phẩm thương mại của họ.',
          'Nền tảng Bug Bounties & Algora / Gitcoin: Nhận tiền thưởng tức thì khi giải quyết các Issue có gắn tiền thưởng (từ $50 đến $2,000 cho mỗi Issue được merge).',
          'Được tuyển dụng làm Full-time Open Source Maintainer: Các tập đoàn lớn (Red Hat, Google, AWS, Vercel, Microsoft) sẵn sàng trả mức lương $150,000 - $300,000/năm chỉ để bạn toàn tâm toàn ý phát triển dự án mã nguồn mở của cộng đồng!',
          'Tư vấn & Đào tạo chuyên sâu (Consulting): Trở thành chuyên gia số 1 về công nghệ do bạn tạo ra và cung cấp dịch vụ tư vấn kiến trúc với mức giá $200 - $500/giờ.'
        ]
      },
      {
        heading: '3. Bản Tuyên Ngôn Của Kỹ Sư Open Source Thế Hệ Mới',
        subheading: 'Hành trình vạn dặm bắt đầu từ một dòng lệnh `git commit`',
        content: 'Mã nguồn mở không đơn thuần là công nghệ, đó là một lối sống, một tinh thần sẻ chia và khát vọng để lại di sản cho nhân loại. Khi bạn viết một dòng code mở hữu ích, dòng code ấy có thể đang âm thầm chạy trên một chiếc vệ tinh ngoài vũ trụ, một máy chủ bệnh viện cứu người, hoặc nâng cánh cho hàng triệu lập trình viên trẻ khác trên khắp địa cầu.',
        mindsetShift: {
          from: 'Chỉ biết tiêu thụ và nhận lại từ cộng đồng.',
          to: 'Trở thành người kiến tạo, cống hiến và định hình tương lai của thế giới số.',
          impact: 'Mở rộng tầm ảnh hưởng cá nhân ra toàn cầu và làm chủ hoàn toàn sự nghiệp kỹ thuật.'
        }
      }
    ],
    practicalCommands: [
      {
        tool: 'gh profile & algora',
        title: 'Khám phá các issue có gắn tiền thưởng kiếm thu nhập đầu tiên',
        command: `gh search issues "bounty" --state open --sort comments\nopen https://console.algora.io/`,
        description: 'Tìm kiếm các dự án Open Source đang treo thưởng tiền mặt cho contributor'
      }
    ],
    masteryChecklist: [
      'Xây dựng GitHub README Profile chuẩn kỹ sư quốc tế',
      'Hiểu rõ các kênh kiếm thu nhập từ GitHub Sponsors, Bounties đến Full-time Maintainer',
      'Định hình lộ trình phát triển sự nghiệp dài hạn trong thế giới Mã Nguồn Mở'
    ]
  }
];
