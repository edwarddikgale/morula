import React, { useState } from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChecked(checked);
    onChange(checked);
  };

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        id={label}
      />
      <label className="form-check-label" htmlFor={label}>
        {label}
      </label>
    </div>
  );
};

