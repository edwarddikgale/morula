import React, { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import { profileAPI } from "../utils/API";
import { UserProfile } from "../types/profile";
import ProfileUpdateForm from "../components/ProfileUpdateForm";
import { LoaderPrimary } from "../../common/components/Loader/Loader";
import useAuthUserId from "auth/hooks/useAuthUser";

const ProfilePage = () => {
  const userId = useAuthUserId();
  const [data, setData] = useState<UserProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getProfileByUser } = profileAPI;

  // API call-----------------------------------
  useEffect(() => {
    if(userId){
      setData({userId: userId} as any);
      handleFetchEvent(userId);
    }
  }, [userId]);

  const handleFetchEvent = async (slug: string) => {
    try {
      setIsLoading(true);
      const response = await getProfileByUser(slug);
      setData(response.userprofile);
      setIsLoading(false);
    } catch (error: any) {
      setErrorMessage(error);
      setIsLoading(false);
    }
  };

  // API call-----------------------------------

  return (
    <div className='profile-container my-5'>
      {isLoading && <LoaderPrimary />}
      {!isLoading && data?._id && <ProfileUpdateForm userData={data} />}
      {!isLoading && !data?._id && userId && <ProfileForm userId={userId} />}
    </div>
  );
};

export default ProfilePage;
