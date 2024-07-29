import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { AuthFormData } from '../types/AuthFormData';
import { pageNames } from '../../config/pageNames';

import './styles/LoginForm.css';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface LoginFormProperties {
  onLogin: (formData: AuthFormData) => void;
  isLoading: boolean,
  errorMessage: string
}

interface LoginFormProps {
  formData: AuthFormData;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

export const LoginForm = ({ onLogin, isLoading, errorMessage }: LoginFormProperties) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Row>
          <Col>
            <h3>Sign In</h3>
          </Col>
          <Col className="d-flex justify-content-end">
            <Link to={pageNames.REGISTER}>
              Sign Up
            </Link>
          </Col>
        </Row>
        
        <form onSubmit={handleSubmit}>
          {
            errorMessage &&
            <div className='mb-1'>
              <p className="text-danger">{errorMessage}</p>
            </div>
          }
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button 
            type="submit" 
            className={`btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            >
            {isLoading ? 
              (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Sign In'
              )}
          </button>
          <div className="forgot-password">
            <Link to={pageNames.RESET_PWD}>
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
