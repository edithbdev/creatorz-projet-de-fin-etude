import { SAVE_CATEGORIES } from '../actions/categories';

export const initialState = {
  categoryList: [],
  loadingCategories: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_CATEGORIES:
      return {
        ...state,
        categoryList: action.categories,
        loadingCategories: false,
      };
    default:
      return state;
  }
};

export default reducer;
