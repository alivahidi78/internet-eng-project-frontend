import React from "react";
import "antd/dist/antd.css";
import { Descriptions } from "antd";
import axios from "axios";
require("dotenv").config();

const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export default class SingleFormDet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], name: null, formTitle: null };
  }

  async componentDidMount() {
    axios({
      method: "get",
      url: serverBaseUrl.concat(`/answers/${this.props.match.params.id}`),
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        let descriptors = [];
        for (let i = 0; i < response.data.values.length; i++) {
          descriptors.push(
            <Descriptions.Item label={response.data.values[i].title}>
              {(() => {
                if (response.data.values[i].type === "Location") {
                  descriptors.push(
                    <Descriptions.Item
                      label={`${response.data.values[i].title} areas`}
                    >
                      {response.data.values[i].value.areas.map((t, i) => {
                        return t + " ";
                      })}
                    </Descriptions.Item>
                  );
                  return `${response.data.values[i].value.lat}, ${response.data.values[i].value.long}`;
                } else {
                  return response.data.values[i].value;
                }
              })()}
            </Descriptions.Item>
          );
        }
        this.setState({
          items: descriptors,
          name: response.data.name,
          formTitle: response.data.formTitle,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div
        style={{
          padding: 30,
        }}
      >
        <Descriptions
          bordered
          title={`${this.state.formTitle} Details submitted by ${this.state.name}`}
        >
          {this.state.items}
        </Descriptions>
      </div>
    );
  }
}
