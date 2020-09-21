import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { emptyCart } from '../actions/actionsCart';
//import PropTypes from 'prop-types';
//Import Getters
import {getTotalCart, getCartItems} from '../reducers/cartReducer';

export const Logo = (props) => {
    const {image, alt, className, classImg} = props
    return (
        <figure className={className}>
            <img className={classImg} src={image} alt={alt}/>
        </figure>
    )
};

export const ButtonLink = (props) =>{
    const {path, className, children} = props;
    return (
        <Link to={path} className={className}>
            {children}
        </Link>
    )
};

export const GoToButton = (props) => {
    const {path, className, children} = props;
    
    return (
        <Link to={path} className={className}>
            {children}
        </Link>
    )
}

export const Image = (props) => {
    const {className, imgClass} = props;
    const {src, alt} = props;
    return(
        <figure className={className}>
            <img className={imgClass}
                src={src}
                alt={alt}
                />
        </figure>
    )
}

export const InfoItem = (props) => {
    const {text, textClass, iconClass, iconContent, className} = props;
    return (
        <div className={className}>
            <span className={iconClass}>
                <i className={iconContent} aria-hidden="true"></i>
            </span>
            <span className={textClass}>{text}</span>
        </div>
    )
}

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

export const SearchProduct = (props) => {

    const {value, handleChange, resetInput} = props;

    return (
        <div className="field has-addons">
            <div className="control">
                <input className="input is-warning"
                        type="text"
                        placeholder="Qué buscas?"
                        onChange={handleChange}
                        value={value} />
            </div>
            <div className="control">
                <button className="button is-warning" onClick={resetInput}>
                    <span className="icon is-medium">
                        <i className="fas fa-times"></i>
                    </span>
                </button>
            </div>
        </div>
    );
}