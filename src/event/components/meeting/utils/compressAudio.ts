// utils/compressAudio.ts
import { FFmpeg } from '@ffmpeg/ffmpeg';

const ffmpeg = new FFmpeg();

export const compressAudio = async (blob: Blob): Promise<Blob> => {
  if (!ffmpeg.loaded) {
    await ffmpeg.load();
  }

  const inputData = await blob.arrayBuffer();
  await ffmpeg.writeFile('input.webm', new Uint8Array(inputData));

  await ffmpeg.exec([
    '-i', 'input.webm',
    '-c:a', 'libopus',
    '-b:a', '24k',
    'output.webm',
  ]);

  const data = await ffmpeg.readFile('output.webm');
  return new Blob([data.buffer], { type: 'audio/webm' });
};

export const shouldOfferCompression = (blob: Blob, duration: number): boolean => {
  if (!duration || !blob) return false;
  const actualSize = blob.size;
  const expectedCompressedSize = duration * 3000; // 24kbps = 3000 bytes/s
  return actualSize > expectedCompressedSize * 1.2; // Allow 20% buffer
};

