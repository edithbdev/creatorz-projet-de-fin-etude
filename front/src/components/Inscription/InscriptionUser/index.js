import React from 'react';
import UserForm from 'src/containers/UserForm';
import Page from 'src/components/Page';
import './style.scss';

const InscriptionUser = () => (
  <Page>
    <h1>Inscription en tant qu'utilisateur</h1>
    <p>Cette inscription vous permettra, entre autres, d'émettre des commentaires sur le site.</p>
    <UserForm />
  </Page>
);

export default InscriptionUser;
