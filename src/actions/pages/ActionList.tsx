import React, { useEffect, useState } from "react";
import ActionList from "../components/ActionList";
import ActionEdit from "../components/ActionEdit";
import { Card, Modal } from "react-bootstrap";
import { Action } from "../types/Action";
import "./action-list.css";
import { UserAction } from "../types/UserAction";
import { auth } from "../../config/firebase";
import axios from "axios";
import RandomActionGenerator from "../utils/randomActionGenerator";
import ActionsExportToExcel from "../components/ActionsExcelExport";
import ActionListHeader from "../components/ActionListHeader";
import FeedbackSurveyModal from "../../common/components/feedback/FeedbackSurveyModal";
import EventDetails from "event/components/EventDetails";
import RightOverlay from "../../common/components/overlay/RightOverlay";
import openAiActions from "../utils/openAiActions";
import SdgPickerContainer from "actions/components/sdg/SdgPickerContainer";
import ActionPageInfo from "actions/components/ActionPageInfo";
import useUserProfile from "profile/hooks/useProfile";
import useEvent from "event/hooks/useEvent";
import useQueryParameter from "common/url/useQueryParameter";
import SearchBox from "common/components/search/SearchBox";
import ActionButtons from "actions/components/ActionButtons";
import useUserSDG from "principles/hooks/userSDGs";
import { sdgListGetter } from "common/data/sdgListGetter";
import { SdgHeader } from "actions/types/Sdg";
import { actionAPI } from "actions/utils/actionAPI";

