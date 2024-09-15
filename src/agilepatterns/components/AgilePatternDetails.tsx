import React from 'react';
import { AgilePattern } from '../types';

interface AgilePatternDetailsProps {
  pattern: AgilePattern;
  onClose: () => void;
}

const AgilePatternDetails: React.FC<AgilePatternDetailsProps> = ({ pattern, onClose }) => {
  return (
    <div className="card p-4">
      <h4>Agile Pattern Details</h4>
      <p><strong>Title:</strong> {pattern.title}</p>
      <p><strong>Description:</strong> {pattern.description}</p>
      <p><strong>Type:</strong> {pattern.type}</p>
      <p><strong>Tags:</strong> {pattern.tags.join(', ')}</p>
      <p><strong>Artifact:</strong> {pattern.artifact}</p>
      <p><strong>Agile Principles:</strong> {pattern.agilePrinciples.join(', ')}</p>
      <p><strong>Scrum Values:</strong> {pattern.scrumValues.join(', ')}</p>
      <p><strong>Scrum Pillars:</strong> {pattern.scrumPillars.join(', ')}</p>

      <button className="btn btn-secondary" onClick={onClose}>Close</button>
    </div>
  );
};

export default AgilePatternDetails;
