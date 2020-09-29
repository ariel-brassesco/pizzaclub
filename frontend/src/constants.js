// Define one day in miliseconds to update the data in localStorage
export const DAY_IN_MS = 50 * 1000;

// Define keys in localStorage
export const OWNER_KEY = "ownerState";
export const SHOWCASE_PRODUCT_KEY = "productState";
export const SHOWCASE_TYPES_KEY = "typesState";
export const CART_KEY = "cart";

// Define API URLs
export const URL_API_OWNER = window.location.origin + "/owner/api/owner/";
export const URL_API_TYPES = window.location.origin + "/owner/api/types/";
export const URL_API_PRODUCTS = window.location.origin + "/owner/api/products/";
export const URL_API_MAKE_ORDERS =
  window.location.origin + "/owner/api/orders/new_order/";

//Define Shipping Cost
export const SHIPPING_COST = 60;
export const DELIVERY_MODE = "delivery";
export const TAKEAWAY_MODE = "takeaway";
