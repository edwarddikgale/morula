import React from "react";
import FormSectionHeader from "./FormSectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  title: string;
  subTitle?: string;
  description: string;
  icon: any;
  className: string;
  isHr?: boolean;
  children: React.ReactElement | React.ReactNode;
}

const FormSectionContainer = ({ title, description, icon, className, isHr, children, subTitle }: IProps) => {
  return (
    <div className={`${className}`}>
      <div className='d-flex flex-m-col'>
        <div>
          <FontAwesomeIcon icon={icon} size='2xl' style={{ color: "#dce5f4" }} />
        </div>
        <div className='ms-0 ms-md-5 w-100'>
          <FormSectionHeader subTitle={subTitle} title={title} description={description} />

          {children}
          {isHr && (
            <div className='py-5'>
              <hr />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormSectionContainer;
