import { useEffect, useState } from 'react';
import { Action, UserAction } from '../types';
import axios from 'axios';

export const useFetchActions = (userId: string | null, eventId: string | null, apiRouteRoot: string) => {
  const [actionList, setActionList] = useState<Action[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchActions = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiRouteRoot}/useractions/user/${userId}?eventId=${eventId}`);
        setActionList(response.data.records as UserAction[]);
      } catch (error) {
        setErrorMessage("Error fetching actions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchActions();
  }, [userId, eventId]);

  return { actionList, setActionList, isLoading, errorMessage };
};
