import React, {Component} from 'react';

// Import Containers
import OwnerData from '../containers/Owner';
import MenuData from '../containers/Showcase';
import Menu from '../containers/Menu';
// Import Components
import {GoToButton, GoToCart} from '../components/Common';
import {PlaceHeader} from '../components/Place';
// Import Routes
import {INDEX, DELIVERY_CART} from "../routes";
// Import Constants
import {
    URL_API_OWNER,
    URL_API_TYPES,
    URL_API_PRODUCTS,
    OWNER_KEY,
    SHOWCASE_PRODUCT_KEY,
    SHOWCASE_TYPES_KEY
} from '../constants';

export default class DeliveryPage extends Component {
    render() {
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
                <GoToButton path={INDEX} className="back-btn">
                    <span className="icon">
                        <i className="fas fa-angle-left"></i>
                    </span>
                </GoToButton>
                <PlaceHeader />
                <Menu interactive={true}/>
                <GoToCart path={DELIVERY_CART}
                        className="gotocart"
                        classBtn='button is-primary is-small gotocart-btn'/>
            </div>)
    }
}