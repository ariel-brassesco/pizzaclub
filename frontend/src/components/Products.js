import React, { Component } from "react";

// Import Components
import { Image } from "../components/Common";
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
                        <span className="icon is-large main-option--icon">
                            <i className="fas fa-lg fa-book-open"></i>
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
    <div className="product-type" data-id={id}>
      <div className="product-type-title" onClick={this.hideProducts}>
        <div>
          <span className="icon main-option--icon">
            <i className="fas fa-book-open"></i>
          </span>
          <span>{name}</span>
        </div>

        <span className={show ? "icon" : "icon rotate-cc-90"}>
          <i className="fas fa-caret-down"></i>
        </span>
      </div>
      <div className={show ? "product-shower" : "inactive"}>
        {/* {prod} */}
        {children}
      </div>
    </div>
  );
}

export function QuantityWidget (props) {

    const {name, quantity, increment, decrement} = props;

    return (
        <div className='quantity-widget'>
            {/* <p className='quantity-widget-title'>cantidad</p> */}
            <div className="buttons has-addons quantity-widget-counter">
                <span className="button is-success is-medium is-outlined quantity-widget-btn-left"
                    onClick={decrement}>
                    <span className="icon is-small">
                        <i className="fas fa-minus"></i>
                    </span>
                </span>
                <input className='input is-success is-medium quantity-widget-input'
                        type='text'
                        readOnly
                        value={quantity}
                        name={name} />
                <span className="button is-success is-medium is-outlined quantity-widget-btn-rigth"
                        onClick={increment}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                </span>
            </div>
        </div>
    );
}

function ProductInfo(props) {
  const { className, classTitle, classDesc } = props;
  const { title, description } = props;
  return (
    <div className={className}>
      <p className={classTitle}>{title}</p>
      <p className={classDesc}>{description}</p>
    </div>
  );
}

function PriceTag(props) {
    const {price, onClick, className, decimal, counter} = props;
    return(
        <span className={className}
            onClick={onClick}>
            {(price)?`$ ${price.toFixed(decimal || 0)}`:'-'}
            {(counter)?<span className='price-tag-counter'>{counter}</span>:null}
        </span>
    )
}

function SizeTag(props) {
  const { size, className } = props;
  return <span className={className}>{size}</span>;
}

function PresentationTag(props) {
  const { presentation, className } = props;
  return <span className={className}>{presentation}</span>;
}

const ProductOnlyPriceView = (props) => {
  const { id, image, name, description, prices } = props.data;
  const { item_id, widget, quantity } = props;
  const { increment, decrement, select } = props;

  return (
    <div onClick={select.bind(null, item_id)} className="product-card">
      <div className="product-card-info">
        <Image className="image is-64x64" src={image} />
        <ProductInfo
          className="product-info-onlyprice"
          classTitle="product-info--title"
          classDesc="product-info--desc"
          title={name}
          description={description}
        />
        <PriceTag className="product-price-tag" price={prices[0].price} />
      </div>

      {widget ? (
        <QuantityWidget
          name={item_id}
          quantity={quantity}
          increment={increment.bind(null, item_id)}
          decrement={decrement.bind(null, item_id)}
        />
      ) : null}
    </div>
  );
};

const ProductSizePriceView = (props) => {
  const { id, image, name, description, size, prices } = props.data;
  const { item_id, widget, interactive, quantity, items } = props;
  const { increment, decrement, select, genIds } = props;
  if (!prices[0]) return null;

  return (
    <div className="product-card">
      <div className="product-card-info">
        <Image className="image is-64x64" src={image} />
        <ProductInfo
          className="product-info-onlyprice"
          classTitle="product-info--title"
          classDesc="product-info--desc"
          title={name}
          description={description}
        />
        <div className="product-card-sizes">
          {size.map((s) => {
            let price = prices.filter((p) => p.size == s.id)[0];
            let i_id = genIds(id, s.id, null);
            let counter = items.filter((i) => i.id == i_id)[0];
            counter = counter && interactive ? counter.quantity : null;
            return (
              <div key={s.id}>
                <SizeTag className="product-size-tag" size={s.name} />
                <PriceTag
                  className="product-price-tag"
                  price={price.price}
                  counter={counter}
                  onClick={select.bind(null, i_id)}
                />
              </div>
            );
          })}
        </div>
      </div>
      {widget ? (
        <QuantityWidget
          name={item_id}
          quantity={quantity}
          increment={increment.bind(null, item_id)}
          decrement={decrement.bind(null, item_id)}
        />
      ) : null}
    </div>
  );
};

