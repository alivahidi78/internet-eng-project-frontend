import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import SignIn from "./pages/signIn";
import RoleRouter from "./roleRouter";
import { BrowserRouter } from "react-router-dom";

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role")
    };
  }

  setTokenAndRole = (newToken, newRole) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    this.setState({
      token: newToken,
      role: newRole
    });
  };

  render() {
    // const token = localStorage.getItem("token");
    // console.log(token);
    if (this.state.token) {
      return <RoleRouter />;
    } else {
      return (
        <BrowserRouter>
          <SignIn setTokenAndRole={this.setTokenAndRole} />
        </BrowserRouter>
      );
    }
  }
}

ReactDOM.render(<Router />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
