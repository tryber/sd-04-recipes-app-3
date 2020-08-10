import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import rootReducer from '../reducers';

function renderWithRouter(ui, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history = routeConfigs.history || createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(<Provider store={rootReducer}><Router history={history}>{ui}</Router></Provider>),
    history,
  };
}

export default renderWithRouter;
