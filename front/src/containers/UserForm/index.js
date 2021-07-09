import { connect } from 'react-redux';
import UserForm from 'src/components/Inscription/InscriptionUser/UserForm';

import { changeValue, inscriptionUser, updateUserProfile } from 'src/actions/user';

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
  pseudo: state.user.pseudo,
  logged: state.user.logged,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (value, name) => {
    const action = changeValue(name, value);
    dispatch(action);
  },
  handleInscriptionUser: () => {
    dispatch(inscriptionUser());
  },
  handleUpdateUser: function () {
    dispatch(updateUserProfile());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
