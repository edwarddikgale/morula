import React, { useEffect, useState } from 'react';
import AgilePatternSelector from './components/AgilePatternSelector';
import { scrumAPI } from './utils/API';
import { ScrumPattern } from './types/AgilePattern';

interface IPatternSelectorProps {
  //patterns: AgilePattern[];
  onSelectionChange: (selectedPatterns: { id: string; key: string }[]) => void;
  selected: { id: string; key: string }[]
}

const DailyAntiPatterns: React.FC<IPatternSelectorProps> = ({onSelectionChange, selected}: IPatternSelectorProps) => {
  const [selectedPatterns, setSelectedPatterns] = useState<{ id: string; key: string }[]>([]);
  const [antiPatterns, setAntiPatterns] = useState<ScrumPattern[]>([]);

  const handleSelectionChange = (newSelectedPatterns: { id: string; key: string }[]) => {
    setSelectedPatterns(newSelectedPatterns);
    onSelectionChange(newSelectedPatterns);
  };

  const loadScrumPatterns = async () =>{
    if(antiPatterns && antiPatterns.length > 0) return;
    const {records} =  await scrumAPI.getPatterns({eventType: 'daily'});
    setAntiPatterns(records.filter(pattern => pattern.type === 'anti-pattern'));
  };

  useEffect(() => {
    loadScrumPatterns();
  }, []);

  return (
    <div>
      <AgilePatternSelector 
        patterns={antiPatterns} 
        onSelectionChange={handleSelectionChange} 
        selected={selected}
        />
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
