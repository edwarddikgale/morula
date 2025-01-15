import React from "react";

interface IProps {
  title: string;
  description: string;
  subTitle?: string;
}

const FormSectionHeader = (props: IProps) => {
  return (
    <div className='from-sec-header'>
      <h3>{props.title}</h3>
      <h6>{props.subTitle}</h6>
      <p className='text-body'>{props.description}</p>
    </div>
  );
};

export default FormSectionHeader;
