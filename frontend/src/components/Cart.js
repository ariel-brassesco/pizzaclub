import React from "react";
import { connect } from "react-redux";

//Import Components
import { GoToButton } from "../components/Common";
//Import Getters
import { getCartItems, getSubtotalCart } from "../reducers/cartReducer";
// Import Constants
import { DELIVERY_MODE } from "../constants";

// This component show a text and price y the format "text       $ price"
// It's a div container with two span (one for text one for price)
// Can pass the class for div and class for span, and the decimal places for price
const PriceItem = ({
  className,
  classItem,
  price,
  text,
  decimalPlaces = 2,
}) => {
  return (
    <div className={className}>
      <span className={classItem}>{text}</span>
      <span className={classItem}>{`$ ${price.toFixed(decimalPlaces)}`}</span>
    </div>
  );
};

export const CartItem = (props) => {
  const { size, presentation, quantity, subtotal, product } = props;
  return (
    <div className="cart-item">
      <PriceItem
        text={`${quantity} x ${product.name}`}
        price={subtotal}
        decimalPlaces={2}
        className="cart-price-item"
      />
      <ul className="cart-list-type">
        {size ? <li>{size}</li> : null}
        {presentation ? <li>{presentation}</li> : null}
      </ul>
    </div>
  );
};

export const EmptyCart = ({ empty, className }) => {
  return (
    <span className={`${className} icon`} onClick={empty}>
      <span className="fa-stack">
        <i className="fas fa-shopping-cart fa-stack-1x"></i>
        <i className="fas fa-times fa-stack-2x has-text-danger"></i>
      </span>
    </span>
  );
};

const CheckoutCart = (props) => {
  const { items, subtotal, path, className, classBtn } = props;

  return (
    <div className={className}>
      {!items.length ? (
        <div className="gotocart-btn">
          <span className="icon">
            <i className="fas fa-hand-point-up"></i>
          </span>
          <span>Seleccioná para armar tu pedido</span>
        </div>
      ) : (
        <GoToButton path={path} className={classBtn}>
          <div>
            <span className="icon">
              <i className="fas fa-shopping-cart"></i>
            </span>
            <span>Ver tu pedido!</span>
          </div>
          <span>{`$ ${subtotal}`}</span>
        </GoToButton>
      )}
    </div>
  );
};

const mapStateToPropsCart = (state) => {
  return {
    items: getCartItems(state),
    subtotal: getSubtotalCart(state),
  };
};

export const GoToCart = connect(mapStateToPropsCart, null)(CheckoutCart);

// const ShippingItem = ({shipping, className, classItem}) => {
//     return (
//         <div className={className}>
//             <span className={classItem}>Envío</span>
//             <span className={classItem}>{`$ ${shipping.toFixed(2)}`}</span>
//         </div>
//     )
// }

const CartTitle = ({ className, text }) => {
  return (
    <div className={className}>
      <span className="icon">
        <i className="fas fa-shopping-basket"></i>
      </span>
      <span>{text}</span>
    </div>
  );
};

export function CartShower(props) {
  const { mode, shipping, items, subtotal, total } = props;
  return (
    <div className="cart-shower">
      {/* Show Cart Title */}
      <CartTitle
        className="cart-title"
        text="Controlá el detalle de tu pedido"
      />
      {/* Show Cart Items */}
      {items.map((i) => {
        const size = i.product.size.filter((s) => s.id == i.size)[0];
        const presentation = i.product.presentation.filter(
          (p) => p.id == i.presentation
        )[0];
        return (
          <CartItem
            key={i.id}
            {...i}
            size={size ? size.name : null}
            presentation={presentation ? presentation.name : null}
          />
        );
      })}
      {/* Show Subtotal and Shipping Cost if there is */}
      {mode !== DELIVERY_MODE
        ? null
        : [
            <PriceItem
              key="subtotal"
              text="Subtotal"
              price={subtotal}
              decimalPlaces={2}
              className="cart-price-item"
            />,
            <PriceItem
              key="shipping"
              text="Envío"
              price={shipping}
              decimalPlaces={2}
              className="cart-price-item"
            />,
          ]}
      {/* Show total */}
      <PriceItem
        text="Total"
        price={total}
        decimalPlaces={2}
        className="cart-price-item cart-total-item"
      />
    </div>
  );
}
