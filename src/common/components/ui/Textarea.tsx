import React from 'react';

interface TextareaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    id?: string;
    className?: string;
    rows?: number;
    cols?: number;
}

const Textarea = ({
    value,
    onChange,
    placeholder = '',
    id,
    className,
    rows = 4,
    cols
}: TextareaProps) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            id={id}
            className={`form-control rounded border-light ${className}`}
            rows={rows}
            cols={cols}
            style={{
                borderColor: '#d3d3d3', // Light gray color
                borderRadius: '4px' // Slightly rounded edges
            }}
        />
    );
};

export {Textarea}
