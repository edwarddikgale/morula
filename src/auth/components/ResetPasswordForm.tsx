import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { ResetPasswordFormData } from '../types/ResetPasswordFormData';
import { pageNames } from '../../config/pageNames';

import './styles/ResetPasswordForm.css';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ResetPasswordFormProps {
  onResetPassword: (formData: ResetPasswordFormData) => void;
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
}

const ResetPasswordForm = ({
  onResetPassword,
  isLoading,
  errorMessage,
  successMessage
}: ResetPasswordFormProps) => {
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    email: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onResetPassword(formData);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <Row>
          <Col>
            <h3>Reset Password</h3>
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
          {successMessage && (
            <div className="mb-1">
              <p className="text-success">{successMessage}</p>
            </div>
          )}
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
              'Reset Password'
            )}
          </button>
          <div className="back-to-login">
            <Link to={pageNames.LOGIN}>Back to Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
