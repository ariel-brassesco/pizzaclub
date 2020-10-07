import {http} from "../services/http";

export function fetchGetDataPending(actionType) {
  return {
    type: actionType,
  };
}

export function fetchGetDataSuccess(actionType, data) {
  return {
    type: actionType,
    payload: data,
  };
}

export function fetchGetDataError(actionType, error) {
  return {
    type: actionType,
    error: error,
  };
}

export default function fetchGetData(
  url,
  pendingAction,
  successAction,
  errorAction
) {
  return (dispatch) => {
    // Inititate the loading state
    dispatch(fetchGetDataPending(pendingAction));
    http.get(url)
      .then(res => dispatch(fetchGetDataSuccess(successAction, res)))
      .catch(error => dispatch(fetchGetDataError(errorAction, error)));
  };
}

/*
AGREGAR PROPTYPES
*/
