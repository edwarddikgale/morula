import React from 'react';
import TimeAgo from 'react-timeago';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { formatDateFull } from '../utils/utils';

interface EventStartEndDateProps {
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
}

const EventStartEndDate: React.FC<EventStartEndDateProps> = ({
  startDate,
  startTime,
  endDate,
  endTime,
}) => {
  // Helper function to create a Date from a date string and an optional time string.
  // If the date string already includes a "T", then replace the time portion with the provided time.
  const createDate = (dateStr?: string, timeStr?: string): Date | null => {
    if (!dateStr) return null;

    let combined: string;
    if (dateStr.includes('T')) {
      // Extract the date part
      const datePart = dateStr.split('T')[0];
      // Use the provided timeStr if available, otherwise use the original time part
      const timeToUse = timeStr ? timeStr : dateStr.split('T')[1];
      combined = `${datePart}T${timeToUse}`;
    } else {
      // Combine the date string with the time string (if provided)
      combined = timeStr ? `${dateStr}T${timeStr}` : dateStr;
    }
    const date = new Date(combined);
    return isNaN(date.getTime()) ? null : date;
  };

  const startDateTime: Date | null = createDate(startDate, startTime);
  const endDateTime: Date | null = createDate(endDate, endTime);

  return (
    <div className="event-start-end-date">
      <small className="d-block">
        <FontAwesomeIcon icon={faCalendarPlus} className="me-1" />
        <i className="muted">Start</i>:{" "}
        {startDateTime ? (
          <>
            <strong>
              <TimeAgo date={startDateTime} />
            </strong>{" "}
            on {startDate && formatDateFull(startDateTime.toString())}
          </>
        ) : (
          "Unknown"
        )}
      </small>
      {endDateTime && 
        <small className="d-block mt-2">
          <FontAwesomeIcon icon={faCalendarCheck} className="me-1" />
          <i className="muted">End</i>:{" "}
          {endDateTime ? (
            <>
              <strong>
                <TimeAgo date={endDateTime} />
              </strong>{" "}
              on {endDateTime && formatDateFull(endDateTime.toString())}
            </>
          ) : (
            "Unknown"
          )}
      </small>
      }
    </div>
  );
};

export default EventStartEndDate;
