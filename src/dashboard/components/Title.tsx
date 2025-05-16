import React from "react";
import "../styles/dashboard.css";
import GreetUser from './GreetUser';

const Title = () => {
 
  return (
    <div>

      <GreetUser prefixMessage="Welcome back" />
      <p className='mt-3 text-muted'> 
        Welcome to Morula v1.0
      </p>
    </div>
  );
};

export default Title;
