// src/global.d.ts (optional)
declare module '@ffmpeg/ffmpeg' {
  export class FFmpeg {
    load(): Promise<void>;
    loaded: boolean;
    writeFile(path: string, data: Uint8Array): Promise<void>;
    readFile(path: string): Promise<Uint8Array>;
    exec(args: string[]): Promise<void>;
  }
}
