import React, { Component } from "react";
import {
  fetchAllRecipes,
  MakeFavourite,
  RemoveFavourite,
} from "../../../redux/reducers/recipesReducer";
import { IsLoggedIn } from "../../../utility/generalMethods";
import SingleRecipe from "../SingleRecipe/SingleRecipe";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class FavouriteRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      favourites: [],
      filteredRecipes: [],
    };
  }

  componentDidMount() {
    if (!IsLoggedIn()) {
      this.history.push("/auth/login");
    }

    this.loadRecipes();
  }

  onSearch = (e) => {
    this.setState({
      searchText: e.target.value,
    });

    let updatedRecipes = this.state.favourites;

    updatedRecipes = updatedRecipes.filter((item) => {
      return (
        item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });

    this.setState({ filteredRecipes: updatedRecipes });
  };

  loadRecipes = async () => {
    let { recipes } = this.props.recipes;

    try {
      if (recipes && recipes.length) {
        const favourites = recipes.filter((fav) => fav.isFavourite);

        this.setState({
          filteredRecipes: [...favourites],
          favourites,
        });
      } else {
        recipes = await this.props.fetchingAllRecipes();

        if (recipes && recipes.length) {
          const favourites = recipes.filter((fav) => fav.isFavourite);

          this.setState({
            filteredRecipes: [...favourites],
            favourites,
          });
        } else {
          throw new Error("Recipes are Empty");
        }
      }
    } catch (error) {
      console.log(error.message);
      return;
    }
  };

  toggleFavourite = (id) => {
    let recipes = this.state.favourites;
    let filtered = this.state.filteredRecipes;
    //FIRST METHOD TO FIND FAVOURITES
    if (recipes && recipes.length) {
      let Index = recipes.findIndex((val) => val.id == id);

      if (recipes[Index]) {
        const { isFavourite } = recipes[Index];

        if (isFavourite) {
          this.props.RemoveFavourite(recipes[Index], id);

          recipes = recipes.filter((rec) => rec.id != id);
          filtered = filtered.filter((fav) => fav.id != id);

          this.setState({
            filteredRecipes: [...filtered],
            favourites: [...recipes],
          });
        }
      }
    }
  };

  handleRedirection = (id) => {
    this.props.history.push(`/recipes/view/${id}`);
  };

  render() {
    const { Api } = this.props;

    let { searchText, filteredRecipes } = this.state;

    return (
      <React.Fragment>
        <header className="row search-bar">
          <div class="bannerImgWrapper">
            <img src="../../images/login_banner.jpg" />
          </div>
          <div className="form-group">
            <span className="fa fa-search form-control-feedback"></span>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              onChange={this.onSearch}
              value={searchText}
            />
          </div>
        </header>
        <div className="recipes main">
          <div className="heading">
            <span className="float-left">
              <h3>Favourite Recipes</h3>
            </span>
          </div>
          <ul>
            {Api.isLoading ? <p class="loading-text">Loading...</p> : null}
            {filteredRecipes.length == 0 && !Api.isLoading ? (
              <p>No Favourite Recipe</p>
            ) : (
              filteredRecipes.map((recipe, idx) => {
                return (
                  <SingleRecipe
                    {...recipe}
                    toggleFavourite={this.toggleFavourite}
                    key={idx}
                    onClick={this.handleRedirection}
                  />
                );
              })
            )}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,

    Api: state.Api,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchingAllRecipes: () => dispatch(fetchAllRecipes()),

  RemoveFavourite: (recipe, id) => dispatch(RemoveFavourite(recipe, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FavouriteRecipe));
