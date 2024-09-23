import React, { useState } from 'react';
import AgilePatternSelector from './components/AgilePatternSelector';
import { AgilePattern } from './types'; // Make sure this type is defined
import dailyAntipatterns from './data/dailyAntipatterns.json';

const patterns: AgilePattern[] = dailyAntipatterns as AgilePattern[];

const DailyAntiPatterns: React.FC = () => {
  const [selectedPatterns, setSelectedPatterns] = useState<{ id: string; key: string }[]>([]);

  const handleSelectionChange = (newSelectedPatterns: { id: string; key: string }[]) => {
    setSelectedPatterns(newSelectedPatterns);
  };

  return (
    <div>
      <AgilePatternSelector 
        patterns={patterns} 
        onSelectionChange={handleSelectionChange} />
      <button
        className="btn btn-primary mt-3 d-none"
        onClick={() => console.log('Selected Anti-Patterns:', selectedPatterns)}
      >
        Submit Selected Patterns
      </button>
    </div>
  );
};

export default DailyAntiPatterns;
