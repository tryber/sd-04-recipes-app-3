import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';
import SearchBtn from './SearchBtn';
import SearchRadio from './SearchRadio';

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  const { searchClass } = props;
  return (
    <form className={searchClass}>
      <SearchInput searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className="radio-btns">
        <SearchRadio
          id="ingredient"
          value="i"
          searchRadio={searchRadio}
          setSearchRadio={setSearchRadio}
          label="Ingrediente"
        />
        <SearchRadio
          id="name"
          value="s"
          searchRadio={searchRadio}
          setSearchRadio={setSearchRadio}
          label="Nome"
        />
        <SearchRadio
          id="first-letter"
          value="f"
          searchRadio={searchRadio}
          setSearchRadio={setSearchRadio}
          label="Primeira letra"
        />
      </div>
      <SearchBtn searchInput={searchInput} searchRadio={searchRadio} />
    </form>
  );
};

SearchBar.propTypes = {
  searchClass: PropTypes.string,
};

SearchBar.defaultProps = {
  searchClass: 'search-off',
};

export default SearchBar;
