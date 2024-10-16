import React, { useEffect, useState } from 'react';
import AgilePatternSelector from './components/AgilePatternSelector';
import { scrumAPI } from './utils/API';
import { ScrumPattern } from './types/AgilePattern';

interface IPatternSelectorProps {
  //patterns: AgilePattern[];
  onSelectionChange: (selectedPatterns: { id: string; key: string }[]) => void;
  selected: { id: string; key: string }[],
  eventType: string
}

const DailyAntiPatterns: React.FC<IPatternSelectorProps> = ({onSelectionChange, selected, eventType}: IPatternSelectorProps) => {
  const [selectedPatterns, setSelectedPatterns] = useState<{ id: string; key: string }[]>([]);
  const [patterns, setPatterns] = useState<ScrumPattern[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectionChange = (newSelectedPatterns: { id: string; key: string }[]) => {
    setSelectedPatterns(newSelectedPatterns);
    onSelectionChange(newSelectedPatterns);
  };

  const loadScrumPatterns = async () =>{
    if(patterns && patterns.length > 0) return;
    setLoading(true);
    const {records} =  await scrumAPI.getPatterns({eventType: eventType});
    setPatterns(records.filter(pattern => pattern.type === 'anti-pattern'));
    setLoading(false);
  };

  useEffect(() => {
    loadScrumPatterns();
  }, []);

  return (
    <div>
      <AgilePatternSelector 
        patterns={patterns} 
        onSelectionChange={handleSelectionChange} 
        selected={selected}
        loading={loading}
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
