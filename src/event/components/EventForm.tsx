import React, { useEffect } from "react";
import { useState } from "react";
import {
  faBolt,
  faCalendarDays,
  faCancel,
  faCommentDots,
  faEdit,
  faImage,
  faMap,
  faTengeSign,
  faTextSlash,
  faTextWidth,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/event-form.css";
import { Link, useNavigate } from "react-router-dom";
import FormSectionContainer from "./FormSectionContainer";
import { SearchIcon } from "../../utils/CustomIcon";
import { convertToISOString, formatToDateString, formatToTimeString } from "./utils/utils";
import ImageAlert from "./ImageAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageUploader from "./ImageUploader";
import Description from "./Description";
import { EventFormData } from "./types/eventForm";
import Swal from "sweetalert2";
import { eventsAPI } from "../utils/API";
import { LoaderSm } from "../../common/components/Loader/Loader";
import { pageNames } from "../../config/pageNames";
import Select from "react-select";
import useAuthUserId from "auth/hooks/useAuthUser";

import {TimeZoneSelect} from "common/components/ui/";
import { EventTag } from "./types/EventTag";
import { EventCategory } from "./types/EventCategory";

import eventTags from '../data/eventTags.json';
import eventCategories from '../data/eventCategory.json';
import { findEventCatByVal } from "event/utils/findEventCategory";
import TeamSelect from "./selections/TeamSelect";
import { teamService } from "team/services/teamService";
import { Team } from "team/types/Team";
import { EventAttendees } from "./EventAttendees";
import { TeamMember } from "team/types/TeamMember";
import { formatEventSummary } from "./utils/formatEventSummary";
import { ScrumEventSummaryResponse } from "./types";
import RightOverlay from "common/components/overlay/RightOverlay";
import MeetingTranscript from "./MeetingTranscript";
import { transcriptionService } from "event/services/transcriptionService";
import MeetingTranscriber from "./MeetingTranscriber";

const tagOptions: EventTag[] = eventTags;
const categories: EventCategory[] = eventCategories;
const transcriberV1 = false;

interface IProps {
  event?: EventFormData;
  id?: string;
}

const EventForm: React.FC<IProps> = ({id, event}) => {
  const evenTitleLimit = 75;
  const evenSummaryLimit = 140;

  const navigate = useNavigate();
  // form state

  // demo data
  const userId = useAuthUserId();
  const supplier_estimate = 20;
  // demo data

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formIsPopulated, setFormIsPopulated] = useState<boolean>(false);
  // basic section
  const [eventTeamId, setEventTeamId] = useState<string | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("Event Organizer Inc.");
  const [eventType, setEventType] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventParent, setEventParent] = useState<string | null>(null);
  const [sprints, setSprints] = useState<EventFormData[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [eventSearchTag, setEventSearchTag] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<EventTag[]>([]);
  const [estimatedAttendees, setEstimatedAttendees] = useState<number>(0);

  // location section
  const [searchVenueQuery, setSearchVenueQuery] = useState("");
  const [activeEventLocation, setActiveEventLocation] = useState("Online");
  const [isMultiVenue, setIsMultiVenue] = useState<boolean>(false);

  // date and time
  const [isRecurring, setIsRecurring] = useState<boolean | null>(false);
  const [eventStartDate, setEventStartDate] = useState(formatToDateString(new Date()));
  const [eventStartTime, setEventStartTime] = useState(formatToTimeString(new Date()));

  const [eventEndDate, setEventEndDate] = useState<any>(formatToDateString(new Date()));
  const [eventEndTime, setEventEndTime] = useState<any>(formatToTimeString(new Date()));

  const [showStartTime, setShowStartTime] = useState(true);
  const [showEndTime, setShowEndTime] = useState(true);

  const [eventTimeZone, setEventTimeZone] = useState("UTC");
  const [eventPageLanguage, setEventPageLanguage] = useState("English");
  const [eventStatus, setEventStatus] = useState("Draft");
  const [teamMemberIds, setTeamMemberIds] = useState<string[]>([]);

  // event media
  const [displayMediaAlert, setDisplayMediaAlert] = useState(true);
  const [image, setImage] = useState<string | null>(null);

  // summary
  const [eventSummary, setEventSummary] = useState("");

  // description
  const [content, setContent] = useState<string>("");

  // transcription
  const [transId, setTransId] = useState<string | null>();

  //modals
  const [isTranscriptionOpen, setTranscriptionOpen] = useState<boolean>(false);
  const [newDescription, setNewDescription] = useState<string | null>(null);

  const loadSprints = async (userId: string, teamId: string) => { 
    const response =  await eventsAPI.getSprints(userId, teamId);
    setSprints(response.events.map(evt => evt as EventFormData));
  }

  const loadTeams = async (userId: string) => { 
    const response =  await teamService.getTeams(userId);
    setTeams(response.teams.filter(team => team.isActive) || []);
  }
    // Effect to pre-populate form fields if event prop is provided
    useEffect(() => {
      
      if (event && !formIsPopulated) {
        setEventTeamId(event.teamId || null);
        setEventTitle(event.title);
        setEstimatedAttendees(event.attendee_estimate || 0);
        setEventOrganizer(event.organizer || "Event Organizer Inc.");
        setEventType(""); // Assuming event.type does not exist in EventFormData
        setEventCategory(event.category || ""); // Assuming event.category does not exist in EventFormData
        setEventSearchTag(event.tags || []);
        const eventTags = event.tags || [];
        //setSelectedTags(eventTags);
        setSelectedTags(tagOptions.filter(tag => eventTags.includes(tag.value)));
        setSearchVenueQuery(event.venue || "");
        setActiveEventLocation(event.locationType || "Online");
        setIsRecurring(event.isRecurring || false);
        setIsMultiVenue(event.isMultiVenue || false);
        setEventStartDate(formatToDateString(new Date(event.startDate.toString())));
        setEventStartTime(event.startTime || formatToTimeString(new Date()));
        setEventEndDate(formatToDateString(new Date(event.endDate.toString())));
        setEventEndTime(event.endTime || formatToTimeString(new Date()));
        setShowStartTime(event.showStartTime);
        setShowEndTime(event.showEndTime);
        setEventTimeZone(event.timeZone || "UTC");
        setEventPageLanguage(event.language || "English");
        //setImage(event.image);
        setEventSummary(event.summary);
        setContent(event.description || "");
        setEventStatus(event.status || "Draft");
        setEventParent(event.parentId || null);
        setTeamMemberIds(event.teamMemberIds || []);
        setFormIsPopulated(true);
      }
    }, [event]);
  
  useEffect(()=>{
    if(userId){
      loadTeams(userId);
    }
  }, [userId]);

  useEffect(()=>{
    if(userId && eventTeamId){
      loadSprints(userId, eventTeamId);
    }
  }, [userId, eventTeamId])

  const handleStartCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setShowStartTime(checked);
    if (!checked) {
      setEventStartTime("");
    }
  };
  const handleEndCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowEndTime(e.target.checked);
    const checked = e.target.checked;
    setShowEndTime(e.target.checked);
    if (!checked) {
      setEventEndTime("");
    }
  };

  const handleTimeZoneSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEventTimeZone(event.target.value);
    // console.log(event.target.value);
  };
  const handlePageLanguageSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEventPageLanguage(event.target.value);
    // console.log(event.target.value);
  };

  const handleEventSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEventOrganizer(event.target.value);
    // console.log(event.target.value);
  };
  const handleSprintSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEventParent(event.target.value);
    // console.log(event.target.value);
  };

  const handleCategorySelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = findEventCatByVal(event.target.value);
    setEventCategory(event.target.value);

    if(category && (!eventTitle || eventTitle.length === 0)){
      setEventTitle(`${category.title?? 'Meeting'} `);
    }

    if(category && (!eventSummary || eventSummary.length === 0)){
      setEventSummary(`${category.summary}`);
    }

    if(category && (!content || content.length === 0)){
      setContent(`${category.summary}`);
    }

  };

  const handleTagChange = (selectedOptions: any) => {
    const arr = selectedOptions.map((item: any) => item.value);
    setSelectedTags(selectedOptions);
    setEventSearchTag(arr);
  };

  const handleTeamChange = (teamId: string | null) =>{
    setEventTeamId(teamId);
    if(!teamId) return;
    const team = teams.filter(team => team._id === teamId)[0];
    if(eventCategory === 'daily'){ //todo: convert this to an enum
      setEventStartTime(team.dailyStartTime);
      setEventEndTime(team.dailyEndTime);
    }
    setEventTimeZone(team.timeZone);
  }
  // form action

  function resetFrom() {
    setEventTitle("");
    setEventOrganizer("");
    setEventType("");
    setEventCategory("");
    setEventSearchTag([]);
    setSearchVenueQuery("");
    setSearchVenueQuery("");
    setActiveEventLocation("");
    setIsRecurring(null);
    setEventStartDate(formatToDateString(new Date()));
    setEventStartTime(formatToDateString(new Date()));
    setEventEndDate(formatToDateString(new Date()));
    setEventEndTime(formatToDateString(new Date()));
    setEventTimeZone("");
    setEventPageLanguage("");
    setImage("");
    setEventSummary("");
    setContent("");
  }

  const handleSelectMembers = (members: TeamMember[]) =>{
    const memberIds = members.map(member => member._id!);
    setTeamMemberIds([...memberIds]);
    setEstimatedAttendees(members.length);
  }

  const handleOpenTranscriptionModal = () =>{
    setTranscriptionOpen(true);
  }

  const handleCloseTranscriptionModal = () =>{
      setTranscriptionOpen(false);
  }

  const handleTranscriptSummary = (data: ScrumEventSummaryResponse) => {
    setContent(formatEventSummary(data));
    setTransId(data.transcriptionId);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(!userId) throw Error("User currently not logged in");
    
    const eventData: EventFormData = {
      userId: userId,
      teamId: eventTeamId,
      parentId: eventParent,
      title: eventTitle,
      organizer: eventOrganizer,
      category: eventCategory,
      tags: eventSearchTag,
      locationType: activeEventLocation,
      venue: searchVenueQuery,
      isRecurring: isRecurring,
      startDate: convertToISOString(eventStartDate),
      startTime: eventStartTime,
      endDate: convertToISOString(eventEndDate),
      endTime: eventEndTime,
      showStartTime: showStartTime,
      showEndTime: showEndTime,
      timeZone: eventTimeZone,
      language: eventPageLanguage,
      // image: image,
      summary: eventSummary,
      description: content,
      attendee_estimate: estimatedAttendees,
      supplier_estimate: supplier_estimate,
      status: eventStatus,
      teamMemberIds: teamMemberIds
    };

    setIsLoading(true);
    try {
      const res = id? await eventsAPI.updateEvent(eventData, id) : await eventsAPI.createEvent(eventData);
      if(transId){
        const transResponse = await transcriptionService.linkTransToEvent(transId, res._id!);
      }  

      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Event ${id? "Updated": "Created"} Successfully!`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setIsLoading(false);
          resetFrom();
          navigate(`${pageNames.EVENT_READONLY}/${res._id}`);
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setIsLoading(false);
      });
    }
  };
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        {/* Basic Info */}

        <FormSectionContainer
          isHr={true}
          className='basic-info'
          icon={faTextSlash}
          title='Basic Info'
          description='Name your event event and provide more details for better analysis'
        >
          <div>
            {/* basic info field */}
            <div className='row g-2 mb-3'>
              <div className='col-12 col-md-4'>
                <div className='form-floating'>
                  <select
                    className='form-select'
                    id='Category'
                    aria-label='Floating label select example'
                    value={eventCategory}
                    onChange={handleCategorySelectChange}
                  >
                    <option value={''}>Select Category...</option>
                    {categories.map((category) =>(
                      <option key={category.value} value={category.value} selected={eventCategory === category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <label htmlFor='floatingSelectGrid'>Category</label>
                </div>
              </div>
              <div className='col-12 col-md-4'>
                <TeamSelect 
                  teams={teams} 
                  selectedTeamId={eventTeamId} 
                  onSelectChange={handleTeamChange} />
              </div>  
              <div className='col-12 col-md-4'>
                <div className='form-floating'>
                  <select
                    className='form-select'
                    id='sprint'
                    aria-label='Floating label select example'
                    value={eventParent || ""}
                    onChange={handleSprintSelectChange}
                  >
                    <option value={''}>Select Parent Sprint...</option>
                    {sprints.map((sprint) =>(
                      <option key={sprint._id} value={sprint._id} selected={eventParent === sprint._id}>
                        {sprint.title} 
                        {" , "} dates:: {" "} 
                        {sprint.startDate? new Date(sprint.startDate).toLocaleDateString(): 'Unknown'}
                        {" - "}
                        {sprint.endDate? new Date(sprint.endDate).toLocaleDateString(): 'Unknown'}
                      </option>
                    ))}
                  </select>
                  <label htmlFor='sprint'>Parent Sprint</label>
                </div>
              </div>
            </div>
            <div className='form-floating mb-3'>
              <input
                maxLength={evenTitleLimit}
                type='text'
                className='form-control'
                id='evenTitle'
                placeholder='name@example.com'
                required
                value={eventTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventTitle(e.target.value)}
              />
              <label htmlFor='evenTitle' className="form-label">
                Event Title <span className='text-danger'>*</span>
              </label>
              {eventTitle.length == evenTitleLimit && (
                <p className='text-danger fs-12 mb-0'>You have typed over limit</p>
              )}
              <p className='text-muted text-end fs-12 mb-0'>
                {eventTitle.length}/{evenTitleLimit}
              </p>
            </div>
            {/* Hidden for now  */}
            <div className='form-floating mb-3 d-none'>
              <select
                className='form-select'
                id='organizer'
                aria-label='Floating label select example'
                value={eventOrganizer}
                onChange={handleEventSelectChange}
              >
                <option selected value='Event Organizer Inc.'>
                  Event Organizer Inc.
                </option>
                <option value='Event Organizer Inc.2'>Event Organizer Inc2.</option>
                <option value='Event Organizer Inc.3'>Event Organizer Inc.3</option>
              </select>
              <label htmlFor='organizer'>Organizer</label>
              <p className='text-muted fs-12 mb-0'>
                The profile show a unique organizer and shows all events on one page{" "}
                <Link to='/'>View Organizer Info</Link>
              </p>
            </div>

            <div>
              <h4 className='mt-5'>Tags</h4>
              <p className=''>
                Improve discoverability or event by adding tags relevant to the subject matter
              </p>

              <div className='mb-3'>
                <Select
                  placeholder='Please enter to add a tag'
                  onChange={handleTagChange}
                  options={tagOptions}
                  isMulti
                  isSearchable
                  value={selectedTags}
                  
                />
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='text-muted fs-12 mb-0'>{selectedTags.length}/{tagOptions.length} tags</p>
                  <p className='text-muted fs-12 mb-0'>{eventSearchTag.length}/{tagOptions.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* basic info field - Estimated Attendees */}
          <div>
              <h4 className='mt-5'>Attendee Estimate</h4>
              <p className=''>
                Adding this information will make it possible, in the future, to understand your event impact on a per attendee basis 
              </p>
              <div className='form-floating mb-3'>
              <input
                type='number'
                className='form-control'
                id='estAttendees'
                placeholder='e.g 150'
                value={estimatedAttendees}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEstimatedAttendees(parseFloat(e.target.value))}
              />
              <label htmlFor='evenTitle'>
                Estimated Number Of Attendees <span className='text-danger'>*</span>
              </label>
          </div>
          </div>

        </FormSectionContainer>

        {/* location */}

        <FormSectionContainer
          isHr={true}
          className='location'
          icon={faMap}
          title='Location (s)'
          description='Help people in the area discover your event and let attendences know where to show up'
        >
          <div>
            <div className='d-flex flex-wrap'>
              <button
                type='button'
                className={`my-1 me-3 btn btn-light ${
                  activeEventLocation === "Online" ? "btn-select-active" : "btn-select"
                }`}
                onClick={() => setActiveEventLocation("Online")}
              >
                Online Event
              </button>
              <button
                type='button'
                className={`my-1 me-3 btn btn-light ${
                  activeEventLocation === "Physical" ? "btn-select-active" : "btn-select"
                }`}
                onClick={() => setActiveEventLocation("Physical")}
              >
                Physical Venue
              </button>
              <button
                type='button'
                className={`my-1 me-3 btn btn-light ${
                  activeEventLocation === "Hybrid" ? "btn-select-active" : "btn-select"
                }`}
                onClick={() => setActiveEventLocation("Hybrid")}
              >
                Hybrid
              </button>
              <button
                type='button'
                className={`my-1 me-3 btn btn-light ${
                  activeEventLocation === "To-be-announced" ? "btn-select-active" : "btn-select"
                }`}
                onClick={() => setActiveEventLocation("To-be-announced")}
              >
                To be announced
              </button>
            </div>
            <p className='py-3'>Select wether this is a Multi venue or Single venue event. Online events are single venue unless they use multiple, different online platforms.</p>
            <div className='d-flex flex-wrap'>
              <button
                type='button'
                className={`my-1 me-3 btn btn-light ${
                  isMultiVenue === false ? "btn-select-active" : "btn-select"
                }`}
                onClick={() => setIsMultiVenue(false)}
              >
                Single Venue
              </button>
              <button
                type='button'
                className={`my-1 me-3 btn btn-light ${
                  isMultiVenue === true ? "btn-select-active" : "btn-select"
                }`}
                onClick={() => setIsMultiVenue(true)}
              >
                Multiple Venues
              </button>
            </div>
            
            {/* search */}
            {!isMultiVenue && 
              <div>
                <h6 className='pt-3'>Venue Location</h6>
                <div className='position-relative my-2 me-0 me-md-3'>
                  {!searchVenueQuery && (
                    <span className='position-absolute top-50 translate-middle' style={{ left: "20px" }}>
                      <SearchIcon />
                    </span>
                  )}
                  <input
                    value={searchVenueQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchVenueQuery(e.target.value)}
                    type='text'
                    className='form-control search-field'
                    id='search'
                    placeholder='Search for venue or a address'
                  />
                </div>
              </div>  
            }
          </div>
        </FormSectionContainer>

        {/* time and date */}

        <FormSectionContainer
          isHr={true}
          className='time-date'
          icon={faCalendarDays}
          title='Time And Date'
          description='Adding this information will make it possible, in the future, to find time and date specific solutions for your event'
        >
          <div>
            <div className='d-flex flex-wrap'>
              <button
                type='button'
                className={`my-1 me-3 btn btn-light ${
                  isRecurring === false ? "btn-select-active" : "btn-select"
                }`}
                onClick={() => setIsRecurring(false)}
              >
                Single Event
              </button>
              <button
                type='button'
                className={`my-1 me-3 btn btn-light ${
                  isRecurring === true ? "btn-select-active" : "btn-select"
                }`}
                onClick={() => setIsRecurring(true)}
              >
                Recurring Event
              </button>
            </div>
            <p className='py-3'>Single event happens once and can last multiple days</p>
            {/* start date time */}
            <div className='row g-2 my-3'>
              <div className='col-md-6'>
                <div className='form-floating'>
                  <input
                    type='date'
                    className='form-control'
                    id='floatingInputGrid'
                    required
                    value={eventStartDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEventStartDate(formatToDateString(new Date(e.target.value),'...'))
                    }
                  />
                  <label htmlFor='floatingInputGrid'>
                    Event starts <span className='text-danger'>*</span>
                  </label>
                </div>
              </div>
              {showStartTime && (
                <div className='col-md-6'>
                  <div className='form-floating'>
                    <input
                      type='time'
                      className='form-control'
                      id='floatingInputGrid'
                      value={eventStartTime}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEventStartTime(
                          formatToTimeString(new Date(`${formatToDateString(new Date())}T${e.target.value}`))
                        )
                      }
                    />
                    <label htmlFor='floatingInputGrid'>Start Time</label>
                  </div>
                </div>
              )}
            </div>
            {/* end date time */}
            <div className='row g-2 my-3'>
              <div className='col-md-6'>
                <div className='form-floating'>
                  <input
                    type='date'
                    className='form-control'
                    id='floatingInputGrid'
                    required
                    value={eventEndDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEventEndDate(formatToDateString(new Date(e.target.value)))
                    }
                  />
                  <label htmlFor='floatingInputGrid'>
                    Event ends <span className='text-danger'>*</span>
                  </label>
                </div>
              </div>
              {showEndTime && (
                <div className='col-md-6'>
                  <div className='form-floating'>
                    <input
                      type='time'
                      className='form-control'
                      id='floatingInputGrid'
                      value={eventEndTime}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEventEndTime(
                          formatToTimeString(new Date(`${formatToDateString(new Date())}T${e.target.value}`))
                        )
                      }
                    />
                    <label htmlFor='floatingInputGrid'>End Time</label>
                  </div>
                </div>
              )}
            </div>
            {/* Hidden for now */}
            <div className='my-3 d-none'>
              <div className='form-check my-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault'
                  checked={showStartTime}
                  onChange={handleStartCheckboxChange}
                />
                <label className='form-check-label ms-2' htmlFor='flexCheckDefault'>
                  Display start time
                  <span className='d-block fs-12'>
                    The start time of your event will be displayed to attendees
                  </span>
                </label>
              </div>
              <div className='form-check my-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault'
                  checked={showEndTime}
                  onChange={handleEndCheckboxChange}
                />
                <label className='form-check-label ms-2' htmlFor='flexCheckDefault'>
                  Display end time
                  <span className='d-block fs-12'>
                    The end time of your event will be displayed to attendees
                  </span>
                </label>
              </div>
            </div>

            {/* time zone */}
            <div className='row'>
              <div className='col-md-6'>
                  <TimeZoneSelect 
                    onChange={handleTimeZoneSelectChange} 
                    value={eventTimeZone} 
                    className="form-floating mb-3"/>
              </div>
            </div>

            {/* Hidden for now */}
            <div className='row d-none'>
              <div className='col-md-6'>
                <div className='form-floating mb-3'>
                  <select
                    className='form-select'
                    id='PageLanguage'
                    aria-label='Floating label select example'
                    value={eventPageLanguage}
                    onChange={handlePageLanguageSelectChange}
                  >
                    <option selected value='English'>
                      English
                    </option>
                    <option value='Spanish'>Spanish</option>
                    <option value='French'>French</option>
                    <option value='German'>German</option>
                    <option value='Russian'>Russian</option>
                    <option value='Japanese'>Japanese</option>
                  </select>
                  <label htmlFor='PageLanguage'>Page Language Language</label>
                </div>
              </div>
            </div>
          </div>
        </FormSectionContainer>

        {/* event media */}

        <div className='d-none'>              
          <FormSectionContainer
            isHr={true}
            className='event-media'
            icon={faImage}
            title='Event Media'
            subTitle='Images'
            description='Add photo to show to what your event will be about. You can upload up to 10 images.'
          >
            <div>
              {displayMediaAlert && <ImageAlert setDisplayMediaAlert={setDisplayMediaAlert} />}
              <ImageUploader image={image} setImage={setImage} />
            </div>
          </FormSectionContainer>
        </div>               
        {/* Summary */}

        <FormSectionContainer className='summary' icon={faTengeSign} title='Summary' description=''>
          <div>
            <p>
              This short summary will be used to help us suggest credible sustainability actions for your event and will also be on your event report. (140 characters max){" "}
              <Link to='/example' className='text-decoration-none d-none'>
                See example
              </Link>
            </p>

            <div className='form-floating mb-3'>
              <textarea
                maxLength={evenSummaryLimit}
                className='form-control'
                id='evenSummary'
                placeholder='summary'
                required
                value={eventSummary}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEventSummary(e.target.value)}
              />
              <label htmlFor='evenSummary'>
                Summary <span className='text-danger'>*</span>
              </label>
              {eventSummary.length == evenSummaryLimit && (
                <p className='text-danger fs-12 mb-0'>You have typed over limit</p>
              )}
              <p className='text-muted text-end fs-12 mb-0'>
                {eventSummary.length}/{evenSummaryLimit}
              </p>
            </div>

            <Link to='/suggest-summary' className='text-decoration-none fw-bolder d-none'>
              <FontAwesomeIcon icon={faBolt} /> Suggest summary
            </Link>
          </div>
        </FormSectionContainer>

        {/* Description */}

        <FormSectionContainer
          className='description pt-5'
          icon={faTextWidth}
          title='Description'
          description=''
        >
          <div className="mb-3">
            <p>
              Add any additional information about your event eg schedule, sponsors. Including this information will help tailor specific solutions for your event.
              <Link to='/learn-details' className='text-decoration-none d-none'>
                learn more
              </Link>
            </p>

            <Description content={content} setContent={setContent} />
            
            <Link to='/suggest-description' className='text-decoration-none fw-bolder my-5 d-inline-block d-none  '>
              <FontAwesomeIcon icon={faBolt} /> Suggest Description
            </Link>
          </div>
        </FormSectionContainer>
         
        {eventTeamId &&
        <FormSectionContainer
          isHr={true}
          className='status'
          icon={faMap}
          title='Event Attendees'
          description='Specify the current people who attended this event'
        >
          <div>
              <EventAttendees 
                teamId={eventTeamId} 
                onSelectMembers={handleSelectMembers} 
                selectedMemberIds={new Set<string>(teamMemberIds)}
                />
          </div>
        </FormSectionContainer>
        }

        <FormSectionContainer
          isHr={true}
          className='status'
          icon={faMap}
          title='Event Status'
          description='Specify the current status of your event'
          hidden={true}
        >
          <div>
            <div className='d-flex flex-wrap'>
              <button
                type='button'
                className={`my-1 me-3 btn btn-light ${
                  eventStatus === "Draft" ? "btn-select-active" : "btn-select"
                }`}
                onClick={() => setEventStatus("Draft")}
              >
                Draft
              </button>
              <button
                type='button'
                className={`my-1 me-3 btn btn-light ${
                  eventStatus === "Published" ? "btn-select-active" : "btn-select"
                }`}
                onClick={() => setEventStatus("Published")}
              >
                Published
              </button>
            </div>
          </div>
        </FormSectionContainer>

        <div className='text-end pb-4 my-4'>
          <Link to={`${pageNames.EVENT_READONLY}/${id}`}>
              <button type='submit' className='btn btn-outline-secondary py-3 px-4'>
                  <FontAwesomeIcon icon={faCancel} /> Cancel
              </button>
          </Link>
          <button type='button' className='btn btn-outline-secondary py-3 px-4 ms-2' onClick={handleOpenTranscriptionModal}>
              <FontAwesomeIcon icon={faCommentDots} /> Transcribe 
          </button>
          <button type='submit' className='btn btn-primary py-3 px-4 ms-2'>
            {id? `Update Event`: `Create Event`} {isLoading && <LoaderSm />}
          </button>
        </div>
      </form>

      <RightOverlay 
        onClose={handleCloseTranscriptionModal}
        isOpen={isTranscriptionOpen}
        children={
        <div>
            {isTranscriptionOpen && transcriberV1 && (
                <MeetingTranscript
                    onSummarize={handleTranscriptSummary}
                    eventId={event?._id!}
                />
            )}
            {isTranscriptionOpen && !transcriberV1 && (
                <MeetingTranscriber
                    onSummarize={handleTranscriptSummary}
                    eventId={event?._id!}
                />
            )}
        </div>
        }
    />
    </div>
  );
};

export default EventForm;
