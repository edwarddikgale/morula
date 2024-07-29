import { useState, useEffect } from 'react';
import { auth } from "../../config/firebase";

const useAuthUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        console.log("No user logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  return userId;
};

export default useAuthUserId;
