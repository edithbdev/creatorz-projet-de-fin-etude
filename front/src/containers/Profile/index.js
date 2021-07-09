import { connect } from 'react-redux';
import Profile from 'src/components/Profile';
import {
  toggleModal,
  deleteProfile,
  changeValue,
  addComment,
  saveCurrentCreatorId,
} from 'src/actions/user';
import { commentsFilter } from 'src/selectors';

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  loadingUser: state.user.loadingUser,
  loadingComment: state.creator.loadingComment,
  modalIsOpen: state.user.modalIsOpen,
  commentBody: state.user.commentBody,
  logged: state.user.logged,
  comments: commentsFilter(
    state.creator.comments,
    state.user.currentUser.id,
  ),
});

const mapDispatchToProps = (dispatch) => ({
  toggleModal: function () {
    dispatch(toggleModal());
  },
  deleteProfile: function () {
    dispatch(deleteProfile());
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
