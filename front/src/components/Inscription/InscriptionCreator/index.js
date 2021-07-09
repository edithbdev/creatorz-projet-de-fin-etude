import React from 'react';
import Page from 'src/components/Page';
import CreatorForm from 'src/containers/CreatorForm';

import './style.scss';

const InscriptionCreator = () => (
  <Page>
    <h1>Inscription en tant que créateur</h1>
    <p>Inscrivez vous afin de faire partie de la liste des créateurs mis en avant sur notre
      site.
    </p>
    <CreatorForm />
  </Page>
);

export default InscriptionCreator;
