import { SAVE_CREATORS, SAVE_COMMENTS } from '../actions/creators';

export const initialState = {
  listCreator: [],
  comments: [],
  loadingCreators: true,
  loadingComment: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_CREATORS:
      return {
        ...state,
        listCreator: action.creators,
        loadingCreators: false,
      };
    case SAVE_COMMENTS:
      return {
        ...state,
        comments: action.comments,
        loadingComment: false,
      };
    default:
      return state;
  }
};

export default reducer;
