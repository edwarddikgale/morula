import React, { useState } from 'react';
import { Edit3, Trash, Download } from 'lucide-react';
import { Recording } from './types/Recording';
import { createDownloadUrl } from './utils/createDownloadUrl';
import { compressAudio, shouldOfferCompression } from './utils/compressAudio';
import './styles/RecordingList.css';

interface RecordingListProps {
  recordings: Recording[];
  editableTitles: { [id: string]: boolean };
  onUpdateTitle?: (id: string, newTitle: string) => void;
  onToggleEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (recording: Recording) => void;
  onReplaceRecording?: (updated: Recording) => void; // optional handler for compressed result
}

const formatDuration = (duration?: number): string => {
  if (!duration) return 'N/A';
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}m ${seconds}s`;
};

const formatDateTime = (date: Date): string => {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return isToday ? `Today @ ${time}` : `${date.toLocaleDateString()} @ ${time}`;
};

const bytesToMB = (bytes: number): string => (bytes / (1024 * 1024)).toFixed(2);

const RecordingList: React.FC<RecordingListProps> = ({
  recordings,
  editableTitles,
  onUpdateTitle,
  onToggleEdit,
  onDelete,
  onSelect,
  onReplaceRecording,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [compressingIds, setCompressingIds] = useState<Set<string>>(new Set());

  const handleSelect = (recording: Recording) => {
    setSelectedId(recording.id);
    onSelect?.(recording);
  };

  const handleCompress = async (recording: Recording) => {
    setCompressingIds(prev => new Set(prev).add(recording.id));
    try {
      const compressedBlob = await compressAudio(recording.blob);
      const updated: Recording = {
        ...recording,
        blob: compressedBlob,
      };
      onReplaceRecording?.(updated);
    } catch (err) {
      alert('Compression failed.');
      console.error(err);
    } finally {
      setCompressingIds(prev => {
        const updated = new Set(prev);
        updated.delete(recording.id);
        return updated;
      });
    }
  };

  return (
    <ul className="list-group">
      {recordings.map((r) => {
        const { url, filename } = createDownloadUrl(r.blob, r.title || 'recording');
        const sizeMB = parseFloat(bytesToMB(r.blob.size));
        const isCompressing = compressingIds.has(r.id);
        const showCompressButton = shouldOfferCompression(r.blob, r.duration!);

        return (
          <li
            key={r.id}
            className={`recording-item list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center ${selectedId === r.id ? 'selected' : ''}`}
          >
            <div className="flex-grow-1 d-flex flex-column gap-1 mb-2 mb-md-0">
              {editableTitles[r.id] ? (
                <input
                  type="text"
                  value={r.title}
                  onChange={(e) => onUpdateTitle?.(r.id, e.target.value)}
                  onBlur={() => onToggleEdit?.(r.id)}
                  className="form-control form-control-sm w-auto"
                />
              ) : (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleEdit?.(r.id);
                  }}
                  className="fw-bold text-primary d-flex align-items-center"
                >
                  {r.title} <Edit3 size={16} className="ms-2" />
                </span>
              )}
              <small className="text-muted">{formatDateTime(r.createdAt)}</small>
              <small className="text-muted">Length: {formatDuration(r.duration)}</small>
              <small className="text-muted">Size: {sizeMB} MB</small>
            </div>

            <div className="d-flex align-items-center gap-3">
              <audio
                controls
                src={URL.createObjectURL(r.blob)}
                onClick={(e) => e.stopPropagation()}
              />
              <a
                className="btn btn-outline-secondary btn-sm"
                href={url}
                download={filename}
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={16} />
              </a>
              {showCompressButton && (
                <button
                  className="btn btn-outline-warning btn-sm"
                  disabled={isCompressing}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCompress(r);
                  }}
                >
                  {isCompressing ? 'Compressing...' : 'Compress'}
                </button>
              )}
              {onDelete && (
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(r.id);
                  }}
                >
                  <Trash size={16} />
                </button>
              )}
              {onSelect && (
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(r);
                  }}
                >
                  Select
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default RecordingList;
