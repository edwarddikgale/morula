import React from 'react';
import { Link } from 'react-router-dom';
import images from '../assets/images'
import './Welcome.css';

const Welcome: React.FC = () => {
  return (
    <div>
      <div className="hero-section">
        <div className="welcome-message">
          <h3><i>Welcome to MORULA</i></h3>
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
          <p className="friendly-warning">
            
          </p>
        </div>
      </div>
      <div className="row brand-images">
      </div>
      </div>
  );
};

export default Welcome;
