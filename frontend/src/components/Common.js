import React from 'react';
import {Link} from 'react-router-dom';
//import PropTypes from 'prop-types';

export const Logo = (props) => {
    const {image, alt, className} = props
    return (
        <img className={className} src={image} alt={alt}/>
    )
};

export const ButtonLink = (props) =>{
    const {path, className, children} = props;
    return (
        <Link to={path} className={className}>
            {children}
        </Link>
    )
};

export const GoToButton = (props) => {
    const {path, className, children} = props;
    
    return (
        <Link to={path} className={className}>
            {children}
        </Link>
    )
}

export const Image = (props) => {
    const {className, imgClass} = props;
    const {src, alt} = props;
    return(
        <figure className={className}>
            <img className={imgClass}
                src={src}
                alt={alt}
                />
        </figure>
    )
}

export const InfoItem = (props) => {
    const {text, textClass, iconClass, iconContent, className} = props;
    return (
        <div className={className}>
            <span className={iconClass}>
                <i className={iconContent} aria-hidden="true"></i>
            </span>
            <span className={textClass}>{text}</span>
        </div>
    )
}