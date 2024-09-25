import React, { useState } from 'react';
import { AgilePattern } from '../types';
import { Checkbox } from 'common/components/ui';

interface AgilePatternSelectorProps {
  patterns: AgilePattern[];
  onSelectionChange: (selectedPatterns: { id: string; key: string }[]) => void;
}

const AgilePatternSelector: React.FC<AgilePatternSelectorProps> = ({ patterns, onSelectionChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatterns, setSelectedPatterns] = useState<{ id: string; key: string }[]>([]);

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

  const filteredPatterns = patterns.filter(
    (pattern) =>
      pattern.title.toLowerCase().includes(searchTerm) ||
      pattern.description.toLowerCase().includes(searchTerm) ||
      pattern.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search anti-patterns..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="list-group">
        {filteredPatterns.map((pattern) => {
          const isSelected = selectedPatterns.some((p) => p.id === pattern.id);
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
              </div>
              <div>
                <Checkbox 
                  checked={isSelected}
                  onChange={() => handleToggleSelection(pattern)} 
                  label={''} 
                  borderStyle='dark-bordered'
                  />
              </div>
            </div>
          );
        })}
      </div>

      {selectedPatterns.length > 0 && (
        <div className="mt-3">
          <h5>Selected Anti-Patterns:</h5>
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
