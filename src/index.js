import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import FAHomePage from "./pages/FAHomePage";
import CAHomePage from "./pages/CAHomePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
class MainRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role"),
    };
  }

  setTokenAndRole = (newToken, newRole) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    this.setState({
      token: newToken,
      role: newRole,
    });
  };

  signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.setState({ token: null, role: null });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path={"/FAHomePage"}
            render={(props) => <FAHomePage signOut={this.signOut} />}
          >
            {(() => {
              if (!this.state.token) return <Redirect to="/" />;
            })()}
          </Route>
          <Route
            path={"/CAHomePage"}
            render={(props) => <CAHomePage signOut={this.signOut} />}
          >
            {(() => {
              if (!this.state.token) return <Redirect to="/" />;
            })()}
          </Route>
          <Route path={"/SignUp"} render={(props) => <SignUp />}></Route>
          <Route
            path={"/"}
            render={(props) => (
              <SignIn setTokenAndRole={this.setTokenAndRole} />
            )}
          >
            {(() => {
              if (this.state.token) {
                if (this.state.role === "FieldAgent")
                  return <Redirect to="/FAHomePage" />;
                else if (this.state.role === "ControlAgent")
                  return <Redirect to="/CAHomePage" />;
              }
            })()}
          </Route>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<MainRouter />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
