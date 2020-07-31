import React from 'react';
import SearchBar from './components/SearchBar';
import requestApi from './services/requestAPI';
import './App.css';

function App() {
  return (
    <div id="meals">
      <SearchBar />
    </div>
  );
}

export default App;
