import React, { Component } from 'react';
import {
    Logo,
    ButtonLink
} from '../components/Common';

class MainPage extends Component {
    render() {
        const LOGO_IMAGE = document.getElementById('app').dataset.logo;
        return (
            <div className='mainpage'>
                <Logo className="image main-logo"
                    classImg=""
                    image={LOGO_IMAGE}
                    alt='The Pizza Club'/>
                <div className='main-menu'>
                    <ButtonLink className='button is-warning is-large is-active main-option' path='/delivery'>
                        <span className="icon main-option--icon">
                            <i className="fas fa-motorcycle"></i>
                        </span>
                        <span className="main-option--text">delivery</span>
                    </ButtonLink>
                    <ButtonLink className='button is-warning is-large is-active main-option' path='/takeaway'>
                        <span className="icon main-option--icon">
                            <i className="fas fa-store"></i>
                        </span>
                        <span className="main-option--text">takeaway</span>
                    </ButtonLink>
                    <ButtonLink className='button is-warning is-large is-active main-option' path='/menu'>
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
