import React, { useEffect, useState } from 'react';
import { Impediment } from 'observation/types/Impediment'; // adjust the import path as needed
import RoundNumber from 'common/components/ui/RoundNumber';
import { Checkbox } from 'common/components/ui/Checkbox';
import TimeAgo from 'react-timeago';
//import './styles/impediment-list.css';

interface ImpedimentListProps {
  impediments?: Impediment[];
  selectable: boolean;
  onSelectionChange?: (selectedList: Impediment[]) => void;
}

// Helper function to filter out null/undefined items
const cleanList = (list?: Impediment[]) => {
  return list?.filter(imp => imp != null) || [];
};

const ImpedimentList: React.FC<ImpedimentListProps> = ({ impediments = [], selectable, onSelectionChange }) => {
  const [selected, setSelected] = useState<Impediment[]>([]);
  const [impedimentList, setImpedimentList] = useState<Impediment[]>(cleanList(impediments));

  useEffect(() => {
    setImpedimentList(cleanList(impediments));
  }, [impediments]);

  const handleCheckChange = (checked: boolean, index: number) => {
    let currentSelection = [...selected];
    if (checked) {
      currentSelection.push(impediments[index]);
    } else {
      // Remove the item based on its _id (or index if _id is missing)
      currentSelection = currentSelection.filter((item, i) =>
        impediments[index]._id ? item._id !== impediments[index]._id : i !== index
      );
    }
    setSelected(currentSelection);
    if (onSelectionChange) {
      onSelectionChange(currentSelection);
    }
  };

  return (
    <div className="impediment-list">
      <h3 className="mb-4">Impediments ({impediments.length})</h3>
      {impedimentList.map((imp, index) => (
        <div key={imp._id || index} className="list-group-item mb-4 p-3 border rounded">
          <RoundNumber text={`${index + 1}`} />
          <div>
            <div className="d-flex w-100">
                <div className="w-75">
                    <h5 className="mb-2">{imp.title}</h5>
                </div>
                <div>     
                    {imp.description && (
                        <p className="impediment-description text-muted">{imp.description}</p>
                    )}                                       
                </div>        
                {selectable && (
                    <div className="d-flex justify-content-end align-items-center w-25">
                    <Checkbox 
                        label="" 
                        checked={false} 
                        onChange={(checked) => handleCheckChange(checked, index)}
                        borderStyle="dark-bordered"
                    />
                    </div>
                )}
            </div>
            <div className="impediment-notes">
                <p>{imp.notes}</p>
                <div className='mb-4'>
                    <small className="impediment-title">{imp.type}</small>
                    <small className="impediment-status ms-1">{imp.status || "new"}</small>
                </div>    
                <small className='ms-auto'>
                    <i className='muted'>Created</i>: 
                    <strong>{imp.createdAt && <TimeAgo date={new Date(imp.createdAt)} />} </strong> 
                    on {imp.createdAt? new Date(imp.createdAt).toLocaleDateString(): 'Unknown'}
                </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { ImpedimentList };
