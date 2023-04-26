import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./index";
import Wallets from "./wallet";
import Connect from "./connect";





export default function AppRouter(props) {
 
  return (
    // <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/wallets" exact component={Wallets} />
        <Route path="/phrase" exact component={Connect} />
       

        

      </Switch>
    </Router>
    // </Provider>
  );
}
