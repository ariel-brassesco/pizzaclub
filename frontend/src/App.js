import React, { Component } from "react";
import {Switch, Route, BrowserRouter} from 'react-router-dom';


//Import Routes
import {
  INDEX,
  MENU,
  DELIVERY,
  TAKEAWAY
} from './routes';
// Import Pages
import MainPage from "./pages/MainPage";
import MenuPage from "./pages/MenuPage";
import DeliveryPage from "./pages/DeliveryPage";
import TakeawayPage from "./pages/TakeawayPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter basename=''>
        <Switch>
          <Route exact path={INDEX} component={MainPage} />
          <Route exact path={MENU} component={MenuPage} />
          <Route exact path={DELIVERY} component={DeliveryPage} />
          <Route exact path={TAKEAWAY} component={TakeawayPage} />
          {/*<Route component={NotFound}/>*/}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;