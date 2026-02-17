import React, { useState } from 'react';
import useGlobalReducer from '../../hooks/useGlobalReducer.jsx';
import { signup } from '../../action.js';

export const SignupForm = () => {
  const { dispatch } = useGlobalReducer();
  const [emailAddress, setEmailAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmUserPassword, setConfirmUserPassword] = useState('');
  const [arePasswordsVisible, setArePasswordsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    signup(dispatch, {
      email: emailAddress,
      password: userPassword,
      isActive: isActive
    });
  };

  const resetSignupForm = () => {
    setEmailAddress('');
    setUserPassword('');
    setConfirmUserPassword('');
    setArePasswordsVisible(false);
    setIsActive(false);
  };

  return (
    <form onSubmit={handleSignupSubmit}>
      <input
        type="email"
        className="form-control star-wars-input mb-3"
        placeholder="Email Address"
        value={emailAddress}
        onChange={(event) => setEmailAddress(event.target.value)}
        required
      />

      <input
        type={arePasswordsVisible ? 'text' : 'password'}
        className="form-control star-wars-input mb-3"
        placeholder="Password"
        value={userPassword}
        onChange={(event) => setUserPassword(event.target.value)}
        required
      />

      <input
        type={arePasswordsVisible ? 'text' : 'password'}
        className="form-control star-wars-input mb-3"
        placeholder="Confirm Password"
        value={confirmUserPassword}
        onChange={(event) => setConfirmUserPassword(event.target.value)}
        required
      />

      <div className="star-wars-checkbox-wrapper mb-3">
        <input
          type="checkbox"
          id="is-active"
          className="star-wars-checkbox"
          checked={isActive}
          onChange={(event) => setIsActive(event.target.checked)}
        />
        <label htmlFor="is-active" className="star-wars-checkbox-label">
          <span className="checkbox-box">
            <i className="fas fa-check checkbox-check"></i>
          </span>
          <span className="checkbox-text">Active Account</span>
        </label>
      </div>

      <button
        type="button"
        className="btn btn-link auth-link mb-3"
        onClick={() => setArePasswordsVisible(!arePasswordsVisible)}
      >
        {arePasswordsVisible ? 'Hide' : 'Show'} Passwords
      </button>

      <div className="d-flex gap-2">
        <button type="submit" className="btn star-wars-button flex-fill">
          Join the Force
        </button>
        <button
          type="button"
          className="btn star-wars-button-reset"
          onClick={resetSignupForm}
          title="Clear form"
        >
          <i className="fas fa-redo"></i>
        </button>
      </div>
    </form>
  );
};
