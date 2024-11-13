import React, { useEffect, useState } from 'react';
import '../styles/checkbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  borderStyle?: 'default' | 'dark-bordered'; // Optional prop for border style
  isRounded?: boolean,
  readonly?: boolean
}

export const Checkbox = ({ label, checked, onChange, isRounded, readonly = false, borderStyle = 'default' }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

    // Sync internal state with the checked prop
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChecked(checked);
    onChange(checked);
  };

  return (
    <>
      {!readonly &&
        <div className={`form-check ${borderStyle === 'dark-bordered' ? 'dark-bordered-checkbox' : ''}`}>
          <input
            className={`form-check-input ${borderStyle === 'dark-bordered' ? 'border-light' : ''} ${isRounded ? 'rounded' : ''}`}
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            id={label}
            style={{ borderColor: borderStyle === 'dark-bordered' ? '#fff' : '' }} // Light border color
          />
          <label className="form-check-label ms-2 mt-1" htmlFor={label}>
            {label}
          </label>
        </div>
      }
      {
        readonly && (
          <div className="form-check">
          {isChecked && <FontAwesomeIcon icon={faCheckSquare} />}
          {!isChecked && <FontAwesomeIcon icon={faSquare} />}
          {label}
        </div>
        )
      }
    </>
  );
};
