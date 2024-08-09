// App.jsx
import React from 'react';
import SDGSelection from '../components/PrincipleSelection';
import '../styles/sdg-selection.css';
import SDGSelected from 'principles/components/PrincipleSelected';

const SdgSelectedPage = () => {
  return (
    <div className="container">
      <h3>Your Top Priority Agile Principles as Goals for your organization</h3>
      <SDGSelected />
    </div>
  );
};

export default SdgSelectedPage;
