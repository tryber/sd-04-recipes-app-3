import React from 'react';

function validateEmail(email) {
  const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  console.log(email);
  console.log(re.test(email));
  return re.test(email);
}

const loginScreen = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const emailValue = document.getElementById('email-input').value;
        const passValue = document.getElementById('password-input').value;
        if (!validateEmail(emailValue)) {
          alert('Digite um email válido');
          return false;
        }
        return true;
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
      <button data-testid="login-submit-btn" >Login</button>
    </form >
  );
};

export default loginScreen;


console.log(validateEmail('anystring@anystringanystring'));