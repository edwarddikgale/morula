// ImpedimentsManager.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store/store';
import { Impediment, IGenericImpediment, convertToImpediment } from '../types/Impediment';
import ImpedimentForm from './ImpedimentForm';
import ImpedimentList from './ImpedimentList';
import { 
  fetchEventImpediments, 
  createImpediment, 
  updateImpediment, 
  deleteImpediment 
} from 'store/actions/impediment';
import { LoaderPrimary, LoaderSm } from 'common/components/Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faArrowAltCircleDown, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { impedimentService } from 'observation/services/impedimentService';
import useUserProfile from 'profile/hooks/useProfile';
import { EventFormData } from 'event/components/types/eventForm';
import { CrudMode } from 'common/enums/crud-mode';


interface ImpedimentsManagerProps {
  eventData: EventFormData; // Replace with your EventFormData type if available
}

const ImpedimentsManager: React.FC<ImpedimentsManagerProps> = ({ eventData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userProfile } = useUserProfile();
  const eventId = eventData._id!;
  const { list, loading: listLoading } = useSelector((state: RootState) => state.impediment);
  const [crudMode, setCrudMode] = useState<CrudMode>(CrudMode.None);
  const [selectedItem, setSelectedItem] = useState<Impediment | undefined>(undefined);
  const [extractingImpediments, setExtractingImpediments] = useState<boolean>(false);

  // Fetch impediments when user profile and event are available
  useEffect(() => {
    if (userProfile && eventId) {
      dispatch(fetchEventImpediments(eventId));
    }
  }, [userProfile, eventId, dispatch]);

  useEffect(() => {
    if(selectedItem){
      setCrudMode(selectedItem._id? CrudMode.Edit: CrudMode.Create);
    }
  }, [selectedItem])

  const handleDelete = (item: Impediment) => {
    if (item) {
      dispatch(deleteImpediment(item._id!));
    }
    setCrudMode(CrudMode.None);
    setSelectedItem(undefined);
  };

  const handleCreate = (newImpediment: Impediment) => {
    if (!userProfile || !userProfile.userId) {
      throw new Error("No user profile");
    }
    newImpediment.creatorId = userProfile._id!;
    newImpediment.eventId = eventId!;
    dispatch(createImpediment(newImpediment));
    setCrudMode(CrudMode.None);
  };

  const handleEdit = (imp: Impediment) => {
    setSelectedItem(imp);
    setCrudMode(CrudMode.Edit);
  };

  const handleUpdate = (updatedImpediment: Impediment) => {
    dispatch(updateImpediment(updatedImpediment));
    setCrudMode(CrudMode.None);
    setSelectedItem(undefined);
  };

  const handleCancel = () => {
    setCrudMode(CrudMode.None);
    setSelectedItem(undefined);
  };

  const extractImpediments = async () => {
    if (userProfile && eventData && eventData.description) {
      const eventCategory = eventData.category || "daily";
      setExtractingImpediments(true);
      const response = await impedimentService.extractEventImpediments(eventData.description, eventCategory);
      if (response && response.impediments) {
        response.impediments.forEach((genericImp: IGenericImpediment) => {
          const impediment = convertToImpediment(
            genericImp, 
            eventData._id!, 
            userProfile._id!, 
            genericImp.description || `extracted from ${eventCategory}`
          );
          dispatch(createImpediment(impediment));
        });
      }
      setTimeout(() => setExtractingImpediments(false), 1000);
    }
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center mb-4">
        <h6 className="mb-0">{list.length} Impediments</h6>
        {crudMode !== CrudMode.Create && (
          <div className="ms-2">
            <FontAwesomeIcon
              icon={faPlusCircle}
              size="2x"
              onClick={() => setCrudMode(CrudMode.Create)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}
        <button
          type="button"
          className="btn btn-outline-secondary py-2 px-4 ms-4"
          onClick={extractImpediments}
        >
          <FontAwesomeIcon icon={faArrowAltCircleDown} /> Extract Impediment(s)
          {extractingImpediments && <LoaderSm />}
        </button>
      </div>

      {crudMode === CrudMode.Create && (
        <ImpedimentForm 
          onCreate={handleCreate} 
          onCancel={handleCancel} 
        />
      )}

      {selectedItem && crudMode === CrudMode.Edit && (
        <ImpedimentForm
          impediment={selectedItem}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      )}

      {listLoading && <LoaderPrimary />}
      { (crudMode === CrudMode.None) && 
        <ImpedimentList
          eventId={eventId}
          impediments={list}
          eventData={eventData}
          onDelete={handleDelete}
          onSelect={setSelectedItem}
        />
      }
    </div>
  );
};

export default ImpedimentsManager;
