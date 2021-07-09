import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './style.scss';

const NavHeader = ({ toggleSidebar, logged, currentUser }) => {
  let isAdmin = false;
  if (currentUser !== null) {
    if (currentUser.roles[0] === 'ROLE_ADMIN' || currentUser.roles[0] === 'ROLE_SUPERADMIN') {
      isAdmin = true;
    }
  }
  return (
    <nav className="menu">
      <NavLink
        to="/"
        exact
        className="menu-link"
        activeClassName="menu-link--active"
        onClick={toggleSidebar}
      >
        Accueil
      </NavLink>
      <NavLink
        to="/categories"
        exact
        className="menu-link"
        activeClassName="menu-link--active"
        onClick={toggleSidebar}
      >
        Catégories
      </NavLink>
      <NavLink
        to="/createurs"
        exact
        className="menu-link"
        activeClassName="menu-link--active"
        onClick={toggleSidebar}
      >
        Créateurs
      </NavLink>
      {logged && (
        <NavLink
          to="/profil"
          exact
          className="menu-link"
          activeClassName="menu-link--active"
          onClick={toggleSidebar}
        >
          Mon Profil
        </NavLink>
      )}
      {isAdmin && (
        <a className="menu-link" href="http://ec2-54-80-48-178.compute-1.amazonaws.com/" target="_blank" rel="noreferrer" onClick={toggleSidebar}>Admin</a>
      )}
    </nav>
  );
};

NavHeader.propTypes = {
  toggleSidebar: PropTypes.func,
  logged: PropTypes.bool,
  currentUser: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};

NavHeader.defaultProps = {
  toggleSidebar: null,
  logged: false,
  currentUser: null,
};

export default NavHeader;
