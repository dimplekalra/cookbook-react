import React, { Component, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as IngredientActions from "../../../redux/actions/ingredientAction";
import * as prepStepsAction from "../../../redux/actions/prepStepsAction";
import { NotificationHandler } from "../../../utility/generalMethods";
import Chips from "../../General/Chips/Chips";
import {
  validateInputs,
  validateSchema,
  AddRecipeSchema,
} from "../../../utility/validation";

import {
  fetchSingleRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} from "../../../redux/reducers/recipesReducer";
import { connect } from "react-redux";

import "./styles.scss";

const initialValues = {
  Name: "",
  imageUrl: "",
  votes: 1,

  Ingredients: [],
  prepSteps: [],
  Serving: 1,
  Cooktime: 1,
  Description: "",
};

const RecipeDetail = (props) => {
  const [editMode, setEditMode] = useState(false);
  const history = useHistory();
  const params = useParams();
  const [chipInput, setChipInput] = useState("");
  const [Status, SetStatus] = useState({
    InProgress: false,
    Failed: false,
    FailMessage: "",
  });

  const [state, setState] = useState({ ...initialValues });

  const [Error, setError] = useState({
    isError: false,
    recipeImageError: false,
    Name: "",
    votes: "",
    Ingredients: "",
    prepSteps: "",
    Serving: "",
    Cooktime: "",
    Description: "",
  });

  const [recipeImage, SetRecipeImage] = useState({
    file: "",
    preview: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const handleAddChip = (name) => {
    if (chipInput && chipInput.length > 0) {
      setState({
        ...state,
        [name]: [...state[name], chipInput],
        chipInput: "",
      });

      if (name === "Ingredients") {
        props.addIngredient(chipInput);
      } else if (name === "prepSteps") {
        props.addPrepStep(chipInput);
      }
    }
  };

  const handleDeleteChip = (name, chip) => {
    setState({
      ...state,
      [name]: state[name].filter((val) => val != chip),
      chipInput: "",
    });

    if (name === "Ingredients") {
      props.deleteIngredient(chip);
    } else if (name === "prepSteps") {
      props.deletePrepSteps(chip);
    }
  };

  const loadData = async () => {
    let { recipe_id } = params;

    if (recipe_id) {
      setEditMode(true);

      const Recipe = await props.getSingleRecipe(recipe_id);

      if (Recipe) {
        setState({
          Name: Recipe.name,
          imageUrl: Recipe.imageUrl,
          votes: Recipe.votes,

          Ingredients: Recipe.ingredients,
          prepSteps: Recipe.steps,
          Serving: Recipe.serving,
          Cooktime: Recipe.cooktime,
          Description: Recipe.description,
        });

        SetRecipeImage({
          ...recipeImage,
          file: "present",
          preview: Recipe.imageUrl,
        });
      }
    } else {
      NotificationHandler("warning", "Invalid Recipe Id");
      return;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleBlur = async (e) => {
    const { Error } = state;
    const { name, value } = e.target;

    const errorObj = await validateInputs(name, value, Error);

    const { isError, errorMessage } = errorObj;

    if (isError) {
      setError({
        ...Error,
        isError: true,
        [name]: errorMessage,
      });
    } else {
      setError({
        ...Error,
        isError: false,
        [name]: "",
      });
    }
  };

  const GoBack = () => {
    window.history.back();
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file == undefined) {
      return;
    }

    if (Error.recipeImageError) {
      setError({
        ...Error,
        recipeImageError: false,
      });
    }

    let reader = new FileReader();

    reader.onloadend = () => {
      SetRecipeImage({
        file: file,
        preview: reader.result,
      });
    };

    reader.readAsDataURL(file);

  };

  const saveData = async (data) => {
    try {
      SetStatus({
        ...Status,
        InProgress: true,
        Message: "",
        Failed: false,
      });

      let result;

      // Edit Process
      if (editMode) {
        data.id = params.recipe_id;
        result = await props.updateRecipe(data);
      } else {
        result = await props.addRecipe(data);
      }

      if (result != null) {
        SetStatus({
          ...Status,
          InProgress: false,
          Failed: false,
        });

        NotificationHandler("success", "Successfull");

        history.push("/recipes");
      } else {
        throw result;
      }
    } catch (err) {
      SetStatus({
        ...Status,
        Failed: true,
        InProgress: false,
        Message: err.message,
      });
      NotificationHandler("error", err.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let data = { ...state };

    if (!recipeImage.file) {
      setError({
        ...Error,
        recipeImageError: true,
      });
      return;
    }

    if (recipeImage.preview) {
      data["imageUrl"] = recipeImage.preview;
      setState({
        ...state,
        imageUrl: recipeImage.preview,
      });
    }

    const errorObj = await validateSchema(AddRecipeSchema, data);

    if (errorObj.isError) {
      return;
    }

    data = {
      name: state.Name,
      imageUrl: data.imageUrl,
      votes: state.votes,
      ingredients: state.Ingredients,
      steps: state.prepSteps,
      serving: state.Serving,
      cooktime: state.Cooktime,
      description: state.Description,
    };    
    saveData(data);
    return;
  };

  const showError = (_fieldName) => {
    let error = Error[_fieldName];

    return error ? (
      <div className="error-block">{error || "Field Is Required"}</div>
    ) : null;
  };

  return (
    <React.Fragment>
      <header className="header">
        <div className="back-button">
          <span onClick={(e) => GoBack()}>
            <img src="../../images/back.png" />
          </span>
        </div>
        <h3>{editMode ? "Edit Recipe" : "Add Recipe"}</h3>
      </header>
      <div className="main edit-recipe">
        <div className="item-content">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Add Photo </label>
              <label htmlFor="recipeUpload" className="img-wrap">
                <img
                  src={
                    recipeImage.preview
                      ? recipeImage.preview
                      : `${process.env.PUBLIC_URL}/images/dummy.png`
                  }
                  alt=""
                  for="recipeUpload"
                />

                <input
                  type="file"
                  class="form-control-file"
                  style={{ display: "none" }}
                  id="recipeUpload"
                  onChange={handleImage}
                />
              </label>

              {Error.recipeImageError ? (
                <div className="controller-outer mb-3">
                  <div className="err-block">{"Please select an image"}</div>
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="Name">Name</label>

              <input
                type="text"
                placeholder="Recipe Name"
                name="Name"
                value={state.Name}
                onChange={handleChange}
                className="form-control"
                required={true}
                onBlur={handleBlur}
                disabled={Status.InProgress}
              />
              {showError("Name")}
            </div>
            <div className="form-group edit-ingredients">
              <label for="Ingredients">Add Ingredients</label>

              <Chips
                name="Ingredients"
                placeholder="Add Ingredients"
                value={chipInput}
                Items={state.Ingredients}
                onDelete={handleDeleteChip}
                onAdd={handleAddChip}
                onChange={(e) => setChipInput(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Cooking time">Cooking TIme</label>

              <input
                type="number"
                className="form-control"
                name="Cooktime"
                value={state.Cooktime}
                id="Cooking time"
                disabled={Status.InProgress}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Cooking time in Minutes"
              />

              {showError("Cooktime")}
            </div>
            <div className="form-group">
              <label htmlFor="Serving">Number Of Serving</label>
              <select
                disabled={Status.InProgress}
                className="form-control"
                id="Serving"
                defaultValue="1"
                name="Serving"
                value={state.Serving}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              {showError("Serving")}
            </div>
            <div className="form-group">
              <label htmlFor="votes">Votes</label>
              <select
                className="form-control"
                id="Votes"
                disabled={Status.InProgress}
                defaultValue={state.votes}
                name="votes"
                value={state.votes}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {showError("votes")}
            </div>

            <div className="form-group description">
              <label htmlFor="Description">Description</label>
              <textarea
                disabled={Status.InProgress}
                className="form-control"
                id="Description"
                rows="5"
                name="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={state.Description}
              ></textarea>
              {showError("Description")}
            </div>
            <div className="form-group preparation">
              <label htmlFor="prepSteps">Preparation Steps</label>

              <Chips
                name="prepSteps"
                placeholder="Add Directions "
                value={chipInput}
                Items={state.prepSteps}
                onDelete={handleDeleteChip}
                onAdd={handleAddChip}
                onChange={(e) => setChipInput(e.target.value)}
              />
              {showError("prepSteps")}
            </div>
            <div className="form-group text-center submit">
              <button
                disabled={Error.isError}
                type="submit"
                className="button submit-button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    currentRecipe: state.recipes.currentRecipe,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSingleRecipe: (id) => dispatch(fetchSingleRecipe(id)),

  addIngredient: (val) => dispatch(IngredientActions.addIngredient(val)),
  addPrepStep: (val) => dispatch(prepStepsAction.addPrepSteps(val)),
  deleteIngredient: (val) => dispatch(IngredientActions.deleteIngredient(val)),
  deletePrepSteps: (val) => dispatch(prepStepsAction.deletePrepSteps(val)),
  addRecipe: (data) => dispatch(addRecipe(data)),
  deleteRecipe: (id) => dispatch(deleteRecipe(id)),
  updateRecipe: (data) => dispatch(updateRecipe(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
