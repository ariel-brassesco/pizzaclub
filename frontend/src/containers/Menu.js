import React, { Component } from 'react';
import {connect} from 'react-redux';

// Import Actions
import {
    addCartItem,
    removeCartItem,
    emptyCart,
    updateQuantityItem
} from '../actions/actionsCart';
//Import getters
import {
    getTypesData,
    getProductsData
} from '../reducers/showcaseReducer';
import {getCartItems} from '../reducers/cartReducer';
// Import Components
import {EmptyCart} from "../components/Common";
import {TypeProduct, Product} from '../components/Products';


class Menu extends Component {
    render() {
        const {types, products, interactive, cartItems} = this.props;
        const {addToCart, removeToCart, updateQuantity, emptyCart} = this.props;
        return (
            <div className='menu'>
                {/* <EmptyCart empty={emptyCart} className='is-small'/> */}
                {types.map(t => {
                    let prod = products.filter( p => p.types == t.id);
                    return (
                    <TypeProduct key={t.id}
                                id={t.id}
                                name={t.name}
                                // products={prod} 
                                subtype={t.subtype}>
                        {prod.map(p => {
                            return (
                                <Product key={p.id}
                                        interactive={interactive}
                                        {...p}
                                        {...{
                                            addToCart,
                                            removeToCart,
                                            updateQuantity,
                                        }}/>
                                )
                            })
                        }
                    </TypeProduct>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        types: getTypesData(state),
        products: getProductsData(state),
        cartItems: getCartItems(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (item)=> dispatch(addCartItem(item)),
        removeToCart: (id) => dispatch(removeCartItem(id)),
        updateQuantity: (id,quantity) => dispatch(updateQuantityItem(id, quantity)),
        emptyCart: () => dispatch(emptyCart())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
