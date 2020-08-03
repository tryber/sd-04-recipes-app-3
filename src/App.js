import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginScreen from './pages/LoginScreen';
import MealsScreen from './pages/MealsScreen';

function App() {
  return (
    <div id="meals">
      <main>
        <Switch>
          <Route exact path="/" component={LoginScreen} />
          <Route path="/comidas" component={MealsScreen} />
          <Route path="/bebidas" />
          <Route exact path="/comidas/:id" />
          <Route exact path="/bebidas/:id" />
          <Route exact path="/comidas/:id/in-progress" />
          <Route exact path="/bebidas/:id/in-progress" />
          <Route path="/explorar" />
          <Route exact path="/explorar/comidas" />
          <Route exact path="/explorar/bebidas" />
          <Route exact path="/explorar/comidas/ingredientes" />
          <Route exact path="/explorar/bebidas/ingredientes" />
          <Route exact path="/explorar/comidas/area" />
          <Route path="/perfil" />
          <Route path="/receitas-feitas" />
          <Route path="/receitas-favoritas" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
