import React from "react";

import "../styles/dashboard.css";
import Title from "../components/Title";
import Pages from "../components/Pages";

const DashboardPage = () => {
  return (
    <div className='dashboard-container'>
      <Title />
      <Pages />
    </div>
  );
};

export default DashboardPage;
