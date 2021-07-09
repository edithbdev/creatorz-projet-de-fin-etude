export const CHANGE_VALUE = 'CHANGE_VALUE';
export const changeValue = (key, value) => ({
  type: CHANGE_VALUE,
  key: key,
  value: value,
});

export const LOGIN = 'LOGIN';
export const login = () => ({
  type: LOGIN,
});

export const LOGIN_USER = 'LOGIN_USER';
export const loginUser = () => ({
  type: LOGIN_USER,
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type: LOGOUT,
});

export const TOGGLESIDEBAR = 'TOGGLESIDEBAR';
export const toggleSidebar = () => ({
  type: TOGGLESIDEBAR,
});

export const FETCH_USER = 'FETCH_USER';
export const fetchUser = () => ({
  type: FETCH_USER,
});

export const SAVE_USER = 'SAVE_USER';
export const saveUser = (user) => ({
  type: SAVE_USER,
  user: user,
});

export const INSCRIPTION_CREATOR = 'INSCRIPTION_CREATOR';
export const inscriptionCreator = () => ({
  type: INSCRIPTION_CREATOR,
});

export const INSCRIPTION_USER = 'INSCRIPTION_USER';
export const inscriptionUser = () => ({
  type: INSCRIPTION_USER,
});

export const TOGGLE_MEDIUM = 'TOGGLE_MEDIUM';
export const toggleMedium = () => ({
  type: TOGGLE_MEDIUM,
});

export const CLOSESIDEBAR = 'CLOSESIDEBAR';
export const closeSidebar = () => ({
  type: CLOSESIDEBAR,
});

export const UPDATE_CREATOR_PROFILE = 'UPDATE_CREATOR_PROFILE';
export const updateCreatorProfile = () => ({
  type: UPDATE_CREATOR_PROFILE,
});

export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const updateUserProfile = () => ({
  type: UPDATE_USER_PROFILE,
});

export const TOGGLEMODAL = 'TOGGLEMODAL';
export const toggleModal = () => ({
  type: TOGGLEMODAL,
});

export const DELETE_PROFILE = 'DELETE_PROFILE';
export const deleteProfile = () => ({
  type: DELETE_PROFILE,
});

export const ADD_COMMENT = 'ADD_COMMENT';
export const addComment = () => ({
  type: ADD_COMMENT,
});

export const SAVE_CURRENT_CREATOR_ID = 'SAVE_CURRENT_CREATOR_ID';
export const saveCurrentCreatorId = (id) => ({
  type: SAVE_CURRENT_CREATOR_ID,
  id,
});
