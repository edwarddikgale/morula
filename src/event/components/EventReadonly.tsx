import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faCalendarDays, faTengeSign, faTextWidth, faEdit, faListDots, faFileAlt, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import FormSectionContainer from "./FormSectionContainer";
import { formatToDateString } from "./utils/utils";
import { EventFormData } from "./types/eventForm";
import { Link } from "react-router-dom";
import { pageNames } from "config/pageNames";
import { findEventCatByVal } from "event/utils/findEventCategory";
import ObservationForm from "observation/components/ObservationForm";
import RightOverlay from "common/components/overlay/RightOverlay";
import EventDetails from "./EventDetails";
import { EventAttendees } from "./EventAttendees";

interface IProps {
    event: EventFormData;
    id: string;
}

const EventReadOnly: React.FC<IProps> = ({ id, event }) => {
    const {
        title,
        category,
        parentId,
        tags,
        locationType,
        venue,
        isRecurring,
        startDate,
        startTime,
        endDate,
        endTime,
        timeZone,
        summary,
        description,
        attendee_estimate,
        teamId: eventTeamId,
        teamMemberIds
    } = event;

    const eventCategory = findEventCatByVal(category);
    const [isObservationOpen, setIsObservationOpen] = useState<boolean>(false);

    const handleCloseObservationModal = () =>{
        setIsObservationOpen(false);
    }

    const handleOpenObservationModal = () => {
        setIsObservationOpen(true);
    }

    return (
        <div className="container">
            {/* Basic Info */}
            <FormSectionContainer
                isHr={true}
                className="basic-info"
                icon={faTextWidth}
                title="Basic Info"
                description="Details about the event"
            >
                <div className="row">
                    <div className="col-md-3">
                        <strong>Event Parent</strong>
                    </div>
                    <div className="col-md-9">
                        {parentId
                            &&
                            <EventDetails 
                                eventId={parentId} 
                                preText={``}
                                showSubDetails={true} />
                        }

                    </div>
                    <div className="col-md-3">
                        <strong>Event Category</strong>
                    </div>
                    <div className="col-md-9">
                        <p>{eventCategory?.label}</p>
                    </div>
                    <div className="col-md-3">
                        <strong>Event Title</strong>
                    </div>
                    <div className="col-md-9">
                        <p>{title}</p>
                    </div>
                    <div className="col-md-3">
                        <strong>Tags</strong>
                    </div>
                    <div className="col-md-9">
                        <p>{tags ? tags.join(", ") : ""}</p>
                    </div>
                    <div className="col-md-3">
                        <strong>Attendee Estimate</strong>
                    </div>
                    <div className="col-md-9">
                        <p>{attendee_estimate}</p>
                    </div>
                </div>
            </FormSectionContainer>

            {/* Location */}
            <FormSectionContainer
                isHr={true}
                className="location"
                icon={faMap}
                title="Location"
                description="Details about the location"
            >
                <div className="row">
                    <div className="col-md-3">
                        <strong>Location Type</strong>
                    </div>
                    <div className="col-md-9">
                        <p>{locationType}</p>
                    </div>
                    {locationType === "Physical" && (
                        <>
                            <div className="col-md-3">
                                <strong>Venue Location</strong>
                            </div>
                            <div className="col-md-9">
                                <p>{venue}</p>
                            </div>
                        </>
                    )}
                </div>
            </FormSectionContainer>

            {/* Time and Date */}
            <FormSectionContainer
                isHr={true}
                className="time-date"
                icon={faCalendarDays}
                title="Time and Date"
                description="Event schedule"
            >
                <div className="row">
                    <div className="col-md-3">
                        <strong>Recurring Event</strong>
                    </div>
                    <div className="col-md-9">
                        <p>{isRecurring ? "Yes" : "No"}</p>
                    </div>
                    <div className="col-md-3">
                        <strong>Event Starts</strong>
                    </div>
                    <div className="col-md-9">
                        <p>{`${formatToDateString(new Date(startDate.toString()))} at ${startTime}`}</p>
                    </div>
                    <div className="col-md-3">
                        <strong>Event Ends</strong>
                    </div>
                    <div className="col-md-9">
                        <p>{`${formatToDateString(new Date(endDate.toString()))} at ${endTime}`}</p>
                    </div>
                    <div className="col-md-3">
                        <strong>Time Zone</strong>
                    </div>
                    <div className="col-md-9">
                        <p>{timeZone}</p>
                    </div>
                </div>
            </FormSectionContainer>

            {/* Summary */}
            <FormSectionContainer className="summary" icon={faTengeSign} title="Summary" description="">
                <div className="row">
                    <div className="col-md-12">
                        <p>{summary}</p>
                    </div>
                </div>
            </FormSectionContainer>

            {/* Description */}
            <FormSectionContainer className="description pt-5" icon={faTextWidth} title="Description" description="">
                <div className="row">
                    <div className="col-md-12">
                        <p>{description}</p>
                    </div>
                </div>
            </FormSectionContainer>

            {eventTeamId &&
                <FormSectionContainer
                isHr={true}
                className='status'
                icon={faMap}
                title='Event Attendees'
                description='The list of people who attended this event'
                >
                <div>
                    <EventAttendees 
                        teamId={eventTeamId} 
                        readonly={true}
                        selectedMemberIds={new Set<string>(teamMemberIds)}
                        />
                </div>
                </FormSectionContainer>
            }

            <div className='text-end pb-4 my-4'>
                
                <button type='button' className='btn btn-outline-secondary py-2 px-4' onClick={handleOpenObservationModal}>
                    <FontAwesomeIcon icon={faEyeLowVision} /> Observation(s)
                </button>
                               
                <Link to={`${pageNames.EVENT_EDIT}/${id}`}>
                    <button type='submit' className='btn btn-outline-secondary py-2 px-4 ms-4'>
                        <FontAwesomeIcon icon={faEdit} /> Edit Event
                    </button>
                </Link>
                <Link to={`${pageNames.EVENT_REPORT}/${id}`}>
                    <button type='submit' className='btn btn-outline-warning py-2 px-4 ms-4'>
                        <FontAwesomeIcon icon={faFileAlt} /> See Event Report
                    </button>
                </Link>
                <Link to={`${pageNames.ACTIONS}?eventId=${id}`}>
                    <button type='submit' className='btn btn-outline-primary py-2 px-4 ms-4'>
                        <FontAwesomeIcon icon={faListDots} /> See Event Actions
                    </button>
                </Link>
            </div>

            <RightOverlay 
                onClose={handleCloseObservationModal}
                isOpen={isObservationOpen}
                children={
                <div>
                    {isObservationOpen && (
                    <ObservationForm
                        eventData={event}
                    />
                    )}
                </div>
                }
            />
        </div>
    );
};

export default EventReadOnly;
