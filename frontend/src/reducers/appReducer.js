import {combineReducers} from 'redux';
import {ownerReducer} from './ownerReducer';
import {showcaseReducer} from './showcaseReducer';
// import {productsReducer} from './productsReducer';
// import {filtersReducer} from './filtersReducer';
// import {breadcrumbReducer} from './breadcrumbReducer';
// import {cartReducer} from './cartReducer';

const appReducer = combineReducers({
    owner: ownerReducer,
    showcase: showcaseReducer,
    //filters: filtersReducer,
    //breadcrumb: breadcrumbReducer,
    //cart: cartReducer,
})

export default appReducer;
