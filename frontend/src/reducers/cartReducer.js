// import { v4 as uuidv4 } from 'uuid';
// Import Constants
import { CART_KEY } from "../constants";
//Import Functions
import { saveData, getData } from "../data";
// Import Actions
import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  PLUS_ONE_QUANTITY_ITEM,
  MINUS_ONE_QUANTITY_ITEM,
  EMPTY_CART,
  SET_DELIVERY_MODE,
} from "../actions/actionsCart";

const INITIAL_CART_STATE = getData(CART_KEY)
  ? getData(CART_KEY)
  : {
      items: [],
      subtotal: 0,
      total: 0.0,
      delivery: null,
      shipping: 0.0,
    };

export function cartReducer(state = INITIAL_CART_STATE, action) {
  let new_state = {};
  let items = [];
  let quantity = 0;
  let subtotal = 0;

  switch (action.type) {
    case ADD_CART_ITEM:
      let has_item = state.items.filter((item) => item.id === action.item.id)
        .length;
      // If the item is not in cart add it
      // else updated
      items =
        has_item === 0
          ? state.items.concat(action.item)
          : state.items.map((item) =>
              item.id === action.item.id ? action.item : item
            );

      new_state = { ...state, items };
      break;
    case REMOVE_CART_ITEM:
      items = state.items.filter(({ id }) => id !== action.id);
      new_state = { ...state, items };
      break;
    case PLUS_ONE_QUANTITY_ITEM:
      // Update the quantity and subtotal
      items = state.items.map((item) => {
        if (item.id === action.id) {
          quantity = item.quantity + 1;
          subtotal = quantity * item.price;
          return { ...item, quantity, subtotal };
        }
        return item;
      });
      // Calculate the total
      new_state = { ...state, items };
      break;
    case MINUS_ONE_QUANTITY_ITEM:
      // Update the quantity and subtotal
      items = state.items.map((item) => {
        if (item.id === action.id) {
          quantity = item.quantity - 1;
          if (quantity <= 0) quantity = 0;
          subtotal = quantity * item.price;
          return { ...item, quantity, subtotal };
        }
        return item;
      });
      // Calculate the total
      new_state = { ...state, items, subtotal };
      break;
    case EMPTY_CART:
      new_state = { ...state, items: [] };
      break;
    case SET_DELIVERY_MODE:
      // Set the delivery mode and the shipping cost
      let { shipping, mode } = action;
      new_state = { ...state, delivery: mode, shipping };
      break;
    default:
      new_state = { ...state };
      break;
  }
  // Calculate subtotal an total
  subtotal = new_state.items.reduce((c, a) => a.subtotal + c, 0);
  let total = subtotal + new_state.shipping;
  // Update the new_state
  new_state = { ...new_state, subtotal, total };
  // Save the new_state in localStorage
  saveData(CART_KEY, new_state);
  return { ...new_state };
}

export const getCartItems = (state) => state.cart.items;
export const getSubtotalCart = (state) => state.cart.subtotal;
export const getTotalCart = (state) => state.cart.total;
export const getDeliveryMode = (state) => state.cart.delivery;
export const getShippingCost = (state) => state.cart.shipping;
