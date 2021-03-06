import React from "react";
import axios from "axios";
import { Table, Space } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
require("dotenv").config();

const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export default class SingleFormSubTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      cols: null,
    };
  }

  async componentDidMount() {
    axios({
      method: "get",
      url: serverBaseUrl.concat(
        `/answers/?formId=${this.props.match.params.id}`
      ),
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        if (response.data) {
          let filters = [];
          response.data.forEach((row) => {
            row.values.forEach((field) => {
              if (field.type === "Location" && field.value.areas)
                field.value.areas.forEach((area) => {
                  if (!filters[field.name]) filters[field.name] = new Set();
                  filters[field.name].add(area);
                });
            });
          });
          let columns = response.data[0].values.map((t, i) => {
            let colFilters = filters[t.name]
              ? Array.from(filters[t.name]).map((v) => {
                  return {
                    text: v,
                    value: v,
                  };
                })
              : null;
            return {
              title: t.title,
              dataIndex: i,
              key: t.name,
              type: t.type,
              render: this.renderField(t.type),
              onFilter: t.type === "Location" ? this.filter(i) : null,
              filters: colFilters,
            };
          });
          columns.push({
            title: "Action",
            key: "action",
            type: "Action",
            fixed: "right",
            render: this.renderField("Action"),
          });
          let newData = response.data.map((t, i) => {
            return {
              id: t._id,
              ...t.values.map((t, i) => {
                return t.value;
              }),
            };
          });
          this.setState({
            data: newData,
            cols: columns,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderField = (type) => {
    switch (type) {
      case "Location":
        return (data) => {
          if (data)
            return (
              <div>
                <div style={{ width: "50%", float: "left" }}>
                  lat: {data.lat}
                  <br /> long: {data.long}
                </div>
                <div style={{ width: "45%", float: "right" }}>
                  areas: {data.areas ? data.areas.map((e) => e + " ") : null}
                </div>
              </div>
            );
        };
      case "Action":
        return (data) => {
          let id = data["id"];
          return (
            <Space size="middle">
              <Link to={`/CAHomePage/formDetails/${id}`}>Expand</Link>
            </Space>
          );
        };
      default:
        break;
    }
  };

  filter = (dataIndex) => {
    return (value, record) => {
      if (record[dataIndex] && record[dataIndex].areas) {
        return record[dataIndex].areas.indexOf(value) !== -1;
      }
      return false;
    };
  };

  render() {
    return (
      <div style={{ padding: 30 }}>
        <Table
          columns={this.state.cols}
          dataSource={this.state.data}
          bordered
        ></Table>
      </div>
    );
  }
}
