// components/RoundNumber.tsx
import React, { useState } from 'react';
import { getRandomColor, getContrastYIQ } from '../utils/getRandomColor';

interface RoundNumberProps {
  text: string;
  size?: number;
  circleColor?: string;
  textColor?: string;
}

const RoundNumber: React.FC<RoundNumberProps> = ({ text, size, circleColor, textColor }) => {
  const backgroundColor = circleColor? circleColor: getRandomColor();
  const fontColor = textColor? textColor: getContrastYIQ(backgroundColor);
  const sizeInPx = size? `${size}px`: `25px`

  const [bgColor, setBgColor] = useState<string>(backgroundColor);
  const [color, setColor] = useState<string>(fontColor);
  
  return (
    <div style={{
      backgroundColor: bgColor,
      borderRadius: '50%',
      width: sizeInPx,
      height: sizeInPx,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      color: color,
      fontWeight: 'bold',
      position: 'absolute',
      top: '-18px', 
      left: '-15px',
    }}>
      {text}
    </div>
  );
};

export default RoundNumber;
