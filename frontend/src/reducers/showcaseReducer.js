import { combineReducers } from "redux";
// Import other reducers
import fetchGetDataReducer from "./fetchGetDataReducer";
// Import actions
import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  UPDATE_PRODUCTS_STORED,
  FETCH_TYPES_PENDING,
  FETCH_TYPES_SUCCESS,
  FETCH_TYPES_ERROR,
  UPDATE_TYPES_STORED,
} from "../actions/actionsShowcase";
// Import auxiliar functions
import { saveData, getData } from "../data";
// Import Constants
import { SHOWCASE_PRODUCT_KEY, SHOWCASE_TYPES_KEY } from "../constants";

/* Define the reducer for showcase
    The fetchGetDataReducer is a function how take
    usual actions for fetch data (PENDING, SUCCESS, ERROR)
    and return a reducer with the actions passed.
    It is a Reducer Generator for fetching data.
*/

// Define Initial States for products and types update
const INITIAL_PRODUCTS_STATE = {
  update: false,
  last_modified: 0
};
const INITIAL_TYPES_STATE = {
  update: false,
  last_modified: 0
};

// Define the state reducer of products, for update from localStorage
// or fetch data from server
function prodStatusReducer(state = INITIAL_PRODUCTS_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      const res = { ...state, update: true, last_modified: Date.now() };
      // Save the data in localStorage
      saveData(SHOWCASE_PRODUCT_KEY, {
        data: action.payload,
        pending: false,
        update: true,
        last_modified: res.last_modified,
      });
      return res;
    case FETCH_PRODUCTS_ERROR:
      // Save the data in localStorage
      saveData(SHOWCASE_PRODUCT_KEY, {
        data: [],
        pending: false,
        update: false,
        last_modified: 0,
      });
      return { ...state, update: false };
    case UPDATE_PRODUCTS_STORED:
      // Save the data in localStorage
      let data = getData(action.key);
      saveData(action.key, { ...data, update: true });
      return { ...state, update: true };
    default:
      return state;
  }
}

// Define the state reducer of types, for update from localStorage
// or fetch data from server
function typeStatusReducer(state = INITIAL_TYPES_STATE, action) {
  switch (action.type) {
    case FETCH_TYPES_SUCCESS:
      const res = { ...state, update: true, last_modified: Date.now() };
      // Save the data in localStorage
      saveData(SHOWCASE_TYPES_KEY, {
        data: action.payload,
        pending: false,
        update: true,
        last_modified: res.last_modified,
      });
      return res;
    case FETCH_TYPES_ERROR:
      // Save the data in localStorage
      saveData(SHOWCASE_TYPES_KEY, {
        data: [],
        pending: false,
        update: false,
        last_modified: 0,
      });
      return { ...state, update: false };
    case UPDATE_TYPES_STORED:
      // Save the data in localStorage
      let data = getData(action.key);
      saveData(action.key, { ...data, update: true });
      return { ...state, update: true };
    default:
      return state;
  }
}

// Combine the reduce to fetch data with the reduce to filter
export const showcaseReducer = combineReducers({
  products: fetchGetDataReducer(
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    UPDATE_PRODUCTS_STORED
  ),
  types: fetchGetDataReducer(
    FETCH_TYPES_PENDING,
    FETCH_TYPES_SUCCESS,
    FETCH_TYPES_ERROR,
    UPDATE_TYPES_STORED
  ),
  productsStatus: prodStatusReducer,
  typesStatus: typeStatusReducer,
});

// Define and export getters for the state of products
export const getProductsData = (state) => state.showcase.products.data;
export const getProductsPending = (state) => state.showcase.products.pending;
export const getProductsError = (state) => state.showcase.products.error;
export const getProductsUpdate = (state) =>
  state.showcase.productsStatus.update;
export const getProductsLastModified = (state) =>
  state.showcase.prodcutsStatus.last_modified;

// Define and export getters for the state of types
export const getTypesData = (state) => state.showcase.types.data;
export const getTypesPending = (state) => state.showcase.types.pending;
export const getTypesError = (state) => state.showcase.types.error;
export const getTypesUpdate = (state) => state.showcase.typesStatus.update;
export const getTypesLastModified = (state) =>
  state.showcase.typesStatus.last_modified;
