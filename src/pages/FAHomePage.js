import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import { List, Divider } from "antd";
import axios from "axios";
import SingleForm from "../components/singleForm";

export default class FAHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title_id: [] };
    this.handler = this.handler.bind(this);
    this.header = "";
    this.footer = "";
  }

  async componentDidMount() {
    axios
      .get(process.env.REACT_APP_SERVER_BASE_URL)
      .then((response) => {
        let titles = [];
        let ids = [];
        for (let i = 0; i < response.data.forms.length; i++) {
          titles.push(response.data.forms[i].title);
          ids.push(response.data.forms[i].id);
        }
        let title_id = titles.map(function (t, i) {
          return [t, ids[i]];
        });

        this.setState({
          forms: response,
          title_id: title_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillUnmount() {}

  handler() {}

  getRoutes() {
    let routes = [];
    for (let i = 0; i < this.state.title_id.length; i++) {
      routes.push(
        <Route
          path={"/forms/:id"}
          render={(props) => (
            <SingleForm {...props} key={Math.random()}></SingleForm>
          )}
        />
      );
    }
    return routes;
  }

  render() {
    return (
      <Router>
        <Divider orientation="left">Forms</Divider>
        <List
          header={<div>{this.header}</div>}
          bordered
          dataSource={this.state.title_id}
          renderItem={(item) => (
            <List.Item>
              <Link to={"/forms/".concat(item[1])}>
                {`${item[0]} (ID:${item[1]})`}
              </Link>
            </List.Item>
          )}
        />
        <br />
        <Switch>{this.getRoutes()}</Switch>
      </Router>
    );
  }
}
