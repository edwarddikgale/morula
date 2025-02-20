import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store/store';
import { Impediment } from 'observation/types/Impediment'; // adjust the import path as needed
import RoundNumber from 'common/components/ui/RoundNumber';
import { Checkbox } from 'common/components/ui/Checkbox';
import TimeAgo from 'react-timeago';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCalendarPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmation from 'common/components/alert/DeleteConfirmation';
import LimitedCharacters from 'common/components/ui/LimitedCharacters';
import './styles/impediment-list.css';
import { CrudMode } from 'common/enums/crud-mode';
import RightOverlay from 'common/components/overlay/RightOverlay';
import ImpedimentForm from 'observation/components/ImpedimentForm';
import { 
  fetchEventImpediments, 
  createImpediment, 
  updateImpediment, 
  deleteImpediment 
} from 'store/actions/impediment';

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
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState<Impediment[]>([]);
  const [impedimentList, setImpedimentList] = useState<Impediment[]>(cleanList(impediments));
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Impediment | undefined>();
  const [crudMode, setCrudMode] = useState<CrudMode>(CrudMode.None);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

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

  const handleDeleteClick = (item: Impediment) => {
    setShowConfirmation(true);
    setSelectedItem(item);
  };

  const deleteItem = () => {
    if (selectedItem) {
      //onDelete(selectedItem);
    }
    setShowConfirmation(false);
    setSelectedItem(undefined);
  };

  const handleEditClick = (imp: Impediment) => {
    setSelectedItem(imp);
    setIsEditOpen(true);
    //onSelect(imp);
  };

  const handleUpdate = (imp: Impediment) =>{
    dispatch(updateImpediment(imp));
    setCrudMode(CrudMode.None);
    setSelectedItem(undefined);
  }

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
                <div><LimitedCharacters text={imp.notes} limit={250} /></div>
                <div className='mb-4'>
                    <small className="impediment-title">{imp.type}</small>
                    <small className="impediment-status ms-1">{imp.status || "new"}</small>
                </div>    
                <div>
                  <small className='ms-auto'>
                      <FontAwesomeIcon icon={faCalendarPlus} className="me-1" />
                      <i className='muted'>Created</i>: 
                      <strong>{imp.createdAt && <TimeAgo date={new Date(imp.createdAt)} />} </strong> 
                      on {imp.createdAt? new Date(imp.createdAt).toLocaleDateString(): 'Unknown'}
                  </small>
                </div>
                <div>
                  <small className='ms-auto'>
                      <FontAwesomeIcon icon={faCalendarCheck} className="me-1" />
                      <i className='muted'>Updated</i>: 
                      <strong>{imp.updatedAt && <TimeAgo date={new Date(imp.updatedAt)} />} </strong> 
                      on {imp.updatedAt? new Date(imp.updatedAt).toLocaleDateString(): 'Unknown'}
                  </small>
                </div>  
            </div>
            <div>
              {/* Delete Icon */}
              <div className="ms-2">
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '5px',
                    cursor: 'pointer',
                    color: '#e05260',
                  }}
                  onClick={() => handleDeleteClick(imp)}
                />
              </div>
              {/* Edit Icon */}
              <div className="ms-2">
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '40px',
                    cursor: 'pointer',
                    color: '#6666ff',
                  }}
                  onClick={() => handleEditClick(imp)}
                />
              </div>
            </div>  
          </div>
          {showConfirmation && selectedItem && (
              <DeleteConfirmation
                showConfirmation={showConfirmation}
                setShowConfirmation={setShowConfirmation}
                handleDelete={deleteItem}
                label=""
                item={{ name: selectedItem.title }}
              />
          )}
          {isEditOpen && selectedItem && 
            <RightOverlay 
              onClose={() => setIsEditOpen(false)}
              isOpen={isEditOpen}
              children={
                <div>
                    {isEditOpen && (
                      <ImpedimentForm 
                        onCancel={() => setIsEditOpen(false)}  
                        impediment={selectedItem}
                        onUpdate={handleUpdate}
                      />
                    )}
                </div>
              }
            />
          } 
        </div>
      ))}
    </div>
  );
};

export { ImpedimentList };
