import React, { useEffect, useState } from 'react';
import sdgs from '../data/sdgs.json'; // Import SDGs data
import SDGItem from './PrincipleItem';
import Step from './Step';
import { SDG, UserSDG } from 'principles/types/SDG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSubtract, faTrash } from '@fortawesome/free-solid-svg-icons';
import useAuthUserId from 'auth/hooks/useAuthUser';
import userSdgApi from '../utils/API';
import { LoaderPrimary } from 'common/components/Loader/Loader';
import { Link } from 'react-router-dom';
import { pageNames } from 'config/pageNames';
import {confirmError, confirmSuccess} from 'common/components/confirmation/confirm';
import DeleteConfirmation from 'common/components/ui/DeleteConfirmation';
import NoSdgs from './NoPrinciples';

import '../styles/sdg-selection.css'; // Import the CSS file

const sdgList: SDG[] = sdgs as unknown as SDG[];

const SDGSelected = () => {
  const [selectedSDGs, setSelectedSDGs] = useState<number[]>([]);
  const [userSdg, setUserSdg] = useState<UserSDG | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = useAuthUserId();

  const handleDelete = async () =>{
    if(!userSdg) return;
    setIsLoading(true);
    const id = userSdg._id;
    try{
        const response = await userSdgApi.DeleteUserSdg(id);
        if(response){
            setSelectedSDGs([]);
            setUserSdg(null);
        }
        setIsLoading(false);
    }
    catch(e){
        setIsLoading(false);
    }    
  }  

  const fetchUserSdgs = async (userId: string) =>{
    setIsLoading(true);
    try{
        const response = await userSdgApi.getSdgsByUser(userId) as any;
        if(response){
            setSelectedSDGs(response.userSdg.sdgs);
            setUserSdg(response.userSdg);
        }
        setIsLoading(false);
    }
    catch(e){
        setIsLoading(false);
    }
  }
  
  useEffect(() => {
    if(userId){
        fetchUserSdgs(userId);
    }
  },[userId]);

  return (
    <div className="sdg-selection">
        
        {isLoading && <LoaderPrimary />}

        {!userSdg &&
            <NoSdgs />
        }            
        {userSdg && 
        <Step 
          title={`Your Selected Top ${selectedSDGs.length} SDGs`} 
          description="Based on your ratings in the top SDG selection process you last did."
        >
          {sdgList.filter(sdg => selectedSDGs.includes(sdg.id)).map((sdg: SDG, index: number) => (
            <SDGItem 
              index={index}
              key={sdg.id} 
              sdg={sdg} 
              onSelect={() =>{}} 
              isSelected={true} 
            />
          ))}
        </Step>
        }
        <div className="d-flex justify-content-center mt-3 gap-2">
            {userSdg?._id &&
            <DeleteConfirmation 
                  onDelete={handleDelete}
                  className="btn btn-outline-danger py-3 px-4" 
                  item={{} as any} 
                  index={0} label={'Delete'} />
            }
            <Link 
                to={pageNames.SDG_SELECTOR} 
                className={`btn ${userSdg?"btn-outline-warning":"btn-outline-primary"} py-3 px-4`}
            >
                Start The Rating Process {userSdg? "Again": ""} <FontAwesomeIcon icon={faSubtract} />
            </Link>
        </div>
        
    </div>
  );
};

export default SDGSelected;