export const ActionListPage = () => {

  const defaultSdg = 1;
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showSwitchSdgModal, setShowSwitchSdgModal] = useState(false);
  const [selectedSdg, setSelectedSdg] = useState<number | undefined>(defaultSdg);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const eventId = useQueryParameter("eventId");
  const { userProfile, loading, error } = useUserProfile();
  const {userSDG} = useUserSDG();
  const { event } = useEvent(eventId);
  
  const [randomActionGenerator, setRandomActionGenerator] = useState<any>(null);

  const [actionList, setActionList] = useState([] as Action[]);
  const [filteredActionList, setFilteredActionList] = useState([] as Action[]);
  const [index, setIndex] = useState<number>(-1);
  const [UserAction, setUserAction] = useState<UserAction>({} as UserAction);
  const [sdgHeader, setSdgHeader] = useState<SdgHeader | null>(null);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  //const apiRouteRoot = `https://susact-dev.herokuapp.com/api`;

  useEffect(() => {
    if(userSDG){
        const sdgHeaders = sdgListGetter(userSDG.sdgs);
        setSdgHeader(sdgHeaders[0]);
    }
  }, [userSDG]); // The empty dependency array ensures the effect runs only once on mount

  const handleOpenFeedbackModal = () => {
    setShowFeedbackModal(true);
  };

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
  };

  const onHandleSwitchSdg = () => {
    setShowSwitchSdgModal(true);
  };

  const updateFilteredList = (list: Action[]) =>{
    setFilteredActionList(filterActionList(searchQuery || "", list));
  }

  const handleDeleteAction = async(index: number) => {
    const thisAction = actionList && actionList.length >= 0 ? actionList[index] : null;
    if (thisAction && thisAction.id) {
      await actionAPI.deleteUserAction(thisAction.id);
    }
    const updatedItems = [...actionList];
    updatedItems.splice(index, 1);
    setActionList(updatedItems);
  };

  const handleEditAction = (index: number, item: Action) => {
    setIndex(index);
    setUserAction({ ...item, userId: userId });
    setIsEditOpen(true);
  };

  const handleCreateAction = async (index: number, item: Action) => {
    setIndex(index);
    
    if (selectedSdg && !item.sdg) item.sdg = selectedSdg;
    //const res = await axios.post(`${apiRouteRoot}/userActions`, { ...item, userId: userId, eventId: eventId });
    const response = await actionAPI.createUserAction({ ...item, userId: userId, eventId: eventId });
    const userAction: UserAction = response.userAction;//response.data.userAction;

    setActionList((prevActionList) => {
      const updatedList = [...prevActionList];
      updatedList[index] = userAction;
      return updatedList;
    });
  };

  const handleUpdateUserAction = async (index: number | null, data: UserAction) => {
    setTimeout(() => setIsEditOpen(false), 400);

    try {
      const actionIsNew = !data.id;
      if (selectedSdg && !data.sdg) data.sdg = selectedSdg;
      let response: any = null;
      /*const resp = data.id
        ? await axios.patch(`${apiRouteRoot}/userActions/${data.id}`, data)
        : await axios.post(`${apiRouteRoot}/userActions`, data);*/

      response = data.id ? await actionAPI.updateUserAction(data, data.id): await actionAPI.createUserAction(data);
      const userAction: UserAction = response.userAction;

      setActionList((prevActionList) => {
        const updatedActionList = prevActionList.map((action) => {
          return action.id === userAction.id ? userAction : action;
        });

        // If the action doesn't exist in the array, add it.. i..e new
        if (!index || index < 0) {
          updatedActionList.push(userAction);
        }

        //If the action was not a part of user's saved (book marked actions) before...
        if (index && !data.id) {
          updatedActionList[index] = userAction;
        }

        return updatedActionList;
      });

      setIndex(-1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUserAction = (index: number) => {
    if (index >= 0) handleDeleteAction(index);
  };

  const handleCancelEditModal = () => {
    setIsEditOpen(false);
  };

  const getActions = async () => {

    try {
      setIsLoading(true);
      let rndAGen: any;

      if(!randomActionGenerator){
        rndAGen = new RandomActionGenerator(selectedSdg ? selectedSdg : defaultSdg, false);
        setRandomActionGenerator(rndAGen);
      }
      else{
        rndAGen = randomActionGenerator;
      }

      const aiActions: any[] = [await openAiActions.getActionBySdg(selectedSdg as number)];
      const globalActions: any[] = rndAGen.getRandomActions(2);
      setActionList([...actionList, ...globalActions, ...aiActions]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const toggleEditComponent = () => {
    setIsEditOpen(!isEditOpen);
  };

  const createCustomAction = () => {
    setIsEditOpen(false);
    setIndex(-1);
    setUserAction({ userId: userId } as UserAction);
    setTimeout(() => setIsEditOpen(true), 400);
  };

  const filterActionList = (searchQuery:string, list: Action[]) =>{
    const searchQ = (searchQuery || '').toLocaleLowerCase();
    return list.filter(action =>
      action.title?.toLocaleLowerCase().includes(searchQ) || 
      action.description?.toLocaleLowerCase().includes(searchQ)
    );
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        setUserId(userId);
        // Use the userId in your application logic
      } else {
        // User is not logged in
        console.log("No user logged in");
      }
    });

    return () => unsubscribe(); // Unsubscribe from the observer when component unmounts
  }, []);

  useEffect(() => {
    if (userId) {
      actionAPI.getActions(userId, eventId)
        .then((data) => {
          setActionList(data.records as UserAction[]);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [userId, eventId]);

  useEffect(() => {
    if(searchQuery && searchQuery.length > 0){
      const filteredList = filterActionList(searchQuery, actionList);
      setFilteredActionList(filteredList);
    }
    else{
      setFilteredActionList(actionList);
    }
  },[searchQuery]);

  useEffect(() =>{
    //display more info if there is no action list
    setShowMoreInfo(actionList && actionList.length === 0);
    updateFilteredList(actionList);
  }, [actionList]);

  const handleSdgChange = (sdg: number | undefined) => {
    if(!sdg) return;
    setSelectedSdg(undefined);
    setRandomActionGenerator(new RandomActionGenerator(sdg || defaultSdg, true));
    const sdgHeaders = sdgListGetter([sdg]);

    setSdgHeader(sdgHeaders[0]);
    setTimeout(() => setSelectedSdg(sdg), 1000);
    setShowSwitchSdgModal(false);
  };

  return (
    <div>
      <Card className='border-2'>
        <div className='p-1 card-body'>
          {eventId && 
            <EventDetails 
              eventId={eventId} 
              preText={`${actionList && actionList.length > 0? actionList.length: ""} Actions for event: `}
              showSubDetails={true} />
          }
          {selectedSdg && (
            <ActionListHeader 
              sdg={selectedSdg ? selectedSdg : defaultSdg} 
              sdgHeader={sdgHeader}
              changeSdg={onHandleSwitchSdg} 
              onShowMore={() => setShowMoreInfo(!showMoreInfo)}
              eventId={eventId || undefined}
              canChange={true}
              />
          )}
        </div>
      </Card>
      
      <div className="mt-2">
        <div className="row">
          <div className="col-4">
            <SearchBox 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              placeholder={"Search actions..."}
            />
          </div>
          <div className="col-2">
            {searchQuery &&      
              <div className="mt-2">
                {filteredActionList.length} / {actionList.length} <strong>Found</strong>  
              </div>   
            }
          </div>
          <div className="col-6 d-flex justify-content-end">
            <ActionButtons
              getActions={getActions}
              createCustomAction={createCustomAction}
              handleOpenFeedbackModal={handleOpenFeedbackModal}
              isLoading={isLoading}
              actionList={actionList}
              hideExport={true} />
          </div>
        </div>
      </div>

      {actionList && actionList.length > 0 && (
        <ActionList
          key={actionList.length}
          data={searchQuery && searchQuery.length > 0? filteredActionList: actionList}
          onDeleteItem={handleDeleteAction}
          onEditItem={handleEditAction}
          onCreateItem={handleCreateAction}
        />
      )}
      <div className='container-fluid bottom-actions mt-4'>
        <ActionButtons
          getActions={getActions}
          createCustomAction={createCustomAction}
          handleOpenFeedbackModal={handleOpenFeedbackModal}
          isLoading={isLoading}
          actionList={actionList}
        />
      </div>
      <RightOverlay 
        onClose={handleCancelEditModal}
        isOpen={isEditOpen}
        children={
          <div>
              {isEditOpen && (
              <ActionEdit
                userProfile={userProfile}
                event={event}
                data={UserAction}
                onCancel={handleCancelEditModal}
                onUpdate={handleUpdateUserAction}
                onDelete={() => {}}
                index={index}
              />
            )}
          </div>
        }
      /> 
      <RightOverlay 
        onClose={()=> setShowMoreInfo(false)}
        isOpen={showMoreInfo}
        children={
          <div>
              {showMoreInfo && (
              <ActionPageInfo
                sdg={selectedSdg ? selectedSdg : defaultSdg} 
                sdgHeader={sdgHeader}
              />
            )}
          </div>
        }
      />      
      <div>
        {showFeedbackModal && (
          <FeedbackSurveyModal
            onDoneComponent={<ActionsExportToExcel data={actionList} />}
            onCancel={() => setShowFeedbackModal(false)}
          />
        )}
      </div>
      <div>
        <RightOverlay 
          onClose={() => setShowSwitchSdgModal(false)}
          isOpen={showSwitchSdgModal}
          children={
            <div>
                {showSwitchSdgModal && (
                 <SdgPickerContainer 
                  currentSdg={selectedSdg || defaultSdg}
                  onCancel={() => setShowSwitchSdgModal(false)} 
                  onApply={handleSdgChange} />  
                )}
            </div>
          }
        />  
      </div>
    </div>
  );
};
