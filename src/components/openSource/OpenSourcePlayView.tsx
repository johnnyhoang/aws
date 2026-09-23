import React, { useState } from 'react';
import { OPEN_SOURCE_FLASHCARDS } from '../../data/openSource/openSourceFlashcardsData';
import { OpenSourceFlashcard } from '../../types/openSourceModule';
import { 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Copy, 
  Check
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

type PlayTab = 'flashcards' | 'license_lab' | 'pr_simulator' | 'git_cheatsheet';

interface LicenseQuizRule {
  question: string;
  options: { label: string; next: string | { name: string; license: string; desc: string; color: string } }[];
}

export const OpenSourcePlayView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlayTab>('flashcards');
  const { flashcardsMastered, toggleFlashcardMastered, addBonusXP } = useLearning();

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardsList, setCardsList] = useState<OpenSourceFlashcard[]>(OPEN_SOURCE_FLASHCARDS);

  // License Chooser State
  const [projectGoal, setProjectGoal] = useState<'permissive' | 'copyleft' | 'saas_protection' | 'weak_copyleft'>('permissive');

  // PR Simulator State
  const [prStep, setPrStep] = useState<number>(1);
  const [prTitle, setPrTitle] = useState('feat(auth): support OAuth2 Google provider');
  const [prDescription, setPrDescription] = useState('This PR adds Google OAuth2 authentication flow with 100% test coverage.');
  const [isPrSubmitted, setIsPrSubmitted] = useState(false);
  const [ciStatus, setCiStatus] = useState<'idle' | 'running' | 'passed' | 'failed'>('idle');

  // Copied helper
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const currentCard = cardsList[cardIndex] || cardsList[0];
  const isMastered = flashcardsMastered.includes(currentCard.id);

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex(prev => (prev + 1) % cardsList.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex(prev => (prev - 1 + cardsList.length) % cardsList.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cardsList].sort(() => Math.random() - 0.5);
    setCardsList(shuffled);
    setCardIndex(0);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSimulatePR = () => {
    setCiStatus('running');
    setIsPrSubmitted(true);
    setTimeout(() => {
      setCiStatus('passed');
      addBonusXP(50);
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 text-slate-300">
      
      {/* Hero Header */}
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
          Phòng Thực Hành Tương Tác Open Source
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          Phòng Thí Nghiệm & Đấu Trường Thực Hành Open Source
        </h1>
        <p className="text-sm text-slate-400">
          Rèn luyện thẻ nhớ thuật ngữ quốc tế, thử nghiệm công cụ gợi ý Giấy phép bản quyền, mô phỏng quy trình gửi Pull Request chuẩn CI/CD và tra cứu nhanh các lệnh Git OSS quyền lực.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'flashcards'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Thẻ Nhớ Thuật Ngữ (Flashcards)
          </button>

          <button
            onClick={() => setActiveTab('license_lab')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'license_lab'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Lab Chọn Giấy Phép (License Selector)
          </button>

          <button
            onClick={() => setActiveTab('pr_simulator')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'pr_simulator'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Mô Phỏng Pull Request & CI Gate
          </button>

          <button
            onClick={() => setActiveTab('git_cheatsheet')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'git_cheatsheet'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Git OSS Cheatsheet
          </button>
        </div>
      </div>

      {/* Tab 1: Flashcards */}
      {activeTab === 'flashcards' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">
              Thẻ <strong className="text-purple-400">{cardIndex + 1}</strong> / {cardsList.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffle}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors cursor-pointer"
                title="Xáo trộn ngẫu nhiên"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Xáo thẻ</span>
              </button>
            </div>
          </div>

          {/* 3D Flip Flashcard */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[280px] sm:min-h-[320px] p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-purple-500/30 shadow-2xl cursor-pointer select-none flex flex-col justify-between relative group hover:border-purple-500/60 transition-all"
          >
            {/* Top info */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-xs font-mono">
                {currentCard.category}
              </span>
              <div className="text-xs text-slate-500 group-hover:text-purple-400 transition-colors">
                <span>Nhấn để lật mặt</span>
              </div>
            </div>

            {/* Middle Content (Front vs Back) */}
            <div className="my-6 text-center space-y-4">
              {!isFlipped ? (
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
                    {currentCard.term}
                  </h3>
                  <p className="text-xs text-slate-500 italic">
                    (Nhấp vào đây để xem định nghĩa & bí quyết thực chiến)
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-left animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Định nghĩa cốt lõi:</span>
                    <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
                      {currentCard.definition}
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Ứng dụng thực tế:</span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentCard.practicalUsage}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-900/50 text-xs text-purple-200">
                    <span><strong>ProTip:</strong> {currentCard.proTip}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom info */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 text-xs">
              <span className="text-slate-500">Mặt {!isFlipped ? '1 (Thuật ngữ)' : '2 (Chi tiết)'}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFlashcardMastered(currentCard.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-colors cursor-pointer ${
                  isMastered
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isMastered ? 'Đã thành thạo (+40 XP)' : 'Đánh dấu đã nhớ'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevCard}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-purple-300 transition-colors cursor-pointer text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Thẻ trước</span>
            </button>

            <span className="text-xs text-slate-500 font-mono">
              Phím mũi tên hoặc nhấn để lật
            </span>

            <button
              onClick={handleNextCard}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer text-xs font-semibold shadow-lg shadow-purple-900/20"
            >
              <span>Thẻ tiếp theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: License Selector Lab */}
      {activeTab === 'license_lab' && (
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-100">
              Công Cụ Định Hướng Chọn Giấy Phép (License Selector)
            </h3>
            <p className="text-xs text-slate-400">
              Chọn mục tiêu của dự án để nhận khuyến nghị giấy phép tối ưu nhất cho bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                id: 'permissive',
                title: 'Tự Do Tối Đa (Permissive)',
                desc: 'Muốn code lan tỏa rộng nhất, cho phép thương mại hóa và đóng mã nguồn.',
                rec: 'MIT / Apache 2.0'
              },
              {
                id: 'copyleft',
                title: 'Bảo Vệ Tính Mở (Strong Copyleft)',
                desc: 'Muốn bất kỳ ai cải tiến hoặc phân phối phần mềm cũng bắt buộc phải mở mã nguồn.',
                rec: 'GPLv3'
              },
              {
                id: 'saas_protection',
                title: 'Chống Cloud "Ăn Cắp" (Network Copyleft)',
                desc: 'Muốn chống các ông lớn Cloud lấy code dựng dịch vụ SaaS mà không mở bản vá.',
                rec: 'AGPLv3'
              },
              {
                id: 'weak_copyleft',
                title: 'Thư Viện Liên Kết Động (Weak Copyleft)',
                desc: 'Mở mã nguồn thư viện nhưng cho phép ứng dụng đóng liên kết động (Dynamic Link).',
                rec: 'LGPLv3 / MPL 2.0'
              }
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => setProjectGoal(item.id as any)}
                className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                  projectGoal === item.id
                    ? 'bg-purple-950/40 border-purple-500 text-purple-200 ring-2 ring-purple-500/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-200">{item.title}</span>
                  <span className="text-xs font-mono font-bold text-purple-400">{item.rec}</span>
                </div>
                <p className="text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* License Detail Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Khuyến nghị giấy phép cho lựa chọn của bạn:
              </span>
              <span className="text-xs font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/40">
                {projectGoal === 'permissive' ? 'MIT hoặc Apache-2.0' : projectGoal === 'copyleft' ? 'GNU GPLv3' : projectGoal === 'saas_protection' ? 'GNU AGPLv3' : 'GNU LGPLv3 / MPL-2.0'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30 space-y-1">
                <span className="font-bold text-emerald-400 block">✓ Người dùng ĐƯỢC:</span>
                <p className="text-slate-300">
                  {projectGoal === 'permissive' ? 'Thương mại hóa, sửa đổi, phân phối, đóng mã nguồn dẫn xuất tùy ý.' : 'Sử dụng miễn phí, chỉnh sửa, phân phối lại, xem toàn bộ mã nguồn.'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/30 space-y-1">
                <span className="font-bold text-red-400 block">✗ Người dùng KHÔNG ĐƯỢC:</span>
                <p className="text-slate-300">
                  {projectGoal === 'permissive' ? 'Bỏ tên tác giả khỏi thông báo bản quyền, đòi hỏi tác giả bồi thường khi code bị lỗi.' : 'Đóng mã nguồn dẫn xuất khi phân phối cho khách hàng.'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-900/30 space-y-1">
                <span className="font-bold text-purple-400 block">★ Dự án tiêu biểu:</span>
                <p className="text-slate-300">
                  {projectGoal === 'permissive' ? 'React, Vue, Node.js, Kubernetes, VS Code, Tailwind CSS.' : projectGoal === 'copyleft' ? 'Linux Kernel, Git, Bash, Blender, GIMP.' : projectGoal === 'saas_protection' ? 'Grafana, Mastodon, Plausible, Nextcloud.' : 'VLC Media Player, Firefox (MPL).'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: PR Simulator */}
      {activeTab === 'pr_simulator' && (
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-100">
              Mô Phỏng Gửi Pull Request & Vượt Qua CI Quality Gate
            </h3>
            <p className="text-xs text-slate-400">
              Trải nghiệm quy trình gửi PR chuẩn kỹ sư quốc tế: Viết commit Conventional, mô tả PR và theo dõi GitHub Actions chạy test.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Tiêu đề Pull Request (Conventional Commit format):</label>
              <input
                type="text"
                value={prTitle}
                onChange={(e) => setPrTitle(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Mô tả PR (Tóm tắt thay đổi & Bằng chứng test):</label>
              <textarea
                value={prDescription}
                onChange={(e) => setPrDescription(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSimulatePR}
                disabled={ciStatus === 'running'}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white text-xs font-semibold cursor-pointer shadow-lg shadow-purple-900/30 transition-all disabled:opacity-50"
              >
                <span>{ciStatus === 'running' ? 'Đang kích hoạt GitHub Actions...' : 'Gửi Pull Request & Chạy CI Test'}</span>
              </button>
            </div>
          </div>

          {/* CI Checks Simulation Output */}
          {isPrSubmitted && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-xs font-mono text-slate-400">
                  GitHub Actions Quality Gate • Pipeline #1042
                </span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  ciStatus === 'running' ? 'bg-amber-500/20 text-amber-300 animate-pulse' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {ciStatus === 'running' ? '⏳ ĐANG CHẠY TEST...' : '✓ ALL CHECKS PASSED (+50 XP)'}
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-300">
                  <span>1. Linter & Formatting (ESLint / Prettier)</span>
                  <span className={ciStatus === 'passed' ? 'text-emerald-400' : 'text-amber-400'}>
                    {ciStatus === 'passed' ? '✓ Passed (0 warnings)' : 'Running...'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>2. TypeScript Strict Typecheck</span>
                  <span className={ciStatus === 'passed' ? 'text-emerald-400' : 'text-amber-400'}>
                    {ciStatus === 'passed' ? '✓ Passed (0 errors)' : 'Running...'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>3. Unit & Integration Tests (Ubuntu, macOS, Windows)</span>
                  <span className={ciStatus === 'passed' ? 'text-emerald-400' : 'text-amber-400'}>
                    {ciStatus === 'passed' ? '✓ 48 tests passed (100% coverage)' : 'Running...'}
                  </span>
                </div>
              </div>

              {ciStatus === 'passed' && (
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-xs text-emerald-200 flex items-center justify-between">
                  <span>🎉 Chúc mừng! PR của bạn đã sẵn sàng để Core Maintainer duyệt và Merge!</span>
                  <span className="font-bold text-amber-400">+50 XP</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Git OSS Cheatsheet */}
      {activeTab === 'git_cheatsheet' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Đồng bộ nhánh với Upstream (Không Merge rác)',
                cmd: 'git fetch upstream\ngit rebase upstream/main',
                desc: 'Nhấc các commit của bạn đặt lên đỉnh mới nhất của dự án gốc'
              },
              {
                title: 'Squash gộp 3 commit gần nhất làm 1',
                cmd: 'git rebase -i HEAD~3\n# Đổi dòng 2, 3 thành "squash" hoặc "fixup"',
                desc: 'Làm sạch lịch sử commit trước khi mở Pull Request'
              },
              {
                title: 'Đổi tên thông điệp commit vừa gõ',
                cmd: 'git commit --amend -m "feat(scope): new message"',
                desc: 'Sửa nhanh commit mới nhất nếu bị sai chính tả'
              },
              {
                title: 'Tạm cất code đang dở để đổi nhánh',
                cmd: 'git stash push -m "WIP auth logic"\ngit stash pop',
                desc: 'Cất các thay đổi chưa commit vào ngăn kéo an toàn'
              },
              {
                title: 'Kiểm tra nguồn gốc lỗi bằng Git Bisect',
                cmd: 'git bisect start\ngit bisect bad HEAD\ngit bisect good v1.0.0',
                desc: 'Tìm kiếm nhị phân commit gây ra lỗi tự động trong vài giây'
              },
              {
                title: 'Đẩy code đè lên fork sau khi rebase an toàn',
                cmd: 'git push --force-with-lease origin feat/branch',
                desc: 'Bảo vệ không vô tình ghi đè code nếu có ai khác đẩy lên remote'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">{item.title}</span>
                  <button
                    onClick={() => handleCopy(item.cmd, `git-${idx}`)}
                    className="text-slate-400 hover:text-slate-200 cursor-pointer"
                    title="Sao chép"
                  >
                    {copiedCode === `git-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="p-2.5 bg-slate-950 rounded-lg text-xs font-mono text-purple-300 overflow-x-auto">
                  <code>{item.cmd}</code>
                </pre>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
