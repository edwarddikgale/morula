import React from 'react';
import { Observation } from 'observation/types/Observation';
import DateRange from './DateRange';
import { EventFormData } from 'event/components/types/eventForm';

interface IProps{
    observations: Observation[],
    eventData: EventFormData,
    onSelect: (observation: Observation) => void
}


const ObservationList: React.FC<IProps> = ({observations, eventData, onSelect}: IProps) =>{
    return (
        <div className='observations-list'>
            {observations.map((obs:Observation, index:number) => (
                <div key={index} className='observation-entry mb-2' onClick={() => onSelect(obs)}>
                    <p className='observation-notes'>{obs.notes.substring(0, 150)}...</p>
                    <small>{obs.title}</small>
                    <small>
                        <DateRange 
                                startDate={eventData.startDate} 
                                startTime={eventData.startTime}
                                endDate={eventData.endDate}
                                endTime={eventData.endTime}
                            />
                    </small>
                </div>
            ))}
        </div>  
    )
};

export {ObservationList};
