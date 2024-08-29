import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "store";
import ProfileForm from "../components/ProfileForm";
import ProfileUpdateForm from "../components/ProfileUpdateForm";
import { LoaderPrimary } from "../../common/components/Loader/Loader";
import useAuthUserId from "auth/hooks/useAuthUser";
import { AppDispatch, RootState } from "store/store";

const ProfilePage = () => {
  const userId = useAuthUserId();
  const dispatch = useDispatch<AppDispatch>();

  const {data, loading, isProcessing} = useSelector((state: RootState) => state.profile);

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if(userId){
      dispatch(fetchUserProfile(userId));
    }
  }, [userId, dispatch]);

  return (
    <div className='profile-container my-5'>
      {loading && (!isProcessing) &&  <LoaderPrimary />}
      {!loading && data?._id && <ProfileUpdateForm userData={data} />}
      {!loading && !data?._id && userId && <ProfileForm userId={userId} />}
    </div>
  );
};

export default ProfilePage;
