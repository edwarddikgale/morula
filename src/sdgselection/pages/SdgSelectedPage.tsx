// App.jsx
import React from 'react';
import SDGSelection from '../components/SdgSelection';
import '../styles/sdg-selection.css';
import SDGSelected from 'sdgselection/components/SdgSelected';

const SdgSelectedPage = () => {
  return (
    <div className="container">
      <h3>Your Top Priority Sustainability Development Goals (i.e SDG's)</h3>
      <SDGSelected />
    </div>
  );
};

export default SdgSelectedPage;
