import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { pageNames } from 'config/pageNames';
import EventForm from 'event/components/EventForm';
import { EventFormData } from 'event/components/types/eventForm';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {eventsAPI} from '../utils/API';

const EditEventPage = () => {
    let { id } = useParams();
    const [eventData, setEventData] = useState<EventFormData | null>(null);

    const handleFetch = async (id: string) => {
        const response = await eventsAPI.getEventById(id);
        if(response){
            setEventData(response.Event);
        }
    }

    useEffect(() =>{
        if(id){
            handleFetch(id);
        }
    }, [id])

    return (
        <div className='event-container'>
            <div className='mx-3'>
                <Link to={pageNames.EVENT} style={{ textDecoration: "none" }}>
                <FontAwesomeIcon icon={faChevronLeft} />
                Events
                </Link>
                {eventData && 
                    <EventForm 
                        id={id}
                        event={eventData} 
                    />
                }
            </div>
        </div>
    )
}

export default EditEventPage;