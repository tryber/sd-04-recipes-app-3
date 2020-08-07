import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchMeals } from '../actions/apiRequest';
import { ItemCard, CategotyFilter, Header, Footer } from '../components';
import '../css/mainScreen.css';


const MealsScreen = ({ data, fetchMealsProps }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  useEffect(() => {
    fetchMealsProps('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  }, []);
  const meals = data.filter(({ strCategory }) => ['All', strCategory].includes(filterCategory));
  return (
    <div className="main-page">
      <Header />
      {CategotyFilter('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setFilterCategory)}
      <div className="meals-container " >
        {meals.slice(0, 12).map(({ strMeal, strMealThumb, idMeal }) => ItemCard(strMeal, strMealThumb, idMeal, `/comidas/${idMeal}`))}
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
