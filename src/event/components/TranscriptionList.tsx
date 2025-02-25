import React, { useEffect, useState } from 'react';
import { Transcription } from '../types/Transcription';
import { transcriptionService } from '../services/transcriptionService';
import { LoaderPrimary } from 'common/components/Loader/Loader';
import LimitedCharacters from 'common/components/ui/LimitedCharacters';

interface TranscriptionListProps {
  eventId: string;
  onSelect: (trans: Transcription) => void; 
}

const TranscriptionList: React.FC<TranscriptionListProps> = ({ eventId, onSelect }) => {
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranscriptions = async () => {
      try {
        const response = await transcriptionService.getEventTranscriptions(eventId);
        setTranscriptions(response.transcriptions);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch transcriptions');
      } finally {
        setLoading(false);
      }
    };

    fetchTranscriptions();
  }, [eventId]);

  if (loading) return <LoaderPrimary />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container my-4">
      <h3 className="mb-4">{transcriptions?.length || 0} Event Transcriptions</h3>
      {transcriptions.map((t) => (
        <div key={t._id || t.title} className="card mb-3 shadow-sm" onClick={(  ) => onSelect(t)}>
          <div className="card-body">
            <h6 className="card-title">{t.title}</h6>
            <div className="card-text">
                <LimitedCharacters text={t.raw} limit={200} />
            </div>
            <p className="card-text">
              <small className="text-muted">
                Created: {new Date(t.createdAt).toLocaleString()} | Updated: {new Date(t.updatedAt).toLocaleString()}
              </small>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TranscriptionList;
