import {
  CHANGE_VALUE,
  LOGOUT,
  LOGIN_USER,
  TOGGLESIDEBAR,
  TOGGLE_MEDIUM,
  CLOSESIDEBAR,
  SAVE_USER,
  TOGGLEMODAL,
  SAVE_CURRENT_CREATOR_ID,
  ADD_COMMENT,
  INSCRIPTION_USER,
  INSCRIPTION_CREATOR,
  UPDATE_CREATOR_PROFILE,
  UPDATE_USER_PROFILE,
} from '../actions/user';

export const initialState = {
  logged: false,
  isSidebarOpen: false,
  loadingUser: true,
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  pseudo: '',
  phone: '',
  brand: '',
  facebook: '',
  twitter: '',
  instagram: '',
  pinterest: '',
  linkedin: '',
  website: '',
  category: {
    category_name: '',
    id: '',
  },
  categoryId: '0',
  description: '',
  avatar: null,
  picture1: null,
  picture2: null,
  picture3: null,
  isMedium: false,
  currentUser: null,
  modalIsOpen: false,
  commentBody: '',
  currentCreatorId: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        ...state,
        [action.key]: action.value,
      };
    case LOGIN_USER:
      return {
        ...state,
        logged: true,
        password: '',
      };
    case LOGOUT:
      return {
        ...state,
        logged: false,
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        pseudo: '',
        phone: '',
        brand: '',
        facebook: '',
        twitter: '',
        instagram: '',
        pinterest: '',
        linkedin: '',
        website: '',
        category: {
          category_name: '',
          id: '',
        },
        categoryId: '',
        description: '',
        avatar: null,
        picture1: null,
        picture2: null,
        picture3: null,
        currentUser: null,
        commentBody: '',
        currentCreatorId: '',
      };
    case ADD_COMMENT:
      return {
        ...state,
        commentBody: '',
      };
    case INSCRIPTION_USER:
      return {
        ...state,
        avatar: null,
      };
    case INSCRIPTION_CREATOR:
      return {
        ...state,
        avatar: null,
        picture1: null,
        picture2: null,
        picture3: null,
      };
    case UPDATE_CREATOR_PROFILE:
      return {
        ...state,
        avatar: null,
        picture1: null,
        picture2: null,
        picture3: null,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        avatar: null,
      };
    case TOGGLESIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case CLOSESIDEBAR:
      return {
        ...state,
        isSidebarOpen: false,
      };
    case TOGGLE_MEDIUM:
      return {
        ...state,
        isMedium: !state.isMedium,
      };
    case SAVE_USER:
      return {
        ...state,
        currentUser: action.user,
        loadingUser: false,
        email: action.user.email,
        firstname: action.user.firstname,
        lastname: action.user.lastname,
        pseudo: action.user.pseudo,
        phone: action.user.phone ? action.user.phone : '',
        brand: action.user.brand,
        facebook: action.user.facebook ? action.user.facebook : '',
        twitter: action.user.twitter ? action.user.twitter : '',
        instagram: action.user.instagram ? action.user.instagram : '',
        pinterest: action.user.pinterest ? action.user.pinterest : '',
        linkedin: action.user.linkedin ? action.user.linkedin : '',
        website: action.user.website ? action.user.website : '',
        category: {
          category_name: action.user.category ? action.user.category.category_name : '',
          id: action.user.category ? action.user.category.id : '',
        },
        categoryId: action.user.category ? action.user.category.id : '',
        description: action.user.description,
      };
    case TOGGLEMODAL:
      return {
        ...state,
        modalIsOpen: !state.modalIsOpen,
      };
    case SAVE_CURRENT_CREATOR_ID:
      return {
        ...state,
        currentCreatorId: action.id,
      };
    default:
      return state;
  }
};

export default reducer;
