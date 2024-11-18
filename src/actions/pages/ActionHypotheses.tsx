import React, { useEffect, useState } from "react";
import {ActionListManager} from "./ActionListManager";
import {HypothesisList} from "../components/HypothesisList";
import Tabs from "common/components/ui/Tab";
import useQueryParameter from "common/url/useQueryParameter";
import EventDetails from "event/components/EventDetails";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import useEvent from "event/hooks/useEvent";
import { Hypothesis } from "observation/types/ScrumAnalysis";
import { fetchEventObservations } from "store/actions/observation";
import { SprintSummary } from "event/components/SprintSummary";

const ActionHypotheses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const eventId = useQueryParameter("eventId");
  const {list, loading} = useSelector((state: RootState) => state.action);
  const {list:obsList, loading: obsLoading} = useSelector((state: RootState) => state.observation);
  const { event, loading: eventLoading, error } = useEvent(eventId);
  const [hypothesisList, setHypothesisList] = useState<Hypothesis[]>([]);
  const [selectedHypothesisList, setSelectedHypothesisList] = useState<Hypothesis[]>([]);

  useEffect(() => {
    if(obsList){
      let hypotheses: Hypothesis[] = [];
      obsList.forEach(obs => {
        if(obs.hypotheses){
          hypotheses = [...hypotheses, ...obs.hypotheses];
        }
      });  
      setHypothesisList(hypotheses);  
    }

  }, [obsList]);

  useEffect(() => {
    if(event && event._id){
      dispatch(fetchEventObservations(event._id));
    } 
  }, [event]);

  const tabs = [
    {
      id: "tab1",
      label: "Actions",
      content: <ActionListManager hypotheses={selectedHypothesisList} />,
    },
    {
      id: "tab2",
      label: "Hypotheses",
      content: <HypothesisList hypotheses={hypothesisList} onSelectionChange={(selection) => setSelectedHypothesisList(selection)} />,
    }
  ];

  // Conditionally add the Sprint Summary tab if event.category is 'sprint'
  if (event?.category === 'sprint') {
    tabs.push({
      id: "tab3",
      label: "Sprint Summary",
      content: <SprintSummary eventId={event?._id} />,
    });
  }

  return (
    <div className='container-fluid '>
        <div className='mx-3'>
        
          {eventId && 
            <EventDetails 
              eventId={eventId} 
              preText={`${list.length || ""} Actions for event: `}
              showSubDetails={true} />
          }
        </div>  
        <div className='mx-3'>
            <h3 className='fs-1 mt-3 fw-bolder'>Actions & Hypotheses</h3>
            <div>
                <Tabs tabs={tabs} />
            </div>
        </div>
    </div>
  );
};

export  {ActionHypotheses};