import React, { useEffect, useState } from "react";
import UpdateSettings from "../components/UpdateSettings";
import { orgSettingsAPI } from '../utils/API'; //
import { IOrgSettingsData } from "../types/IOrgSettingsData";
import { LoaderPrimary } from "../../common/components/Loader/Loader";
import useAuthUserId from "auth/hooks/useAuthUser";

const SettingsPage = () => {

  const userId = useAuthUserId(); //"TestUser123";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IOrgSettingsData>();
  const [errorMessage, setErrorMessage] = useState();


    // API call-----------------------------------
    useEffect(() => {
      if(userId){
        handleFetchEvent(userId);
      }
    }, [userId]);
  
    const handleFetchEvent = async (slug: string) => {
      try {
        setIsLoading(true);
        const response = await orgSettingsAPI.getOrgSettingsByUser(slug);
        setData(response.settings);
        console.log(response.settings);
        setIsLoading(false);
      } catch (error: any) {
        setErrorMessage(error);
        setIsLoading(false);
        setData({userId: userId, year: "Unknown"} as any);
      }
    };

  return (
    <div className='settings-container my-5'>
      <h4 className='fw-bold mb-1'>IS020121 Evidence</h4>
      <p className='text-muted'>Please provide information about your org from purpose to scope</p>
      {data && 
        <UpdateSettings 
          settingsData={data}
        />
      }
    </div>
  );
};

export default SettingsPage;
