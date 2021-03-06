import React, { Component } from "react";
import {Switch, Route, BrowserRouter, useRouteMatch} from 'react-router-dom';

//Import Constants
// import {DELIVERY_MODE, TAKEAWAY_MODE} from './constants';
//Import Routes
import {
  INDEX,
  MENU,
  DELIVERY,
  TAKEAWAY,
  DELIVERY_CART,
  TAKEAWAY_CART,
  CONFIRM_CART
} from './routes';
// Import Pages
import MainPage from "./pages/MainPage";
import MenuPage from "./pages/MenuPage";
import DeliveryPage from "./pages/DeliveryPage";
import CartPage from "./pages/CartPage";
// Import Containers
import OwnerData from './containers/Owner';
import MenuData from './containers/Showcase';
// Import Constants
import {
  URL_API_OWNER,
  URL_API_TYPES,
  URL_API_PRODUCTS,
  OWNER_KEY,
  SHOWCASE_PRODUCT_KEY,
  SHOWCASE_TYPES_KEY,
  DELIVERY_MODE,
  TAKEAWAY_MODE
} from './constants';

class App extends Component {
  render() {
    const deliveryCost = document.getElementById('app').dataset['delivery_cost'];
    return (
      <BrowserRouter basename=''>
        <OwnerData 
          url={URL_API_OWNER}
          storedKey={OWNER_KEY}/>
        <MenuData
          storedTypeKey={SHOWCASE_TYPES_KEY}
          urlType={URL_API_TYPES}
          storedProdKey={SHOWCASE_PRODUCT_KEY}
          urlProd={URL_API_PRODUCTS}
        />
        <Switch>
          <Route exact path={INDEX} component={MainPage} />
          <Route path={MENU} component={MenuPage} />
          <Route path={[TAKEAWAY_CART, DELIVERY_CART]}
            children={({match}) => {
              const goBack = (match.url == TAKEAWAY_CART)
                              ?TAKEAWAY
                              :DELIVERY;
              return <CartPage path={match.path} goBack={goBack} goConfirm={CONFIRM_CART}/>
            }
          }
          />
          <Route path={DELIVERY}>
            <DeliveryPage goBack={INDEX}
                            goCart={DELIVERY_CART}
                            mode={DELIVERY_MODE}
                            shipping={parseFloat(deliveryCost)}
                            interactive={true}/>
          </Route>
          <Route path={TAKEAWAY}>
            <DeliveryPage goBack={INDEX}
                          goCart={TAKEAWAY_CART}
                          mode={TAKEAWAY_MODE}
                          shipping={0.0}
                          interactive={true}/>
          </Route>
          
          {/*<Route component={NotFound}/>*/}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;