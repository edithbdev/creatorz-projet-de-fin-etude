import { connect } from 'react-redux';
import Creator from 'src/components/Creator';
import { withRouter } from 'react-router-dom';
import { find, commentsFilter } from 'src/selectors';
import { changeValue, addComment, saveCurrentCreatorId } from 'src/actions/user';

const mapStateToProps = (state, ownProps) => ({
  creator: find(state.creator.listCreator, ownProps.match.params.slug),
  commentBody: state.user.commentBody,
  logged: state.user.logged,
  comments: commentsFilter(
    state.creator.comments,
    (find(state.creator.listCreator, ownProps.match.params.slug)).id,
  ),
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (value, name) => {
    const action = changeValue(name, value);
    dispatch(action);
  },
  saveCurrentCreatorId: (id) => {
    dispatch(saveCurrentCreatorId(id));
  },
  addComment: () => {
    dispatch(addComment());
  },
});

const container = connect(mapStateToProps, mapDispatchToProps)(Creator);
// on enrichi le conteneur avec des props liés à l'url
const containerWithRouter = withRouter(container);
// c'est le conteneur enrichi qu'on exporte
export default containerWithRouter;
