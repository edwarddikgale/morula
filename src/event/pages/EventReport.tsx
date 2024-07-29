import React, { useEffect, useRef, useState } from 'react';
import EventSummary from '../components/EventSummary';
import EventSummaryPDF from '../components/EventSummaryPDF';
import Tabs from 'common/components/ui/Tab';
import { useParams } from 'react-router-dom';
import { eventsAPI } from 'event/utils/API';
import { IEventSummary } from 'event/types/EventSummary';
import { useReactToPrint } from 'react-to-print';

const EventReport = () => {
  let { id } = useParams();
  const [eventData, setEventData] = useState<IEventSummary | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleFetch = async (id: string) => {
    const response = await eventsAPI.getEventSummary(id);
    if (response) {
      setEventData(response);
    }
  };

  useEffect(() => {
    if (id) {
      handleFetch(id);
    }
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const tabs = [
    {
      id: 'tab1',
      label: 'Event Report',
      content: <EventSummary data={eventData} />,
    },
    {
      id: 'tab2',
      label: 'PDF version',
      content: (
        <div>
          <button onClick={handlePrint} className="btn btn-primary mb-3">
            Print PDF
          </button>
          <div style={{ display: 'none' }}>
            <EventSummaryPDF ref={componentRef} data={eventData} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid ">
      <div className="mx-3">
        <h3 className="fs-1 mt-3 fw-bolder">Event Report</h3>
        <div>
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
};

export default EventReport;
