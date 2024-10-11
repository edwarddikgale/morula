import React from 'react';
import { Action } from '../types/Action';
import { Button, Spinner } from 'react-bootstrap';
import LimitedCharacters from 'common/components/ui/LimitedCharacters';
import RoundNumber from 'common/components/ui/RoundNumber';
import { IonIcon } from '@ionic/react';
import { addCircleOutline, addCircleSharp, pencil } from 'ionicons/icons';
import DeleteConfirmation from 'common/components/ui/DeleteConfirmation';

interface ActionListProps {
  data: Action[];
  onDeleteItem: (index: number) => void;
  onEditItem: (index: number, item: Action) => void;
  onCreateItem: (index: number, item: Action) => void;
  isCreating?:boolean;
}

const Actions: React.FC<ActionListProps> = ({ data, onDeleteItem, onCreateItem, onEditItem, isCreating }) => {
  return (
    <div className="list-group my-3 ms-2">
      {data.map((item, index) => (
        <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center mb-4 p-3 border rounded">
          
          <RoundNumber text={`${index + 1}`} />
          <div>
            <h5>{item.title}</h5>
            <LimitedCharacters text={item.description} limit={200} />
            <small>Created on: {item.createdAt? new Date(item.createdAt).toLocaleDateString(): 'Unknown'}</small>
          </div>
          <div>
          <div className='d-flex justify-content-between mb-2 mr-2 '>
            {!item.id && 
              <div 
                className="custom-button"
                onClick={() => onCreateItem(index, item)}
                title="Add to my list"
            >
                <IonIcon icon={addCircleOutline} className="custom-button-icon" />
                <span className='small'>Keep</span>
                {isCreating &&
                  <Spinner animation="border" variant="light" size="sm" className="custom-spinner" />
                } 
                </div>
                }  
                {item.id && 
                  <div 
                    className="custom-button-disabled" 
                    title="Already in list"
                  >
                    <IonIcon icon={addCircleSharp} className="custom-button-icon" /> 
                    <span className='small'>Keep</span>
                  </div>
                }
                
                <div 
                  className="custom-button"
                  onClick={() => onEditItem(index, item)}
                  title="Tailor To My Event"
                >
                  <IonIcon icon={pencil} className="custom-button-icon" />
                  <span className='small'>Customise</span>
                </div>
                
                <DeleteConfirmation 
                  index={index}
                  item={item}
                  label={'Remove'}
                  buttonIsCustom={true}
                  onDelete={() => onDeleteItem(index)}
                />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

//export default ActionList;
export default Actions;
