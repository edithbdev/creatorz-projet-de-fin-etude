/* eslint-disable max-len */
import React from 'react';
import Page from 'src/components/Page';
import Card from 'src/components/Card';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './style.scss';

const Home = ({ listCreator }) => (
  <Page>
    <p className="home-intro">Découvrez le savoir-faire artisanal made in France.<br />
      <strong>Bienvenue</strong>, le site Creatorz’ est une vitrine qui vous présente des artisans et des créateurs du fait main : bijoux, sculptures, peintures…<br />
      Nous soutenons les artisans et nous souhaitons leur apporter plus de visibilité sur la toile !<br />
      Vous pouvez les contacter directement afin d’obtenir de plus amples informations.<br />

      Cher visiteur, pensez à <Link to="/inscription/utilisateur" as="a">créer un compte</Link> si vous souhaitez laisser un commentaire à vos artisans préférés.<br />

      Vous êtes créateur et vous avez envie de faire découvrir vos créations artisanales ? <Link to="/inscription/createur" as="a">Inscrivez-vous!</Link><br />

      Bonne découverte.<br />
    </p>
    <div className="creators-list">
      {listCreator.slice(0, 5).map((creator) => (
        <Card key={creator.id} {...creator} />
      ))}
      <article className="card link-solo">
        <Link to="/createurs" className="card-link">
          Voir tous nos créateurs
        </Link>
      </article>
    </div>
  </Page>
);

Home.propTypes = {
  listCreator: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

Home.defaultProps = {
  listCreator: null,
};

export default Home;
