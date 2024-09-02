import React from 'react';
import { faArrowRight, faCalendarAlt, faCalendarDay, faClock, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatToDateString } from 'event/components/utils/utils';
import { EventFormData } from 'event/components/types/eventForm';

interface IProps{
    startDate: string,
    startTime: string | undefined,
    endDate: string,
    endTime: string | undefined
}

const DateRange: React.FC<IProps> = ({startDate, startTime, endDate, endTime}) =>{
    return (
        <div className='small text-muted'>
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                {formatToDateString(new Date(startDate))} 
            <FontAwesomeIcon icon={faClock} className="mx-2" />
                at {startTime}
            <FontAwesomeIcon icon={faArrowRight} className="mx-2" />
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                {formatToDateString(new Date(endDate))}
            <FontAwesomeIcon icon={faClock} className="mx-2" />
                at {endTime}
        </div>        
    )
};

export default DateRange;