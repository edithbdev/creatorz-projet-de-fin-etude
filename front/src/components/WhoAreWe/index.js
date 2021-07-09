import React from 'react';
import Page from 'src/components/Page';

import edith from 'src/assets/edith.jpeg';
import kpakpo from 'src/assets/kpakpo.jpeg';
import manon from 'src/assets/manon.jpeg';
import latifa from 'src/assets/latifa.png';
import naïka from 'src/assets/Naïka.jpg';

import Badge from './Badge';

import './style.scss';

const WhoAreWe = () => (
  <Page>
    <div>
      <h2>Qui sommes nous ?</h2>
      <p>Nous sommes un groupe de développeurs junior issus de l'école O'clock, amoureux de l'art
        et désireux de le mettre à la portée de ceux qui le consomment
      </p>
      <h3>Les fondateurs de CreatOrz'</h3>
      <section className="founders">
        <Badge image={edith} firstName="Edith" agileRole="Product Owner" spe="BACK ( Symfony )" linkedIn="https://www.linkedin.com/in/edithbredon/" />
        <Badge image={naïka} firstName="Naïka" agileRole="Git Master" spe="BACK ( Symfony )" linkedIn="https://www.linkedin.com/in/na%C3%AFka-i-2a1b55210/" />
        <Badge image={latifa} firstName="Latifa" agileRole="Lead dev Back" spe="BACK ( Symfony )" linkedIn="https://www.linkedin.com/in/latifa-akli-6378ba213/" />
        <Badge image={kpakpo} firstName="Kpakpo" agileRole="Scrum Master" spe="FRONT ( React JS )" linkedIn="https://www.linkedin.com/in/kpakpo-akue-218122158/" />
        <Badge image={manon} firstName="Manon" agileRole="Lead dev Front" spe="FRONT ( React JS )" linkedIn="https://www.linkedin.com/in/manon-lemasson/" />
      </section>
    </div>
  </Page>
);

export default WhoAreWe;
