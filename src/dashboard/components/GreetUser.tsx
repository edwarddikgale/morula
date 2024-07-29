import React from 'react';
import useUserProfile from '../../profile/hooks/useProfile';
import { useAuth } from "../../providers/authProvider";

import "../styles/greetuser.css";

interface IProps{
    prefixMessage: string
}

const GreetUser = ({prefixMessage}: IProps) => {
  const { userProfile, loading, error } = useUserProfile();
  const { user } = useAuth();
  let fullName: string | null | undefined = undefined;

  if (loading) return <div>Loading...</div>;
  //if (error) return <div>{error}</div>;
  
  if(error && !fullName && user){
    fullName = user.displayName ? user.displayName : user?.email
  }
  if(userProfile){
    fullName = userProfile.fullName;
  }

  return (
    <div>
      {fullName ? (
        <div>
            <h1 className='welcome-title '>
                {prefixMessage},{"  "}
                {fullName}
            </h1>  
        </div>
      ) : (
        <div>No user profile found</div>
      )}
    </div>
  );
};

export default GreetUser;
