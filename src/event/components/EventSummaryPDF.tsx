import React, { forwardRef } from 'react';
import EventSummary from '../components/EventSummary';
import { IEventSummary } from 'event/types/EventSummary';

interface IProps {
  data: IEventSummary | null;
}

const EventSummaryPDF = forwardRef<HTMLDivElement, IProps>(({ data }, ref) => (
  <div ref={ref}>
    <EventSummary data={data} />
  </div>
));

export default EventSummaryPDF;
