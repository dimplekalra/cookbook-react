import * as recipeAction from "../actions/recipesAction";
import * as apiActions from "../actions/apiAction";
import {
  DeleteData,
  GetAllData,
  GetSingleData,
  PostData,
  PutData,
} from "../../utility/apiService";
import { Recipes } from "../../utility/Endpoints";

const initialState = {
  recipes: [],

  hasRecipes: false,
  currentRecipe: {
    id: 0,
    isFavourite: false,
    name: "",
    votes: 0,
    imageUrl: "",
    serving: 0,
    ingredients: [],
    steps: [],
    cookTime: 0,
    description: "",
  },
};

const recipesReducer = (state = initialState, action) => {
  let { type, payload } = action;
  let newState = { ...state };

  switch (type) {
    case recipeAction.LOAD_RECIPE: {
      newState = {
        ...newState,
        hasRecipes: true,
        recipes: [...payload],
      };
      return newState;
    }
    case recipeAction.LOAD_CURRENT_RECIPE: {
      newState = {
        ...newState,
        currentRecipe: { ...payload },
      };
      return newState;
    }
    case recipeAction.ADD_RECIPE: {
      payload = { ...payload, isFavourite: false };
      newState = {
        ...newState,
        recipes: [...newState.recipes, payload],
      };
      return newState;
    }
    case recipeAction.UPDATE_RECIPE: {
      let elemIndex = newState.recipes.findIndex((val) => val.id == action.id);
      if (elemIndex) {
        let temp = [...newState.recipes];
        temp[elemIndex] = { ...payload };

        newState = {
          ...newState,
          recipes: [...temp],
        };

        return newState;
      } else {
        return newState;
      }
    }
    case recipeAction.DELETE_RECIPE: {
      newState = {
        ...newState,
        recipes: [...newState.recipes.filter((val) => val.id != payload.id)],
      };

      return newState;
    }
    case recipeAction.MAKE_FAVOURITE: {
      const id = payload.id;
      let elemIndex = newState.recipes.findIndex((val) => val.id == id);
      if (elemIndex) {
        let temp = [...newState.recipes];

        temp[elemIndex] = { ...temp[elemIndex], isFavourite: true };

        newState = {
          ...newState,

          recipes: [...temp],
        };

        return newState;
      } else {
        return newState;
      }
    }
    case recipeAction.REMOVE_FAVOURITE: {
      const id = payload.id;
      let elemIndex = newState.recipes.findIndex((val) => val.id == id);
      if (elemIndex) {
        let temp = [...newState.recipes];

        temp[elemIndex] = { ...temp[elemIndex], isFavourite: false };

        newState = {
          ...newState,

          recipes: [...temp],
        };

        return newState;
      } else {
        return newState;
      }
    }

    default:
      return newState;
  }
};

export const fetchAllRecipes = () => {
  return async (dispatch) => {
    try {
      await dispatch(apiActions.fetchRequest());

      const result = await GetAllData(Recipes);
      const { data } = result;

      dispatch(apiActions.fetchSuccess(data));
      dispatch(recipeAction.loadRecipe(data));
      return data;
    } catch (error) {
      dispatch(apiActions.fetchError(error.message));
    }
  };
};

export const fetchSingleRecipe = (id) => {
  return async (dispatch) => {
    try {
      dispatch(apiActions.fetchRequest());
      const result = await GetSingleData(Recipes, id);
      const { data } = result;
      dispatch(apiActions.fetchSuccess(data));
      dispatch(recipeAction.loadCurrentRecipe(data));
      return data;
    } catch (error) {
      dispatch(apiActions.fetchError(error.message));
    }
  };
};

export const addRecipe = (recipe) => async (dispatch) => {
  try {
    if (!recipe) {
      throw new Error("Invalid Recipe Entered");
    }
    dispatch(apiActions.fetchRequest());
    const result = await PostData(Recipes, recipe);
    const { data } = result;
    dispatch(apiActions.fetchSuccess(data));
    dispatch(recipeAction.addRecipe(recipe));
    return recipe;
  } catch (error) {
    dispatch(apiActions.fetchError(error.message));
  }
};

export const updateRecipe = (recipe) => async (dispatch) => {
  try {
    if (!recipe) {
      throw new Error("Invalid Recipe Received");
    }
    if (!recipe.id) {
      throw new Error("Invalid id provided");
    }

    const { id } = recipe;

    dispatch(apiActions.fetchRequest());

    const result = await PutData(Recipes, id, recipe);

    const { data } = result;

    dispatch(apiActions.fetchSuccess(data));

    dispatch(recipeAction.updateRecipe(recipe));
    return recipe;
  } catch (error) {
    dispatch(apiActions.fetchError(error.message));
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    if (!id) {
      throw new Error("id not found");
    }
    dispatch(apiActions.fetchRequest());
    const result = await DeleteData(Recipes, id);
    const { data } = result;
    dispatch(apiActions.fetchSuccess(data));

    dispatch(recipeAction.deleteRecipe(id));
  } catch (error) {
    dispatch(apiActions.fetchError(error.message));
  }
};

export const MakeFavourite = (recipe, id) => async (dispatch, getState) => {
  try {
    if (recipe) {
      recipe = {
        ...recipe,
        isFavourite: true,
      };

      await dispatch(updateRecipe(recipe));

      dispatch(recipeAction.makeFavourite(id));
    }
  } catch (error) {
    //console.log(error.message);
  }
};

export const RemoveFavourite = (recipe, id) => async (dispatch, getState) => {
  try {
    if (recipe) {
      recipe = {
        ...recipe,
        isFavourite: false,
      };
      await dispatch(updateRecipe(recipe));
      const res = dispatch(recipeAction.removeFavourite(id));
    }
  } catch (error) {
    console.log(error.message);
  }
};



export default recipesReducer;
