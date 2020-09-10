import React, { Component } from 'react';
/*import Showcase from '../containers/Showcase';
import NavFilter from '../containers/NavFilter';
import Breadcrum from '../containers/Breadcrum';
import Cart from '../containers/Cart';
import {
    WhatsappContact,
    BannerInfo
} from '../components/Common';

import {URL_API_PRODUCTS, URL_API_CATEGORIES} from '../App';
*/
class MainPage extends Component {
    render() {
        return (
            <div className='mainpage'>
                {/*<Breadcrum />
                <Cart />
                <NavFilter url={URL_API_CATEGORIES} />
                <Showcase url={URL_API_PRODUCTS} />
                <BannerInfo />
                <WhatsappContact />*/}
                <h1>The Pizza Club</h1>
            </div>
        );
    }
}

export default MainPage;