const ProductPresentationPriceView = (props) => {
  const { id, image, name, description, presentation, prices } = props.data;
  const { item_id, widget, interactive, quantity, items } = props;
  const { increment, decrement, select, genIds } = props;
  if (!prices[0]) return null;

  return (
    <div className="product-card">
      <div className="product-card-info">
        <Image className="image is-64x64" src={image} />
        <ProductInfo
          className="product-info-onlyprice"
          classTitle="product-info--title"
          classDesc="product-info--desc"
          title={name}
          description={description}
        />
      </div>
      <div className="product-card-presentations">
        {presentation.map((pre) => {
          let price = prices.filter((p) => p.presentation == pre.id)[0];
          let i_id = genIds(id, null, pre.id);
          let counter = items.filter((i) => i.id == i_id)[0];
          counter = counter && interactive ? counter.quantity : null;
          return (
            <div key={pre.id}>
              <PresentationTag
                className="product-presentation-tag"
                presentation={pre.name}
              />
              <PriceTag
                className="product-price-tag"
                price={price.price}
                counter={counter}
                onClick={select.bind(null, i_id)}
              />
            </div>
          );
        })}
      </div>
      {widget ? (
        <QuantityWidget
          name={item_id}
          quantity={quantity}
          increment={increment.bind(null, item_id)}
          decrement={decrement.bind(null, item_id)}
        />
      ) : null}
    </div>
  );
};

const FullProductView = (props) => {
    const {id, image, name, description, presentation, size, prices} = props.data;
    const {item_id, widget, interactive, quantity, items} = props;
    const {increment, decrement, select, genIds} = props;
    if (!prices[0]) return null;

    return (<div className='product-card product-fullview'>
                <div className='product-fullview-info'>
                    <div className='product-card-info'>
                        <Image className="image is-64x64"
                            src={image} />
                        <ProductInfo className='product-info-onlyprice' 
                                classTitle='product-info--title'
                                classDesc='product-info--desc'
                                title={name}
                                description={description}/>
                    </div>
                    <div className='product-fullview-sizes'>
                        {size.map(s => <SizeTag key={s.id}
                                                className="product-size-tag" 
                                                size={s.name} />)
                        }
                    </div>
                </div>
                <div className='product-fullview-data'>
                    <div className='product-fullview-presentations'>
                        {presentation.map(pre => {
                            return <PresentationTag key={pre.id}
                                                    className='product-presentation-tag'
                                                    presentation={pre.name}/>}
                                )}
                    </div>
                    <div className='product-fullview-prices'>
                        {presentation.map(pre => {
                            let p_sizes = size.map(s =>{
                                let price = prices.filter(p => p.size == s.id && p.presentation == pre.id)[0];
                                let i_id = genIds(id, s.id, pre.id);
                                let counter = items.filter(i => i.id == i_id)[0];
                                counter = (counter && interactive)?counter.quantity:null;
                                return (
                                    <PriceTag key={s.id}
                                        className='product-price-tag'
                                        price={(!price)?null:price.price}
                                        counter={counter}
                                        onClick={(price)?select.bind(null,i_id):null}/>
                                    )
                            });
                            return <div key={pre.id}>
                                {p_sizes}
                                </div>
                            })
                        }
                    </div>
                </div>
                {(widget)?
                    <QuantityWidget name={item_id}
                                    quantity={quantity}
                                    increment={increment.bind(null, item_id)}
                                    decrement={decrement.bind(null, item_id)}/>
                    :null}
            </div>)
}

export class Product extends Component{
  state = {
      // show: false,
      selected: null
  }

  _genId = (id, s, p) => [id, s, p].join('-');

