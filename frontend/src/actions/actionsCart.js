export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const UPDATE_QUANTITY_ITEM = 'UPDATE_QUANTITY_ITEM';
export const EMPTY_CART = 'EMPTY_CART';

function addCartItem(item){
    return {
        type: ADD_CART_ITEM,
        item
    }
}

function removeCartItem(id) {
    return {
        type: REMOVE_CART_ITEM,
        id
    }
}

function updateQuantityItem(id, quantity){
    return {
        type: UPDATE_QUANTITY_ITEM,
        id,
        quantity
    }
}

function emptyCart(){
    return {
        type: EMPTY_CART
    }
}

export {
    addCartItem,
    removeCartItem,
    updateQuantityItem,
    emptyCart,
};