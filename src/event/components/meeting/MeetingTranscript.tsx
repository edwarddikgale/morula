import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import Countdown, { zeroPad } from 'react-countdown';
import RecordingControls from '../RecordingControls';

import '../styles/meeting-summary.css';
import { Impediment } from '../types';
import { ScrumEventSummaryResponse, SummaryPoint } from '../types/SummaryPoint';
import { Transcription } from 'event/types/Transcription';
import { transcriptionService } from 'event/services/transcriptionService';
import Description from '../Description';
import TranscriptionList from '../TranscriptionList';

export const API_URL = process.env.REACT_APP_API_BASE_URL;
const DISPLAY_CHAR_LIMIT = 75;

interface MeetingTranscriptProps {
  onStop?: (transcribedText: string) => void;
  onSummarize?: (data: ScrumEventSummaryResponse) => void;
  eventId?: string;
}

const MeetingTranscript = ({ eventId, onStop, onSummarize }: MeetingTranscriptProps) => {
  const [summary, setSummary] = useState<SummaryPoint[]>([]);
  const [impediments, setImpediments] = useState<Impediment[]>([]);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [durationInMinutes, setDurationInMinutes] = useState<number>(15); // Default duration
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);
  const [transcription, setTranscription] = useState<Transcription | null>(null);
  const [transcriptRaw, setTranscriptRaw] = useState<string | undefined>();

  const {
    transcript,
    listening: isRecording,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const MAX_RECORDING_TIME_MS = durationInMinutes * 60 * 1000; //15 min

  useEffect(() => {
    setTranscriptRaw(transcript);
  }, [transcript]);

  useEffect(() => {
    if(transcription){
      setTranscriptRaw(transcription?.raw);
    }
  }, [transcription]);

  useEffect(() => {
    if (isRecording) {
      setTimerStartTime(Date.now() + MAX_RECORDING_TIME_MS);
    }
  }, [isRecording, MAX_RECORDING_TIME_MS]);

  const handleRecordingToggle = () => {
    if (isRecording) {
      SpeechRecognition.stopListening();
      if(onStop){
        onStop(transcript);
      }
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const fetchSummary = async () => {
    setLoadingSummary(true);
    try {
      const response = await fetch(`${API_URL}/scrum/summarise-event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: transcriptRaw, eventType: 'daily' }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch summary!');
      }

      const data: ScrumEventSummaryResponse = await response.json();
      if(data){
        setSummary(data.summary);
        setImpediments(data.impediments);

        if (onSummarize) {
            const summaryData = transcription? {...data, transcriptionId: transcription?._id!}: data;
            onSummarize(summaryData);
        }
      }

    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoadingSummary(false);
    }
  };

  const saveTranscript = async () => {
    const record = transcription? 
    {...transcription, raw: transcriptRaw}: 
    {
      eventId: eventId,
      timeZone: 'CET',
      language: 'en',
      title: `transcripton for event ${eventId}`,
      raw: transcriptRaw,
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

  const handleTranscriptionSelect = (transcription: Transcription) =>{
    setTranscription(transcription);
  }

  const countdownRenderer = ({ minutes, seconds, completed }: { minutes: number; seconds: number; completed: boolean }) => {
    if (completed) {
      //SpeechRecognition.stopListening(); // Stop recording when timer reaches 0
      return <h4 className="text-danger">Time's up!</h4>;
    }

    return (
      <h4 className="text-danger">
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </h4>
    );
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser doesn't support speech recognition.</p>;
  }

  return (
    <div className="container text-center mt-4">
      <h3 className="mb-4">Meeting Transcriptor</h3>

      <RecordingControls
        isRecording={isRecording}
        handleRecordingToggle={handleRecordingToggle}
        timerStartTime={timerStartTime}
        countdownRenderer={countdownRenderer}
      />

      <ul className="mt-4 list-unstyled">
        {transcript && (
          <li className="text-muted">
            {transcript.length > DISPLAY_CHAR_LIMIT
              ? transcript.slice(-DISPLAY_CHAR_LIMIT)
              : transcript}
          </li>
        )}
      </ul>

      {!isRecording && transcriptRaw && 
        <Description content={transcriptRaw} setContent={setTranscriptRaw} />
      }

      <button
        className="btn btn-primary mt-4 py-2"
        onClick={fetchSummary}
        disabled={(!transcription) || loadingSummary || isSaving}
      >
        {loadingSummary ? 'Generating Summary...' : 'Summarize'}
      </button>

      <button
        className="btn btn-primary mt-4 py-2 ms-2"
        onClick={saveTranscript}
        disabled={(!transcript && !transcription) || loadingSummary || isSaving}
      >
        {isSaving ? 'Saving Transcript...' : 'Save'}
      </button>
      
      {summary.length > 0 && (
        <div className="mt-5 text-start">
          <h4 className='mb-2'>Meeting Notes Summary</h4>
          {summary.map((point, index) => (
            <div key={index} className="mb-3">
              <h5>{point.title}</h5>
              <ul>
                {point.points.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {impediments.length > 0 && (
        <div className="mt-5 text-start">
          <h4>Impediments</h4>
          {impediments.map((impediment, index) => (
            <div key={index} className="mb-3 border p-3 rounded">
              <h5>{impediment.title}</h5>
              <p><strong>Type:</strong> {impediment.type}</p>
              <p><strong>Status:</strong> {impediment.status}</p>
              <p>{impediment.description}</p>
            </div>
          ))}
        </div>
      )}

      {!isRecording && eventId && 
        <TranscriptionList eventId={eventId} onSelect={handleTranscriptionSelect} />
      }

    </div>
  );
};

export default MeetingTranscript;
