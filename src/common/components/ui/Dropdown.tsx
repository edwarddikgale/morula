import React from 'react';

interface DropdownProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    id?: string;
    className?: string;
    required?: boolean;
    htmlFor?: string;
    labelText?: string;
}

const Dropdown = ({
    value,
    onChange,
    options,
    placeholder = '',
    id,
    className,
    required = false,
    htmlFor,
    labelText
}: DropdownProps) => {
    return (       
        <div className={className || "form-floating mb-3"}>
            <select
                className='form-select'
                id={id}
                aria-label={placeholder}
                required={required}
                value={value}
                onChange={onChange}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {htmlFor && <label htmlFor={htmlFor}>{labelText}</label>}
        </div>            
    );
};

export { Dropdown }