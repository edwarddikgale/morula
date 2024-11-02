import React from 'react';
import useEvent from '../hooks/useEvent'; // Adjust the import according to your project's structure
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { pageNames } from 'config/pageNames';
import { faArrowRight, faCalendarCheck, faCalendarTimes, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './styles/event-details.css';

interface EventDetailsProps {
    eventId: string;
    showSubDetails?: boolean;
    preText?: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId, showSubDetails = true, preText }) => {
    const { event, loading, error } = useEvent(eventId);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {event ? (
                <div className='my-2'>
                    <h5 className='d-flex align-items-center'>
                        <strong className='me-2'>{preText}</strong>
                        <Link to={`${pageNames.EVENT_READONLY}/${eventId}`} style={{ textDecoration: "none", display: 'flex', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faChevronLeft} className='me-2' />
                            <span>{event.title}</span>
                        </Link>
                    </h5>
                    {showSubDetails && (
                        <div className='d-flex align-items-center'>
                            <p className='me-3 d-flex align-items-center dates'>
                                <FontAwesomeIcon icon={faCalendarCheck} className='me-2' />
                                From: {new Date(event.startDate).toLocaleDateString()}
                                <FontAwesomeIcon icon={faArrowRight} className='mx-2' />
                                <FontAwesomeIcon icon={faCalendarTimes} className='ms-2 me-2' />
                                To: {new Date(event.endDate).toLocaleDateString()}
                            </p>
                        </div>
                    )}
                </div>

            ) : (
                <p>No event with id {eventId} found</p>
            )}
        </div>
    );
};

export default EventDetails;
