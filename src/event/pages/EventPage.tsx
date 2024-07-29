import React, { useEffect, useState } from "react";
import EventTable from "../components/EventTable";
import Tabs from "common/components/ui/Tab";

const EventPage = () => {
  const tabs = [
    {
      id: "tab1",
      label: "Events",
      content: <EventTable />,
    },
    /*{
      id: "tab2",
      label: "Collections",
      content: <h2>Collections</h2>,
    },*/
  ];
  return (
    <div className='container-fluid '>
      <div className='mx-3'>
        <h3 className='fs-1 mt-3 fw-bolder'>Events</h3>
        <div>
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
