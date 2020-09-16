import React, { Component } from 'react';
import {connect} from 'react-redux';

//Import getters
import {
    getTypesData,
    getProductsData
} from '../reducers/showcaseReducer';
// Import Components
import {TypeProduct} from '../components/Products';


class Menu extends Component {
    render() {
        const {types, products} = this.props;
        return (
            <div className='menu'>
                {types.map(t => {
                    let prod = products.filter( p => p.types == t.id);
                    return (
                    <TypeProduct key={t.id}
                                id={t.id}
                                name={t.name}
                                products={prod} 
                                subtype={t.subtype}/>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        types: getTypesData(state),
        products: getProductsData(state)
    }
}

export default connect(mapStateToProps, null)(Menu);
