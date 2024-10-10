import React, { useState, useEffect } from "react";
import ActionListContainer from "../components/ActionListContainer";
import ActionListHeaderContainer from "../components/ActionListHeaderContainer";
import CustomModal from "../components/CustomModal";
import { Action } from "../types/Action";
import useUserProfile from "profile/hooks/useProfile";
import useEvent from "event/hooks/useEvent";
import useQueryParameter from "common/url/useQueryParameter";
import { LoaderPrimary } from "common/components/Loader/Loader";
import { actionAPI } from "actions/utils/actionAPI";
import { actionGenerator } from "actions/utils/actionGenerator";
import { UserAction } from "actions/types";
import ActionEdit from "actions/components/ActionEdit";
import RightOverlay from "common/components/overlay/RightOverlay";
import {updateUserActionHandler, deleteActionHandler, createActionHandler} from "./event-handlers";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserActions } from "store/actions/action";
import { fetchEventUserActions } from "store/actions/action/fetchUserAction";

const ActionListManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const eventId = useQueryParameter("eventId");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { userProfile, loading: userProfileLoading, error: userProfileError } = useUserProfile();
  const { event, loading: eventLoading } = useEvent(eventId);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedSdg, setSelectedSdg] = useState<number | undefined>();
  const [sdgHeader, setSdgHeader] = useState<any>(null); // Placeholder
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [actionList, setActionList] = useState<Action[]>([]);
  const {data, list, loading, isProcessing} = useSelector((state: RootState) => state.action);

  const [isLoadingActions, setIsLoadingActions] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [UserAction, setUserAction] = useState<UserAction>({} as UserAction);
  const [index, setIndex] = useState<number>(-1);

  const generateActions = async () => {
    setIsLoadingActions(true);
    const aiActions: Action[] = await actionGenerator(1);
    if(aiActions)
      setActionList([...aiActions, ...actionList]);
    setIsLoadingActions(false);
  }

  useEffect(() => {
    if(userProfile && event && event._id){
      dispatch(fetchEventUserActions({userId: userProfile.userId, eventId: event._id}));
    }
  }, [userProfile, event, dispatch]);

  // Fetch actions when both userProfile and event are available
  useEffect(() => {
    const fetchActions = async () => {
      if (userProfile && event) {
        setIsLoading(true);
        try {
          const response = await actionAPI.getActions(userProfile.userId, event._id);
          setActionList(response.records);
        } catch (error) {
          console.error('Error fetching actions:', error);
          setErrorMessage('Error fetching actions');
        } finally {
          setIsLoading(false);
        }
      }
    };

    //fetchActions();
  }, [userProfile, event]);

  const filteredActionList = actionList.filter((action) => action.title.includes(searchQuery));

  const handleDeleteAction = async (index: number) => { 
    deleteActionHandler(actionList, index)
      .then(updatedList =>{
        setActionList(updatedList);
      })
      .catch(e => (setErrorMessage(e)));
  };

  const handleCreateAction = async (index: number, item: Action) => {

    createActionHandler({index, item, userProfile, eventId, actionList})
      .then((updatedList) =>{setActionList(updatedList)})
      .catch((e) => setErrorMessage(e));
  };

  const handleEditAction = (index: number, item: Action) => { 
    setIsEditOpen(true);
    setUserAction(actionList[index] as UserAction);
  };

  const onUpdateUserAction = (index: number | null, item: UserAction) => { 
  
    updateUserActionHandler({actionList, index, data: item})
      .then((newActionList) =>{ setActionList(newActionList);})
      .catch((e) => setErrorMessage(e))
      .finally(() => {
        setIsEditOpen(false);
        setIndex(-1);
      });
  };

  const handleSdgChange = () => {} //setSelectedSdg(sdg);

  return (
    <div>
      {/* Show loader or message when user profile or event is missing */}
      {(loading || userProfileLoading || eventLoading || isLoading) && <LoaderPrimary />}
      {(!userProfile && !userProfileLoading) && <p>No user profile available.</p>}
      {(!event && !eventLoading) && <p>No event data available.</p>}

      {/* Only render the action list if user profile and event are valid */}
      {userProfile && event && (
        <>
          <ActionListHeaderContainer
            selectedSdg={selectedSdg || 1} // Defaulting SDG to 1 if not set
            sdgHeader={sdgHeader || { title: "Default Agile Principle" }} // Placeholder sdgHeader
            onHandleSwitchSdg={handleSdgChange}
            showMoreInfo={false} // Set the default value or pass state if needed
            setShowMoreInfo={() => {}} // Placeholder
            eventId={eventId as string}
            actionCount={(actionList && actionList.length) || 0 }
          />

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

          <RightOverlay 
                  onClose={() => setIsEditOpen(false)}
                  isOpen={isEditOpen}
                  children={
                    <div>
                        {isEditOpen && (
                        <ActionEdit
                          userProfile={userProfile}
                          event={event}
                          data={UserAction}
                          onCancel={() => setIsEditOpen(false)}
                          onUpdate={onUpdateUserAction}
                          onDelete={() => {}}
                          index={index}
                        />
                      )}
                    </div>
                  }
          /> 
        </>
      )}

      <CustomModal show={showFeedbackModal} onClose={() => setShowFeedbackModal(false)}>
        <div />
      </CustomModal>
    </div>
  );
};

export { ActionListManager };
