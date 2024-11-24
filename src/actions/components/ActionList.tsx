import React, { useState } from 'react';
import { Action } from '../types/Action';
import { Button, Spinner } from 'react-bootstrap';
import LimitedCharacters from 'common/components/ui/LimitedCharacters';
import RoundNumber from 'common/components/ui/RoundNumber';
import { IonIcon } from '@ionic/react';
import { addCircleOutline, addCircleSharp, pencil } from 'ionicons/icons';
import DeleteConfirmation from 'common/components/ui/DeleteConfirmation';

import "./styles/action-list.css";
import { HypothesisList } from './HypothesisList';
import { Hypothesis } from 'observation/types/ScrumAnalysis';
import RightOverlay from 'common/components/overlay/RightOverlay';

interface ActionListProps {
  data: Action[];
  onDeleteItem: (index: number) => void;
  onEditItem: (index: number, item: Action) => void;
  onCreateItem: (index: number, item: Action) => void;
  isCreating?:boolean;
}

const ActionList: React.FC<ActionListProps> = ({ data, onDeleteItem, onCreateItem, onEditItem, isCreating }) => {
  const [hypothesisVisibility, setHypothesisVisibility] = useState<{[key:string]:boolean}>({});

  const toggleHypotheses =  (id: string) =>{
    setHypothesisVisibility(prevState =>({
      ...prevState,
      [id]: !prevState[id]
    }))
  };

  return (
    <div className="list-group my-3 ms-2">
      {data.map((item, index) => (
        <div key={item.id || `key-${index}`} className="list-group-item d-flex justify-content-between align-items-center mb-4 p-3 border rounded">
          
          <RoundNumber text={`${index + 1}`} />
          <div className='row g-1 mb-3'>
            <div className='col-1 col-md-1'>
              <p className='action-type vertical-text'>
                  {item.actionType || 'Unknown'}
              </p>
            </div>
            <div className='col-11 col-md-11'>
              <h5>{item.title}</h5>
              <LimitedCharacters text={item.description} limit={200} />
              {item.hypotheses &&
                <button type='button' className='btn btn-outline-secondary btn-sm ms-3' onClick={() => toggleHypotheses(item.id || `key-${index}`)}>
                  {item.hypotheses?.length || 0} Hypotheses
                </button>
              }
              {hypothesisVisibility[item.id || `key-${index}`] && item.hypotheses && 
                <RightOverlay 
                        onClose={() => toggleHypotheses(item.id || `key-${index}`)}
                        isOpen={hypothesisVisibility[item.id || `key-${index}`]}
                        children={
                          <div>
                              {hypothesisVisibility[item.id || `key-${index}`] && (
                                  <div className='p-4'>
                                    <HypothesisList hypotheses={item.hypotheses} selectable={false} />
                                  </div>
                              )}
                          </div>
                        }
                />
              } 
              <div className=''>
                <small className='ms-auto'>Created on: {item.createdAt? new Date(item.createdAt).toLocaleDateString(): 'Unknown'}</small>
              </div>
            </div>  
          </div>
          <div>
          <div className='d-flex justify-content-between mb-2 mr-2'>
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

export default ActionList;
