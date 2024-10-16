import React, { useEffect, useState } from 'react';
import { AgilePattern } from '../types';
import { Checkbox } from 'common/components/ui';
import { LoaderPrimary } from 'common/components/Loader/Loader';
import SelectableButtonGroup from 'common/components/ui/SelectableButtonGroup';

import '../styles/agilepatternselector.css';

interface AgilePatternSelectorProps {
  patterns: AgilePattern[];
  onSelectionChange: (selectedPatterns: { id: string; key: string }[]) => void;
  selected?: { id: string; key: string }[];
  loading: boolean
}

const AgilePatternSelector: React.FC<AgilePatternSelectorProps> = ({ patterns, onSelectionChange, loading, selected }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectType, setSubjectType] = useState<string | undefined>();
  const [selectedPatterns, setSelectedPatterns] = useState<{ id: string; key: string }[]>(selected || []); 
  const [filteredPatterns, setFilteredPatterns] = useState<AgilePattern[]>(patterns);

  const subjectTypes = [
    { value: 'Team', label: 'Team' },
    { value: 'Developers', label: 'Developer(s)' },
    { value: 'Scrum-Master', label: 'SM'}, // Hidden button
    { value: 'Product-Owner', label: 'PO' },
    { value: 'Stakeholders', label: 'Stakeholder(s)' },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleToggleSelection = (pattern: AgilePattern) => {
    const alreadySelected = selectedPatterns.some((p) => p.id === pattern.id);

    const newSelectedPatterns = alreadySelected
      ? selectedPatterns.filter((p) => p.id !== pattern.id) // Unselect
      : [...selectedPatterns, { id: pattern.id, key: pattern.key }]; // Select

    setSelectedPatterns(newSelectedPatterns);
    onSelectionChange(newSelectedPatterns);
  };

  useEffect(() => {

    const updatedFilteredPatterns = patterns.filter(
      (pattern) =>
        (pattern.title.toLowerCase().includes(searchTerm) ||
        pattern.description.toLowerCase().includes(searchTerm) ||
        pattern.tags.some((tag) => tag.toLowerCase().includes(searchTerm))) &&
        (!subjectType || (subjectType && pattern.subject.toLowerCase().includes(subjectType.toLowerCase())))
    );

    setFilteredPatterns(updatedFilteredPatterns);
  }, [patterns, searchTerm, subjectType]);

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search patterns..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading &&  <LoaderPrimary />}

      <SelectableButtonGroup 
        options={subjectTypes} 
        onSelect={setSubjectType} 
      />

      <div className="list-group">
        {filteredPatterns.map((pattern) => {
          const isSelected = selectedPatterns.some((p) => p.key === pattern.key);
          return (
            <div
              key={pattern.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                isSelected ? 'active active bg-light text-dark' : ''
              }`}
              onClick={() => handleToggleSelection(pattern)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <h5>{pattern.title}</h5>
                <p>{pattern.description}</p>
                <p className='pattern-subject'><i>{pattern.subject}</i></p>
                <p className='pattern-eventType ms-2'><i>{pattern.eventType}</i></p>
              </div>
              <div>
                <Checkbox 
                  checked={isSelected}
                  onChange={() => handleToggleSelection(pattern)} 
                  label={''} 
                  borderStyle='dark-bordered'
                  isRounded={true}
                  />
              </div>
            </div>
          );
        })}
      </div>

      {selectedPatterns.length > 0 && (
        <div className="mt-3">
          <h5>Selected Patterns:</h5>
          <ul>
            {selectedPatterns.map((pattern) => (
              <li key={pattern.id}>
                {pattern.key} ({pattern.id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AgilePatternSelector;
