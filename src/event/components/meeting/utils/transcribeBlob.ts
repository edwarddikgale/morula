export const transcribeBlob = async (blob: Blob): Promise<{ text: string }> => {
  const formData = new FormData();
  formData.append('file', blob, 'meeting.webm');
  formData.append('model', 'whisper-1');

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY || ''}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || !result.text) {
    throw new Error(result?.error?.message || 'Transcription failed.');
  }

  return result;
};
