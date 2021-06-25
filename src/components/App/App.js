import React, { Component } from "react";
import "./App.scss";
import Loader from "react-loader-spinner";
import Login from "../auth/Login/Login";
import Layout from "../General/Layout/Layout";
import { fetchAllRecipes } from "../../redux/reducers/recipesReducer";
import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

class App extends Component {
  hasRecipes = this.props.hasRecipes;
  Api = this.props.Api;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadRecipes();
  }

  loadRecipes = () => {
    this.props.fetchingAllRecipes();
  };

  render() {
    return (
      <Router>
        {this.Api.loading ? (
          <Loader type="Puff" color="yellow" height={100} width={100} />
        ) : (
          <Switch>
            {/* <Redirect exact from="/" to="/recipes" /> */}
            <Route
              exact
              path="/auth/login"
              render={(props) => <Login {...props} />}
            />
            <Route path="/" render={(props) => <Layout {...props} />} />
          </Switch>
        )}
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    hasRecipes: state.recipes.hasRecipes,
    recipes: state.recipes.recipes,
    Api: state.Api,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchingAllRecipes: () => dispatch(fetchAllRecipes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
