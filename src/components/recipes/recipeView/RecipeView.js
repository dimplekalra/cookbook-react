import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteRecipe } from "../../../redux/reducers/recipesReducer";
import {
  fetchSingleRecipe,
  MakeFavourite,
  RemoveFavourite,
} from "../../../redux/reducers/recipesReducer";
import InplaceConfirm from "../../General/Confirm/InplaceConfirm";

import "./Styles.scss";

class RecipeView extends Component {
  history = this.props.history;
  params = this.props.match.params;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    let { recipe_id } = this.params;

    try {
      recipe_id = Number(recipe_id);
      if (recipe_id) {
        await this.props.getSingleRecipe(recipe_id);
        const currentRecipe = this.props.currentRecipe;
        if (!currentRecipe) {
          throw new Error("recipe not found");
        }
      } else {
        throw new Error("No Id is provided");
      }
    } catch (error) {
      //console.log(error.message);
    }
  };

  GoBack = () => {
    this.history.goBack();
  };

  toggleFavourite = (id) => {
    const { currentRecipe } = this.props.recipes;

    let index1;

    //first Method to find favourite
    if (currentRecipe) {
      const { isFavourite } = currentRecipe;

      if (isFavourite) {
        this.props.RemoveFavourite(currentRecipe, id);

        return;
      } else {
        this.props.MakeFavourite(currentRecipe, id);
        return;
      }
    }
  };

  renderVotes = (votes) => {
    let temp = [];
    for (let i = 0; i < votes; i++) {
      temp.push(
        <span>
          <i className="fa fa-star"></i>
        </span>
      );
    }

    return <div className="stars-icon">{temp}</div>;
  };

  handleDelete = async () => {
    try {
      let { recipe_id } = this.params;
      if (recipe_id) {
        const result = await this.props.deleteRecipe(recipe_id);
        this.GoBack();
      } else {
        throw new Error("No Id is Provided");
      }
    } catch (error) {
      //console.log("error is ", error.message);
    }
  };

  render() {
    const singleRecipe = this.props.recipes.currentRecipe;

    return (
      <React.Fragment>
        <header className="header">
          <div className="back-button">
            <span onClick={(e) => this.GoBack()}>
              <img src="../../images/back.png" />
            </span>
          </div>
        </header>
        <div className="main single-recipe">
          <div className="item-content">
            <div className="image-sec">
              <div className="imagewrapper">
                <img src={singleRecipe.imageUrl} />
                <span
                  className={`favourite-icon ${
                    singleRecipe.isFavourite ? "active" : ""
                  }`}
                >
                  <span onClick={(e) => this.toggleFavourite(singleRecipe.id)}>
                    <i className="fa fa-heart" aria-hidden="true"></i>
                  </span>
                </span>
              </div>
            </div>
            <div className="item-content-left">
              <div className="float-left">
                <h3>{singleRecipe.name}</h3>
                <p>Master the king of dishes</p>
                {this.renderVotes(singleRecipe.votes)}
              </div>
              <div className="float-right">
                <span
                  className="edit-item"
                  onClick={(e) =>
                    this.history.push(`/recipes/${singleRecipe.id}`)
                  }
                >
                  <img src="../../images/pencil.png" />
                </span>

                <InplaceConfirm
                  Action={this.handleDelete}
                  HTMLComponent={
                    <span className="delete-item">
                      <img src="../../images/delete.png" />
                    </span>
                  }
                />
              </div>
            </div>
            <div className="cooktime-sec">
              <ul>
                <li>
                  <h3>Serving</h3>
                  <p>{singleRecipe.serving}pp</p>
                </li>
                <li>
                  <h3>Cook Time</h3>
                  <p>{singleRecipe.cooktime}m</p>
                </li>
              </ul>
            </div>

            <div className="description-sec">
              <h4>Description</h4>
              <p>{singleRecipe.description}</p>
            </div>
            <div className="ingrediants-sec">
              <h4>Ingrediants</h4>
              <ul>
                {singleRecipe.ingredients && singleRecipe.ingredients.length
                  ? singleRecipe.ingredients.map((ing, index) => (
                      <li key={index}>{ing}</li>
                    ))
                  : null}
              </ul>
            </div>
            <div className="preparation-step">
              <h4>Preparation Steps</h4>
              <ul>
                {singleRecipe.steps && singleRecipe.steps.length
                  ? singleRecipe.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    recipes: state.recipes,

    currentRecipe: state.recipes.currentRecipe,

    Api: state.Api,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSingleRecipe: (id) => {
    return dispatch(fetchSingleRecipe(id));
  },
  deleteRecipe: (id) => dispatch(deleteRecipe(id)),
  MakeFavourite: (recipe, id) => {
    return dispatch(MakeFavourite(recipe, id));
  },
  RemoveFavourite: (recipe, id) => dispatch(RemoveFavourite(recipe, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RecipeView));
