import React from 'react';
import renderWithRouter from './renderWithRouter';
import renderWithRedux from './renderWithRedux';
import App from '../App';

describe('Login screen tests', () => {
  const { getByTestId, getByText, history } = renderWithRouter(<App />, { route: '/comidas' });
  const { fireEvent } = renderWithRedux(<App />);
  test("If isn't valid email or isn't valid pass login button is disable", () => {
    expect(history.location.pathname).toBe('/');
    const submitButton = getByTestId('login-submit-btn');
    expect(getByText(submitButton.innerHTML)).toBeInTheDocument();
    const emailInput = getByTestId('email-input');
    const passInput = getByTestId('password-input');
    expect(submitButton.disabled).toBe(true);
    fireEvent.change(emailInput, { target: { value: 'djonata@gmail.com.br' } });
    expect(submitButton.disabled).toBe(true);
    fireEvent.change(emailInput, { target: { value: 'djonata@gmail.com.br' } });
    fireEvent.change(passInput, { target: { value: '1234567' } });
    expect(submitButton.disabled).toBe(false);
    console.log(history);
    if (!submitButton.disabled) fireEvent.click(submitButton);
    console.log(history);
  });
});
