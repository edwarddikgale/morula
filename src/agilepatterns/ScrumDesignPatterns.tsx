import React, { useEffect, useState } from 'react';
import AgilePatternSelector from './components/AgilePatternSelector';
import { ScrumPattern } from './types/AgilePattern';
import { scrumAPI } from './utils/API';

interface IPatternSelectorProps {
  onSelectionChange: (selectedPatterns: { id: string; key: string }[]) => void;
  selected: { id: string; key: string }[],
  eventType: string
}

const DailyAntiPatterns: React.FC<IPatternSelectorProps> = ({onSelectionChange, selected, eventType}: IPatternSelectorProps) => {
  const [selectedPatterns, setSelectedPatterns] = useState<{ id: string; key: string }[]>([]);
  const [designPatterns, setDesignPatterns] = useState<ScrumPattern[]>([]);

  const handleSelectionChange = (newSelectedPatterns: { id: string; key: string }[]) => {
    setSelectedPatterns(newSelectedPatterns);
    onSelectionChange(newSelectedPatterns);
  };

  const loadScrumPatterns = async () =>{
    if(designPatterns && designPatterns.length > 0) return;
    const {records} =  await scrumAPI.getPatterns({eventType: eventType});
    setDesignPatterns(records.filter(pattern => pattern.type === 'design-pattern'));
  };

  useEffect(() => {
    loadScrumPatterns();
  }, []);


  return (
    <div>
      <AgilePatternSelector 
        patterns={designPatterns} 
        onSelectionChange={handleSelectionChange}
        selected={selected} />
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
