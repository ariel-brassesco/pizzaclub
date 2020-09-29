import React, {Component} from 'react';
import {connect} from 'react-redux';

// Import Actions
import {setDeliveryMode} from '../actions/actionsCart';
// Import Containers
import OwnerData from '../containers/Owner';
import MenuData from '../containers/Showcase';
import Menu from '../containers/Menu';
// Import Components
import {GoToButton} from '../components/Common';
import {GoToCart} from '../components/Cart';
import {PlaceHeader} from '../components/Place';
// Import Constants
import {
    URL_API_OWNER,
    URL_API_TYPES,
    URL_API_PRODUCTS,
    OWNER_KEY,
    SHOWCASE_PRODUCT_KEY,
    SHOWCASE_TYPES_KEY
} from '../constants';

class DeliveryPage extends Component {
    componentWillUnmount(){
        const {setDeliveryMode} = this.props;
        setDeliveryMode(null, 0.0);
    }
    
    componentDidMount(){
        const {mode, shipping, setDeliveryMode} = this.props;
        setDeliveryMode(mode, shipping);
    }

    render() {
        const {goBack, goCart, interactive} = this.props;
        return (
            <div className='menupage'>
                <OwnerData 
                    url={URL_API_OWNER}
                    storedKey={OWNER_KEY}/>
                <MenuData
                    storedTypeKey={SHOWCASE_TYPES_KEY}
                    urlType={URL_API_TYPES}
                    storedProdKey={SHOWCASE_PRODUCT_KEY}
                    urlProd={URL_API_PRODUCTS}
                />
                <GoToButton path={goBack} className="back-btn">
                    <span className="icon">
                        <i className="fas fa-angle-left"></i>
                    </span>
                </GoToButton>
                <PlaceHeader />
                <Menu interactive={interactive}/>
                <GoToCart path={goCart}
                        className="gotocart"
                        classBtn='button is-primary gotocart-btn'/>
            </div>)
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        setDeliveryMode: (mode, shipping) => dispatch(setDeliveryMode(mode, shipping))
    }
}

export default connect(null, mapDispatchToProps)(DeliveryPage);