  _genItem = (item_id) => {
      const {data, typeName} = this.props;
      // Get size and presentation from id
      let [,size,presentation] = item_id.split('-');
      // COnvert empty string in null value
      size = (!size)?null:size;
      presentation = (!presentation)?null:presentation;
      // Get the price for size and presentation
      let price = data.prices.filter(i => i.size == size && i.presentation == presentation)[0];
      return {
          id: item_id,
          product: data,
          size,
          presentation,
          typeName,
          quantity: 1,
          price: price.price,
          subtotal: price.price
      }
  };

  _selectItem = (item_id) => {
    if (this.props.interactive) {
      let item = this.props.item.filter((i) => i.id == item_id)[0];
      this.setState({ selected: item_id });
      // If there is no item in cart, dispatch addToCart
      if (!item) {
        // Generate the new item
        item = this._genItem(item_id);
        // Add to cart
        this.props.addToCart(item);
      }
    }
  };

  _plusQuantity = (item_id) => {
    let item = this.props.item.filter((i) => i.id == item_id)[0];
    // Limit quantity to 9
    if (item.quantity <= 9) this.props.plusQuantity(item_id);
  };

  _minusQuantity = (item_id) => {
    let item = this.props.item.filter((i) => i.id == item_id)[0];
    // If quantity is zero, remove the item from cart
    if (item.quantity <= 1) {
      this.setState({ selected: null });
      this.props.removeToCart(item_id);
    } else this.props.minusQuantity(item_id);
  };

  _getProductType = (size, presentation) => {
    if (!(size.length || presentation.length)) return "ONLY_PRICE_VIEW";
    if (size.length && presentation.length) return "FULL_VIEW";
    if (size.length && !presentation.length) return "SIZE_PRICE_VIEW";
    if (!size.length && presentation.length) return "PRESENTATION_PRICE_VIEW";
  };

  render() {
    const { data, interactive } = this.props;
    const { id, size, presentation } = data;
    const item = this.props.item;

    let quantity = 0;
    let widget;
    let selected;
    let item_selected;
    switch (this._getProductType(size, presentation)) {
      case "ONLY_PRICE_VIEW":
        let item_id = this._genId(id, size, presentation);
        quantity = item.length ? item[0].quantity : 0;
        widget = interactive && quantity > 0;

        return (
          <ProductOnlyPriceView
            data={data}
            item_id={item_id}
            widget={widget}
            select={this._selectItem}
            quantity={quantity}
            increment={this._plusQuantity}
            decrement={this._minusQuantity}
          />
        );
      case "SIZE_PRICE_VIEW":
        selected = this.state.selected;
        item_selected = item.filter((i) => i.id == selected);
        quantity = item_selected.length ? item_selected[0].quantity : 0;
        widget = interactive && selected;
        return (
          <ProductSizePriceView
            data={data}
            item_id={selected}
            items={item}
            interactive={interactive}
            widget={widget}
            select={this._selectItem}
            genIds={this._genId}
            quantity={quantity}
            increment={this._plusQuantity}
            decrement={this._minusQuantity}
          />
        );
      case "PRESENTATION_PRICE_VIEW":
        selected = this.state.selected;
        item_selected = item.filter((i) => i.id == selected);
        quantity = item_selected.length ? item_selected[0].quantity : 0;
        widget = interactive && selected;
        return (
          <ProductPresentationPriceView
            data={data}
            item_id={selected}
            items={item}
            interactive={interactive}
            widget={widget}
            select={this._selectItem}
            genIds={this._genId}
            quantity={quantity}
            increment={this._plusQuantity}
            decrement={this._minusQuantity}
          />
        );

      case "FULL_VIEW":
        selected = this.state.selected;
        item_selected = item.filter((i) => i.id == selected);
        quantity = item_selected.length ? item_selected[0].quantity : 0;
        widget = interactive && selected;
        return (
          <FullProductView
            data={data}
            item_id={selected}
            items={item}
            interactive={interactive}
            widget={widget}
            select={this._selectItem}
            genIds={this._genId}
            quantity={quantity}
            increment={this._plusQuantity}
            decrement={this._minusQuantity}
          />
        );

      default:
        return null;
    }
  }
}
