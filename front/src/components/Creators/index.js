import React from 'react';
import PropTypes from 'prop-types';
import Page from 'src/components/Page';
import Card from 'src/components/Card';

import './style.scss';

const Creators = ({ listCreator }) => (
  <Page>
    <h2 className="creators-title">Tous les créateurs</h2>
    <div className="creators-list-grid">
      {listCreator.map((creator) => (
        <Card key={creator.id} {...creator} />
      ))}

    </div>
  </Page>
);

Creators.propTypes = {
  listCreator: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

Creators.defaultProps = {
  listCreator: null,
};

export default Creators;
