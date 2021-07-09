import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({
  firstName,
  agileRole,
  linkedIn,
  image,
  spe,
}) => (
  <div className="badge">
    <div className="badge-picture">
      <img src={image} alt="avatar du fondateur" />
    </div>
    <div className="badge-infos">
      <h3>{firstName}<br /><span>{spe}</span></h3>
      <p>{agileRole}</p>
      <a href={linkedIn} target="_blank" rel="noreferrer">Profil LinkedIn</a>
    </div>
  </div>
);

Badge.propTypes = {
  firstName: PropTypes.string.isRequired,
  agileRole: PropTypes.string.isRequired,
  linkedIn: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  spe: PropTypes.string.isRequired,
};

export default Badge;
