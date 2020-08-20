import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Collapse, Button, Form } from 'react-bootstrap';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { getLS } from '../helpers';

const ProfileScreen = () => {
  const [redirectTo, setRedirectTo] = useState('');
  const [userInfo] = useState(getLS('user'));

  if (redirectTo === 'done-recipes') {
    return <Redirect to="/receitas-feitas" />;
  }
  if (redirectTo === 'favorite-recipes') {
    return <Redirect to="/receitas-favoritas" />;
  }
  if (redirectTo === 'login-screen') {
    return <Redirect to="/" />;
  }

  return (
    <Form>
      <Header />
      <h3 data-testid="profile-email">{userInfo.email}</h3>
      <Button
        type="button"
        data-testid="profile-done-btn"
        onClick={() => setRedirectTo('done-recipes')}
      >
        Receitas Feitas
      </Button>
      <Button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={() => setRedirectTo('favorite-recipes')}
      >
        Receitas Favoritas
      </Button>
      <Button
        type="button"
        data-testid="profile-logout-btn"
        onClick={() => {
          setRedirectTo('login-screen');
          localStorage.clear();
        }}
      >
        Sair
      </Button>
      <Footer />
    </Form>
  );
};

export default ProfileScreen;
