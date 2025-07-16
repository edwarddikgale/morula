import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Edit3, Trash } from 'lucide-react';
import './styles/MeetingRecorder.css';
import RecordingList from './RecordingList';
import { loadCachedRecordings } from './utils/loadCachedRecordings';

interface Recording {
  id: string;
  title: string;
  blob: Blob;
  createdAt: Date;
}

const formatDate = (date: Date) =>
  `meeting-record-${date.toLocaleDateString('en-CA')}-${date
    .toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    .replace(':', '-')}`;

const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject('Failed to read blob');
    };
    reader.readAsDataURL(blob);
  });

const base64ToBlob = async (base64: string): Promise<Blob> => {
  const res = await fetch(base64);
  return await res.blob();
};

const MeetingRecorder: React.FC = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [editableTitles, setEditableTitles] = useState<{ [id: string]: boolean }>({});
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
      loadCachedRecordings().then(setRecordings).catch((e) => {
        console.warn('Failed to load cached recordings:', e);
      });
  }, []);

  useEffect(() => {
    const saveRecordings = async () => {
      const serializable = await Promise.all(
        recordings.map(async r => ({
          id: r.id,
          title: r.title,
          createdAt: r.createdAt.toISOString(),
          base64: await blobToBase64(r.blob),
        }))
      );
      localStorage.setItem('meeting-recordings', JSON.stringify(serializable));
    };

    if (recordings.length > 0) saveRecordings();
  }, [recordings]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      const newChunks: Blob[] = [];

      recorder.ondataavailable = e => {
        if (e.data.size > 0) newChunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(newChunks, { type: 'audio/webm' });
        const createdAt = new Date();
        const id = `${createdAt.getTime()}`;
        const title = formatDate(createdAt);
        const newRecording: Recording = { id, title, blob, createdAt };
        setRecordings(prev => [newRecording, ...prev]);
        stream.getTracks().forEach(t => t.stop());
        setChunks([]);
      };

      recorder.start();
      setChunks(newChunks);
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (err) {
      alert('Microphone access denied or unavailable.');
      console.error(err);
    }
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setRecording(false);
  };

  const updateTitle = (id: string, newTitle: string) => {
    setRecordings(prev =>
      prev.map(r => (r.id === id ? { ...r, title: newTitle } : r))
    );
  };

  const toggleEdit = (id: string) => {
    setEditableTitles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const deleteRecording = (id: string) => {
    setRecordings(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Meeting Recorder</h2>

      <div className="d-flex align-items-center gap-3 mb-3">
        {!recording ? (
          <button
            onClick={startRecording}
            className="btn btn-success btn-lg d-flex align-items-center record-button"
          >
            <Mic className="me-2" />
            Rec
          </button>
        ) : (
          <>
            <button
              onClick={stopRecording}
              className="btn btn-danger btn-lg d-flex align-items-center record-button animate-pulse"
            >
              <Square className="me-2" />
              Stop
            </button>
            <div className="d-flex align-items-end" style={{ height: '24px' }}>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="wave-bar"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <h5 className="mb-3">Recordings</h5>
      <RecordingList
        recordings={recordings}
        editableTitles={editableTitles}
        onUpdateTitle={updateTitle}
        onToggleEdit={toggleEdit}
        onDelete={deleteRecording}
        onSelect={(rec) => console.log('Recording selected:', rec)} // ⬅️ emits recordingSelected
      />
    </div>
  );
};

export default MeetingRecorder;
