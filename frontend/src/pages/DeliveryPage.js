import React, {Component} from 'react';
import {connect} from 'react-redux';

// Import Actions
import {setDeliveryMode} from '../actions/actionsCart';
// Import Containers
import Menu from '../containers/Menu';
// Import Components
import {GoToButton} from '../components/Common';
import {GoToCart} from '../components/Cart';
import {PlaceHeader} from '../components/Place';

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
                <GoToButton path={goBack} className="back-btn">
                    <span className="icon is-large">
                        <i className="fas fa-lg fa-angle-left"></i>
                    </span>
                </GoToButton>
                <PlaceHeader />
                <Menu interactive={interactive}/>
                <GoToCart path={goCart}
                        className="gotocart"
                        classBtn='button is-primary is-large gotocart-btn'/>
            </div>)
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        setDeliveryMode: (mode, shipping) => dispatch(setDeliveryMode(mode, shipping))
    }
}

export default connect(null, mapDispatchToProps)(DeliveryPage);