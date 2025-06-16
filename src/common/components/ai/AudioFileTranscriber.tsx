import React, { useState } from 'react';

interface AudioFileTranscriberProps {
  onTranscriptionComplete: (text: string) => void;
}

const AudioFileTranscriber: React.FC<AudioFileTranscriberProps> = ({ onTranscriptionComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', 'whisper-1');

    try {
      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY || ''}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (result?.text) {
        onTranscriptionComplete(result.text);
      } else {
        setError('Failed to transcribe. Try again.');
        console.error("Whisper API error:", result);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError('Error uploading file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <h5>Upload Audio for Transcription</h5>
      <input
        type="file"
        accept=".wav,.mp3,.mp4,.aiff,.m4a"
        onChange={handleFileChange}
        disabled={uploading}
        className="form-control"
      />
      {uploading && <p className="text-info mt-2">Uploading and transcribing...</p>}
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
};

export default AudioFileTranscriber;
