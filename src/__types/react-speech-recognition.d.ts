declare module 'react-speech-recognition' {
    export interface SpeechRecognitionOptions {
      continuous?: boolean;
      language?: string;
    }
  
    export interface UseSpeechRecognition {
      transcript: string;
      listening: boolean;
      resetTranscript: () => void;
      browserSupportsSpeechRecognition: boolean;
      isMicrophoneAvailable: boolean;
      startListening: (options?: SpeechRecognitionOptions) => void;
      stopListening: () => void;
    }
  
    export function useSpeechRecognition(): UseSpeechRecognition;
  
    export interface SpeechRecognition {
      startListening: (options?: SpeechRecognitionOptions) => void;
      stopListening: () => void;
    }
  
    const SpeechRecognition: SpeechRecognition;
  
    export default SpeechRecognition;
  }
  