export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
});

export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';
export const saveCategories = (categories) => ({
  type: SAVE_CATEGORIES,
  categories: categories,
});
