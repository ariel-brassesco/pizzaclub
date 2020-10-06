import React, {Component} from 'react';

// Import Containers
import Menu from '../containers/Menu';
// Import Components
import {GoToButton} from '../components/Common';
import {PlaceHeader} from '../components/Place';
// Import Routes
import {INDEX} from "../routes";

class MenuPage extends Component {
    render() {
        return (
            <div className='menupage'>
                <GoToButton path={INDEX} className="back-btn">
                    <span className="icon is-large">
                        <i className="fas fa-lg fa-angle-left"></i>
                    </span>
                </GoToButton>
                <PlaceHeader />
                <Menu interactive={false}/>
            </div>)
    }
}

export default MenuPage;

