import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "../EliteTrust/Client/Dashboard/index";
import Invest from "../EliteTrust/Client/Invest/invest";
import Wallet from "../EliteTrust/Client/Wallett/index";
import Portfolio from "../EliteTrust/Client/Portfilio";
import Profile from "../EliteTrust/Client/Settings";
import Login from "../EliteTrust/Auth/Login";
import Register from "../EliteTrust/Auth/Register";
import EmailConfirmation from "../EliteTrust/Auth/Email";
import AdminDash from "../EliteTrust/Client/Dashboard/admin-dashboard";
import PortfolioAdmin from "../EliteTrust/Client/Invest/admin-invest";
import Users from "../EliteTrust/Client/Wallett/users";
import VerifyPhone from "../EliteTrust/Auth/VerifyPhone";

export default function AppRouter(props) {
  const role = sessionStorage.getItem("is_Admin");
  console.log(role);
  return (
    <Router>
      <Switch>
        <Route
          path="/dashboard"
          exact
          component={role === "true" ? AdminDash : Landing}
        />
        <Route
          path="/invest"
          exact
          component={role === "true" ? PortfolioAdmin : Invest}
        />
        <Route path="/wallet" exact component={Wallet} />
        <Route path="/users" exact component={Users} />
        <Route path="/port-folio" exact component={Portfolio} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Login} />
        <Route path="/users" exact component={Users} />
        <Route path="/email-verification/:id" exact component={EmailConfirmation} />
        <Route path="/register" exact component={Register} />
        <Route path="/verify-phone" exact component={VerifyPhone} />

      </Switch>
    </Router>
  );
}
