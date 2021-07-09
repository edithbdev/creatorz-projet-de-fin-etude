import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from 'src/assets/logo-creatorz.png';
import { useWindowSize, useOnClickOutside } from 'src/selectors';
import {
  Icon,
  Menu,
  Sidebar,
  Grid,
  Button,
} from 'semantic-ui-react';

import NavHeader from 'src/components/NavHeader';

import './style.scss';

const Header = ({
  isLogged,
  handleLogout,
  toggleSidebar,
  isSidebarOpen,
  isMedium,
  toggleMedium,
  closeSidebar,
  pseudo,
  currentUser,
}) => {
  const size = useWindowSize();

  useEffect(() => {
    if (size.width < 800 && !isMedium) {
      toggleMedium();
    }
    else if (size.width > 800 && isMedium) {
      toggleMedium();
    }
  }, [size.width]);

  const someFunc = () => {
    handleLogout();
    toggleSidebar();
  };

  const node = useRef();
  useOnClickOutside(node, closeSidebar);

  return (
    <div>
      {!isMedium && (
        <div className="header">
          <img src={logo} alt="logo" className="header-logo" />
          <div className="header-title">
            <h1>CreatOrz'</h1>
            <p className="header-slogan">Vos créateurs à portée de main</p>
            <NavHeader logged={isLogged} currentUser={currentUser} />
          </div>
          {!isLogged && (
            <div className="header-button">
              <Link to="/connexion">
                <button type="button">Connexion</button>
              </Link>
              <Link to="/inscription">
                <button type="button">Inscription</button>
              </Link>
            </div>
          )}
          {isLogged && (
            <div className="connected">
              <div className="connected-infos">
                <p className="bienvenue">Bienvenue <span className="pseudo">{pseudo}</span></p>
              </div>
              <div className="header-button">
                <button type="button" onClick={handleLogout}>Déconnexion</button>
              </div>
            </div>
          )}
        </div>
      )}
      {isMedium && (
        <div className="header" ref={node}>
          <img src={logo} alt="logo" className="header-logo" />
          <div className="header-title">
            <h1>CreatOrz'</h1>
            <p className="header-slogan">Vos créateurs à portée de main</p>
          </div>
          <div className="connected-burger">
            {isLogged && (
              <div className="connected-burger-infos">
                <p className="bienvenue">Bienvenue <span className="pseudo">{pseudo}</span></p>
              </div>
            )}
            <Button icon onClick={toggleSidebar} className="header-burger-button" id="test">
              <Icon name="bars" />
            </Button>
          </div>
          <Grid columns={1}>
            <Grid.Column>
              {!isLogged && (
                <Sidebar
                  as={Menu}
                  animation="overlay"
                  icon="labeled"
                  inverted
                  vertical
                  visible={isSidebarOpen}
                  width="thin"
                  direction="right"
                >
                  <NavHeader
                    toggleSidebar={toggleSidebar}
                    logged={isLogged}
                    currentUser={currentUser}
                  />
                  <div className="header-button">
                    <Link to="/connexion">
                      <button type="button" onClick={toggleSidebar}>Connexion</button>
                    </Link>
                    <Link to="/inscription">
                      <button type="button" onClick={toggleSidebar}>Inscription</button>
                    </Link>
                  </div>
                </Sidebar>
              )}
              {isLogged && (
                <Sidebar
                  as={Menu}
                  animation="overlay"
                  icon="labeled"
                  inverted
                  vertical
                  visible={isSidebarOpen}
                  width="thin"
                  direction="right"
                >
                  <NavHeader
                    toggleSidebar={toggleSidebar}
                    logged={isLogged}
                    currentUser={currentUser}
                  />
                  <div className="header-button">
                    <button type="button" onClick={someFunc}>Déconnexion</button>
                  </div>
                </Sidebar>
              )}
            </Grid.Column>
          </Grid>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  isMedium: PropTypes.bool.isRequired,
  toggleMedium: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  pseudo: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({}),
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
