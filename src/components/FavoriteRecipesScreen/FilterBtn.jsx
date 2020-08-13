import React from 'react';

const FilterBtn = ({ dataTestId, filter, setFilter, text }) => {
  return (
    <button
      type="button"
      data-testid={dataTestId}
      onClick={() => setFilter(filter)}
    >
      {text}
    </button>
  );
};

export default FilterBtn;
