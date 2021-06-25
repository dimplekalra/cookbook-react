export const ADD_STEP = "ADD_STEP";
export const DELETE_STEP = "DELETE_STEP";

//action creators

export const addPrepSteps = (step) => ({
  type: ADD_STEP,

  payload: step,
});

export const deletePrepSteps = (step) => ({
  type: DELETE_STEP,
  payload: step,
});
