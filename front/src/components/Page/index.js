import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Page = ({ children }) => (
  <main className="page pusher">
    {children}
  </main>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
