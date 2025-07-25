import React, { useEffect, useRef, useState } from 'react';
import { Transcription } from 'event/types/Transcription';
import { transcriptionService } from 'event/services/transcriptionService';
import { ScrumEventSummaryResponse, SummaryPoint } from '../types/SummaryPoint';
import { Impediment } from '../types';
import RecordingControls from '../RecordingControls';
import TranscriptionList from '../TranscriptionList';
import Description from '../Description';
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
import lamejs from 'lamejs';
import Countdown, { zeroPad } from 'react-countdown';

import "../styles/meeting-transcriber.css";
import AudioFileTranscriber from 'common/components/ai/AudioFileTranscriber';
import RecordingList from './RecordingList';
import { loadCachedRecordings } from './utils/loadCachedRecordings';
import { Recording } from './types/Recording';
import { transcribeBlob } from './utils/transcribeBlob';
import TranscriptionLoader from './TranscriptionLoader';

const DISPLAY_CHAR_LIMIT = 75;
export const API_URL = process.env.REACT_APP_API_BASE_URL;

interface MeetingTranscriberProps {
  onStop?: (transcribedText: string) => void;
  onSummarize?: (data: ScrumEventSummaryResponse) => void;
  eventId?: string;
}

const MeetingTranscriber = ({ eventId, onStop, onSummarize }: MeetingTranscriberProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcribedText, setTranscribedText] = useState('');
  const [transcription, setTranscription] = useState<Transcription | null>(null);
  const [summary, setSummary] = useState<SummaryPoint[]>([]);
  const [impediments, setImpediments] = useState<Impediment[]>([]);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const waveSurferRef = useRef<any>(null);
  const waveContainerRef = useRef<HTMLDivElement>(null);

  const MAX_RECORDING_TIME_MS = 15 * 60 * 1000;

  useEffect(() => {
    loadCachedRecordings().then(setRecordings).catch(console.warn);
  }, []);

  useEffect(() => {
    if (isRecording && waveContainerRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: waveContainerRef.current,
        waveColor: '#4db8ff',
        progressColor: '#0077ff',
        cursorColor: '#ffffff',
        cursorWidth: 2,
        height: 100,
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        responsive: true,
        interact: false,
        normalize: true,
        plugins: [MicrophonePlugin.create()]
      });
      waveSurferRef.current.microphone.start();
    } else if (!isRecording && waveSurferRef.current) {
      waveSurferRef.current.destroy();
    }
  }, [isRecording]);

  const handleRecordingComplete = async (blob: Blob) => {
    setIsTranscribing(true);
    try {
      const result = await transcribeBlob(blob);
      if (result?.text) {
        setTranscribedText(result.text);
        onStop?.(result.text);
      }
    } catch (err) {
      console.error('Transcription error:', err);
    } finally {
      setIsTranscribing(false);
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      handleRecordingComplete(audioBlob);
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
    setTimerStartTime(Date.now() + MAX_RECORDING_TIME_MS);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleRecordingToggle = () => {
    isRecording ? stopRecording() : startRecording();
  };

  const handleRecordingSelect = async (recording: Recording) => {
    handleRecordingComplete(recording.blob);
  };

  const fetchSummary = async () => {
    setLoadingSummary(true);
    try {
      const response = await fetch(`${API_URL}/scrum/summarise-event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: transcribedText, eventType: 'daily' })
      });
      const data: ScrumEventSummaryResponse = await response.json();
      setSummary(data.summary);
      setImpediments(data.impediments);
      onSummarize?.(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSummary(false);
    }
  };

  const saveTranscript = async () => {
    const record = transcription ?
      { ...transcription, raw: transcribedText } :
      {
        eventId,
        timeZone: 'CET',
        language: 'en',
        title: `transcripton for event ${eventId}`,
        raw: transcribedText,
      };

    setIsSaving(true);
    try {
      const response = transcription?._id
        ? await transcriptionService.updateTranscription(transcription._id, record)
        : await transcriptionService.createTranscription(record);
      setTranscription(response);
    } catch (e) {
      console.error('Saving error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const countdownRenderer = ({ minutes, seconds, completed }:any) => {
    if (completed) return <h4 className="text-danger">Time's up!</h4>;
    return <h4 className="text-danger">{zeroPad(minutes)}:{zeroPad(seconds)}</h4>;
  };

  const handleReplaceRecording = (updated: Recording) => {
    setRecordings((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
  };

  return (
    <div className="container text-center mt-2">
      <h3>Meeting Transcriber</h3>

      <RecordingControls
        isRecording={isRecording}
        handleRecordingToggle={handleRecordingToggle}
        timerStartTime={timerStartTime}
        countdownRenderer={countdownRenderer}
      />

      <div ref={waveContainerRef} className="my-3" style={{ height: '100px' }} />

      {isTranscribing && <TranscriptionLoader />}

      <ul className="list-unstyled mt-4">
        {transcribedText && (
          <li className="text-muted">
            {transcribedText.length > DISPLAY_CHAR_LIMIT ? transcribedText.slice(-DISPLAY_CHAR_LIMIT) : transcribedText}
          </li>
        )}
      </ul>

      <h3>Select Existing Recording</h3>
      <RecordingList
        recordings={recordings}
        editableTitles={{}}
        onSelect={handleRecordingSelect}
        onReplaceRecording={handleReplaceRecording}
      />

      <AudioFileTranscriber
        onTranscriptionComplete={(text) => {
          setTranscribedText(text);
          onStop?.(text);
        }}
      />

      {!isRecording && transcribedText && (
        <Description content={transcribedText} setContent={setTranscribedText} />
      )}

      <button
        className="btn btn-primary mt-4"
        onClick={fetchSummary}
        disabled={!transcription || loadingSummary || isSaving}
      >
        {loadingSummary ? 'Generating Summary...' : 'Summarize'}
      </button>

      <button
        className="btn btn-primary mt-4 py-2 ms-2"
        onClick={saveTranscript}
        disabled={(!transcribedText && !transcription) || loadingSummary || isSaving}
      >
        {isSaving ? 'Saving Transcript...' : 'Save'}
      </button>

      {summary.length > 0 && (
        <div className="mt-5 text-start">
          <h4>Meeting Notes Summary</h4>
          {summary.map((point, i) => (
            <div key={i} className="mb-3">
              <h5>{point.title}</h5>
              <ul>{point.points.map((p, j) => <li key={j}>{p}</li>)}</ul>
            </div>
          ))}
        </div>
      )}

      {impediments.length > 0 && (
        <div className="mt-5 text-start">
          <h4>Impediments</h4>
          {impediments.map((item, i) => (
            <div key={i} className="border rounded p-3 mb-3">
              <h5>{item.title}</h5>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Status:</strong> {item.status}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {!isRecording && eventId && (
        <TranscriptionList eventId={eventId} onSelect={setTranscription} />
      )}
    </div>
  );
};

export default MeetingTranscriber;
