import { useState, useEffect } from 'react';
import { Event } from 'event/types/Event';
import { eventsAPI } from '../utils/API'; // Adjust the import according to your project's structure
import useAuthUserId from 'auth/hooks/useAuthUser';

const useEventCount = () => {
    const [eventCount, setEventCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const userId = useAuthUserId();
    
    useEffect(() => {
        if (!userId) {
            return;
        }

        const fetchEvent = async () => {
            try {
                const response = await eventsAPI.countEventsByUser(userId);
                setEventCount(response.count);
            } catch (err) {
                setError('Failed to fetch event count');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [userId]);

    return { eventCount, loading, error };
};

export default useEventCount;
