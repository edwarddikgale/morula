// src/react-hook-speech-to-text.d.ts
declare module 'react-hook-speech-to-text' {
    export interface SpeechToTextResult {
      timestamp: number;
      transcript: string;
    }
  
    export interface UseSpeechToText {
      error: string | null;
      interimResult: string | null;
      isRecording: boolean;
      results: SpeechToTextResult[];
      startSpeechToText: () => void;
      stopSpeechToText: () => void;
    }
  
    export interface UseSpeechToTextOptions {
      continuous?: boolean;
      useLegacyResults?: boolean;
      googleApiKey?: string;
      crossBrowser?: boolean;
    }
  
    export default function useSpeechToText(options?: UseSpeechToTextOptions): UseSpeechToText;
  }
  