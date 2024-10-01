import React, { useState } from 'react';
import AgilePatternSelector from './components/AgilePatternSelector';
import { AgilePattern } from './types'; // Make sure this type is defined
import dailyAntipatterns from './data/dailyDesignpatterns.json';

const patterns: AgilePattern[] = dailyAntipatterns as AgilePattern[];
interface IPatternSelectorProps {
  //patterns: AgilePattern[];
  onSelectionChange: (selectedPatterns: { id: string; key: string }[]) => void;
}

const DailyAntiPatterns: React.FC<IPatternSelectorProps> = ({onSelectionChange}: IPatternSelectorProps) => {
  const [selectedPatterns, setSelectedPatterns] = useState<{ id: string; key: string }[]>([]);

  const handleSelectionChange = (newSelectedPatterns: { id: string; key: string }[]) => {
    setSelectedPatterns(newSelectedPatterns);
    onSelectionChange(newSelectedPatterns);
  };

  return (
    <div>
      <AgilePatternSelector 
        patterns={patterns} 
        onSelectionChange={handleSelectionChange} />
      <button
        className="btn btn-primary mt-3 d-none"
        onClick={() => console.log('Selected Design-Patterns:', selectedPatterns)}
      >
        Submit Selected Patterns
      </button>
    </div>
  );
};

export default DailyAntiPatterns;
