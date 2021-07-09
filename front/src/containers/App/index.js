import { connect } from 'react-redux';
import App from 'src/components/App';
import { fetchCreators } from 'src/actions/creators';
import { fetchCategories } from 'src/actions/categories';

const mapStateToProps = (state) => ({
  loadingCreators: state.creator.loadingCreators,
  loadingCategories: state.category.loadingCategories,
  isLogged: state.user.logged,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCreators: function () {
    dispatch(fetchCreators());
  },
  fetchCategories: function () {
    dispatch(fetchCategories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
