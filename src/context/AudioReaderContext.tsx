import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { ttsEngine, SpeechChunk, VoiceOption, splitTextIntoExpressiveChunks } from '../utils/textToSpeech';

export interface AudioReaderContextType {
  isPlaying: boolean;
  isPaused: boolean;
  currentChunkIndex: number;
  totalChunks: number;
  currentChunk: SpeechChunk | null;
  articleTitle: string;
  rate: number;
  pitch: number;
  availableVoices: VoiceOption[];
  selectedVoice: SpeechSynthesisVoice | null;
  
  // Actions
  startReadingArticle: (title: string, rawTextOrSections: string | { heading: string; content: string; bulletPoints?: string[] }[]) => void;
  play: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  nextChunk: () => void;
  prevChunk: () => void;
  setRate: (rate: number) => void;
  setPitch: (pitch: number) => void;
  setVoice: (voice: SpeechSynthesisVoice) => void;
}

const AudioReaderContext = createContext<AudioReaderContextType | undefined>(undefined);

export const AudioReaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [chunks, setChunks] = useState<SpeechChunk[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState<number>(0);
  const [articleTitle, setArticleTitle] = useState<string>('');
  const [rate, setRateState] = useState<number>(ttsEngine.getRate());
  const [pitch, setPitchState] = useState<number>(ttsEngine.getPitch());
  const [availableVoices] = useState<VoiceOption[]>(() => ttsEngine.getAvailableVoices());
  const [selectedVoice, setSelectedVoiceState] = useState<SpeechSynthesisVoice | null>(() => ttsEngine.getCurrentVoice());

  const activeIndexRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const playChunkRef = useRef<(index: number, chunksList: SpeechChunk[]) => void>(() => {});

  useEffect(() => {
    activeIndexRef.current = currentChunkIndex;
  }, [currentChunkIndex]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const playChunkAtIndex = useCallback((index: number, chunksList: SpeechChunk[]) => {
    if (index < 0 || index >= chunksList.length) {
      setIsPlaying(false);
      setIsPaused(false);
      ttsEngine.cancel();
      return;
    }

    setCurrentChunkIndex(index);
    const chunk = chunksList[index];

    ttsEngine.speakChunk(
      chunk,
      () => {
        setIsPlaying(true);
        setIsPaused(false);
      },
      () => {
        // Auto-advance to next chunk with pleasant cadence pause
        if (isPlayingRef.current && activeIndexRef.current < chunksList.length - 1) {
          const nextIdx = activeIndexRef.current + 1;
          setTimeout(() => {
            if (isPlayingRef.current) {
              playChunkRef.current(nextIdx, chunksList);
            }
          }, 350);
        } else {
          setIsPlaying(false);
          setIsPaused(false);
        }
      },
      (err) => {
        console.warn('TTS playback issue:', err);
        setIsPlaying(false);
        setIsPaused(false);
      }
    );
  }, []);

  useEffect(() => {
    playChunkRef.current = playChunkAtIndex;
  }, [playChunkAtIndex]);

  const startReadingArticle = useCallback((
    title: string,
    rawTextOrSections: string | { heading: string; content: string; bulletPoints?: string[] }[]
  ) => {
    ttsEngine.cancel();

    let assembledChunks: SpeechChunk[] = [];

    if (typeof rawTextOrSections === 'string') {
      assembledChunks = splitTextIntoExpressiveChunks(rawTextOrSections, title);
    } else if (Array.isArray(rawTextOrSections)) {
      if (title) {
        assembledChunks.push({
          text: title + '.',
          heading: title,
          isHeading: true
        });
      }

      for (const section of rawTextOrSections) {
        if (section.heading) {
          assembledChunks.push({
            text: section.heading + ':',
            heading: section.heading,
            isHeading: true
          });
        }
        if (section.content) {
          const contentChunks = splitTextIntoExpressiveChunks(section.content);
          assembledChunks.push(...contentChunks);
        }
        if (section.bulletPoints && section.bulletPoints.length > 0) {
          for (const bp of section.bulletPoints) {
            assembledChunks.push({ text: bp });
          }
        }
      }
    }

    if (assembledChunks.length === 0) return;

    setArticleTitle(title);
    setChunks(assembledChunks);
    setCurrentChunkIndex(0);
    setIsPlaying(true);
    setIsPaused(false);

    playChunkAtIndex(0, assembledChunks);
  }, [playChunkAtIndex]);

  const play = useCallback(() => {
    if (chunks.length > 0) {
      if (isPaused) {
        ttsEngine.resume();
        setIsPaused(false);
        setIsPlaying(true);
      } else {
        playChunkAtIndex(currentChunkIndex, chunks);
      }
    }
  }, [chunks, isPaused, currentChunkIndex, playChunkAtIndex]);

  const pause = useCallback(() => {
    ttsEngine.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    ttsEngine.resume();
    setIsPaused(false);
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    ttsEngine.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentChunkIndex(0);
  }, []);

  const nextChunk = useCallback(() => {
    if (currentChunkIndex < chunks.length - 1) {
      const nextIdx = currentChunkIndex + 1;
      playChunkAtIndex(nextIdx, chunks);
    }
  }, [currentChunkIndex, chunks, playChunkAtIndex]);

  const prevChunk = useCallback(() => {
    if (currentChunkIndex > 0) {
      const prevIdx = currentChunkIndex - 1;
      playChunkAtIndex(prevIdx, chunks);
    }
  }, [currentChunkIndex, chunks, playChunkAtIndex]);

  const setRate = useCallback((newRate: number) => {
    ttsEngine.setRate(newRate);
    setRateState(newRate);
  }, []);

  const setPitch = useCallback((newPitch: number) => {
    ttsEngine.setPitch(newPitch);
    setPitchState(newPitch);
  }, []);

  const setVoice = useCallback((voice: SpeechSynthesisVoice) => {
    ttsEngine.setVoice(voice);
    setSelectedVoiceState(voice);
  }, []);

  return (
    <AudioReaderContext.Provider
      value={{
        isPlaying,
        isPaused,
        currentChunkIndex,
        totalChunks: chunks.length,
        currentChunk: chunks[currentChunkIndex] || null,
        articleTitle,
        rate,
        pitch,
        availableVoices,
        selectedVoice,
        startReadingArticle,
        play,
        pause,
        resume,
        stop,
        nextChunk,
        prevChunk,
        setRate,
        setPitch,
        setVoice
      }}
    >
      {children}
    </AudioReaderContext.Provider>
  );
};

export const useAudioReader = () => {
  const context = useContext(AudioReaderContext);
  if (!context) {
    throw new Error('useAudioReader must be used within an AudioReaderProvider');
  }
  return context;
};
