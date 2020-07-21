import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import FAHomePage from "./pages/FAHomePage";
import CAHomePage from "./pages/CAHomePage";

export default class RoleRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path={"/FAHomePage"}
            render={(props) => <FAHomePage></FAHomePage>}
          ></Route>
          <Route
            path={"/CAHomePage"}
            render={(props) => <CAHomePage></CAHomePage>}
          ></Route>
        </Switch>
      </Router>
    );
  }
}
