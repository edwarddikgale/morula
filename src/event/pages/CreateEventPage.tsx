import React from "react";
import EventForm from "../components/EventForm";
import { Link } from "react-router-dom";
import { pageNames } from "../../config/pageNames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const CreateEventPage = () => {
  return (
    <div className='event-container'>
      <div className='mx-3'>
        <Link to={pageNames.EVENT} style={{ textDecoration: "none" }}>
          <FontAwesomeIcon icon={faChevronLeft} />
          Events
        </Link>
        <EventForm />
      </div>
    </div>
  );
};

export default CreateEventPage;
