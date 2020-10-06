import React, { Component } from 'react';
import {connect} from 'react-redux';

// Import getters
import {
    getOwnerData,
    getOwnerPending,
    getOwnerError
} from '../reducers/ownerReducer';
//Import Components
import {Image, InfoItem, SocialNetworkIcon} from '../components/Common';

const Place = (props) => {
    const {data, pending, error, only_name} = props;
    let address = (data.address)?data.address.address:null;
    const logo_src = document.getElementById('app').dataset.logo;

    if (error){
        return <div className="header-place header-error">
                <p>Upss! Hubo un error!!</p>
                <p>Recarga la página o inténtalo más tarde.</p>
                <p>Disculpa las molestias ocasionadas.</p>
            </div>
    }
    if (pending) return <div className="header-place">Loading...</div>
    return (
        <div className='header-place'>
            <Image className='image header-logo'
                    imgClass=''
                    src={logo_src}
                    alt={data.name}
                />
            {/* <div className="header-owner-title">
                <span className="icon">
                    <i className="fas fa-pizza-slice fa-spin"></i>
                </span>
                <span>{data.name}</span>
                <span className="icon">
                    <i className="fas fa-pizza-slice fa-pulse"></i>
                </span>
            </div>  */}
            
            {(only_name)?null
                :<InfoItem iconClass="icon"
                        iconContent="fas fa-map-marker-alt" 
                        text={`${address}, Santa Fe`} />
            }
            <div className="header-social-networks">
                <SocialNetworkIcon
                    src={data.instagram}
                    className="icon-social-network"
                    classIcon="fab fa-2x fa-instagram"
                    target="_blank"
                />
                <SocialNetworkIcon
                    src={data.whatsapp}
                    className="icon-social-network"
                    classIcon="fab fa-2x fa-whatsapp"
                    target="_blank"
                />
                <SocialNetworkIcon
                    src={`tel:+54${data.phone}`}
                    className="icon-social-network"
                    classIcon="fa fa-lg fa-phone"
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        data: getOwnerData(state),
        pending: getOwnerPending(state),
        error: getOwnerError(state)
    }
}

export const PlaceHeader = connect(mapStateToProps, null)(Place);
