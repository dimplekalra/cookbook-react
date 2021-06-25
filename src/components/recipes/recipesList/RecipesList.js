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

import "./Styles.scss";

class RecipesList extends Component {
  history = this.props.history;
  dispatch = this.props.dispatch;

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      filteredRecipes: [],
    };
  }

  onSearch = (e) => {
    this.setState({
      searchText: e.target.value,
    });

    let updatedRecipes = this.props.recipes;

    updatedRecipes = updatedRecipes.filter((item) => {
      return (
        item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });

    this.setState({ filteredRecipes: updatedRecipes });
  };

  toggleFavourite = (id) => {
    const recipes = this.state.filteredRecipes;

    //FIRST METHOD TO FIND FAVOURITES
    if (recipes && recipes.length) {
      let Index = recipes.findIndex((val) => val.id == id);

      if (recipes[Index]) {
        const { isFavourite } = recipes[Index];

        if (isFavourite) {
          this.props.RemoveFavourite(recipes[Index], id);
        } else {
          this.props.MakeFavourite(recipes[Index], id);
        }

        recipes[Index] = { ...recipes[Index], isFavourite: !isFavourite };

        this.setState({
          filteredRecipes: [...recipes],
        });
      }
    }
  };

  componentDidMount() {
    if (!IsLoggedIn()) {
      this.history.push("/auth/login");
    }

    this.loadRecipes();
  }

  loadRecipes = async () => {
    await this.props.fetchingAllRecipes();

    if (this.props.recipes && this.props.recipes.length) {
      this.setState({
        filteredRecipes: [...this.props.recipes],
      });
    }
  };

  handleRedirection = (id) => {
    this.history.push(`/recipes/view/${id}`);
  };

  render() {
    const { recipes, Api } = this.props;

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
              <h3>Recipes</h3>
            </span>
            <div className="float-right">
              <span className="add-recipe-button">
                <button onClick={(e) => this.history.push("/recipes/add")}>
                  <img src={`${process.env.PUBLIC_URL}/images/plus.png`} />
                </button>
              </span>
            </div>
          </div>
          <ul>
            {Api.isLoading ? <p class="loading-text">Loading...</p> : null}
            {filteredRecipes.length == 0 && !Api.isLoading ? (
              <p>No Records Found</p>
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
    recipes: state.recipes.recipes,
    hasRecipes: state.recipes.hasRecipes,
    Api: state.Api,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchingAllRecipes: () => dispatch(fetchAllRecipes()),
  MakeFavourite: (recipe, id) => {
    return dispatch(MakeFavourite(recipe, id));
  },
  RemoveFavourite: (recipe, id) => dispatch(RemoveFavourite(recipe, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RecipesList));
