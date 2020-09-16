// Define one day in miliseconds to update the data in localStorage
export const DAY_IN_MS = 50*1000; 

// Define keys in localStorage
export const OWNER_KEY = 'ownerState';
export const SHOWCASE_PRODUCT_KEY = 'productState';
export const SHOWCASE_TYPES_KEY = 'typesState';

// Define API URLs
export const URL_API_OWNER = location.origin + '/owner/api/owner/';
export const URL_API_TYPES = location.origin + '/owner/api/types/';
export const URL_API_PRODUCTS = location.origin + '/owner/api/products/';