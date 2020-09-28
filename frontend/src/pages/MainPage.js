import React, { Component } from 'react';
import {
    Logo,
    ButtonLink
} from '../components/Common';

class MainPage extends Component {
    render() {
        return (
            <div className='mainpage'>
                <Logo className="image main-logo"
                    classImg="is-rounded"
                    image='/images/logo.png'
                    alt='The Pizza Club'/>
                <div className='main-menu'>
                    <ButtonLink className='button is-warning is-medium is-active main-option' path='/delivery'>
                        <span className="icon main-option--icon">
                            <i className="fas fa-motorcycle"></i>
                        </span>
                        <span className="main-option--text">delivery</span>
                    </ButtonLink>
                    <ButtonLink className='button is-warning is-medium is-active main-option' path='/takeaway'>
                        <span className="icon main-option--icon">
                            <i className="fas fa-store"></i>
                        </span>
                        <span className="main-option--text">takeaway</span>
                    </ButtonLink>
                    <ButtonLink className='button is-warning is-medium is-active main-option' path='/menu'>
                        <span className="icon main-option--icon">
                            <i className="fas fa-book-open"></i>
                        </span>
                        <span className="main-option--text">menú</span>
                    </ButtonLink>
                </div> 
            </div>
        );
    }
}

export default MainPage;
