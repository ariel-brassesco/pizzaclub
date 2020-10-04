export const ADD_CART_ITEM = "ADD_CART_ITEM";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
export const PLUS_ONE_QUANTITY_ITEM = "PLUS_ONE_QUANTITY_ITEM";
export const MINUS_ONE_QUANTITY_ITEM = "MINUS_ONE_QUANTITY_ITEM";
export const EMPTY_CART = "EMPTY_CART";
export const SET_DELIVERY = "SET_DELIVERY";

function addCartItem(item) {
  return {
    type: ADD_CART_ITEM,
    item,
  };
}

function removeCartItem(id) {
  return {
    type: REMOVE_CART_ITEM,
    id,
  };
}

function plusOneQuantityItem(id) {
  return {
    type: PLUS_ONE_QUANTITY_ITEM,
    id,
  };
}

function minusOneQuantityItem(id) {
  return {
    type: MINUS_ONE_QUANTITY_ITEM,
    id,
  };
}

function emptyCart() {
  return {
    type: EMPTY_CART,
  };
}

function setDelivery(mode, shipping) {
  return {
    type: SET_DELIVERY,
    mode,
    shipping
  };
}

export {
  addCartItem,
  removeCartItem,
  plusOneQuantityItem,
  minusOneQuantityItem,
  emptyCart,
  setDelivery
};
