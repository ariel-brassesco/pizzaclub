import React, {Component} from 'react';

export class TypeProduct extends Component {
    state ={
        show: true,
    }

    hideProducts = () => {
        const {show} = this.state; 
        this.setState({show: !show})
    }

    render() {
        // const {name, id, products, subtype} = this.props;
        const {name, id, children, subtype} = this.props;
        const {show} = this.state;

        // const prod = (subtype.length > 0)
        //                 ?subtype.map(s => <SubTypeProduct key={s.id} {...s} products={products}/>)
        //                 :products.map(p => <Product key={p.id} {...p} />)
        return (
            <div className="product-type" data-id={id}>
                <div className="product-type-title" 
                    onClick={this.hideProducts}>
                    <div>
                    <span className="icon main-option--icon">
                        <i className="fas fa-book-open"></i>
                    </span>
                    <span>{name}</span>
                    </div>
                    
                    <span className={(show)?"icon":"icon rotate-cc-90"}>
                        <i className="fas fa-caret-down"></i>
                    </span>
                </div>
                <div className={(show)?'product-shower':'inactive'}>
                    {/* {prod} */}
                    {children}
                </div>
            </div>
        );
    }
}

export const SubTypeProduct = (props) => {
    const {products, name, id} = props;
    const prod = products.filter(p => p.subtype == id);
    return (
        <div key="subtype" id={id}>{name}</div>,
        <div key="products">
            {prod.map(p => <Product key={p.id} {...p} />)}
        </div>
    );
}

export class Product extends Component{

    render (){
        const {id, name, size, presentation, prices} = this.props;
        const {interactive} = this.props;
        const {addToCart, removeToCart, updateQuantity} = this.props;
        
        return (
            <div data-id={id}>
                {name}
                {size.map(s => s.name)}
                {presentation.map(p => p.name)}
                {prices.map(p => p.price)}
            </div>
        )
    }
}