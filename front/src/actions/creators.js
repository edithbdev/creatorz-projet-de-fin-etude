export const FETCH_CREATORS = 'FETCH_CREATORS';
export const fetchCreators = () => ({
  type: FETCH_CREATORS,
});

export const SAVE_CREATORS = 'SAVE_CREATORS';
export const saveCreators = (creators) => ({
  type: SAVE_CREATORS,
  creators: creators,
});

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const fetchComments = () => ({
  type: FETCH_COMMENTS,
});

export const SAVE_COMMENTS = 'SAVE_COMMENTS';
export const saveComments = (comments) => ({
  type: SAVE_COMMENTS,
  comments: comments,
});
