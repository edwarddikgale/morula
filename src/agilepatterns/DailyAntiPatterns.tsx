import React, { useState } from 'react';
import AgilePatternSelector from './components/AgilePatternSelector';
import { AgilePattern } from './types'; // Make sure this type is defined

const patterns: AgilePattern[] = [
  // Example patterns
  { id: '1', key: 'orientation_lost', title: 'Orientation Lost', description: 'The team loses focus...', type: 'anti-pattern', tags: ['focus'], artifact: 'sprint-backlog', eventType: 'daily', agilePrinciples: ['continuous_improvement'], scrumValues: ['focus'], scrumPillars: ['transparency'] },
  { id: '2', key: 'status_report', title: 'Status Report', description: 'The Daily Scrum is a status report...', type: 'anti-pattern', tags: ['reporting'], artifact: 'sprint-backlog', eventType: 'daily', agilePrinciples: ['self_organizing_teams'], scrumValues: ['commitment'], scrumPillars: ['transparency'] }
];

const DailyAntiPatterns: React.FC = () => {
  const [selectedPatterns, setSelectedPatterns] = useState<{ id: string; key: string }[]>([]);

  const handleSelectionChange = (newSelectedPatterns: { id: string; key: string }[]) => {
    setSelectedPatterns(newSelectedPatterns);
  };

  return (
    <div>
      <h1>Manage Agile Anti-Patterns</h1>
      <AgilePatternSelector patterns={patterns} onSelectionChange={handleSelectionChange} />
      <button
        className="btn btn-primary mt-3"
        onClick={() => console.log('Selected Anti-Patterns:', selectedPatterns)}
      >
        Submit Selected Patterns
      </button>
    </div>
  );
};

export default DailyAntiPatterns;
