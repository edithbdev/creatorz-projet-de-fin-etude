import React from 'react';
import Page from 'src/components/Page';

import './style.scss';

const LegalNotice = () => (
  <Page>
    <h1 className="legalNotice-title">Mentions légales</h1>
    <p className="legalNotice-text">
      Le présent site est la propriété de Creatorz’ <br />
      Siège social :<br />
      Creatorz’<br />
      Rue Chausson à la maison<br />
      75000 PARIS<br />
      France<br /><br />
      Les utilisateurs de ce site sont tenus de respecter la
      légalité et en particulier les dispositions de la loi
      Informatique et libertés dont la violation est sanctionnée
      pénalement. Ils doivent notamment s’abstenir, s’agissant
      des informations auxquelles ils accèdent, de toute collecte,
      captation, déformation ou utilisation et d’une manière
      générale de tout acte susceptible de porter atteinte à
      la vie privée ou à la réputation des personnes.
      Les utilisateurs sont informés, conformément aux
      dispositions de la loi Informatique et libertés
      qu’ils disposent d’un droit d’accès et de rectification
      relativement aux informations les concernant auprès de Creatorz’.<br />
      La structure générale, ainsi que les textes, images et sons
      composant ce site sont la propriété de Creatorz’. Toute
      représentation totale ou partielle de ce site ou d’un ou plusieurs
      de ces composants, par quelque procédé que ce soit, sans autorisation
      expresse de Creatorz’ est interdite et constituerait une contrefaçon
      sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.<br />
      Creatorz’ ne saurait être tenue responsable pour toutes erreurs ou omissions dans les
      textes et illustrations du site. Toutes les informations peuvent faire l’objet de
      modifications et de suppressions sans préavis.<br />
      Les liens hypertextes mis en place dans le cadre du présent site Internet en direction
      d’autres sites présents sur le réseau internet ne sauraient engager la responsabilité
      de Creatorz’.<br />
      En aucun cas, Creatorz’ ne sera tenu responsable des dommages directs, indirects
      résultant de l’usage de ce site web ou d’autres sites qui lui sont liés directement
      et indirectement.<br /><br />
      CONCEPTION DU SITE<br />
      Le site creatorz.fr a été conçu par la super team Creatorz’ cie.<br /><br />
      HÉBERGEUR<br />
      AWS - Surge<br />
    </p>
  </Page>
);

export default LegalNotice;
