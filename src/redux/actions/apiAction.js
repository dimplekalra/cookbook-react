export const FETCH_REQUEST = "FETCH_REQUEST";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILED = "FETCH_FAILED";

export const fetchRequest = () => {
  return {
    type: FETCH_REQUEST,
  };
};

export const fetchSuccess = (data) => {
  return {
    type: FETCH_SUCCESS,
    payload: data,
  };
};

export const fetchError = (error) => {
  return {
    type: FETCH_FAILED,
    payload: error,
  };
};


