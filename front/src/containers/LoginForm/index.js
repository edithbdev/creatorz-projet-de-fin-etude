import { connect } from 'react-redux';
import LoginForm from 'src/components/LoginForm';
import { changeValue, login } from 'src/actions/user';

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
  logged: state.user.logged,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (value, name) => {
    const action = changeValue(name, value);
    dispatch(action);
  },
  handleLogin: () => {
    dispatch(login());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
