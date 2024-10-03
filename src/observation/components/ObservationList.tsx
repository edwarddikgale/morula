import React, {useState} from 'react';
import { Observation } from 'observation/types/Observation';
import DateRange from './DateRange';
import { EventFormData } from 'event/components/types/eventForm';
import RoundNumber from 'common/components/ui/RoundNumber';
import DeleteConfirmation from "../../common/components/alert/DeleteConfirmation";
import { dailyObservationAPI } from 'observation/utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface IProps{
    observations: Observation[],
    eventData: EventFormData,
    onSelect: (observation: Observation) => void,
    onDelete: (observation: Observation) => void
}

const ObservationList: React.FC<IProps> = ({observations, eventData, onSelect, onDelete}: IProps) =>{
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Observation | undefined>();

    const handleDeleteClick = (item: Observation) =>{
        setShowConfirmation(true);
        setSelectedItem(item);
    };

    const deleteItem = () => { 
        if(selectedItem){
            onDelete(selectedItem) 
        }
        setShowConfirmation(false);
        setSelectedItem(undefined);
    }

    return (
        <div className='observations-list'>
            <h6 className='mb-2'>{observations.length} Observations</h6>
            {observations.map((obs:Observation, index:number) => (
                <div key={index} className='observation-entry mb-2' style={{ position: 'relative' }} onClick={() => onSelect(obs)}>
                    <RoundNumber text={`${index + 1}`} />
                    <p className='observation-notes ms-1'>{obs.notes.substring(0, 150)}...</p>
                    <small>{obs.title}</small>
                    <small>
                        <DateRange 
                                startDate={eventData.startDate} 
                                startTime={eventData.startTime}
                                endDate={eventData.endDate}
                                endTime={eventData.endTime}
                            />
                    </small>
                    {/* Delete Icon */}
                        <div className='ms-2'>
                            <FontAwesomeIcon
                                icon={faTrash}
                                style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', color: '#dc3545' }}
                                onClick={() => handleDeleteClick(obs)} />
                        </div>        
                </div>
            ))}
            {/* Delete Confirmation */}
            {showConfirmation && (
                <DeleteConfirmation
                    showConfirmation={showConfirmation}
                    setShowConfirmation={setShowConfirmation}
                    handleDelete={deleteItem}
                    label=''
                    item={""}
                />
            )}
        </div>  
    )
};

export {ObservationList};
