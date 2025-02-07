import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import Countdown, { zeroPad } from 'react-countdown';
import RecordingControls from './RecordingControls';

import './styles/meeting-summary.css';

export const API_URL = process.env.REACT_APP_API_BASE_URL;

interface Impediment {
  type: string;
  title: string;
  description: string;
  status: string;
}

interface SummaryPoint {
  title: string;
  points: string[];
}

interface ScrumEventSummaryResponse {
  summary: SummaryPoint[];
  impediments: Impediment[];
}

interface MeetingTranscriptProps {
  onStop?: (transcribedText: string) => void;
  onSummarize?: (summaryPoints: SummaryPoint[], impediments: Impediment[]) => void;
}

const MeetingTranscript = ({ onStop, onSummarize }: MeetingTranscriptProps) => {
  const [summary, setSummary] = useState<SummaryPoint[]>([]);
  const [impediments, setImpediments] = useState<Impediment[]>([]);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [durationInMinutes, setDurationInMinutes] = useState<number>(5); // Default duration
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);

  const {
    transcript,
    listening: isRecording,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const MAX_RECORDING_TIME_MS = durationInMinutes * 60 * 1000;

  useEffect(() => {
    if (isRecording) {
      setTimerStartTime(Date.now() + MAX_RECORDING_TIME_MS);
    }
  }, [isRecording, MAX_RECORDING_TIME_MS]);

  const handleRecordingToggle = () => {
    if (isRecording) {
      SpeechRecognition.stopListening();
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
        body: JSON.stringify({ notes: transcript, eventType: 'daily' }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch summary!');
      }

      const data: ScrumEventSummaryResponse = await response.json();
      setSummary(data.summary);
      setImpediments(data.impediments);
      if (onSummarize) {
        onSummarize(data.summary, data.impediments);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoadingSummary(false);
    }
  };

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
      <h3 className="mb-4">Meeting Transcript Recorder</h3>

      <RecordingControls
        durationInMinutes={durationInMinutes}
        setDurationInMinutes={setDurationInMinutes}
        isRecording={isRecording}
        handleRecordingToggle={handleRecordingToggle}
        timerStartTime={timerStartTime}
        countdownRenderer={countdownRenderer}
      />

      <ul className="mt-4 list-unstyled">
        {transcript && <li className="text-muted">{transcript}</li>}
      </ul>

      <button
        className="btn btn-primary mt-4 py-2"
        onClick={fetchSummary}
        disabled={!transcript || loadingSummary}
      >
        {loadingSummary ? 'Generating Summary...' : 'Summarize'}
      </button>

      {summary.length > 0 && (
        <div className="mt-5 text-start">
          <h4>Summary</h4>
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
    </div>
  );
};

export default MeetingTranscript;
