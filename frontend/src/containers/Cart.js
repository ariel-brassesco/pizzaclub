import React, { Component } from 'react';
import {connect} from 'react-redux';

// Import Actions
// import {
//     updateQuantityItem,
//     removeCartItem,
//     emptyCart
// } from '../actions/actionsCart';
// Import Components
import { GoToButton, CartItem } from '../components/Common';
// Import Getters
import {getCartItems, getTotalCart} from '../reducers/cartReducer';

class Cart extends Component {

    // componentDidMount(){
    //     const {updateProd, pendingProd, storedProdKey } = this.props;
    //     const {updateType, pendingType, storedTypeKey } = this.props;
    //     const {errorProd, errorType} = this.props;
    //     const {updateProdData, updateTypeData, fetchProducts, fetchTypes} = this.props;
        
    //     // Check if products data has to be fetching or updating from localStorage
    //     if (updateProd && !errorProd) {
    //         console.log('Update Products from localStorage');
    //         updateProdData(storedProdKey);
    //     } else {
    //         if (!pendingProd) fetchProducts();
    //         console.log('Fetch Products Data');
    //     }
    //     // Check if types data has to be fetching or updating from localStorage
    //     if (updateType && !errorType) {
    //         console.log('Update Products from localStorage');
    //         updateTypeData(storedTypeKey);
    //     } else {
    //         if (!pendingType) fetchTypes();
    //         console.log('Fetch Typess Data');
    //     }
    // }

    render() {
        const {items, total, backPath} = this.props;
        return (
            <div>
                {items.map(item => <CartItem data={item}/>)}
                <div>
                    <span>Total</span>
                    <span>$ {total.toFixed(2)}</span>
                </div>
                <GoToButton>
                    <span className="icon">
                        <i className="fas fa-clipboard-check"></i>
                        <span>Confirmar tu pedido!</span>
                    </span>
                </GoToButton>
                <GoToButton path={backPath}>
                    <span className="icon">
                        <i className="fas fa-undo"></i>
                        <span>Volver al menú</span>
                    </span>
                </GoToButton>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: getCartItems(state),
        total: getTotalCart(state),
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         removeItem: (id) => dispatch(removeCartItem(id)),
//         changeQuantity: (id, quantity) => dispatch(updateQuantityItem(id, quantity)),
//         emptyCart: () => dispatch(emptyCart())
//     }
// }

export default connect(mapStateToProps, null)(Cart);
