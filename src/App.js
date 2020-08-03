import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import loginScreen from './pages/loginScreen';

function App() {
  return (
    <div id="meals">
      <main>
        <Switch>
          <Route to="/" component={loginScreen} />
          <Route to="/comidas" />
          <Route to="/bebidas" />
          <Route to="/comidas/:id" />
          <Route to="/bebidas/:id" />
          <Route to="/comidas/:id/in-progress" />
          <Route to="/bebidas/:id/in-progress" />
          <Route to="/explorar" />
          <Route to="/explorar/comidas" />
          <Route to="/explorar/bebidas" />
          <Route to="/explorar/comidas/ingredientes" />
          <Route to="/explorar/bebidas/ingredientes" />
          <Route to="/explorar/comidas/area" />
          <Route to="/perfil" />
          <Route to="/receitas-feitas" />
          <Route to="/receitas-favoritas" />
        </Switch>
      </main>
    </div>

  );
}

export default App;
