import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/loginScreen.css';
import { setLS } from '../helpers';

function validateEmail(email) {
  const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return re.test(email);
}
const LoginScreen = () => (
  <div className="login-container">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const emailValue = document.getElementById('email-input').value;
        // const passValue = document.getElementById('password-input');
        if (!validateEmail(emailValue)) {
          alert('Digite um email valido!');
          return false;
        }
        setLS('mealsToken', 1);
        setLS('cocktailsToken', 1);
        setLS('user', { email: emailValue });
        return history.push('/comidas');
      }}
      onChange={() => {
        const emailValue = document.getElementById('email-input').value;
        const passValue = document.getElementById('password-input').value;
        const submitButton = document.getElementById('login-submit-btn');
        console.log(emailValue);
        if (passValue && validateEmail(emailValue)) {
          submitButton.disabled = false;
        } else {
          submitButton.disabled = true;
        }
      }}
      className="form-group"
    >
      <input
        id="email-input"
        data-testid="email-input"
        type="email"
        placeholder="Email"
        className="form-control"
      />
      <input
        id="password-input"
        data-testid="password-input"
        minLength="6"
        type="password"
        placeholder="Password"
        className="form-control"
      />
      <button
        type="submit"
        id="login-submit-btn"
        data-testid="login-submit-btn"
        className="btn btn-primary"
        disabled
      >
        Login
    </button>
    </form>
  </div>
);

export default LoginScreen;
