import React, { Component } from "react";
import {Switch, Route, BrowserRouter} from 'react-router-dom';

// Import Pages
import MainPage from "./pages/MainPage";
import MenuPage from "./pages/MenuPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter basename=''>
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/menu' component={MenuPage} />
          {/*<Route exact path='/delivery' component={DeliveryPage} />
          <Route exact path='/takeaway' component={TakeawayPage} />
          <Route component={NotFound}/>*/}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;