import * as ingredientAction from "../actions/ingredientAction";

const initialState = {
  Ingredients: [],
};

const IngredientReducer = (state = initialState, action) => {
  const { type, payload } = action;

  let newState = { ...state };

  switch (type) {
    case ingredientAction.ADD_INGREDIENT: {
      return {
        ...newState,
        Ingredients: [...newState.Ingredients, payload],
      };
    }
    case ingredientAction.DELETE_INGREDIENT: {
      return {
        ...newState,
        Ingredients: [...newState.Ingredients.filter((val) => val !== payload)],
      };
    }

    default:
      return newState;
  }
};

export default IngredientReducer;
