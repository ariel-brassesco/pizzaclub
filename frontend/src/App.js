import React, { Component } from "react";
import {Switch, Route, BrowserRouter, useRouteMatch} from 'react-router-dom';


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

class App extends Component {
  render() {
    return (
      <BrowserRouter basename=''>
        <Switch>
          <Route exact path={INDEX} component={MainPage} />
          <Route exact path={MENU} component={MenuPage} />
          <Route exact path={DELIVERY}>
            <DeliveryPage goBack={INDEX}
                            goCart={DELIVERY_CART}
                            mode="delivery"
                            interactive={true}/>
          </Route>
          <Route exact path={TAKEAWAY}>
            <DeliveryPage goBack={INDEX}
                          goCart={TAKEAWAY_CART}
                          mode="takeaway"
                          interactive={true}/>
          </Route>
          <Route exact path={[TAKEAWAY_CART, DELIVERY_CART]}
            children={({match}) => {
              const goBack = (match.url == TAKEAWAY_CART)
                              ?TAKEAWAY
                              :DELIVERY;
              return <CartPage path={match.path} goBack={goBack} goConfirm={CONFIRM_CART}/>
            }
          }
          />
          {/*<Route component={NotFound}/>*/}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;