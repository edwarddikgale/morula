import React from "react";
import "../styles/dashboard.css";
import GreetUser from './GreetUser';

const Title = () => {
 
  return (
    <div>

      <GreetUser prefixMessage="Welcome back" />
      <p className='mt-3 text-muted'> 
        Get the most of this app by filling in your profile details, using my events to create a unique list of best possible actions and adding ISO 20121 evidence to meet reporting requirements.
      </p>
    </div>
  );
};

export default Title;
