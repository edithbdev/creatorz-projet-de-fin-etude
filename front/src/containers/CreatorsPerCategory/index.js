import { connect } from 'react-redux';
import CreatorsPerCategory from 'src/components/CreatorsPerCategory';
import { withRouter } from 'react-router-dom';
import { find } from 'src/selectors';

const mapStateToProps = (state, ownProps) => ({
  listCreator: find(state.category.categoryList, ownProps.match.params.slug).users,
  category: find(state.category.categoryList, ownProps.match.params.slug),
});

const mapDispatchToProps = {};

const container = connect(mapStateToProps, mapDispatchToProps)(CreatorsPerCategory);
// on enrichi le conteneur avec des props liés à l'url
const containerWithRouter = withRouter(container);
// c'est le conteneur enrichi qu'on exporte
export default containerWithRouter;
