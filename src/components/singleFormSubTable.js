import React from "react";
import axios from "axios";
import { Table, Space } from 'antd';
import "antd/dist/antd.css";
require("dotenv").config();

const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export default class SingleFormSubTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      cols: null
    }
  }

  async componentDidMount() {
    axios({
      method: "get",
      url: serverBaseUrl.concat(`/answers/?formId=${this.props.match.params.id}`),
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((response) => {
      console.log(response)
      if (response.data) {
        let columns = response.data[0].values.map((t, i) => {
          return {
            title: t.title,
            dataIndex: i,
            key: t.name,
            type: t.type,
            render: this.renderField(t.type)
          };
        })
        columns.push({
          title: 'Action',
          key: 'action',
          type: 'Action',
          fixed: 'right',
          render: this.renderField('Action')
        })
        let newData = response.data.map((t, i) => {
          return {
            ...t.values.map((t, i) => {
              return t.value;
            })
          };
        })
        this.setState({
          data: newData,
          cols: columns
        });
        console.log(this.state);
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }

  renderField = (type) => {
    switch (type) {
      case "Location":
        return (data) => (
          <div>lat: {data.lat}
            <br /> long: {data.long}
          </div>)
      case "Action":
        return (data) => (
          <Space size="middle">
            <a>Expand</a>
          </Space >)
      default:
        break;
    }
  }

  render() {
    return (
      <div style={{ padding: 30 }}>
        <Table columns={this.state.cols}
          dataSource={this.state.data}>
        </Table>
      </div>)
  }
}
