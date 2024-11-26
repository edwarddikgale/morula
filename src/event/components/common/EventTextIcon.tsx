import React from 'react';

interface EventTextIconProps {
  title: string; // The text to extract the first letter from
  size?: number; // Optional size for the square icon, defaults to 100px
  bgColor?: string; // Optional background color for the square
  textColor?: string; // Optional text color for the letter
  circleColor?: string; // Optional color for the circle
}

const EventTextIcon: React.FC<EventTextIconProps> = ({
  title,
  size = 100,
  bgColor = '#f0f0f0',
  textColor = '#000',
  circleColor = '#ffffff',
}) => {
  // Extract the first letter of the title
  const initial = title?.charAt(0).toUpperCase() || '?';

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: bgColor,
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: `${size * 0.6}px`,
          height: `${size * 0.6}px`,
          backgroundColor: circleColor,
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: `${size * 0.4}px`,
          color: textColor,
          fontWeight: 'bold',
        }}
      >
        {initial}
      </div>
    </div>
  );
};

export default EventTextIcon;
