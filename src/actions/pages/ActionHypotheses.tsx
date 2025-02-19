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
import { fetchEventImpediments } from "store/actions/impediment";
import { SprintSummary } from "event/components/SprintSummary";
import { ImpedimentList } from "actions/components/ImpedimentList";
import { Impediment } from "observation/types";

const ActionHypotheses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const eventId = useQueryParameter("eventId");
  const {list, loading} = useSelector((state: RootState) => state.action);
  const {list:obsList, loading: obsLoading} = useSelector((state: RootState) => state.observation);
  const {list:impList, loading: impLoading} = useSelector((state: RootState) => state.impediment);
  const { event, loading: eventLoading, error } = useEvent(eventId);
  const [hypothesisList, setHypothesisList] = useState<Hypothesis[]>([]);
  const [impedimentList, setImpedimentList] = useState<Impediment[]>([]);
  const [selectedHypothesisList, setSelectedHypothesisList] = useState<Hypothesis[]>([]);
  const [selectedImpedimentList, setSelectedImpedimentList] = useState<Impediment[]>([])

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
    if(impList){
      setImpedimentList(impList);
    }
  }, [impList])

  useEffect(() => {
    if(event && event._id){
      dispatch(fetchEventObservations(event._id));
      dispatch(fetchEventImpediments(event._id));
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
      label: "Impediments",
      content: <ImpedimentList impediments={impedimentList} selectable={true} onSelectionChange={(selection) => setSelectedImpedimentList(selection)} />,
    },
    {
      id: "tab3",
      label: "Hypotheses",
      content: <HypothesisList hypotheses={hypothesisList} selectable={true} onSelectionChange={(selection) => setSelectedHypothesisList(selection)} />,
    }
  ];

  // Conditionally add the Sprint Summary tab if event.category is 'sprint'
  if (event?.category === 'sprint') {
    tabs.push({
      id: `tab${tabs.length + 1}`,
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