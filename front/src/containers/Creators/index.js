import { connect } from 'react-redux';
import Creators from 'src/components/Creators';

const mapStateToProps = (state) => ({
  listCreator: state.creator.listCreator,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Creators);
