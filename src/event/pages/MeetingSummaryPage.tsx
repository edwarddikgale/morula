import React, { useEffect, useState } from 'react';
import useSpeechToText, { SpeechToTextResult } from 'react-hook-speech-to-text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';

import '../components/styles/meeting-summary.css';

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
}

export default function MeetingSummary({ onStop }: MeetingSummaryProps) {
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [summary, setSummary] = useState<SummaryPoint[]>([]);
  const [impediments, setImpediments] = useState<Impediment[]>([]);
  const [loadingSummary, setLoadingSummary] = useState(false);

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

  useEffect(() => {
    // When recording stops, capture the final text and call onStop callback
    if (!isRecording && results.length > 0) {
      const finalText = results.map((result) => result.transcript).join(' ');
      setTranscribedText(finalText);
      if (onStop) onStop(finalText);
    }
  }, [isRecording, results, onStop]);

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
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoadingSummary(false);
    }
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className="container text-center mt-4">
      <h3 className="mb-4">Meeting Summary Recorder</h3>
      <button
        className={`record-button ${isRecording ? 'recording' : ''}`}
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} />
        <span className="ms-2">
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </span>
      </button>

      <ul className="mt-4 list-unstyled">
        {results.map((result: SpeechToTextResult) => (
          <li key={result.timestamp} className="text-muted">
            {result.transcript}
          </li>
        ))}
        {interimResult && <li className="text-warning">{interimResult}</li>}
      </ul>

      <button
        className="btn btn-primary mt-4"
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
