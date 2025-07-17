export const calculateAudioDuration = async (blob: Blob): Promise<number> => {
  return new Promise<number>((resolve) => {
    const audio = document.createElement('audio');
    audio.src = URL.createObjectURL(blob);
    audio.addEventListener('loadedmetadata', () => {
      if (audio.duration === Infinity) {
        audio.currentTime = Number.MAX_SAFE_INTEGER;
        audio.ontimeupdate = () => {
          audio.ontimeupdate = null;
          resolve(audio.duration);
          audio.currentTime = 0;
        };
      } else {
        resolve(audio.duration);
      }
    });
  });
};