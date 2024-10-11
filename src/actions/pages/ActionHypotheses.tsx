import React, { useEffect, useState } from "react";
import {ActionListManager} from "./ActionListManager";
import {HypothesisList} from "./HypothesisList";
import Tabs from "common/components/ui/Tab";
import useQueryParameter from "common/url/useQueryParameter";
import EventDetails from "event/components/EventDetails";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import useEvent from "event/hooks/useEvent";
import { Hypothesis } from "observation/types/ScrumAnalysis";
import { dailyObservationAPI } from "observation/utils/API";

const ActionHypotheses = () => {
  const eventId = useQueryParameter("eventId");
  const {list, loading} = useSelector((state: RootState) => state.action);
  const { event, loading: eventLoading, error } = useEvent(eventId);
  const [hypothesisList, setHypothesisList] = useState<Hypothesis[]>([]);

  const fetchHypotheses = async(eventId: string) =>{
    const response = await dailyObservationAPI.getObservationsByEvent(eventId);
    let hypotheses: Hypothesis[] = [];
    response.observations.forEach(obs => {
      if(obs.hypotheses){
        hypotheses = [...hypotheses, ...obs.hypotheses];
      }
    });

    setHypothesisList(hypotheses);
  };

  useEffect(() =>{
    console.log(`attempting to fetch event`);
    if(event && event._id){
      console.log(`Fetching event hypothesese`);
      fetchHypotheses(event._id);
    }
  }, [event])

  const tabs = [
    {
      id: "tab1",
      label: "Actions",
      content: <ActionListManager />,
    },
    {
      id: "tab2",
      label: "Hypotheses",
      content: <HypothesisList hypotheses={hypothesisList} />,
    },
  ];

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