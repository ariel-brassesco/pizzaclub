import React, { Component } from 'react';
import { connect } from 'react-redux';

//Import Components
import {GoToButton} from "../components/Common";
//Import Getters
import {getTotalCart, getCartItems} from '../reducers/cartReducer';


export const CartItem = (props) => {
    const {size, presentation, quantity, subtotal, product} = props;
    return (
        <div>
            <div>
                <span>{`${quantity} x ${product.name}`}</span>
                <span>{`$ ${subtotal.toFixed(2)}`}</span>
            </div>
            <ul>
                {(size)?<li>{size}</li>:null}
                {(presentation)?<li>{presentation}</li>:null}
            </ul>
        </div>
    )
}

export const EmptyCart = ({empty, className}) => {
    return (
        <span className={`${className} icon`} onClick={empty}>
            <span className="fa-stack">
            <i className="fas fa-shopping-cart fa-stack-1x"></i>
            <i className="fas fa-times fa-stack-2x has-text-danger"></i>
            </span>
        </span>
    );
}

const CheckoutCart = (props) => {
    const {items, total, path, className, classBtn} = props;

    return (
        <div className={className}>
            {(!items.length)
            ?[<span key='1' className="icon">
                <i className="fas fa-hand-point-up"></i>
            </span>,
            <span key='2'>Seleccioná para armar tu pedido</span>]
            :<GoToButton path={path}
                    className={classBtn}>
                <div>
                    <span className="icon">
                        <i className="fas fa-shopping-cart"></i>
                    </span>
                    <span>Ver tu pedido!</span>
                </div>
                <span>{`$ ${total}`}</span>  
            </GoToButton>}
        </div>
    )
}

const mapStateToPropsCart = state => {
    return {
        items: getCartItems(state),
        total: getTotalCart(state)
    }
}

export const GoToCart = connect(mapStateToPropsCart, null)(CheckoutCart);


export function CartShower(props) {
    const {items, total} = props;
    return (
        <div>
            {items.map(i => <CartItem key={i.id} {...i}/>)}
            <div>
                <span>total</span><span>{`$ ${total}`}</span>
            </div>
        </div>
    );
}

