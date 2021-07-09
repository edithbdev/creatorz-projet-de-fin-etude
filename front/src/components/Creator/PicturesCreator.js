import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const PicturesCreator = ({ name }) => (
  <div className="creator-carousel">
    <img src={`http://ec2-54-80-48-178.compute-1.amazonaws.com/images/${name}`} alt="oeuvre du créateur" />
  </div>
);

PicturesCreator.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PicturesCreator;
