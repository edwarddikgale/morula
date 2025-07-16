import React, { useState } from 'react';
import { Edit3, Trash } from 'lucide-react';
import { Recording } from './types/Recording';
import './styles/RecordingList.css';

interface RecordingListProps {
  recordings: Recording[];
  editableTitles: { [id: string]: boolean };
  onUpdateTitle?: (id: string, newTitle: string) => void;
  onToggleEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (recording: Recording) => void;
}

const RecordingList: React.FC<RecordingListProps> = ({
  recordings,
  editableTitles,
  onUpdateTitle,
  onToggleEdit,
  onDelete,
  onSelect,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (recording: Recording) => {
    setSelectedId(recording.id);
    onSelect?.(recording);
  };

  return (
    <ul className="list-group">
      {recordings.map((r) => (
        <li
          key={r.id}
          className={`recording-item list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center ${selectedId === r.id ? 'selected' : ''}`}
        >
          <div className="flex-grow-1 d-flex align-items-center gap-2 mb-2 mb-md-0">
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
          </div>

          <div className="d-flex align-items-center gap-3">
            <audio
              controls
              src={URL.createObjectURL(r.blob)}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(r.id);
              }}
            >
              <Trash size={16} />
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(r);
              }}
            >
              Select
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RecordingList;
