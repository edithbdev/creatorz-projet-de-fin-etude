import { connect } from 'react-redux';
import Header from 'src/components/Header';
import {
  logout,
  toggleSidebar,
  toggleMedium,
  closeSidebar,
} from '../../actions/user';

const mapStateToProps = (state) => ({
  isLogged: state.user.logged,
  isSidebarOpen: state.user.isSidebarOpen,
  isMedium: state.user.isMedium,
  pseudo: state.user.pseudo,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => {
    dispatch(logout());
  },
  toggleSidebar: () => {
    dispatch(toggleSidebar());
  },
  closeSidebar: () => {
    dispatch(closeSidebar());
  },
  toggleMedium: () => {
    dispatch(toggleMedium());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
