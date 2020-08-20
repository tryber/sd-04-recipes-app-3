import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/loginScreen.css';
import { setLS } from '../helpers';
import logo from '../images/logo-EasyFood.png';

function validateEmail(email) {
  const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return re.test(email);
}

const Input = (type, name) => (
  <input
    id={`${type}-input`}
    data-testid={`${type}-input`}
    minLength="6"
    type={type}
    placeholder={name}
    className="form-control"
  />
);

const LoginScreen = () => {
  const history = useHistory();
  return (
    <div className="login-container">
      <img src={logo} alt="Logo do app" className="logo-img" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const emailValue = document.getElementById('email-input').value;
          const passValue = document.getElementById('password-input').value;
          if (!validateEmail(emailValue) && passValue.length > 6) {
            alert('Digite um email/senha valido!');
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
          if (validateEmail(emailValue) && passValue.length > 6) {
            submitButton.disabled = false;
          } else {
            submitButton.disabled = true;
          }
        }}
        className="form-group"
      >
        {Input('email', 'Email')}
        {Input('password', 'Password')}
        <button
          type="submit"
          id="login-submit-btn"
          data-testid="login-submit-btn"
          className="btn login-submit-btn"
          disabled
        >
          Login
        </button>
        <h3 className="slogan-text">o match perfeito da sua fome com sua vontade de comer</h3>
      </form>
    </div>
  );
};

export default LoginScreen;
