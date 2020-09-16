import React, {Component} from 'react';
import {connect} from 'react-redux';
// Import actions creators
import fetchGetData from '../actions/fetchData';
// Import actions
import {
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    UPDATE_PRODUCTS_STORED,
    FETCH_TYPES_PENDING,
    FETCH_TYPES_SUCCESS,
    FETCH_TYPES_ERROR,
    UPDATE_TYPES_STORED,
    updateProductsStored,
    updateTypesStored
} from '../actions/actionsShowcase';
// Import getters
import {
    getProductsError,
    getProductsPending,
    getProductsUpdate,
    getTypesPending,
    getTypesError,
    getTypesUpdate
} from '../reducers/showcaseReducer';

class ShowcaseData extends Component {

    componentDidMount(){
        const {updateProd, pendingProd, storedProdKey } = this.props;
        const {updateType, pendingType, storedTypeKey } = this.props;
        const {errorProd, errorType} = this.props;
        const {updateProdData, updateTypeData, fetchProducts, fetchTypes} = this.props;
        
        // Check if products data has to be fetching or updating from localStorage
        if (updateProd && !errorProd) {
            console.log('Update Products from localStorage');
            updateProdData(storedProdKey);
        } else {
            if (!pendingProd) fetchProducts();
            console.log('Fetch Products Data');
        }
        // Check if types data has to be fetching or updating from localStorage
        if (updateType && !errorType) {
            console.log('Update Products from localStorage');
            updateTypeData(storedTypeKey);
        } else {
            if (!pendingType) fetchTypes();
            console.log('Fetch Typess Data');
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => {
    return {
        pendingProd: getProductsPending(state),
        errorProd: getProductsError(state),
        updateProd: getProductsUpdate(state),
        pendingType: getTypesPending(state),
        errorType: getTypesError(state),
        updateType: getTypesUpdate(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchProducts: () => fetchGetData(
            ownProps.urlProd,
            FETCH_PRODUCTS_PENDING,
            FETCH_PRODUCTS_SUCCESS,
            FETCH_PRODUCTS_ERROR,
            UPDATE_PRODUCTS_STORED
        )(dispatch),
        fetchTypes: () => fetchGetData(
            ownProps.urlType,
            FETCH_TYPES_PENDING,
            FETCH_TYPES_SUCCESS,
            FETCH_TYPES_ERROR,
            UPDATE_TYPES_STORED
        )(dispatch),
        updateProdData: (key) => dispatch(updateProductsStored(key)),
        updateTypeData: (key) => dispatch(updateTypesStored(key)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowcaseData);
