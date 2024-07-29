import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pageNames } from '../../config/pageNames';
import { useAuth } from '../../providers/authProvider';

export const LogoutPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const logout = async () => {
      try {
        await signOut();
        navigate(pageNames.LOGIN);
      } catch (error) {
        console.error('Error occurred while logging out:', error);
        // Handle error or display error message
      } finally {
        setIsLoading(false);
      }
    };

    logout();
  }, [signOut, navigate]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <span className="spinner-border spinner-border-lg mr-2" role="status" aria-hidden="true"></span>
        <span>Logging you out...</span>
      </div>
    );
  }

  return null; // Or you can render a message or other content
};
