import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import rootReducer from '../reducers';

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {},
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
});

export default renderWithRedux;
