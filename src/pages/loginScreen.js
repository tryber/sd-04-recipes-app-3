import React from 'react';



const loginScreen = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
      }}
    >
      <input data-testid="email-input" type="email" placeholder="Email" />
      <input data-testid="password-input" minLength="6" type="password" placeholder="Password" />
      <button data-testid="login-submit-btn">Login</button>
    </form >
  );
};

export default loginScreen;
