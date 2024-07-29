import React,{useState} from 'react';
import RegisterForm from '../components/RegisterForm';
import { RegisterFormData } from '../types/RegisterFormData';
import { useAuth} from '../../providers/authProvider';
import { useNavigate } from 'react-router-dom';
import { pageNames } from '../../config/pageNames';
import { saveUserDetails } from '../utils/RegisterApi';
import { RegistrationData } from '../types/RegistrationData';

export const RegisterPage = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onRegister = async (regInfo: RegisterFormData) =>{
    //console.log('Registration data' + JSON.stringify(regInfo));

    try {
      setIsLoading(true);
      const {user} = await signUp(regInfo.email, regInfo.password);
      await saveUserDetails(
        user.uid,
        {
          name: regInfo.name,
          email: user.email,
          company: '',
          country: '',
          city: '',
          gdprOptout: regInfo.gdprConfirm
        } as RegistrationData);

      try {
        setIsLoading(false);
        navigate(pageNames.ACTIONS_INTRO);
      } catch (error) {
        console.log(`🚀 ~ signup error`, error);
        setErrorMessage('There was a problem signing you up, please check your inputs and try again');
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }

  }

  return (
    <div>
        <RegisterForm 
          onSubmit={onRegister} 
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
    </div>
  );
};

