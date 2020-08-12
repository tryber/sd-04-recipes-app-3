import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchMeals } from '../actions/apiRequest';
import {
  ItemCard, CategotyFilter, Header, Footer,
} from '../components';
import '../css/mainScreen.css';

const MealsScreen = ({ data, fetchMealsProps }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  let meals;
  if (data.length === 0) {
    meals = data;
  } else {
    meals = Object.values(data)[0] ? Object.values(data)[0].slice(0, 12) : [];
  }
  useEffect(() => {
    if (filterCategory === 'All') {
      fetchMealsProps('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else {
      fetchMealsProps(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterCategory}`);
    }
  }, [filterCategory, fetchMealsProps]);
  // if (filterCategory !== 'All' && data.length === 0) {
  //   return (<div>Sinto muito, não encontramos nenhuma receita para esses filtros.</div>);
  // }
  // }, [filterCategory]);
  return (
    <div className="main-page">
      <Header />
      {CategotyFilter('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setFilterCategory, filterCategory)}
      <div className="meals-container ">
        {meals.map(({ strMeal, strMealThumb, idMeal }, index) => ItemCard(strMeal, strMealThumb, index, `/comidas/${idMeal}`))}
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.api.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMealsProps: (e) => dispatch(fetchMeals(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MealsScreen);

MealsScreen.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMealsProps: PropTypes.func.isRequired,
};
