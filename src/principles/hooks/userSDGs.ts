import { useState, useEffect } from 'react';
import useAuthUserId from '../../auth/hooks/useAuthUser';
import { userSdgAPI } from '../utils/API';
import { UserSDG } from 'principles/types/SDG';

const useUserSDG = () => {
  const [userSDG, setUserSDG] = useState<UserSDG | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = useAuthUserId();

  const fetchUserSDG = async () => {
    if (userId) {
      try {
        setLoading(true);
        setError(null);
        const response = await userSdgAPI.getSdgsByUser(userId);
        const userSdg = response.userSdg;
        setUserSDG(userSdg);
      } catch (err) {
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    } else {
      setUserSDG(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserSDG();
  }, [userId]);

  return { userSDG, loading, error };
};

export default useUserSDG;
