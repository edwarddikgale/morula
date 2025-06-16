import React, { useEffect, useRef, useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { Transcription } from 'event/types/Transcription';
import { transcriptionService } from 'event/services/transcriptionService';
import { ScrumEventSummaryResponse, SummaryPoint } from './types/SummaryPoint';
import { Impediment } from './types';
import RecordingControls from './RecordingControls';
import TranscriptionList from './TranscriptionList';
import Description from './Description';
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
import lamejs from 'lamejs';

import "./styles/meeting-transcriber.css";
import AudioFileTranscriber from 'common/components/ai/AudioFileTranscriber';

const DISPLAY_CHAR_LIMIT = 75;
export const API_URL = process.env.REACT_APP_API_BASE_URL;

interface MeetingTranscriberProps {
  onStop?: (transcribedText: string) => void;
  onSummarize?: (data: ScrumEventSummaryResponse) => void;
  eventId?: string;
}

const MeetingTranscriber = ({ eventId, onStop, onSummarize }: MeetingTranscriberProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcribedText, setTranscribedText] = useState('');
  const [transcription, setTranscription] = useState<Transcription | null>(null);
  const [summary, setSummary] = useState<SummaryPoint[]>([]);
  const [impediments, setImpediments] = useState<Impediment[]>([]);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const waveSurferRef = useRef<any>(null);
  const waveContainerRef = useRef<HTMLDivElement>(null);

  const MAX_RECORDING_TIME_MS = 15 * 60 * 1000;

  useEffect(() => {
    if (isRecording && waveContainerRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: waveContainerRef.current,
        //container: '#waveform',
        waveColor: '#4db8ff',              // Light blue
        progressColor: '#0077ff',          // Deeper blue for progress
        cursorColor: '#ffffff',            // White cursor
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

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    audioChunksRef.current = [];
  
    mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
  
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
  
      const formData = new FormData();
      formData.append('file', audioBlob, 'meeting.webm');
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
          setTranscribedText(result.text);
          if (onStop) onStop(result.text);
        } else {
          console.error("Whisper transcription failed", result);
        }
      } catch (error) {
        console.error("Error sending audio to Whisper:", error);
      }
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

  const convertToMp3 = (arrayBuffer: ArrayBuffer): Blob => {
    const wav = lamejs.WavHeader.readHeader(new DataView(arrayBuffer));
    const samples = new Int16Array(arrayBuffer, wav.dataOffset, wav.dataLen / 2);
    const mp3enc = new lamejs.Mp3Encoder(wav.channels, wav.sampleRate, 128);
    const mp3Data = [mp3enc.encodeBuffer(samples), mp3enc.flush()].flat();
    return new Blob(mp3Data, { type: 'audio/mp3' });
  };

  const handleRecordingToggle = () => {
    if (isRecording) stopRecording();
    else startRecording();
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
      if (onSummarize) onSummarize(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSummary(false);
    }
  };

    const saveTranscript = async () => {
      const record = transcription? 
      {...transcription, raw: transcribedText}: 
      {
        eventId: eventId,
        timeZone: 'CET',
        language: 'en',
        title: `transcripton for event ${eventId}`,
        raw: transcribedText,
      }
      setIsSaving(true);
      if(!transcription?._id){
        const response = await transcriptionService.createTranscription(record);
        setTranscription(response);
        setIsSaving(false);
      }
      else{
        const response = await transcriptionService.updateTranscription(transcription?._id, record);
        setTranscription(response);
        setIsSaving(false);
      }
  
  }

  const countdownRenderer = ({ minutes, seconds, completed }: any) => {
    if (completed) return <h4 className="text-danger">Time's up!</h4>;
    return <h4 className="text-danger">{zeroPad(minutes)}:{zeroPad(seconds)}</h4>;
  };

  return (
    <div className="container text-center mt-4">
      <h3>Meeting Transcriber</h3>
      <RecordingControls
        isRecording={isRecording}
        handleRecordingToggle={handleRecordingToggle}
        timerStartTime={timerStartTime}
        countdownRenderer={countdownRenderer}
      />

      <div ref={waveContainerRef} className="my-3" style={{ height: '100px' }} />

      <ul className="list-unstyled mt-4">
        {transcribedText && (
          <li className="text-muted">
            {transcribedText.length > DISPLAY_CHAR_LIMIT ? transcribedText.slice(-DISPLAY_CHAR_LIMIT) : transcribedText}
          </li>
        )}
      </ul>

      <AudioFileTranscriber
        onTranscriptionComplete={(text) => {
          setTranscribedText(text);
          if (onStop) onStop(text);
        }}
      />  

      {!isRecording && transcribedText && (
        <Description content={transcribedText} setContent={setTranscribedText} />
      )}

      <button
        className="btn btn-primary mt-4"
        onClick={fetchSummary}
        disabled={(!transcription) || loadingSummary || isSaving}
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