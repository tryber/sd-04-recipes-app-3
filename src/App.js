import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import './App.css';
import LoginScreen from './pages/LoginScreen';
import MealsScreen from './pages/MealsScreen';
// import DetailsScreen from './pages/DetailsScreen/DetailsScreen';
import MealDetailScreen from './pages/MealDetailScreen';
import CocktailDetailScreen from './pages/CocktailDetailScreen';
import Header from './components/Header/Header';

function App() {
  return (
    <div id="meals">
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={LoginScreen} />
          <Route exact path="/comidas" component={MealsScreen} />
          <Route exact path="/bebidas" />
          
          {/* <Route exact path="/comidas/:id" component={DetailsScreen} />
          <Route exact path="/bebidas/:id" component={DetailsScreen} /> */}

          <Route exact path="/comidas/:id" component={MealDetailScreen} />
          <Route exact path="/bebidas/:id" component={CocktailDetailScreen} />
          <Route path="/comidas/:id/in-progress" />
          <Route path="/bebidas/:id/in-progress" />
          <Route exact path="/explorar" />
          <Route exact path="/explorar/comidas" />
          <Route exact path="/explorar/bebidas" />
          <Route path="/explorar/comidas/ingredientes" />
          <Route path="/explorar/bebidas/ingredientes" />
          <Route path="/explorar/comidas/area" />
          <Route path="/perfil" />
          <Route path="/receitas-feitas" />
          <Route path="/receitas-favoritas" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
