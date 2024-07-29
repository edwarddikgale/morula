import { faSun, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

interface ImageAlertProps {
  setDisplayMediaAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageAlert = (props: ImageAlertProps) => {
  return (
    <div className='alert-box'>
      <div className='alert-content'>
        <div className='d-flex align-items-center'>
          <div className='alert-circle'>
            <FontAwesomeIcon icon={faSun} style={{ color: "#6446dd" }} size='lg' />
          </div>
          <p className='ms-3 alert-desc'>
            82% attendees prefer main event image that show an event's vive and atmosphere.
          </p>
        </div>
        <div>
          <Link to='/event' className='text-decoration-none'>
            See example
          </Link>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faXmark}
        onClick={() => props.setDisplayMediaAlert(false)}
        className='close-alert'
      />
    </div>
  );
};

export default ImageAlert;
