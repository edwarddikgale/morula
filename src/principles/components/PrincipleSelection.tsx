import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sdgs from '../data/sdgs.json'; // Import SDGs data
import SDGItem from './PrincipleItem';
import Step from './Step';
import { IRating } from '../types/Rating';
import { SDG } from 'principles/types/SDG';
import Rating from './Rating';
import '../styles/sdg-selection.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import useAuthUserId from 'auth/hooks/useAuthUser';
import userSdgApi from '../utils/API';
import { LoaderSm } from 'common/components/Loader/Loader';
import {confirmError, confirmSuccess} from 'common/components/confirmation/confirm';
import { pageNames } from 'config/pageNames';

const sdgList: SDG[] = sdgs as unknown as SDG[];
const MAX_FINAL = 5;

const SDGSelection = () => {
  const [step, setStep] = useState(1);
  const [selectedSDGs, setSelectedSDGs] = useState<number[]>([]);
  const [finalSDGs, setFinalSDGs] = useState<number[]>([]);
  const [importanceRatings, setImportanceRatings] = useState<IRating>({});
  const [controlRatings, setControlRatings] = useState<IRating>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = useAuthUserId();
  const navigate = useNavigate();

  const handleSDGSelect = (id: number) => {
    setFinalSDGs((prev: number[]) =>
      prev.includes(id) ? prev.filter((sdg) => sdg !== id) : [...prev, id]
    );
    //setFinalSDGs((prev: number[]) => [...prev, id]);
  };

  const handleRateImportance = (id: number, rating: number) => {
    setImportanceRatings((prev) => ({ ...prev, [id]: rating }));
  };

  const handleRateControl = (id: number, rating: number) => {
    setControlRatings((prev) => ({ ...prev, [id]: rating }));
  };

  const getTopSDGs = (): number[] => {
    // Combine and sort by importance and control ratings
    const combinedRatings = Object.keys(importanceRatings).map((id: string) => ({
      id: Number(id),
      score: importanceRatings[Number(id)] + (controlRatings[Number(id)] || 0),
    }));
    return combinedRatings.sort((a, b) => b.score - a.score).slice(0, MAX_FINAL).map((item) => item.id);
  };

  const cleanUpFinalSdgs = (topSdgs: number[]) => {
    setFinalSDGs((prev: number[]) => 
        [...prev.filter(id => topSdgs.includes(id))]
    );
  }

  const nextStep = () => {
    if (step === 2) {
        const topSdgs = getTopSDGs()
        setSelectedSDGs(topSdgs);
        cleanUpFinalSdgs(topSdgs);
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const saveSdgs = async (sdgs: number[]) =>{
    try{
        await userSdgApi.CreateUserSdg({userId, sdgs: sdgs});
        confirmSuccess({actionTitle: "Creating priority agile principles"});
        setIsLoading(false);
        navigate(pageNames.SDG_SELECTED);
    }
    catch(e){
        confirmError({actionTitle: "Create priority agile principles"});
        setIsLoading(false);
    };
  };

  return (
    <div className="sdg-selection">
      {step === 1 && (
        <Step 
          title="Step 1: Assess Importance" 
          description="Rate the importance of each Principle to your organization below."
        >
          <div className="rating-list">
            {sdgList.map((sdg: SDG, index) => (
              <Rating 
                index={index}  
                key={sdg.id} 
                sdg={sdg} 
                rating={importanceRatings[sdg.id] || 0} 
                onRate={handleRateImportance} 
              />
            ))}
          </div>
        </Step>
      )}
      {step === 2 && (
        <Step 
          title="Step 2: Assess Control" 
          description="Rate the level of control or influence you have over each important Principle."
        >
          <div className="rating-list">
            {sdgList.filter((sdg) => importanceRatings[sdg.id]).map((sdg: SDG, index: number) => (
              <Rating 
                index={index}  
                key={sdg.id} 
                sdg={sdg} 
                rating={controlRatings[sdg.id] || 0} 
                onRate={handleRateControl} 
              />
            ))}
            {   false && 
                <p className='warning'>You have not rated your sdg's in the previous step, click back and rate at least 3 SDG's</p>
            }
          </div>
        </Step>
      )}
      {step === 3 && (
        <Step 
          title="Step 3: Select Top 3 SDGs" 
          description="We have ordered the Principles list important to you and in your control based on your ratings limited to 5 Principles below. Complete the exercise by selecting the top 3 Principles that you will work with."
        >
          {sdgList.filter(sdg => selectedSDGs.includes(sdg.id)).map((sdg: SDG, index: number) => (
            <SDGItem 
              index={index}
              key={sdg.id} 
              sdg={sdg} 
              onSelect={handleSDGSelect} 
              isSelected={finalSDGs.includes(sdg.id)} 
            />
          ))}
        </Step>
      )}
        <div className="d-flex justify-content-center mt-3 gap-2">
        {step > 1 && (
            <button onClick={prevStep} className="btn btn-outline-secondary py-3 px-4">
                <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
        )}
        {step < 3 && (
            <button onClick={nextStep} className="btn btn-outline-primary py-3 px-4">
                Next <FontAwesomeIcon icon={faArrowRight} />
            </button>
        )}
        {step === 3 && (
            
            <button 
                onClick={() => saveSdgs(finalSDGs)} 
                className="btn btn-outline-success py-3 px-4"
                disabled={finalSDGs.length !== 3}>
                {finalSDGs.length !== 3? `Select 3 Goals To Proceed`: `Confirm Selection`}
                {" "}{finalSDGs.length === 3 && <FontAwesomeIcon icon={faCheck} />}
                {isLoading && <LoaderSm />}
            </button>
            
        )}
        </div>
    </div>
  );
};

export default SDGSelection;
