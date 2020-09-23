import React from 'react';
import {Link} from 'react-router-dom';

export const Logo = (props) => {
    const {image, alt, className, classImg} = props
    return (
        <figure className={className}>
            <img className={classImg} src={image} alt={alt}/>
        </figure>
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

export const SearchProduct = (props) => {

    const {value, handleChange, resetInput} = props;

    return (
        <div className="field has-addons">
            <div className="control">
                <input className="input is-warning"
                        type="text"
                        placeholder="Qué buscas?"
                        onChange={handleChange}
                        value={value} />
            </div>
            <div className="control">
                <button className="button is-warning" onClick={resetInput}>
                    <span className="icon is-medium">
                        <i className="fas fa-times"></i>
                    </span>
                </button>
            </div>
        </div>
    );
}