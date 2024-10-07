import React, { useState, useEffect } from "react";
import ActionListContainer from "../components/ActionListContainer";
import ActionListHeaderContainer from "../components/ActionListHeaderContainer";
import CustomModal from "../components/CustomModal";
import { Action } from "../types/Action";
import useUserProfile from "profile/hooks/useProfile";
import useEvent from "event/hooks/useEvent";
import useQueryParameter from "common/url/useQueryParameter";
import axios from 'axios';
import { LoaderPrimary } from "common/components/Loader/Loader";

const ActionListManager: React.FC = () => {
  const apiRouteRoot = `https://susact-dev.herokuapp.com/api`;
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

  // Fetch actions when both userProfile and event are available
  useEffect(() => {
    const fetchActions = async () => {
      if (userProfile && event) {
        setIsLoading(true);
        try {
          const response = await axios.get(`${apiRouteRoot}/useractions/user/${userProfile.userId}?eventId=${event._id}`);
          setActionList(response.data.records as Action[]);
        } catch (error) {
          console.error('Error fetching actions:', error);
          setErrorMessage('Error fetching actions');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchActions();
  }, [userProfile, event, apiRouteRoot]);

  const filteredActionList = actionList.filter((action) => action.title.includes(searchQuery));

  const handleDeleteAction = (index: number) => { /* logic for deleting an action */ };
  const handleEditAction = (index: number, item: Action) => { /* logic for editing an action */ };
  const handleCreateAction = (index: number, item: Action) => { /* logic for creating an action */ };
  const handleSdgChange = () => {} //setSelectedSdg(sdg);

  return (
    <div>
      {/* Show loader or message when user profile or event is missing */}
      {(userProfileLoading || eventLoading || isLoading) && <LoaderPrimary />}
      {(!userProfile && !userProfileLoading) && <p>No user profile available.</p>}
      {(!event && !eventLoading) && <p>No event data available.</p>}

      {/* Only render the action list if user profile and event are valid */}
      {userProfile && event && (
        <>
          <ActionListHeaderContainer
            selectedSdg={selectedSdg || 1} // Defaulting SDG to 1 if not set
            sdgHeader={sdgHeader || { title: "Default SDG" }} // Placeholder sdgHeader
            onHandleSwitchSdg={handleSdgChange}
            showMoreInfo={false} // Set the default value or pass state if needed
            setShowMoreInfo={() => {}} // Placeholder
            eventId={eventId as string}
          />

          <ActionListContainer
            actionList={actionList}
            filteredActionList={filteredActionList}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleDeleteAction={handleDeleteAction}
            handleEditAction={handleEditAction}
            handleCreateAction={handleCreateAction}
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
