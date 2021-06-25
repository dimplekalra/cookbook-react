import * as stepActions from "../actions/prepStepsAction";

const initialState = {
  prepSteps: [],
};

const prepStepReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let newState = { ...state };
  switch (type) {
    case stepActions.ADD_STEP: {
      return {
        ...newState,
        prepSteps: [...newState.prepSteps, payload],
      };
    }
    case stepActions.DELETE_STEP: {
      return {
        ...newState,
        prepSteps: [...newState.prepSteps.filter((val) => val !== payload)],
      };
    }

    default:
      return newState;
  }
};

export default prepStepReducer;
