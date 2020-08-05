import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/mainScreen.css';
import ItemCard from '../components/ItemCard';
import { fetchMeals } from '../actions/apiRequest';
import Header from '../components/Header/Header';

const MealsScreen = ({ data, fetchMealsProps }) => {
  console.log(data);
  useEffect(() => {
    return (fetchMealsProps('https://www.themealdb.com/api/json/v1/1/search.php?s='));
  }, []);
  return (
    <div className="main-page">
      <Header />
      <div className="meals-container " >
        {data.map(({ strMeal, strMealThumb, idMeal }) => ItemCard(strMeal, strMealThumb, idMeal, `/comidas/${idMeal}`))}
      </div>
      <footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.apiRequest.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMealsProps: (e) => dispatch(fetchMeals(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MealsScreen);

MealsScreen.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMealsProps: PropTypes.func.isRequired,
};
