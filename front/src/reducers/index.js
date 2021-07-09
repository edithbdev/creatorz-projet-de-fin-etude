import { combineReducers } from 'redux';
import creatorReducer from './creator';
import userReducer from './user';
import categoryReducer from './category';

const rootReducer = combineReducers({
  creator: creatorReducer,
  user: userReducer,
  category: categoryReducer,
});

export default rootReducer;
