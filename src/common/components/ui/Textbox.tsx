import React from 'react';

interface TextboxProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    id?: string;
    className?: string;
    required?: boolean;
    isLoading?: boolean
    labelText?: string
}

const Textbox = ({
    value,
    onChange,
    placeholder = '',
    id,
    className,
    required = false,
    isLoading = false,
    labelText
}: TextboxProps) => {
    return (
        <div className='form-floating mb-3'>
            <input
                type='text'
                required={required}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                id={id}
                className={`form-control rounded ${className}`}
                style={{
                    borderColor: isLoading ? 'red' : '#000', // Light gray color
                }}
            />
            <label htmlFor={id}>
                {labelText} {required && <span className='text-danger'>*</span>}
            </label>
        </div>    
    );
};

export{Textbox}