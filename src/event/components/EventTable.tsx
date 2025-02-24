import React, { useEffect, useState, useRef } from "react";
import { CustomIcon, SearchIcon } from "../../utils/CustomIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faList, faPlus, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { ProgressBar, Table } from "react-bootstrap";
import tImg from "../assets/t1.jpg";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import { eventsAPI } from "../utils/API";
import { extractMonthAndDate, formatDateFull } from "./utils/utils";
import useAuthUserId from "auth/hooks/useAuthUser";
import ContextMenu from "./ContextMenu";
import eventCategories from '../data/eventCategory.json';

import "react-calendar/dist/Calendar.css";
import "./styles/event.css";
import capitaliseFirstLetter from "common/utils/capitaliseFirstLetter";
import { EventCategory } from "./types/EventCategory";
import DeleteConfirmation from "common/components/ui/DeleteConfirmation";
import { Event } from '../types/Event';
import { Pagination } from "common/types/list/Pagination";
import { LoaderPrimary, LoaderSm } from "common/components/Loader/Loader";
import EventTextIcon from "./common/EventTextIcon";
import EventStartEndDate from "./common/EventStartEndDate";
import LimitedCharacters from "common/components/ui/LimitedCharacters";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const categories: EventCategory[] = eventCategories;

const daysUntilEvent = (eventDateTime: string): number => {
  const eventDate = new Date(eventDateTime);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffTime = eventDate.getTime() - currentDate.getTime();

  // Convert milliseconds to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

const EventTable = () => {
  const navigate = useNavigate();
  //Currently logged in user
  const userId = useAuthUserId();
  // for search
  const [searchQuery, setSearchQuery] = useState("");
  // for more action
  const [openAction, setOpenDropdown] = useState<number | null>(null);

  // for filter
  const [selectedFilterValue, setSelectedFilterValue] = useState<string>("0");

  // calender state
  const [calenderOpen, setCalenderOpen] = useState<boolean>(false);
  const [value, onChange] = useState<Value>(new Date());

  // Event handler to update the selected value
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterStatus = event.target.value;
    setSelectedFilterValue(filterStatus);
    const filtered = events.filter(event => 
      event.category.toLowerCase() === filterStatus || filterStatus === "all"
    );
    setFilteredEvents(filtered);
  };

  const [events, setEvents] = useState<Record<string, any>[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Record<string, any>[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getEventsByUser, getEventTaskCompletionRates } = eventsAPI;
  const [pagination, setPagination] = useState<Pagination>({page: 1, pageSize: 10});

  // Default completion data
  const defaultCompletion = {
    eventId: "",
    total: 0,
    completed: 0,
    completionRate: "0.00%"
  };

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = events.filter(event => 
        event.title.toLowerCase().includes(lowercasedQuery) || 
        event.description.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events); // Reset to all events if searchQuery is empty
    }
  }, [searchQuery, events]);

  const handleFetchEvent = async (userId: string, pagination:Pagination) => {
    try {
      setIsLoading(true);
      const eventListResponse = await getEventsByUser(userId, pagination);
      const eventIds: string[] = eventListResponse.events.map(evnt => evnt._id!);
      const completionResponse = await getEventTaskCompletionRates(userId, eventIds);

      if(eventListResponse.events && completionResponse){
        // Merge completion data with event data
        const eventsWithCompletion = eventListResponse.events.map((event: Event) => {
          const completion = completionResponse.find((comp: { eventId: any; }) => comp.eventId === event._id) || { ...defaultCompletion, eventId: event._id };
          return {
            ...event,
            ...completion
          };
        }); 

        setEvents(prevList => ([...prevList, ...eventsWithCompletion]));
        setFilteredEvents(prevList => ([...prevList, ...eventsWithCompletion]));
        setPagination(eventListResponse.pagination);
      }
      else{
        setEvents([]);
        setWarningMessage("You currently have no events listed, create an event to start.");
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(`Failed to get events for this user. ${error}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(userId && events.length === 0){
      handleFetchEvent(userId, pagination);
    }
    else{
      setIsLoading(false);
    }
  }, [userId]);

  const handlePageChange = (newPage: number) =>{
    const newPagination = {...pagination, page: newPage};
    setPagination(newPagination);
    if(userId){
      handleFetchEvent(userId, newPagination);
    }
  }
  // handler for list button
  const handleList = () => {};

  // navigate create event page
  const handleCreateEvent = () => {
    navigate("/create-event");
  };

  // onchange  calender
  const handleCalendarChange = (value: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onChange(value);
    setCalenderOpen(false);
  };

  const onDeleteItem = async(index: number, id: string) =>{
    const response = await eventsAPI.deleteEvent(id);
    if (response.success) { // Ensure the delete request was successful
      setEvents((prevEvents) => prevEvents.filter((_, i) => i !== index));
      setFilteredEvents(prevList => prevList.filter((_, i) => i !== index));
    }
  }

  const progress = {
    total: 100,
    completed: 10,
  };

  return (
    <div>
      <div className='row align-items-center'>
        <div className='col-md-6 position-relative'>
          <div className='d-flex search-section'>
            {/* search */}
            <div className='position-relative my-2 me-0 me-md-3'>
              {!searchQuery && (
                <span className='position-absolute top-50 translate-middle' style={{ left: "20px" }}>
                  <SearchIcon />
                </span>
              )}
              <input
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                type='text'
                className='form-control search-field'
                id='search'
                placeholder='Search events'
              />
            </div>
            <div className='bt-grp d-flex align-items-center' style={{marginTop: "-10px"}}>
              {/* list button */}
              <button className='btn btn-primary btn-list me-0 me-md-3' onClick={() => handleList()}>
                <span className='me-2'>
                  <FontAwesomeIcon icon={faList} />
                </span>
                List of ( {filteredEvents.length} )
              </button>

              {/* calender */}
              <button
                className='d-none btn btn-calender btn-light btn-list me-0 me-md-3'
                onClick={() => setCalenderOpen(true)}
              >
                <span className='me-2'>
                  <FontAwesomeIcon icon={faCalendar} />
                </span>
                Calender
              </button>
              {calenderOpen && (
                <Calendar className='calender' onChange={handleCalendarChange} value={value} />
              )}
              {/* calender */}
            </div>
          </div>
        </div>
        {/* filter */}
        <div className='col-md-4'>
          <div className='d-flex align-items-center'>
            <div className='me-2 filter-label'>Filter By: </div>
            <div>
              <select
                className='event-form-select'
                aria-label='filter'
                value={selectedFilterValue}
                onChange={handleFilterChange}
              >
                {categories.map((category) =>(
                      <option key={category.value} value={category.value} selected={selectedFilterValue === category.value}>
                        {category.label}
                      </option>
                ))}
              </select>
            </div>
          </div>
        </div>  
        <div className='col-md-2 my-2'>    
            <div>
              <button onClick={() => handleCreateEvent()} className='btn create-btn'>
                <FontAwesomeIcon icon={faPlus} /> Create event
              </button>
            </div>
        </div>
      </div>

      {/* event table */}

      {!isLoading && !events.length && errorMessage && (
        <div className='mb-1 ml-4'>
          <p className='text-danger'>{errorMessage}</p>
        </div>
      )}
      {isLoading && (
        <LoaderPrimary />
      )}

      {!errorMessage && (
        <>
          <div className='my-5'>
            <Table className='event-table' responsive>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Actions</th>
                  <th>Est. Attendees</th>
                  <th>Category</th>
                  <th>Team</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event, index) => (
                  <tr key={event._id}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className=''>
                          <p className='mb-0 text-or'>{extractMonthAndDate(event.endDate, "Month")}</p>
                          <p className='mb-0 text-muted fw-bold'>
                            {extractMonthAndDate(event.endDate, "Date")}
                          </p>
                        </div>
                        <div className='d-flex align-items-center '>
                          <div className='mx-2'>
                            {/*<img className='event-Img' src={tImg} alt='Event' />*/}
                            <EventTextIcon title={event.category || 'Unknown'} size={80} />
                          </div>
                          <div>
                            <h6>
                              <Link to={`/eventview/${event._id}`} className="event-link">{event.title}</Link>
                            </h6>
                            <p className='mb-2 text-muted fs-14'>{event.summary}</p>
                            <p className='mb-0 text-muted fs-14 d-none'>{formatDateFull(event.endDate)}</p>
                            <div className="py-1">
                              <EventStartEndDate 
                                startDate={event.startDate}
                                startTime={event.startTime}
                                />
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className='mb-0 text-muted '>
                          {event.tasksCompleted}/{event.tasksTotal}
                        </p>
                        <ProgressBar now={event.tasksCompletionRate} />
                      </div>
                    </td>
                    <td>
                      <p className='mb-0 text-muted'> {event.attendee_estimate} </p>
                    </td>
                    <td>
                      {" "}
                      <p className='mb-0 text-muted'>{capitaliseFirstLetter(event.category)}</p>
                    </td>
                    <td>
                      {" "}
                      <p className='mb-0 text-muted'>{event.teamName}</p>
                    </td>
                    <td>
                      <DeleteConfirmation 
                          index={index}
                          item={event}
                          label={'Remove'}
                          buttonIsCustom={true}
                          onDelete={() => onDeleteItem(index, event._id)}
                        />
                    </td>
                    <td>
                      {/* action */}
                      <div className='position-relative'>
                        <div
                          className='pl-3 cursor-pointer'
                          onClick={() => {
                            if (openAction !== event._id) {
                              setOpenDropdown(event._id);
                            } else {
                              setOpenDropdown(null);
                            }
                          }}
                        >
                          <span style={{ cursor: "pointer" }}>
                            <CustomIcon />
                          </span>
                        </div>
                        {openAction == event._id && <ContextMenu eventId={event._id} />}
                      </div>
                    </td>
                  </tr>
                ))}

                {/* map table data */}
              </tbody>
            </Table>
            {!isLoading && !events.length && warningMessage && (
              <div className='mb-1 ml-4'>
                <p className='text-warning'>{warningMessage}</p>
              </div>
            )}
            {/* Load More Button */}
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-primary-outline d-flex align-items-center"
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                <span className="ms-2">
                  {events.length} of {pagination.totalItems} Loaded.
                </span> 
               
                <span className="ms-1">Load More... </span>
                <span className="ms-1"><FontAwesomeIcon icon={faArrowDown} /></span>
                <div className="ms-1">{isLoading && (<LoaderSm />)}</div>
                
              </button>
            </div>
            <div className="d-none">
              <pre>{JSON.stringify(pagination, null, 2)}</pre>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventTable;
