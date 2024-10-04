import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
  hidden?: boolean; // Optional flag to hide a button
}

interface SelectableButtonGroupProps {
  options: Option[];
  defaultSelected?: string;
  onSelect: (selected: string) => void;
}

const SelectableButtonGroup: React.FC<SelectableButtonGroupProps> = ({
  options,
  defaultSelected,
  onSelect,
}) => {
  const [selected, setSelected] = useState<string | undefined>(defaultSelected);
  const handleSelection = (value: string) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <div className='d-flex flex-wrap'>
      {options.map((option) => (
        <button
          key={option.value}
          type='button'
          className={`my-1 me-3 btn btn-light ${selected === option.value ? 'btn-select-active' : ''} ${
            option.hidden ? 'd-none' : ''
          }`}
          onClick={() => handleSelection(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SelectableButtonGroup;
