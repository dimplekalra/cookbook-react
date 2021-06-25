// import { getAllData, getSingleData } from "../../utility/generalMethods";
import * as apiActions from "../actions/apiAction";
import { GetAllData } from "../../utility/apiService";
import { Recipes } from "../../utility/Endpoints";

let initialState = {
  isLoading: false,
  error: "",
  data: [],
};

const apiReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let newState = { ...state };
  switch (type) {
    case apiActions.FETCH_REQUEST: {
      return {
        isLoading: true,
        data: [],
        error: "",
      };
    }
    case apiActions.FETCH_SUCCESS: {
      return {
        isLoading: false,
        data: payload,
        error: "",
      };
    }
    case apiActions.FETCH_FAILED: {
      return {
        isLoading: false,
        data: [],
        error: payload,
      };
    }
    default:
      return newState;
  }
};

export default apiReducer;
