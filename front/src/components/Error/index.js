import React from 'react';
import Page from 'src/components/Page';
import ErrorPicture from 'src/assets/404.jpg';

import './style.scss';

const Error = () => (
  <Page>
    <h1 className="title-error">Erreur 404, page not found</h1>
    <div className="error-picture">
      <img src={ErrorPicture} alt="404" />
    </div>
  </Page>
);

export default Error;
