import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const Card = ({
  brand,
  category,
  pictures,
  slug,
}) => (
  <article className="card">
    <div className="card-img">
      <img src={`http://ec2-54-80-48-178.compute-1.amazonaws.com/images/${pictures[0].name}`} alt="oeuvre du créateur" />
    </div>
    <div className="card-content">
      <h2 className="card-title">{brand}</h2>
      <p className="card-tag">{category.category_name}</p>
      <Link to={`/createur/${slug}`} className="card-link">
        Découvrir ce créateur
      </Link>
    </div>
  </article>
);

Card.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  brand: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  category: PropTypes.shape({
    category_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
