import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { List, Divider, Button, Col, Row } from "antd";
require("dotenv").config();
const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export default class CAHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title_id: [] };
    this.header = "";
    this.footer = "";
  }

  async componentDidMount() {
    axios({
      method: "get",
      url: serverBaseUrl.concat("/forms"),
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        let titles = [];
        let ids = [];
        for (let i = 0; i < response.data.length; i++) {
          titles.push(response.data[i].title);
          ids.push(response.data[i]._id);
        }
        let title_id = titles.map(function (t, i) {
          return [t, ids[i]];
        });

        this.setState({
          title_id: title_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <Row>
          <Col span={18}>
            <Divider orientation="left">Forms</Divider>
          </Col>
          <Col span={6} style={{ "text-align": "right", padding: 12 }}>
            <Button onClick={this.props.signOut}>Sign Out.</Button>
          </Col>
        </Row>
        <List
          header={<div>{this.header}</div>}
          bordered
          dataSource={this.state.title_id}
          renderItem={(item) => (
            <List.Item>
              <Link to={"/forms/submissions/".concat(item[1])}>
                {`${item[0]} (ID:${item[1]})`}
              </Link>
            </List.Item>
          )}
        />
        <br />
      </>
    );
  }
}
