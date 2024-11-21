import React, { useState, useEffect } from "react";
import ActionListContainer from "../components/ActionListContainer";
import CustomModal from "../components/CustomModal";
import { Action } from "../types/Action";
import { Event } from "event/types/Event";
import useUserProfile from "profile/hooks/useProfile";
import useEvent from "event/hooks/useEvent";
import useQueryParameter from "common/url/useQueryParameter";
import { LoaderPrimary } from "common/components/Loader/Loader";
import { UserAction } from "actions/types";
import ActionEdit from "actions/components/ActionEdit";
import RightOverlay from "common/components/overlay/RightOverlay";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import { createUserAction, deleteUserAction, editUserAction, updateUserAction } from "store/actions/action";
import { fetchAiUserActions, fetchEventUserActions } from "store/actions/action/fetchUserAction";
import { Hypothesis } from "observation/types/ScrumAnalysis";

interface ActionListManagerProps {
  hypotheses?: Hypothesis[];
}

const ActionListManager: React.FC<ActionListManagerProps> = ({hypotheses}: ActionListManagerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const eventId = useQueryParameter("eventId");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {userProfile, loading: userProfileLoading, error: userProfileError } = useUserProfile();
  const {event, loading: eventLoading } = useEvent(eventId);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const {data, list, loading, isProcessing, isCreating} = useSelector((state: RootState) => state.action);

  const [isLoadingActions, setIsLoadingActions] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [index, setIndex] = useState<number>(-1);

  const generateActions = async () => {
    setIsLoadingActions(true);
    const myEvent: Event = event as Event;
    dispatch(fetchAiUserActions({limit: 1, event: myEvent, hypothesisList: hypotheses || []}));
    setTimeout(() => setIsLoadingActions(false), 1000);
  }

  useEffect(() => {
    if(userProfile && event && event._id){
      dispatch(fetchEventUserActions({userId: userProfile.userId, eventId: event._id}));
    }
  }, [userProfile, event, dispatch]);

  const filteredActionList = list.filter((action) => action.title.includes(searchQuery));

  const handleDeleteAction = async (index: number) => { 
    if(!list[index].id) throw Error(`Delete is not possible without an action item's id`);
    dispatch(deleteUserAction({actionId: list[index].id, index: index}));
  };

  const handleCreateAction = async (index: number, item: Action) => {
    if(!userProfile || !userProfile.userId) throw Error(`No user profile`);
    const userAction: UserAction = { ...item, userId: userProfile?.userId, eventId: eventId };
    dispatch(createUserAction({action: userAction, index: index}));
  };

  const handleEditAction = (index: number, item: Action) => { 
    setIsEditOpen(true);
    dispatch(editUserAction(item as UserAction));
  };

  const handleCreateCustomAction = () =>{
    if(!userProfile || !userProfile.userId) throw Error(`No user profile`);
    const newAction: UserAction = {
      userId: userProfile?.userId, eventId: eventId,
      title: "",
      description: "",
      requirement: null,
      frequency: null,
      actionType: null,
      piResource: null,
      resourceUrl: null,
      source: "User",
      sdg: null
    };
    dispatch(editUserAction(newAction));
    setIsEditOpen(prev => !prev);

  }

  const onCreateUserAction = (index: number | null, item: UserAction) => { 
    dispatch(createUserAction({action: item, index: -1}));
    setIsEditOpen(false);
  };

  const onUpdateUserAction = (index: number | null, item: UserAction) => { 
    dispatch(updateUserAction(item));
    setIsEditOpen(false);
  };

  const handleSdgChange = () => {} //setSelectedSdg(sdg);

  return (
    <div>
      {/* Show loader or message when user profile or event is missing, || userProfileLoading || eventLoading || isLoading */}
      {(loading) && <LoaderPrimary />}
      {(!userProfile && !userProfileLoading) && <p>No user profile available.</p>}
      {(!event && !eventLoading) && <p>No event data available.</p>}
      {errorMessage && <div>{errorMessage}</div>}

      {/* Only render the action list if user profile and event are valid */}
      {userProfile && (
        <>
          <ActionListContainer
            actionList={list}
            filteredActionList={filteredActionList}
            searchQuery={searchQuery}
            isLoadingActions={isLoadingActions}
            isCreating={isCreating}
            setSearchQuery={setSearchQuery}
            handleDeleteAction={handleDeleteAction}
            handleEditAction={handleEditAction}
            handleCreateAction={handleCreateAction}
            handleCreateCustomAction={handleCreateCustomAction}
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
                              onUpdate={data.id? onUpdateUserAction: onCreateUserAction}
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
