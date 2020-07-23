import React from "react";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import FAHomePage from "./pages/FAHomePage";
import CAHomePage from "./pages/CAHomePage";
import SingleFormDet from "./components/singleFormDet";
import SingleFormSubTable from "./components/singleFormSubTable";
import SingleForm from "./components/singleForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default class MainRouter extends React.Component {
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
            path={"/CAHomePage/formDetails/:id"}
            render={(props) => <SingleFormDet {...props} key={Math.random()} />}
          ></Route>
          <Route
            path={"/forms/submissions/:id"}
            render={(props) => (
              <SingleFormSubTable {...props}></SingleFormSubTable>
            )}
          />
          <Route
            exact
            path={"/forms/:id"}
            render={(props) => <SingleForm {...props}></SingleForm>}
          />
          <Route
            exact
            path={"/FAHomePage"}
            render={(props) => <FAHomePage signOut={this.signOut} />}
          >
            {(() => {
              if (!this.state.token || this.state.role !== "FieldAgent")
                return <Redirect to="/" />;
            })()}
          </Route>
          <Route
            exact
            path={"/CAHomePage"}
            render={(props) => <CAHomePage signOut={this.signOut} />}
          >
            {(() => {
              if (!this.state.token || this.state.role !== "ControlAgent")
                return <Redirect to="/" />;
            })()}
          </Route>
          <Route path={"/SignUp"} render={(props) => <SignUp />}></Route>
          <Route
            exact
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
