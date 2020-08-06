import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ItemCard from '../components/ItemCard';
import { fetchMeals } from '../actions/apiRequest';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import '../css/mainScreen.css';

const DrinksScreen = ({ data, fetchMealsProps }) => {
  console.log(data);
  useEffect(() => {
    fetchMealsProps('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  }, []);
  return (
    <div className="main-page">
      <Header />
      <div className="meals-container " data-ride="carousel">
        {data.map(({ strDrink, strDrinkThumb, idDrink }) => ItemCard(strDrink, strDrinkThumb, idDrink, `/bebidas/${idDrink}`))}
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.apiRequest.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMealsProps: (e) => dispatch(fetchMeals(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinksScreen);

DrinksScreen.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMealsProps: PropTypes.func.isRequired,
};
