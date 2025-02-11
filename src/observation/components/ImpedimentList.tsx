import React, { useEffect, useState } from "react";
import { convertToImpediment, IGenericImpediment, Impediment } from "../types/Impediment";
import ImpedimentForm from "./ImpedimentForm";
import RoundNumber from "common/components/ui/RoundNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { EventFormData } from "event/components/types/eventForm";
import "../styles/impediment-form.css";
import LimitedCharacters from "common/components/ui/LimitedCharacters";
import DeleteConfirmation from "common/components/alert/DeleteConfirmation";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import useUserProfile from "profile/hooks/useProfile";
import { deleteImpediment, createImpediment, fetchEventImpediments, updateImpediment } from "store/actions/impediment";
import { LoaderPrimary } from "common/components/Loader/Loader";
import { impedimentService } from "observation/services/impedimentService";

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
    setImpedimentList(list.filter(item => item !== null));
  },[list])

  const handleDeleteClick = (item: Impediment) =>{
      setShowConfirmation(true);
      setSelectedItem(item);
      setCrudMode(CrudMode.Delete);
  };

  const deleteItem = () => { 
      if(selectedItem){
          dispatch(deleteImpediment(selectedItem._id!))
          if(onDelete){
            onDelete(selectedItem);
          } 
      }

      setShowConfirmation(false);
      setSelectedItem(undefined);
      setCrudMode(CrudMode.None);
  }

  const handleCreate = (newImpediment: Impediment) => {
    //setImpedimentList([newImpediment, ...impedimentList]);
    setCrudMode(CrudMode.None);

    
    if(!userProfile || !userProfile.userId) throw Error(`No user profile`);
    newImpediment.creatorId = userProfile._id!;
    newImpediment.ownerId = userProfile._id!;
    newImpediment.eventId = eventId!;
      
    dispatch(createImpediment(newImpediment));
  };

  const handleCancel = () =>{
    setSelectedItem(undefined);
    setCrudMode(CrudMode.None);
  }

  const handleEdit = (imp: Impediment) => {
    setSelectedItem(imp);
    setCrudMode(CrudMode.Edit);
    onSelect(imp);
  }

  const handleUpdate = (index: number, impediment: Impediment) => {
    dispatch(updateImpediment(impediment));
  };

  //todo: refactor code to be cleaner! handle all of these in a dispatch instead of here
  const extractImpediments = async () => {
    if(userProfile && eventData && eventData.description){
        const eventCategory = eventData.category || "daily";
        const response = await impedimentService.extractEventImpediments(eventData.description, eventCategory);
        if(response && response.impediments){
          response.impediments.forEach((genericImp: IGenericImpediment)  => {
            const impediment = convertToImpediment(genericImp, eventData._id!, userProfile._id!, userProfile._id!, genericImp.description || `extracted from ${eventCategory}`);
            dispatch(createImpediment(impediment))
          });
        }

    }
  }

  return (
    <div className="container">

      <div className="d-flex align-items-center mb-4">
        <h6 className="mb-0">{impedimentList.length} Impediments</h6>
        {crudMode !== CrudMode.Create && (
          <div className="ms-2">
            <FontAwesomeIcon
              icon={faPlusCircle}
              size="2x"
              onClick={() => setCrudMode(CrudMode.Create)}
            />
          </div>
        )}
        
        <button type='button' className='btn btn-outline-secondary py-2 px-4 ms-4' onClick={extractImpediments}>
          <FontAwesomeIcon icon={faArrowAltCircleDown} /> Extract Impediment(s)
        </button>
      </div>

      {
        (crudMode === CrudMode.Create) 
        && 
        <ImpedimentForm 
          onCreate={handleCreate} 
          onCancel={handleCancel} 
        />
      }
      { selectedItem && 
        (crudMode === CrudMode.Edit) &&
        <ImpedimentForm
          key={""}
          impediment={selectedItem}
          onUpdate={(updated) => handleUpdate(1, updated)} 
          onCancel={handleCancel}
        />
      }
      {listLoading && <LoaderPrimary />}
      {impedimentList && impedimentList.map((imp:Impediment, index:number) => (
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
            item={{name: selectedItem?.title}}
        />
      )}
    </div>
  );
};

export default ImpedimentList;
