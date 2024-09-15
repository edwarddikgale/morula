import React from 'react';

interface StarProps{
    filled: boolean,
    onClick: () => void
}

const Star: React.FC<StarProps> = ({ filled, onClick }) => {
  const style = {
    cursor: 'pointer',
    color: filled ? 'gold' : 'gray',
    fontSize: '24px',
    paddingRight: '5px'
  };

  return (
    <span onClick={onClick} style={style}>
      {filled ? '★' : '☆'} 
    </span>
  );
};

export {Star};
