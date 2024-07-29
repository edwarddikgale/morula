import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { RegisterFormData } from '../types/RegisterFormData';
import { pageNames } from '../../config/pageNames';

import './styles/RegisterForm.css';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface RegisterFormProps {
  onSubmit: (formData: RegisterFormData) => void;
  isLoading: boolean;
  errorMessage: string;
}

export const RegisterForm = ({
  onSubmit,
  isLoading,
  errorMessage,
}: RegisterFormProps) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gdprConfirm: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <Row>
          <Col>
            <h3>Register</h3>
          </Col>
          <Col className="d-flex justify-content-end">
            <Link to={pageNames.LOGIN}>Sign In</Link>
          </Col>
        </Row>

        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="mb-1">
              <p className="text-danger">{errorMessage}</p>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group gdpr-check">
            <div className="row">
              <div className="col-md-1">
                <input
                  type="checkbox"
                  id="chkGdprAgree"
                  name="gdprConfirm"
                  checked={formData.gdprConfirm}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-11">
                <label htmlFor="chkGdprAgree" className='gdrpCheckLabel'>
                  <span className='gdrpCheckLabel'>
                    Please tick this box if you would like to OPT OUT of receiving future communications from us.
                    We promise we will only contact you with relevant product updates and we will not share your data with anyone else.
                  </span>  
                </label>
              </div>
            </div>
          </div>  
          <button
            type="submit"
            className={`btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              'Register'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
