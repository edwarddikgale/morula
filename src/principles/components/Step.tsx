// Step.jsx
import React, { ReactNode } from 'react';
import '../styles/sdg-selection.css';

interface IProps{
    title: string,
    description: string,
    children: ReactNode
}

const Step: React.FC<IProps> = ({ title, description, children }) => {
  return (
    <div className="step">
      <h4>{title}</h4>
      <p className='ms-4 step-description'>{description}</p>
      <div className='mt-2'>
        {children}
      </div>
    </div>
  );
};

export default Step;
