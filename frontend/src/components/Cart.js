import React, { Component } from "react";
import { connect } from "react-redux";

//Import Components
import { GoToButton } from "../components/Common";
//Import Getters
import { getCartItems, getSubtotalCart } from "../reducers/cartReducer";
// Import Constants
import { DELIVERY_MODE } from "../constants";

export const CartItem = (props) => {
  const { size, presentation, quantity, subtotal, product } = props;
  return (
    <div>
      <div>
        <span>{`${quantity} x ${product.name}`}</span>
        <span>{`$ ${subtotal.toFixed(2)}`}</span>
      </div>
      <ul>
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
        [
          <span key="1" className="icon">
            <i className="fas fa-hand-point-up"></i>
          </span>,
          <span key="2">Seleccioná para armar tu pedido</span>,
        ]
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

const ShippingItem = ({ shipping }) => {
  return (
    <div>
      <span>Envío</span>
      <span>{`$ ${shipping.toFixed(2)}`}</span>
    </div>
  );
};

export function CartShower(props) {
  const { mode, shipping, items, subtotal, total } = props;
  return (
    <div>
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
            <div key="subtotal">
              <span>Subtotal</span>
              <span>{`$ ${subtotal.toFixed(2)}`}</span>
            </div>,
            <ShippingItem key="shipping" shipping={shipping} />,
          ]}
      {/* Show total */}
      <div>
        <span>total</span>
        <span>{`$ ${total.toFixed(2)}`}</span>
      </div>
    </div>
  );
}
