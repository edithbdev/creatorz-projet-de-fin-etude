/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { Link } from 'react-router-dom';

const CategoryCard = ({
  category_name,
  photo,
  slug,
  description,
}) => (
  <article className="categorycard">
    <div className="categorycard-img">
      <img src={`http://ec2-54-80-48-178.compute-1.amazonaws.com/images/${photo}`} alt="aperçu de la categorie" />
    </div>
    <div className="categorycard-content">
      <h2 className="categorycard-title">{category_name}</h2>
      <p className="categorycard-description">{description}</p>
      <Link to={`/categorie/${slug}`} className="categorycard-link">
        Découvrez les créateurs
      </Link>
    </div>
  </article>
);

CategoryCard.propTypes = {
  category_name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default CategoryCard;
