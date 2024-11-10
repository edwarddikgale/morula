import React, { useState } from 'react';
import '../styles/animated-button.css';

interface AnimatedButtonProps {
  children: React.ReactNode; // Content inside the button
  className?: string; // Bootstrap class like btn-primary, btn-secondary, etc.
  isProcessing?: boolean; // Controls animation
  onClick?: () => void; // Handle button click
  type?: 'button' | 'submit' | 'reset';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className = 'btn-primary',
  type,
  isProcessing,
  onClick,
  ...props
}) => {
  const [processing, setProcessing]  = useState<boolean>(isProcessing || false); 
  // Combine the passed className with Bootstrap classes and conditionally add 'processing' class
  const buttonClassName = `btn ${className} ${processing ? 'processing' : ''}`;
  const handleClick = () =>{
    setProcessing(true);
    setTimeout(() => setProcessing(false), 750);
    if(onClick) { onClick(); }
  }

  return (
    <button
      type={type || 'button'}     
      className={buttonClassName}
      onClick={handleClick}
      disabled={processing} // Disable the button during processing
      {...props}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
