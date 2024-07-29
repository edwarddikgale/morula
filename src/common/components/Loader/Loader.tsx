import React from "react";

export const LoaderSm = () => {
  return (
    <div className='spinner-border spinner-border-sm' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  );
};
export const LoaderPrimary = () => {
  return (
    <div className='d-flex justify-content-center w-100 py-4'>
      <div className='spinner-border text-primary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
};
