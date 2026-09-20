import React, { useState } from 'react';
import { useAudioReader } from '../context/AudioReaderContext';
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  X, 
  Sliders,
  Sparkles
} from 'lucide-react';

export const AudioReaderBar: React.FC = () => {
  const {
    isPlaying,
    isPaused,
    currentChunkIndex,
    totalChunks,
    currentChunk,
    articleTitle,
    rate,
    pitch,
    availableVoices,
    selectedVoice,
    play,
    pause,
    resume,
    stop,
    nextChunk,
    prevChunk,
    setRate,
    setPitch,
    setVoice
  } = useAudioReader();

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // If nothing is playing or queued, don't show the bar
  if (!isPlaying && !isPaused && totalChunks === 0) {
    return null;
  }

  const progressPercent = totalChunks > 0 ? Math.round(((currentChunkIndex + 1) / totalChunks) * 100) : 0;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-3 animate-fadeIn">
      
      {/* Voice Settings Popover Modal */}
      {isSettingsOpen && (
        <div className="mb-2 p-4 rounded-xl bg-slate-900/98 backdrop-blur-md border border-slate-700 shadow-2xl text-slate-200 space-y-3.5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tùy Chỉnh Giọng Đọc Nữ & Ngữ Điệu</span>
            </div>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Voice Selector */}
          <div className="space-y-1">
            <label className="text-slate-400 block font-medium">Chọn Giọng Đọc:</label>
            <select
              value={selectedVoice?.name || ''}
              onChange={(e) => {
                const found = availableVoices.find(v => v.name === e.target.value);
                if (found) setVoice(found.voice);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-md px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500"
            >
              {availableVoices.map((v, idx) => (
                <option key={idx} value={v.name}>
                  {v.isVietnamese ? '🇻🇳 ' : '🌐 '}
                  {v.name} {v.isFemale ? '(Nữ)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Pitch Modulation (Lên xuống giọng / Độ trầm bổng) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-slate-300">
              <span>Độ Cao & Lên Xuống Giọng (Pitch):</span>
              <span className="font-mono text-amber-400">{pitch.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.5"
              step="0.05"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Trầm ấm (0.8x)</span>
              <span>Chuẩn nữ tự nhiên (1.12x)</span>
              <span>Trong trẻo (1.5x)</span>
            </div>
          </div>

          {/* Rate Speed */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-slate-300">
              <span>Tốc Độ Đọc (Speed):</span>
              <span className="font-mono text-amber-400">{rate.toFixed(2)}x</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[0.85, 1.0, 1.15, 1.3].map((r) => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={`flex-1 py-1 rounded border text-[11px] font-mono transition-colors cursor-pointer ${
                    Math.abs(rate - r) < 0.05
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {r}x
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Audio Bar */}
      <div className="p-3 rounded-xl bg-slate-950/95 backdrop-blur-md border border-slate-800 shadow-2xl space-y-2">
        
        {/* Top Info & Actions */}
        <div className="flex items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 animate-pulse">
              <Volume2 className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-slate-200 truncate text-[11px]">
                {articleTitle || 'Đang đọc bài học...'}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Đoạn {currentChunkIndex + 1} / {totalChunks} ({progressPercent}%)
              </div>
            </div>
          </div>

          {/* Controls Group */}
          <div className="flex items-center gap-1">
            <button
              onClick={prevChunk}
              disabled={currentChunkIndex === 0}
              className="p-1.5 text-slate-400 hover:text-slate-200 disabled:opacity-30 cursor-pointer"
              title="Đoạn trước"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            {isPlaying && !isPaused ? (
              <button
                onClick={pause}
                className="p-2 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer shadow-md"
                title="Tạm dừng"
              >
                <Pause className="w-4 h-4 fill-current" />
              </button>
            ) : (
              <button
                onClick={isPaused ? resume : play}
                className="p-2 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer shadow-md"
                title="Tiếp tục đọc"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </button>
            )}

            <button
              onClick={nextChunk}
              disabled={currentChunkIndex === totalChunks - 1}
              className="p-1.5 text-slate-400 hover:text-slate-200 disabled:opacity-30 cursor-pointer"
              title="Đoạn tiếp theo"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsSettingsOpen(prev => !prev)}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                isSettingsOpen ? 'bg-slate-800 text-amber-300' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Cài đặt giọng đọc & tốc độ"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={stop}
              className="p-1.5 text-slate-400 hover:text-red-400 cursor-pointer"
              title="Tắt trình đọc"
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Live Subtitle Caption */}
        {currentChunk && (
          <div className="px-2.5 py-1.5 rounded-md bg-slate-900/90 border border-slate-800 text-xs text-amber-200/90 leading-relaxed font-sans line-clamp-2">
            &ldquo;{currentChunk.text}&rdquo;
          </div>
        )}

        {/* Progress Line */}
        <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
          <div 
            className="bg-amber-500 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

      </div>

    </div>
  );
};
