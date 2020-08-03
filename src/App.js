import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  return (
    <div id="meals">
      <SearchBar />
      <main>
        <Switch>
          <Route to="/" />
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
