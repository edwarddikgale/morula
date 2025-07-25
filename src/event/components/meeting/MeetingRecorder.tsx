import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Edit3, Trash } from 'lucide-react';
import './styles/MeetingRecorder.css';
import RecordingList from './RecordingList';
import { saveRecordingToDB, loadRecordingsFromDB, deleteRecordingFromDB } from './utils/localDb';
import { Recording } from './types/Recording';
import { calculateAudioDuration } from './utils/calculateAudioDuration';
import { compressAudio } from './utils/compressAudio';
import { Spinner } from 'react-bootstrap';


const formatDate = (date: Date) =>
  `meeting-record-${date.toLocaleDateString('en-CA')}-${date
    .toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    .replace(':', '-')}`;

const MeetingRecorder: React.FC = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [editableTitles, setEditableTitles] = useState<{ [id: string]: boolean }>({});
  const streamRef = useRef<MediaStream | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadRecordingsFromDB()
      .then(setRecordings)
      .catch((e) => {
        console.warn('Failed to load recordings from IndexedDB:', e);
      });
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      const newChunks: Blob[] = [];

      recorder.ondataavailable = e => {
        if (e.data.size > 0) newChunks.push(e.data);
      };

      recorder.onstop = async () => {
        setIsSaving(true); // show spinner
        try {
          const originalBlob = new Blob(newChunks, { type: 'audio/webm' });
          const createdAt = new Date();
          const id = `${createdAt.getTime()}`;
          const title = formatDate(createdAt);

          const compressedBlob = await compressAudio(originalBlob);
          const duration = await calculateAudioDuration(compressedBlob);

          const newRecording: Recording = {
            id,
            title,
            blob: compressedBlob,
            createdAt,
            duration,
          };

          await saveRecordingToDB(newRecording);
          setRecordings(prev => [newRecording, ...prev]);
        } catch (e) {
          console.error('Failed to save recording:', e);
        } finally {
          stream.getTracks().forEach(t => t.stop());
          setChunks([]);
          setIsSaving(false); // hide spinner
        }
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
      prev.map(r => {
        if (r.id === id) {
          const updated = { ...r, title: newTitle };
          saveRecordingToDB(updated);
          return updated;
        }
        return r;
      })
    );
  };

  const toggleEdit = (id: string) => {
    setEditableTitles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const deleteRecording = (id: string) => {
    setRecordings(prev => prev.filter(r => r.id !== id));
    deleteRecordingFromDB(id);
  };

  const replaceRecording = async (updated: Recording) => {
    // Update IndexedDB
    await saveRecordingToDB(updated);

    // Update state
    setRecordings(prev =>
      prev.map(r => (r.id === updated.id ? updated : r))
    );
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

      {isSaving && (
        <div className="d-flex align-items-center gap-2 text-muted">
          <Spinner animation="border" variant="secondary" size="sm" className="custom-spinner" />
          <span>Saving recording...</span>
        </div>
      )}

      <h5 className="mb-3">Recordings</h5>
      <RecordingList
        recordings={recordings}
        editableTitles={editableTitles}
        onUpdateTitle={updateTitle}
        onToggleEdit={toggleEdit}
        onDelete={deleteRecording}
        onReplaceRecording={replaceRecording}
      />
    </div>
  );
};

export default MeetingRecorder;
