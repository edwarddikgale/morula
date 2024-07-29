import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pageNames } from '../../config/pageNames';
import { useAuth } from '../../providers/authProvider';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { ResetPasswordFormData } from '../types/ResetPasswordFormData';

export const ResetPasswordPage = () => {
    const { resetPassword } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
  }, []);

  const handlePasswordReset = async (data: ResetPasswordFormData) =>{
    try {
        setIsLoading(true);
        const response = await resetPassword(data.email);   
        const successMsg = `A password reset email has been sent to your email address: ${data.email}. Please check your inbox including (your) SPAM folder and follow instructions to reset your password!`;
        setTimeout(() => {
            setSuccessMessage(successMsg);
            setIsLoading(false);
        }, 1000);
        
      } catch (error) {
        setErrorMessage('Invalid email. Please try again.');
        setIsLoading(false);
      }
  }

    return (
        <div>
            <ResetPasswordForm 
                onResetPassword={handlePasswordReset}
                isLoading={isLoading}
                errorMessage={errorMessage}
                successMessage={successMessage}
            />
        </div>
    );
  
};
