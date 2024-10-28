import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { pageNames } from 'config/pageNames';
import EventReadOnly from 'event/components/EventReadonly';
import { Event } from 'event/types/Event';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {eventsAPI} from '../utils/API';
import { LoaderPrimary } from 'common/components/Loader/Loader';

const ViewEventPage = () =>{
    let { id } = useParams();
    const [eventData, setEventData] = useState<Event | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFetch = async (id: string) => {
        setLoading(true);
        const response = await eventsAPI.getEventById(id);
        if(response){
            setEventData(response.Event);
        }
        setLoading(false);
    }

    useEffect(() =>{
        if(id){
            handleFetch(id);
        }
    }, [id])

    return (
        <div className='event-container'>
            <div className='mx-3'>
                {loading && <LoaderPrimary /> }
                <Link to={pageNames.EVENT} style={{ textDecoration: "none" }}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    Events
                </Link>
                {eventData && id && 
                    <EventReadOnly id={id} event={eventData} />}
            </div>
        </div>
    )
};

export default ViewEventPage;