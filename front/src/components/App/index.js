import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  useLocation,
  useHistory,
  Redirect,
} from 'react-router-dom';

import Error from 'src/components/Error';
import Header from 'src/containers/Header';
import Home from 'src/containers/Home';
import Creators from 'src/containers/Creators';
import Categories from 'src/containers/Categories';
import Footer from 'src/components/Footer';
import Creator from 'src/containers/Creator';
import LoginForm from 'src/containers/LoginForm';
import Inscription from 'src/components/Inscription';
import InscriptionCreator from 'src/components/Inscription/InscriptionCreator';
import InscriptionUser from 'src/components/Inscription/InscriptionUser';
import CreatorsPerCategory from 'src/containers/CreatorsPerCategory';
import Profile from 'src/containers/Profile';
import Update from 'src/containers/Update';
import WhoAreWe from 'src/components/WhoAreWe';
import LegalNotice from 'src/components/LegalNotice';
import CGU from 'src/components/CGU';
import Contact from 'src/components/Contact';
import Loading from './Loading';

import './style.scss';

const App = ({
  loadingCreators,
  fetchCreators,
  loadingCategories,
  fetchCategories,
  isLogged,
}) => {
  useEffect(() => {
    fetchCreators();
    fetchCategories();
  }, []);

  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  const location = useLocation();

  useEffect(() => {
    // je reviens en haut
    window.scroll(0, 0);
  }, [location]);

  if (loadingCreators && loadingCategories) {
    return <Loading />;
  }
  return (
    <div className="app pushable">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/categories" exact>
          <Categories />
        </Route>
        <Route path="/createurs" exact>
          <Creators />
        </Route>
        <Route path="/categorie/:slug" exact>
          <CreatorsPerCategory />
        </Route>
        <Route path="/createur/:slug" exact>
          <Creator />
        </Route>
        <Route exact path="/connexion">
          {!isLogged ? <LoginForm /> : <Redirect to="/" /> }
        </Route>
        <Route path="/inscription" exact>
          <Inscription />
        </Route>
        <Route path="/inscription/createur" exact>
          <InscriptionCreator />
        </Route>
        <Route path="/inscription/utilisateur" exact>
          <InscriptionUser />
        </Route>
        <Route exact path="/profil">
          {isLogged ? <Profile /> : <Redirect to="/" /> }
        </Route>
        <Route exact path="/profil/mise-a-jour">
          {isLogged ? <Update /> : <Redirect to="/" /> }
        </Route>
        <Route path="/qui-sommes-nous" exact>
          <WhoAreWe />
        </Route>
        <Route path="/mentions-legales" exact>
          <LegalNotice />
        </Route>
        <Route path="/CGU" exact>
          <CGU />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
      <button type="button" className="button-go-back" onClick={handleClick}>Retour</button>
      <Footer />
    </div>
  );
};

App.propTypes = {
  loadingCreators: PropTypes.bool,
  fetchCreators: PropTypes.func.isRequired,
  loadingCategories: PropTypes.bool,
  fetchCategories: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
};

App.defaultProps = {
  loadingCreators: true,
  loadingCategories: true,
  isLogged: false,
};

export default App;
