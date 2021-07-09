import React from 'react';
import Page from 'src/components/Page';
import CategoryCard from 'src/components/CategoryCard';
import PropTypes from 'prop-types';

import './style.scss';

const Categories = ({ categoryList }) => (
  <Page className="categories">
    <h2 className="categories-title">Toutes nos catégories</h2>
    <div className="categories-list">
      {categoryList.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>
  </Page>
);

Categories.propTypes = {
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

Categories.defaultProps = {
  categoryList: null,
};

export default Categories;
