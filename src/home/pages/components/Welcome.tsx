import React from 'react';
import { Link } from 'react-router-dom';
import images from '../assets/images'
import './Welcome.css';

const Welcome: React.FC = () => {
  return (
    <div>
      <div className="hero-section">
        <div className="welcome-message">
          <h3>MORULA <i>E</i>mperik</h3>
            <p>
              Welcome to Morula Emperik – Your Intelligent Assistant for Scrum Mastery & Product Management
            </p>
            <p>
              As a Scrum Master or Agile Coach, you know that effective guidance comes from keen observation and insightful analysis. But capturing every detail during scrum events, tracking team dynamics, and identifying areas for continuous improvement can be overwhelming – especially without the right support.
            </p>
            <p>
              Morula Emperik is here to help. Designed specifically for Scrum Masters, our platform acts as an intelligent assistant, enabling you to take structured notes during scrum events and capture valuable data from your observations. Morula Emperik transforms these notes into actionable hypotheses, helping you pinpoint improvement opportunities grounded in real team interactions.
            </p>
            <p>
              With Morula Emperik, you gain a clear view of recurring patterns, potential challenges, and growth areas for your team – empowering you to guide your team towards data-driven, continuous improvement. 
            </p>
            <p>
              Start your journey with Morula Emperik, and make every scrum event a step toward a high-performing, cohesive, and responsive team.
            </p>
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
