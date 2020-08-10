import React, { useState, useEffect } from 'react';
import { requestAPI } from '../../services/requestAPI';

const CategotyFilter = (url, setFilterCategory) => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const request = async () => {
      const reponse = await requestAPI(url);
      return setCategory(reponse);
    };
    request();
  }, []);
  console.log(Object.values(category));
  if (category.length === 0) return <div>Loading...</div>;
  return (
    <div>
      <button
        value="All"
        onClick={(e) => setFilterCategory(e.target.value)}
        data-testid="All-category-filter"
      >
        All
      </button>
      {Object.values(category)[0].slice(0, 5).map(({ strCategory }) =>
        <button
          key={strCategory}
          value={strCategory}
          data-testid={`${strCategory}-category-filter`}
          onClick={(e) => setFilterCategory(e.target.value)}
        >
          {strCategory}
        </button>,
      )
      }
    </div>
  );
};

export default CategotyFilter;
