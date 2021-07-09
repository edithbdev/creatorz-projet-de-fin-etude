import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import './style.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer-menu">
      <div className="footer-social">
        <Button className="footer-social-button" circular color="facebook" icon="facebook" href="" />
        <Button className="footer-social-button" circular color="twitter" icon="twitter" href="" />
        <Button className="footer-social-button" circular color="linkedin" icon="linkedin" href="" />
      </div>
      <nav className="footer-nav">
        <NavLink
          to="/contact"
          exact
          className="footer-link"
        >
          Contact
        </NavLink>
        <NavLink
          to="/mentions-legales"
          exact
          className="footer-link"
        >
          Mentions légales
        </NavLink>
        <NavLink
          to="/CGU"
          exact
          className="footer-link"
        >
          CGU
        </NavLink>
        <NavLink
          to="/qui-sommes-nous"
          exact
          className="footer-link"
        >
          Qui sommes-nous ?
        </NavLink>
      </nav>
    </div>
    <p className="footer-copyright">Copyright 2021</p>
  </footer>
);

export default Footer;
