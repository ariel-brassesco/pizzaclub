/*import {combineReducers} from 'redux';
import {productsReducer} from './productsReducer';
import {filtersReducer} from './filtersReducer';
import {breadcrumbReducer} from './breadcrumbReducer';
import {cartReducer} from './cartReducer';

const appReducer = combineReducers({
    showcase: productsReducer,
    filters: filtersReducer,
    breadcrumb: breadcrumbReducer,
    cart: cartReducer,
})

export default appReducer;
*/
const INITIAL_APP_STATE = {
    state: 0,
};

export default function appReducer(state = INITIAL_APP_STATE, action) {
    return state;
};