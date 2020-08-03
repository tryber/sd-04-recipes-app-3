import React from 'react';
import { useHistory } from 'react-router-dom';
import { setLS } from '../helpers';

function validateEmail(email) {
  const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return re.test(email);
}

const LoginScreen = () => {
  const history = useHistory();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const emailValue = document.getElementById('email-input').value;
        // const passValue = document.getElementById('password-input');
        if (!validateEmail(emailValue)) {
          alert('Digite um email valido!');
          return false;
        }

        // Salva keys no local storage após login inicial
        // Redireciona para a tela de comidas

        setLS('mealsToken', 1);
        setLS('cocktailsToken', 1);
        setLS('user', { email: emailValue });
        return history.push('/comidas');
      }}

      onChange={() => {
        const emailValue = document.getElementById('email-input').value;
        const passValue = document.getElementById('password-input').value;
        const submitButton = document.getElementById('login-submit-btn');
        if (passValue && validateEmail(emailValue)) {
          submitButton.disabled = false;
        } else {
          submitButton.disabled = true;
        }
      }}
    >
      <input
        id="email-input"
        data-testid="email-input"
        type="email"
        placeholder="Email"
      />
      <input
        id="password-input"
        data-testid="password-input"
        minLength="6" type="password"
        placeholder="Password"
      />
      <button id="login-submit-btn" data-testid="login-submit-btn" disabled>Login</button>
    </form>
  );
};

export default LoginScreen;
