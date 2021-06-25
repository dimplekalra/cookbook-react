import User from "../components/user/User";
import RecipeList from "../components/recipes/recipesList/RecipesList";
import RecipeDetail from "../components/recipes/recipeDetail/RecipeDetail";

import RecipeView from "../components/recipes/recipeView/RecipeView";
import FavouriteRecipe from "../components/recipes/favourites/Favourites";

const routes = [
  { path: "/", exact: true },
  {
    exact: true,
    Component: User,
    path: "/profile",
  },
  {
    exact: true,
    Component: RecipeList,
    path: "/recipes",
  },
  {
    exact: true,
    Component: FavouriteRecipe,
    path: "/recipes/Favourites",
  },
  {
    exact: true,
    Component: RecipeDetail,
    path: "/recipes/add",
  },
  {
    exact: true,
    Component: RecipeDetail,
    path: "/recipes/:recipe_id",
  },
  {
    exact: true,
    Component: RecipeView,
    path: "/recipes/view/:recipe_id",
  },
];

export default routes;
