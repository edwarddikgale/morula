import { useState, useEffect } from 'react';
import useAuthUserId from '../../auth/hooks/useAuthUser';
import { UserProfile } from 'profile/types/profile';
import { profileAPI } from '../utils/API';

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = useAuthUserId();

  const fetchUserProfile = async () => {
    if (userId) {
      try {
        setLoading(true);
        setError(null);
        const response = await profileAPI.getProfileByUser(userId);;
        setUserProfile(response.userprofile);
      } catch (err) {
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    } else {
      setUserProfile(null);
      setError(`User currently not logged in`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  return { userProfile, loading, error };
};

export default useUserProfile;
