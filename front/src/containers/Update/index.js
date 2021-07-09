import { connect } from 'react-redux';
import Update from 'src/components/Profile/Update';

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
