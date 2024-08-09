// App.jsx
import React from 'react';
import SDGSelection from '../components/PrincipleSelection';
import '../styles/sdg-selection.css';

const SdgSelectorPage = () => {
  return (
    <div className="container">
      <h3>Select Your Top Priority Sustainability Development Goals (i.e SDG's)</h3>
      <SDGSelection />
    </div>
  );
};

export default SdgSelectorPage;
