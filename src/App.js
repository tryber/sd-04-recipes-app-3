import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  LoginScreen,
  MealsScreen,
  DrinksScreen,
  DetailsScreen,
  ProfileScreen,
  FavoriteRecipesScreen,
} from './pages';
import InProgressScreen from './pages/InProgressScreen';

function App() {
  return (
    <div id="meals">
      <main>
        <Switch>
          <Route exact path="/" component={LoginScreen} />
          <Route exact path="/comidas" component={MealsScreen} />
          <Route exact path="/bebidas" component={DrinksScreen} />
          <Route exact path="/comidas/:id" component={DetailsScreen} />
          <Route exact path="/bebidas/:id" component={DetailsScreen} />
          <Route path="/comidas/:id/in-progress" component={InProgressScreen} />
          <Route path="/bebidas/:id/in-progress" component={InProgressScreen} />
          <Route path="/explorar" />
          <Route exact path="/explorar/comidas" />
          <Route exact path="/explorar/bebidas" />
          <Route path="/explorar/comidas/ingredientes" />
          <Route path="/explorar/bebidas/ingredientes" />
          <Route path="/explorar/comidas/area" />
          <Route path="/perfil" component={ProfileScreen} />
          <Route path="/receitas-feitas" />
          <Route path="/receitas-favoritas" component={FavoriteRecipesScreen} />
          <Route exact path="*" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
