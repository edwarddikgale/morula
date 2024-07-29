import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { RegistrationData } from '../types/RegistrationData';

const saveUserDetails = async (userId: string, userDetails: RegistrationData) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, userDetails);
    } catch (error) {
      console.error('Error saving user details:', error);
    }
};

export {saveUserDetails}