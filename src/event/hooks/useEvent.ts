import { useState, useEffect } from 'react';
import { Event } from 'event/types/Event';
import { eventsAPI } from '../utils/API'; // Adjust the import according to your project's structure

const useEvent = (eventId: string  | null) => {
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!eventId) {
            setLoading(false);
            setError('No event ID provided');
            return;
        }

        const fetchEvent = async () => {
            try {
                const response = await eventsAPI.getEventById(eventId);
                setEvent(response.Event);
            } catch (err) {
                setError('Failed to fetch event');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    return { event, loading, error };
};

export default useEvent;
