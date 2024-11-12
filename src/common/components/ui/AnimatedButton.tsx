import React, { useRef, useState } from 'react';
import '../styles/animated-button.css';

interface AnimatedButtonProps {
  children: React.ReactNode; // Content inside the button
  className?: string; // Bootstrap class like btn-primary, btn-secondary, etc.
  isProcessing?: boolean; // Controls animation
  onClick?: () => void; // Handle button click
  type?: 'button' | 'reset'; //| 'submit'
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
  const buttonRef = useRef<HTMLButtonElement>(null); // Create a ref to track the button element
  // Combine the passed className with Bootstrap classes and conditionally add 'processing' class
  const buttonClassName = `btn ${className} ${processing ? 'processing' : ''}`;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {

    setProcessing(true);

    // Call onClick handler if provided
    if (onClick) {
      onClick(); // This can be used for custom logic, e.g., validations
    }

    // Allow the form to submit after the animation is complete
    setTimeout(() => {
      // Check if the button is inside a form before submitting it
      //const form = buttonRef.current?.form;
      setProcessing(false); // Stop the animation
    }, 750); // Delay to match the animation duration
  };

  return (
    <button
      ref={buttonRef} // Attach the ref to the button
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
