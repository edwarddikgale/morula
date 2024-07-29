import { useState, useEffect } from 'react';
import useAuthUserId from '../../auth/hooks/useAuthUser';
import { IOrgSettingsData } from '../types/IOrgSettingsData';
import { orgSettingsAPI } from '../utils/API';

const useOrgSettings = () => {
  const [OrgSettings, setOrgSettings] = useState<IOrgSettingsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = useAuthUserId();

  const fetchOrgSettings = async () => {
    if (userId) {
      try {
        setLoading(true);
        setError(null);
        const response = await orgSettingsAPI.getOrgSettingsByUser(userId);
        const record = response.settings;
        setOrgSettings(record);
      } catch (err) {
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    } else {
      setOrgSettings(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrgSettings();
  }, [userId]);

  return { OrgSettings, loading, error };
};

export default useOrgSettings;
