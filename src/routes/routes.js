import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "../EliteTrust/Client/Dashboard/index";
import Invest from "../EliteTrust/Client/Invest/invest";
import Wallet from "../EliteTrust/Client/Wallett/index";
import Portfolio from "../EliteTrust/Client/Portfilio";
import Profile from "../EliteTrust/Client/Settings";
import Login from "../EliteTrust/Auth/Login";
import Register from "../EliteTrust/Auth/Register";

export default function AppRouter(props) {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" exact component={Landing} />
        <Route path="/invest" exact component={Invest} />
        <Route path="/wallet" exact component={Wallet} />
        <Route path="/port-folio" exact component={Portfolio} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  );
}
