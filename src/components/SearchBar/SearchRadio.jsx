import React from 'react';

const SearchRadio = ({ id, value, searchRadio, setSearchRadio, label }) => {
  return (
    <React.Fragment>
      <input
        type="radio"
        name="search-radio"
        id={id}
        value={value}
        checked={searchRadio === value}
        onChange={(event) => setSearchRadio(event.target.value)}
        data-testid={`${id}-search-radio`}
      />
      <label htmlFor={id}>{label}</label>
    </React.Fragment>
  );
};

export default SearchRadio;
