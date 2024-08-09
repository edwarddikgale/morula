// SDGItem.jsx
import RoundNumber from 'common/components/ui/RoundNumber';
import React from 'react';

interface IProps{
    sdg: any,
    onSelect: (sdgId: number) => void,
    isSelected: boolean,
    index: number,
}
const SDGItem: React.FC<IProps> = ({ sdg, onSelect, isSelected, index }) => {
  return (
    <div 
      className={`sdg-item mb-3 ${isSelected ? 'selected' : ''}`} 
      onClick={() => onSelect(sdg.id)}
    >
      <RoundNumber text={`${index + 1}`} size={30} />    
      <h4 className='sdg-title'>GOAL {sdg.id} - {sdg.title}</h4>
      <p className='sdg-description'>{sdg.description}</p>
    </div>
  );
};

export default SDGItem;
