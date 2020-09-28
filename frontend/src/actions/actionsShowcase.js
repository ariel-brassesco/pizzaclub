// Define and export actions
export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';
export const FETCH_TYPES_PENDING = 'FETCH_TYPES_PENDING';
export const FETCH_TYPES_SUCCESS = 'FETCH_TYPES_SUCCESS';
export const FETCH_TYPES_ERROR = 'FETCH_TYPES_ERROR';
export const UPDATE_PRODUCTS_STORED = 'UPDATE_PRODUCTS_STORED';
export const UPDATE_TYPES_STORED = 'UPDATE_TYPES_STORED';

// Define actions creators
// Actions creators for fetch product data
function fetchProductsPending() {
    return {
        type: FETCH_PRODUCTS_PENDING
    }
}

function fetchProductsSuccess(products) {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        products: products
    }
}

function fetchProductsError(error) {
    return {
        type: FETCH_PRODUCTS_ERROR,
        error: error
    }
}

function updateProductsStored(key) {
    return {
        type: UPDATE_PRODUCTS_STORED,
        key
    }
}

// Actions creators for fetch types data
function fetchTypesPending() {
    return {
        type: FETCH_TYPES_PENDING
    }
}

function fetchTypesSuccess(products) {
    return {
        type: FETCH_TYPES_SUCCESS,
        types: types
    }
}

function fetchTypesError(error) {
    return {
        type: FETCH_TYPES_ERROR,
        error: error
    }
}

function updateTypesStored(key) {
    return {
        type: UPDATE_TYPES_STORED,
        key
    }
}

// Export actions creators
export {
    fetchProductsPending,
    fetchProductsSuccess,
    fetchProductsError,
    updateProductsStored,
    fetchTypesPending,
    fetchTypesSuccess,
    fetchTypesError,
    updateTypesStored
};