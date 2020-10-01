import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

// Import Actions
import { setDeliveryMode, emptyCart } from "../actions/actionsCart";
// Import Components
import { GoToButton } from "../components/Common";
import { CartShower } from "../components/Cart";
import { PlaceHeader } from "../components/Place";
import { FormCart } from "../components/Forms";
// Import getters
import {
  getCartItems,
  getDeliveryMode,
  getSubtotalCart,
  getTotalCart,
  getShippingCost,
} from "../reducers/cartReducer";

class CartPage extends Component {
  componentDidMount() {
    const { mode, shipping, setDeliveryMode } = this.props;
    setDeliveryMode(mode, shipping);
  }

    render() {
        const {goBack, goConfirm, path} = this.props;
        const {subtotal, total, shipping, mode, items, emptyCart} = this.props;
        return (
            <div className='menupage'>
                <PlaceHeader only_name/>
                <div className='cartpage'>
                    <Switch>
                        <Route path={path + goConfirm}>
                            <FormCart {...{subtotal, total, shipping, mode, items, emptyCart}} />
                            <GoToButton
                                path={path}
                                className="button is-warning gotocart-btn gotocart-btn__marginy gotocart-btn__center">
                                <span className="icon">
                                    <i className="fas fa-undo"></i>
                                </span>
                                <span>Volver al pedido</span>
                            </GoToButton>
                        </Route>
                        <Route path={path}>
                            <CartShower items={items}
                                        subtotal={subtotal}
                                        total={total}
                                        mode={mode}
                                        shipping={shipping}/>
                            <GoToButton
                                path={path + goConfirm}
                                className="button is-primary gotocart-btn gotocart-btn__marginy gotocart-btn__center">
                                <span className="icon">
                                    <i className="fas fa-clipboard-check"></i>
                                </span>
                                <span>Confirmar tu pedido!</span>
                            </GoToButton>
                            <GoToButton
                                path={goBack}
                                className="button is-warning gotocart-btn gotocart-btn__marginy gotocart-btn__center">
                                <span className="icon">
                                    <i className="fas fa-undo"></i>
                                </span>
                                <span>Volver al menú</span>
                            </GoToButton>
                        </Route>
                    </Switch>
                </div>
            </div>)
    }
}

const mapStateToProps = (state) => {
  return {
    items: getCartItems(state),
    subtotal: getSubtotalCart(state),
    total: getTotalCart(state),
    mode: getDeliveryMode(state),
    shipping: getShippingCost(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setDeliveryMode: (mode, shipping) =>
      dispatch(setDeliveryMode(mode, shipping)),
    emptyCart: () => dispatch(emptyCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
