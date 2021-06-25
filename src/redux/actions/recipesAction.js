import { v1 as uuid } from "uuid";

export const ADD_RECIPE = "ADD_RECIPE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const LOAD_RECIPE = "LOAD_RECIPE";
export const LOAD_CURRENT_RECIPE = "LOAD_CURRENT_RECIPE";
export const MAKE_FAVOURITE = "MAKE_FAVOURITE";
export const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";
//action creators

export const addRecipe = (recipe) => ({
  type: ADD_RECIPE,

  payload: recipe,
});
export const updateRecipe = (recipe) => ({
  type: UPDATE_RECIPE,
  id: recipe.id,
  payload: recipe,
});
export const deleteRecipe = (id) => ({
  type: DELETE_RECIPE,
  payload: { id },
});

export const loadRecipe = (data) => ({
  type: LOAD_RECIPE,
  payload: data,
});
export const makeFavourite = (id) => ({
  type: MAKE_FAVOURITE,
  payload: { id },
});
export const removeFavourite = (id) => ({
  type: REMOVE_FAVOURITE,
  payload: { id },
});
export const loadCurrentRecipe = (recipe) => {
  return {
    type: LOAD_CURRENT_RECIPE,
    payload: { ...recipe },
  };
};
