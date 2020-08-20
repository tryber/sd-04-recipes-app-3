import React, { useState, useEffect } from 'react';
import { Collapse, Button } from 'react-bootstrap';
import { requestAPI } from '../../services/requestAPI';

const CategotyFilter = (url, setFilterCategory, filterCategory) => {
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const request = async () => {
      const reponse = await requestAPI(url);
      return setCategory(reponse);
    };
    request();
  }, [url]);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // console.log(Object.values(category));
  if (category.length === 0) return <div>Loading...</div>;
  return (
    <div className="categories-container">
      <Button
        className="category-btn"
        type="button"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant="dark"
      >
        Categorias
      </Button>
      <Collapse in={open}>
        <div className="collapse" id="example-collapse-text">

          <Button
            value="All"
            onClick={(e) => setFilterCategory(e.target.value)}
            data-testid="All-category-filter"
            className="category-btn"
            type="button"
            variant="dark"
          >
            All
          </Button>
          {Object.values(category)[0].slice(0, 5).map(({ strCategory }) => (
            <Button
              key={strCategory}
              value={strCategory}
              data-testid={`${strCategory}-category-filter`}
              type="button"
              onClick={(e) => {
                const { value } = e.target;
                if (filterCategory === value) return setFilterCategory('All');
                return setFilterCategory(value);
              }}
              className="category-btn"
              variant="dark"
            >
              {strCategory}
            </Button>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default CategotyFilter;
