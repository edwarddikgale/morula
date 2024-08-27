import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "store";
import ProfileForm from "../components/ProfileForm";
import { profileAPI } from "../utils/API";
import { UserProfile } from "../types/profile";
import ProfileUpdateForm from "../components/ProfileUpdateForm";
import { LoaderPrimary } from "../../common/components/Loader/Loader";
import useAuthUserId from "auth/hooks/useAuthUser";
import { AppDispatch, RootState } from "store/store";

const ProfilePage = () => {
  const userId = useAuthUserId();
  const dispatch = useDispatch<AppDispatch>();

  const {data, loading, error} = useSelector((state: RootState) => state.profile)

  //const [data, setData] = useState<UserProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  //const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getProfileByUser } = profileAPI;

  // API call-----------------------------------
  /*
  useEffect(() => {
    if(userId){
      setData({userId: userId} as any);
      handleFetchEvent(userId);
    }
  }, [userId]);
  */

  /*
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
  };*/

  useEffect(() => {
    if(userId){
      dispatch(fetchUserProfile(userId));
    }
  }, [userId, dispatch]);

  // API call-----------------------------------

  return (
    <div className='profile-container my-5'>
      {loading && <LoaderPrimary />}
      {!loading && data?._id && <ProfileUpdateForm userData={data} />}
      {!loading && !data?._id && userId && <ProfileForm userId={userId} />}
    </div>
  );
};

export default ProfilePage;
