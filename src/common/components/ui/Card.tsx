import React from 'react';

interface CardProps {
    children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="card rounded border-secondary p-2">
      {children}
    </div>
  );
};