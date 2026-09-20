// Text-to-Speech Engine with Vietnamese Female Voice Optimization & Expressive Prosody

export interface SpeechChunk {
  text: string;
  heading?: string;
  isHeading?: boolean;
}

export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
  isFemale: boolean;
  isVietnamese: boolean;
}

// Extract natural sentences and clauses with expressive breathing markers
export function splitTextIntoExpressiveChunks(rawText: string, headingTitle?: string): SpeechChunk[] {
  const chunks: SpeechChunk[] = [];

  if (headingTitle && headingTitle.trim()) {
    chunks.push({
      text: headingTitle.trim() + '.',
      heading: headingTitle.trim(),
      isHeading: true
    });
  }

  // Clean and split text by paragraphs, colons, and sentence delimiters
  const paragraphs = rawText.split(/\n+/);

  for (const para of paragraphs) {
    const cleanedPara = para.trim();
    if (!cleanedPara) continue;

    // Split by sentence boundaries (. ! ?) and colons while preserving structure
    const sentenceRegex = /[^.!?:]+[.!?:]+/g;
    const matches = cleanedPara.match(sentenceRegex);

    if (matches && matches.length > 0) {
      for (const s of matches) {
        const trimmed = s.trim();
        if (trimmed.length > 0) {
          chunks.push({ text: trimmed });
        }
      }
    } else {
      chunks.push({ text: cleanedPara });
    }
  }

  return chunks;
}

export class TTSEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private pitch: number = 1.12; // Natural sweet female pitch
  private rate: number = 0.98;  // Natural expressive cadence
  private isSpeaking: boolean = false;
  private isPaused: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  public loadVoices(): VoiceOption[] {
    if (!this.synth) return [];
    this.voices = this.synth.getVoices();

    const formattedVoices: VoiceOption[] = this.voices.map(v => {
      const nameLower = v.name.toLowerCase();
      const langLower = v.lang.toLowerCase();
      const isVi = langLower.includes('vi') || nameLower.includes('vietnam') || nameLower.includes('tiếng việt');
      
      // Heuristic for female voices (Microsoft HoaiMy, Google tiếng Việt, Linh, Mai, Female, Natural)
      const isFemale = 
        nameLower.includes('hoaimy') ||
        nameLower.includes('linh') ||
        nameLower.includes('mai') ||
        nameLower.includes('female') ||
        nameLower.includes('cô gái') ||
        nameLower.includes('natural') ||
        nameLower.includes('google') ||
        (!nameLower.includes('nam') && !nameLower.includes('male') && !nameLower.includes('anh'));

      return {
        voice: v,
        name: v.name,
        lang: v.lang,
        isFemale,
        isVietnamese: isVi
      };
    });

    // Auto-select best female Vietnamese voice
    if (!this.selectedVoice && formattedVoices.length > 0) {
      const bestViFemale = formattedVoices.find(v => v.isVietnamese && v.isFemale);
      const anyVi = formattedVoices.find(v => v.isVietnamese);
      const anyFemale = formattedVoices.find(v => v.isFemale);
      
      this.selectedVoice = (bestViFemale || anyVi || anyFemale || formattedVoices[0]).voice;
    }

    return formattedVoices;
  }

  public getAvailableVoices(): VoiceOption[] {
    return this.loadVoices();
  }

  public setVoice(voice: SpeechSynthesisVoice) {
    this.selectedVoice = voice;
  }

  public setPitch(pitch: number) {
    this.pitch = Math.max(0.5, Math.min(2.0, pitch));
  }

  public setRate(rate: number) {
    this.rate = Math.max(0.5, Math.min(2.0, rate));
  }

  public getPitch(): number {
    return this.pitch;
  }

  public getRate(): number {
    return this.rate;
  }

  public getCurrentVoice(): SpeechSynthesisVoice | null {
    return this.selectedVoice;
  }

  public speakChunk(
    chunk: SpeechChunk,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: unknown) => void
  ) {
    if (!this.synth) return;

    this.cancel();

    // Enhance emphasis and cadence for headings vs standard body text
    let enhancedText = chunk.text;
    
    // Add micro pause tokens if needed
    const utterance = new SpeechSynthesisUtterance(enhancedText);
    
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
      utterance.lang = this.selectedVoice.lang || 'vi-VN';
    } else {
      utterance.lang = 'vi-VN';
    }

    // Dynamic pitch modulation for expressive cadence
    if (chunk.isHeading) {
      // Slightly higher pitch and slower rate for authoritative title reading
      utterance.pitch = this.pitch * 1.06;
      utterance.rate = this.rate * 0.92;
    } else {
      // Natural expressive conversational pitch
      utterance.pitch = this.pitch;
      utterance.rate = this.rate;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      this.isPaused = false;
      if (onError) onError(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
    }
  }

  public resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }

  public cancel() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
    }
  }
}

// Global Singleton Instance
export const ttsEngine = new TTSEngine();
