import { combineReducers } from "redux";
import ingredientReducer from "./ingredientsReducer";
import prepStepReducer from "./prepStepReducer";
import recipesReducer from "./recipesReducer";
import apiReducer from "./apiReducer";
import loginReducer from "./LoginReducer";

export default combineReducers({
  ingredients: ingredientReducer,
  prepSteps: prepStepReducer,
  recipes: recipesReducer,
  Api: apiReducer,
  user: loginReducer,
});
