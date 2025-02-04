import React, { useEffect, useState } from 'react';
import useSpeechToText, { SpeechToTextResult } from 'react-hook-speech-to-text';
import Countdown, { zeroPad } from 'react-countdown';
import RecordingControls from './RecordingControls'; // Import the new component

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

interface MeetingSummaryProps {
  onStop?: (transcribedText: string) => void;
  onSummarize?: (summaryPoints: SummaryPoint[], impediments: Impediment[]) => void; 
}

const MeetingSummary = ({ onStop, onSummarize }: MeetingSummaryProps) => {
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [summary, setSummary] = useState<SummaryPoint[]>([]);
  const [impediments, setImpediments] = useState<Impediment[]>([]);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);
  const [durationInMinutes, setDurationInMinutes] = useState<number>(5); // Default duration
  const [restartRecording, setRestartRecording] = useState<boolean>(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    googleApiKey: '',
    useLegacyResults: false,
  });

  const MAX_RECORDING_TIME_MS = durationInMinutes * 60 * 1000;

  // Set timer when recording starts
  useEffect(() => {
    if (isRecording) {
      setTimerStartTime(Date.now() + MAX_RECORDING_TIME_MS);
    }
  }, [isRecording, MAX_RECORDING_TIME_MS]);

  // Handle recording stop and automatic restart
  useEffect(() => {
    if (!isRecording && restartRecording && timerStartTime && Date.now() < timerStartTime) {
      setRestartRecording(false); // Reset the flag to prevent multiple restarts
      setTimeout(() => startSpeechToText(), 500); // Give it a short delay to ensure stop completes
    }

    if (!isRecording && results.length > 0) {
      const finalText = results.map((result) => result.transcript).join(' ');
      setTranscribedText(finalText);
      if (onStop) onStop(finalText);
    }
  }, [isRecording, results, onStop, timerStartTime, startSpeechToText, restartRecording]);

  // Handle stopping and restarting recording manually
  const handleRecordingToggle = () => {
    if (isRecording) {
      stopSpeechToText();
      //setRestartRecording(true); // Allow restart if needed
    } else {
      startSpeechToText();
    }
  };

  // Fetch summary from the API
  const fetchSummary = async () => {
    setLoadingSummary(true);
    try {
      const response = await fetch(`${API_URL}/scrum/summarise-event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: transcribedText, eventType: 'daily' }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch summary!');
      }

      const data: ScrumEventSummaryResponse = await response.json();
      setSummary(data.summary);
      setImpediments(data.impediments);
      if(onSummarize){
        onSummarize(data.summary, data.impediments);
      }
      
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoadingSummary(false);
    }
  };

  // Countdown renderer function
  const countdownRenderer = ({ minutes, seconds, completed }: { minutes: number; seconds: number; completed: boolean }) => {
    if (completed) {
      stopSpeechToText(); // Stop recording when timer reaches 0
      return <h4 className="text-danger">Time's up!</h4>;
    }

    return (
      <h4 className="text-danger">
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </h4>
    );
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className="container text-center mt-4">
      <h3 className="mb-4">Meeting Summariser</h3>

      <RecordingControls
        durationInMinutes={durationInMinutes}
        setDurationInMinutes={setDurationInMinutes}
        isRecording={isRecording}
        handleRecordingToggle={handleRecordingToggle}
        timerStartTime={timerStartTime}
        countdownRenderer={countdownRenderer}
      />

      <ul className="mt-4 list-unstyled">
        {results.map((result: SpeechToTextResult) => (
          <li key={result.timestamp} className="text-muted">
            {result.transcript}
          </li>
        ))}
        {interimResult && <li className="text-warning">{interimResult}</li>}
      </ul>

      <button
        className="btn btn-primary mt-4 py-2"
        onClick={fetchSummary}
        disabled={!transcribedText || loadingSummary}
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
}

export default MeetingSummary;
