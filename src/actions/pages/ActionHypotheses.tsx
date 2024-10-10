import React, { useEffect, useState } from "react";
import {ActionListManager} from "./ActionListManager";
import {HypothesisList} from "./HypothesisList";
import Tabs from "common/components/ui/Tab";

const ActionHypotheses = () => {
  const tabs = [
    {
      id: "tab1",
      label: "Actions",
      content: <ActionListManager />,
    },
    {
      id: "tab2",
      label: "Collections",
      content: <HypothesisList />,
    },
  ];
  return (
    <div className='container-fluid '>
        <div className='mx-3'>
    
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

export default ActionHypotheses;