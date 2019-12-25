import React, { Component } from "react";
import Routes from './Routes';
import PhoneRoutes from "./PhoneRoutes";
import {BrowserView, MobileView} from "react-device-detect";
//TODO Web Template Studio: Add routes for your new pages here.
class App extends Component {
  render() {
    return (
      <div>
          <BrowserView>           
              <Routes/>
          </BrowserView>
          <MobileView >
              <PhoneRoutes/>        
          </MobileView>       
      </div>
    );
  }
}

export default App;
