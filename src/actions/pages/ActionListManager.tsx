import React, { useState, useEffect } from "react";
import ActionListContainer from "../components/ActionListContainer";
import CustomModal from "../components/CustomModal";
import { Action } from "../types/Action";
import useUserProfile from "profile/hooks/useProfile";
import useEvent from "event/hooks/useEvent";
import useQueryParameter from "common/url/useQueryParameter";
import { LoaderPrimary } from "common/components/Loader/Loader";
import { UserAction } from "actions/types";
import ActionEdit from "actions/components/ActionEdit";
import RightOverlay from "common/components/overlay/RightOverlay";
import {deleteActionHandler} from "./event-handlers";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import { createUserAction, editUserAction, updateUserAction } from "store/actions/action";
import { fetchAiUserActions, fetchEventUserActions } from "store/actions/action/fetchUserAction";
import EventDetails from "event/components/EventDetails";

const ActionListManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const eventId = useQueryParameter("eventId");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { userProfile, loading: userProfileLoading, error: userProfileError } = useUserProfile();
  const { event, loading: eventLoading } = useEvent(eventId);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [actionList, setActionList] = useState<Action[]>([]);
  const {data, list, loading, isProcessing} = useSelector((state: RootState) => state.action);

  const [isLoadingActions, setIsLoadingActions] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [index, setIndex] = useState<number>(-1);

  const generateActions = async () => {
    setIsLoadingActions(true);
    dispatch(fetchAiUserActions({limit: 1}));
    setTimeout(() => setIsLoadingActions(false), 1000);
  }

  useEffect(() => {
    if(userProfile && event && event._id){
      dispatch(fetchEventUserActions({userId: userProfile.userId, eventId: event._id}));
    }
  }, [userProfile, event, dispatch]);

  const filteredActionList = actionList.filter((action) => action.title.includes(searchQuery));

  const handleDeleteAction = async (index: number) => { 
    deleteActionHandler(actionList, index)
      .then(updatedList =>{
        setActionList(updatedList);
      })
      .catch(e => (setErrorMessage(e)));
  };

  const handleCreateAction = async (index: number, item: Action) => {
    if(!userProfile || !userProfile.userId) throw Error(`No user profile`);
    const userAction: UserAction = { ...item, userId: userProfile?.userId, eventId: eventId };
    dispatch(createUserAction(userAction));
  };

  const handleEditAction = (index: number, item: Action) => { 
    setIsEditOpen(true);
    dispatch(editUserAction(item as UserAction));
  };

  const onUpdateUserAction = (index: number | null, item: UserAction) => { 
    dispatch(updateUserAction(item));
  };

  const handleSdgChange = () => {} //setSelectedSdg(sdg);

  return (
    <div>
      {/* Show loader or message when user profile or event is missing, || userProfileLoading || eventLoading || isLoading */}
      {(loading) && <LoaderPrimary />}
      {(!userProfile && !userProfileLoading) && <p>No user profile available.</p>}
      {(!event && !eventLoading) && <p>No event data available.</p>}

      {/* Only render the action list if user profile and event are valid */}
      {userProfile && event && (
        <>
          {eventId && 
            <EventDetails 
              eventId={eventId} 
              preText={`${list.length || ""} Actions for event: `}
              showSubDetails={true} />
          }

          <ActionListContainer
            actionList={list || actionList}
            filteredActionList={filteredActionList}
            searchQuery={searchQuery}
            isLoadingActions={isLoadingActions}
            setSearchQuery={setSearchQuery}
            handleDeleteAction={handleDeleteAction}
            handleEditAction={handleEditAction}
            handleCreateAction={handleCreateAction}
            generateActions={generateActions}
          />

          {setIsEditOpen && data && 
            <RightOverlay 
                    onClose={() => setIsEditOpen(false)}
                    isOpen={isEditOpen}
                    children={
                      <div>
                          {isEditOpen && (
                          <ActionEdit
                            userProfile={userProfile}
                            event={event}
                            data={data || {} as UserAction}
                            onCancel={() => setIsEditOpen(false)}
                            onUpdate={onUpdateUserAction}
                            onDelete={() => {}}
                            index={index}
                          />
                        )}
                      </div>
                    }
            />
          } 
        </>
      )}

      <CustomModal show={showFeedbackModal} onClose={() => setShowFeedbackModal(false)}>
        <div />
      </CustomModal>
    </div>
  );
};

export { ActionListManager };
