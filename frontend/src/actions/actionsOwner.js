// Define and export actions
export const FETCH_OWNER_PENDING = "FETCH_OWNER_PENDING";
export const FETCH_OWNER_SUCCESS = "FETCH_OWNER_SUCCESS";
export const FETCH_OWNER_ERROR = "FETCH_OWNER_ERROR";
export const UPDATE_OWNER_STORED = "UPDATE_OWNER_STORED";
export const FETCH_PRODUCTS_PENDING = "FETCH_PRODUCTS_PENDING";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";

// Define actions creators
function fetchOwnerPending() {
  return {
    type: FETCH_PRODUCTS_PENDING,
  };
}

function fetchOwnerSuccess(data) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    data,
  };
}

function fetchOwnerError(error) {
  return {
    type: FETCH_PRODUCTS_ERROR,
    error,
  };
}

function updateOwnerStored(key) {
  return {
    type: UPDATE_OWNER_STORED,
    key,
  };
}

// Export actions creators
export {
  fetchOwnerPending,
  fetchOwnerSuccess,
  fetchOwnerError,
  updateOwnerStored,
};
