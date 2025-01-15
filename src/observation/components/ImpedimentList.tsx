import React, { useEffect, useState } from "react";
import { Impediment } from "../types/Impediment";
import ImpedimentForm from "./ImpedimentForm";
import RoundNumber from "common/components/ui/RoundNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { EventFormData } from "event/components/types/eventForm";
import "../styles/impediment-form.css";
import LimitedCharacters from "common/components/ui/LimitedCharacters";
import DeleteConfirmation from "common/components/alert/DeleteConfirmation";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import useUserProfile from "profile/hooks/useProfile";
import { createImpediment, fetchEventImpediments } from "store/actions/impediment";
import { LoaderPrimary } from "common/components/Loader/Loader";

enum CrudMode {
  None = 'none',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
}

interface IProps{
  eventId?: string,
  impediments: Impediment[],
  eventData: EventFormData,
  onSelect: (impediment: Impediment) => void,
  onDelete: (impediment: Impediment) => void
}

const ImpedimentList: React.FC<IProps> = ({eventId, impediments, eventData, onDelete, onSelect}: IProps) => {
  const [impedimentList, setImpedimentList] = useState<Impediment[]>(impediments || []);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Impediment | undefined>();
  const [crudMode, setCrudMode] = useState<CrudMode>(CrudMode.None);
  const dispatch = useDispatch<AppDispatch>();
  const {data, list, loading: listLoading, isProcessing, isCreating} = useSelector((state: RootState) => state.impediment);
  const {userProfile, loading: userProfileLoading, error: userProfileError } = useUserProfile();
  
  useEffect(() => {
    if(userProfile && eventId){
      dispatch(fetchEventImpediments(eventId));
    }
  }, [userProfile, dispatch]);

  useEffect(() => {
    setImpedimentList(list);
  },[list])

  const handleDeleteClick = (item: Impediment) =>{
      setShowConfirmation(true);
      setSelectedItem(item);
  };

  const deleteItem = () => { 
      if(selectedItem){
          onDelete(selectedItem) 
      }
      setShowConfirmation(false);
      setSelectedItem(undefined);
  }

  const handleCreate = (newImpediment: Impediment) => {
    setImpedimentList([newImpediment, ...impedimentList]);
    setCrudMode(CrudMode.None);

    
    if(!userProfile || !userProfile.userId) throw Error(`No user profile`);
    newImpediment.creatorId = userProfile._id!;
    newImpediment.ownerId = userProfile._id!;
    newImpediment.eventId = eventId!;
      
    dispatch(createImpediment(newImpediment));
  };

  const handleEdit = (imp: Impediment) => {
    setSelectedItem(imp);
    setCrudMode(CrudMode.Edit);
    onSelect(imp);
  }

  const handleUpdate = (index: number, updatedImpediment: Impediment) => {
    const updatedList = [...impedimentList];
    updatedList[index] = updatedImpediment;
    setImpedimentList(updatedList);
  };

  return (
    <div className="container">

      <h6 className='mb-4'>{impedimentList.length} Impediments
        {
          (crudMode !== CrudMode.Create) 
          &&
          <div className='ms-2'>
            <FontAwesomeIcon
                icon={faPlusCircle}
                size="2x"
                onClick={() => setCrudMode(CrudMode.Create)} />
          </div>  
        }
      </h6>
      {
        (crudMode === CrudMode.Create) 
        && 
        <ImpedimentForm 
          onCreate={handleCreate} 
          onCancel={() => setCrudMode(CrudMode.None)} 
        />
      }
      { selectedItem && 
        <ImpedimentForm
          key={""}
          impediment={selectedItem}
          onUpdate={(updated) => handleUpdate(1, updated)} 
          onCancel={() => setCrudMode(CrudMode.None)}
        />
      }
      {listLoading && <LoaderPrimary />}
      {impedimentList.map((imp:Impediment, index:number) => (
        <div key={index} className='observation-entry mb-2' style={{ position: 'relative' }} onClick={() => handleEdit(imp)}>
            <RoundNumber text={`${index + 1}`} />
            <small>{imp.title}</small>
            <div className='impediment-notes'>
              <LimitedCharacters text={imp.notes} limit={150} />
            </div>
            <small className="impediment-title">{imp.type}</small>
            <small className="impediment-status ms-1">{imp.status || "new"}</small>
            {/* Delete Icon */}
                <div className='ms-2'>
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{ position: 'absolute', bottom: '10px', right: '10px', cursor: 'pointer', color: '#dc3545' }}
                        onClick={() => handleDeleteClick(imp)} />
                </div>        
        </div>
      ))}
      {/* Delete Confirmation */}
      {showConfirmation && (
        <DeleteConfirmation
            showConfirmation={showConfirmation}
            setShowConfirmation={setShowConfirmation}
            handleDelete={deleteItem}
            label=''
            item={""}
        />
      )}
    </div>
  );
};

export default ImpedimentList;
