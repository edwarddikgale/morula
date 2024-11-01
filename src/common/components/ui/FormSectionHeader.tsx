import React from "react";

interface IProps {
  title: string;
  description: string;
  subTitle?: string;
}

const FormSectionHeader = (props: IProps) => {
  return (
    <div className='from-sec-header'>
      <h2>{props.title}</h2>
      <h6>{props.subTitle}</h6>
      <p className=''>{props.description}</p>
    </div>
  );
};

export {FormSectionHeader};
