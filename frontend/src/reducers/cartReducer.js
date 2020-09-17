// import { v4 as uuidv4 } from 'uuid';
import {
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    UPDATE_QUANTITY_ITEM,
    EMPTY_CART
} from '../actions/actionsCart' 


const INITIAL_CART_STATE = {
    items: [],
    total: 0.0
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
            const items = state.items.map( item => {
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
        
        case UPDATE_QUANTITY_ITEM:
            // Update the quantity and subtotal
            items = state.items.map(item => {
                if(item.id === action.id) {
                    let quantity = item.quantity + action.quantity;
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
        default: 
            return state;
    }
}

export const getCartItems = state => state.cart.items;
export const getTotalCart = state => state.cart.total;