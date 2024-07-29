import React from 'react';
import { Link } from 'react-router-dom';
import images from '../assets/images'
import './Welcome.css';

const Welcome: React.FC = () => {
  return (
    <div>
      <div className="hero-section">
        <div className="welcome-message">
          <h3>Welcome to YOUR opportunity to co-create a platform which will help you to:</h3>
          <ul>
            <li>Create a list of credible actions so you can demonstrate action in advancing The Paris Agreement 
              <p className='sub-point'>(This list will also help you demonstrate evidence of implementing Race to Zero criteria, ISO 20121, B Corp and many more)</p>
              </li>
            <li>Tailor your list to YOUR unique event (or event product or service if you are in the event supply chain)</li>
            <li>Access credible resources that will support you to turn your list into action!</li>
          </ul>
        </div>
        <div className="account-actions">
          <h2>Get Started</h2>
          <p>If you already have an account login here. If you have not used the platform before register here:</p>
          <div className="buttons">
            <Link to="/login" className="btn btn-large btn-outline-primary me-2 px-4 py-3">
              Login
            </Link>
            <Link to="/register" className="btn btn-large btn-outline-secondary px-4 py-3">
              Register
            </Link>
          </div>
          <p className="friendly-warning">Please be aware you are about to join a community co-creating a platform this means what you will see next: May not look perfect, Could have glitches, But it is the perfect place for you to get involved!</p>
        </div>
      </div>
      <div className="row brand-images">
        <div className="col-md-4">
          <img src={images.rtzLogo} className="img-fluid" alt="RTZ Logo" />
        </div>
        <div className="col-md-4">
          <img src={images.piLogo} className="img-fluid" alt="PI Logo" />
        </div>
        <div className="col-md-4">
          <img src={images.rtzAcceleratorLogo} className="img-fluid" alt="RTZ Accelerator Logo" />
        </div>
      </div>
      </div>
  );
};

export default Welcome;
