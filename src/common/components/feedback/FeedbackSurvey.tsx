import React, {useEffect, useState} from 'react';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase'; // Replace with your Fire

const FeedbackSurvey = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [feedbackSurveyLink, setFeedbackSurveyLink] = useState('');

    useEffect(() => {
        const surveyDocRef = doc(db, 'surveys', 'C86mPcRlLkf33V9vqZNh');
    
        // Read the initial value of feedbackSurveyLink
        getDoc(surveyDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const data = docSnapshot.data();
              if (data && data.feedbackSurveyLink) {
                setFeedbackSurveyLink(data.feedbackSurveyLink);
                console.error('survey feedback link has been set to ' + data.feedbackSurveyLink);
              }
            }
          })
          .catch((error) => {
            console.error('Error reading survey feedback document:', error);
          });
    
        // Listen for changes to feedbackSurveyLink
        const unsubscribe = onSnapshot(surveyDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            if (data && data.feedbackSurveyLink) {
              setFeedbackSurveyLink(data.feedbackSurveyLink);
            }
          }
        });
    
        // Clean up the listener when component unmounts
        return () => {
          unsubscribe();
        };
    }, []);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1300);
    }, [])
    return (
        <div>
            {
            isLoading &&
            "Please wait while the survey loads..."
           }    
            <iframe
                src={feedbackSurveyLink}
                width="100%"
                height="600"
            >
            </iframe>
        </div>
    );
};

export default FeedbackSurvey;
export {}; // Add this empty export statement to make it a module