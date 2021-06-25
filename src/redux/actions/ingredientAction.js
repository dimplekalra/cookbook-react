export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

//action creators

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,

  payload: ingredient,
});

export const deleteIngredient = (ingredient) => ({
  type: DELETE_INGREDIENT,
  payload: ingredient,
});
