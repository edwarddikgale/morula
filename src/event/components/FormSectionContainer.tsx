import React, { useState } from "react";
import FormSectionHeader from "./FormSectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  title: string;
  subTitle?: string;
  description: string;
  icon: any;
  className: string;
  isHr?: boolean;
  isCollapsed?:boolean;
  children: React.ReactElement | React.ReactNode;
}

const FormSectionContainer = ({ title, description, icon, className, isHr, children, subTitle, isCollapsed }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(!isCollapsed);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${className}`}>
      <div className='d-flex flex-m-col align-items-start'>
        <div>
          <FontAwesomeIcon icon={icon} size='2xl' style={{ color: "#dce5f4" }} />
        </div>
        <div className='ms-0 ms-md-5 w-100'>
          <div className="d-flex justify-content-between align-items-center w-100">
            <FormSectionHeader subTitle={subTitle} title={title} description={description} />
            <button 
              type="button"
              className="btn btn-link p-0" 
              onClick={toggleExpand} 
              aria-expanded={isExpanded}>
              <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
            </button>
          </div>

          {isExpanded && (
            <>
              {children}
              {isHr && (
                <div className='py-5'>
                  <hr />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormSectionContainer;
