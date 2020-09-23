import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';

// Import Actions
// import {setDeliveryMode} from '../actions/actionsCart';
// Import Containers
// import MenuData from '../containers/Showcase';
// import Menu from '../containers/Menu';
// Import Components
import {GoToButton} from '../components/Common';
import {CartShower} from '../components/Cart';
import {PlaceHeader} from '../components/Place';
import {FormCart} from "../components/Forms";
// Import getters
import {
    getCartItems,
    getDeliveryMode,
    getTotalCart
} from '../reducers/cartReducer';

class CartPage extends Component {
    componentDidMount(){
        // this.props.setDeliveryMode();
    }

    render() {
        const {goBack, goConfirm, path} = this.props;
        const {total, mode, items} = this.props;
        console.log(goConfirm, path);
        return (
            <div className='menupage'>
                <PlaceHeader only_name/>
                <Switch>
                    <Route exact path={path}>
                        <CartShower items={items} total={total}/>
                        <GoToButton path={path + goConfirm}
                                className="">
                            <span className="icon">
                                <i className="fas fa-clipboard-check"></i>
                                <span>Confirmar tu pedido!</span>
                            </span>
                        </GoToButton>
                        <GoToButton path={goBack} className="">
                            <span className="icon">
                                <i className="fas fa-undo"></i>
                                <span>Volver al menú</span>
                            </span>
                        </GoToButton>
                    </Route>
                    <Route exact path={path + goConfirm}>
                        <FormCart />
                        <GoToButton path={goConfirm}
                                className="">
                            <span className="icon">
                                <i className="fab fa-whatsapp"></i>
                                <span>Enviar ya por WhatsApp!</span>
                            </span>
                        </GoToButton>
                        <GoToButton path={path} className="">
                            <span className="icon">
                                <i className="fas fa-undo"></i>
                                <span>Volver al pedido</span>
                            </span>
                        </GoToButton>
                    </Route>
                </Switch>
            </div>)
    }
}

const mapStateToProps = state => {
    return {
        items: getCartItems(state),
        total: getTotalCart(state),
        mode: getDeliveryMode(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        setDeliveryMode: () => dispatch(setDeliveryMode(ownProps.mode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);