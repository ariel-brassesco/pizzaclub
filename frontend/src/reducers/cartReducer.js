// import { v4 as uuidv4 } from 'uuid';
import {
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    PLUS_ONE_QUANTITY_ITEM,
    MINUS_ONE_QUANTITY_ITEM,
    EMPTY_CART,
    SET_DELIVERY_MODE
} from '../actions/actionsCart' 


const INITIAL_CART_STATE = {
    items: [],
    total: 0.0,
    delivery: null 
};

export function cartReducer(state = INITIAL_CART_STATE, action) {
    switch(action.type) {
        case ADD_CART_ITEM:
            //If the item is not in cart add it
            let new_item = state.items.filter(item => item.id === action.item.id);

            if (new_item.length === 0) {
                new_item = {...action.item};
                const items = state.items.concat(new_item);
                let total = items.reduce((c, a) => a.subtotal+c, 0);
                return {...state, items, total}
            }
            //If the item already is in the cart, updated
            let items = state.items.map( item => {
                if(item.id === action.item.id) { 
                    return {...action.item};
                }
                return item;
            });
            let total = items.reduce((c, a) => a.subtotal+c, 0);
            return {...state, items, total};

        case REMOVE_CART_ITEM:
            items = state.items.filter(({ id }) => id !== action.id);
            total = items.reduce((c, a) => a.subtotal+c, 0);
            return {...state, items, total};
        
        case PLUS_ONE_QUANTITY_ITEM:
            // Update the quantity and subtotal
            items = state.items.map(item => {
                if(item.id === action.id) {
                    let quantity = item.quantity + 1;
                    let subtotal = quantity * item.price; 
                    return {...item, quantity, subtotal};
                }
                return item;
            })
            // Calculate the total
            total = items.reduce((c, a) => a.subtotal+c, 0);
            return {...state, items, total};
        
        case MINUS_ONE_QUANTITY_ITEM:
            // Update the quantity and subtotal
            items = state.items.map(item => {
                if(item.id === action.id) {
                    let quantity = item.quantity - 1;
                    if (quantity <= 0) quantity = 0;
                    let subtotal = quantity * item.price; 
                    return {...item, quantity, subtotal};
                }
                return item;
            })
            // Calculate the total
            total = items.reduce((c, a) => a.subtotal+c, 0);
            return {...state, items, total};
        
        case EMPTY_CART:
            return {...state, items: [], total: 0}
        
        case SET_DELIVERY_MODE:
            return {...state, delivery: action.mode};

        default: 
            return state;
    }
}

export const getCartItems = state => state.cart.items;
export const getTotalCart = state => state.cart.total;
export const getDeliveryMode = state => state.cart.delivery;