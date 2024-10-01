import React from 'react';
import { AgilePattern } from '../types';

interface AgilePatternListProps {
  patterns: AgilePattern[];
  onEdit: (pattern: AgilePattern) => void;
  onDelete: (patternId: string) => void;
  onView: (pattern: AgilePattern) => void;
}

const AgilePatternList: React.FC<AgilePatternListProps> = ({ patterns, onEdit, onDelete, onView }) => {
  return (
    <div className="list-group">
      {patterns.map((pattern) => (
        <div key={pattern.id} className="mb-1 list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h5>{pattern.title}</h5>
            <p>{pattern.description}</p>
          </div>
          <div>
            <button className="btn btn-primary me-2" onClick={() => onView(pattern)}>
              View
            </button>
            <button className="btn btn-secondary me-2" onClick={() => onEdit(pattern)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(pattern.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgilePatternList;
