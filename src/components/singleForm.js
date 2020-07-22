import React from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Form, Button } from "antd";
import MyDatePicker from "./datePicker";
import TextInput from "./textInput";
import NumericInput from "./numericInput";
import DropDownMenu from "./dropDown";
import LocationDropDown from "./locationDropDown";
import Map from "./map";
require("dotenv").config();

const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL;

let layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

let tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default class SingleForm extends React.Component {
  constructor(props) {
    super(props);
    this.txtOnChange = this.dataOnChange.bind(this);
    this.state = {
      form: "",
    };
    this.data = {};
  }

  onFinish = (values) => {
    alert("Submitted");
    // console.log(values);
    console.log(this.data);
    axios
      .post(serverBaseUrl.concat("submit"), this.data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onFinishFailed = (errorInfo) => {
    alert("Failed");
    console.log(errorInfo);
  };

  async componentDidMount() {
    this.data["formId"] = this.props.match.params.id;
    axios
      .get(serverBaseUrl.concat(this.props.match.params.id))
      .then((response) => {
        let items = [];
        for (let i = 0; i < response.data.fields.length; i++) {
          const element = response.data.fields[i];
          let item;
          if (element.options) {
            if (element.type !== "Location")
              item = (
                <DropDownMenu
                  name={element.name}
                  title={element.title}
                  options={element.options}
                  onChange={this.dataOnChange}
                ></DropDownMenu>
              );
            else
              item = (
                <LocationDropDown
                  name={element.name}
                  title={element.title}
                  options={element.options}
                  onChange={this.dataOnChange}
                ></LocationDropDown>
              );
          } else
            switch (element.type) {
              case "Text":
                item = (
                  <TextInput
                    name={element.name}
                    title={element.title}
                    onChange={this.dataOnChange}
                  ></TextInput>
                );
                break;
              case "Number":
                item = (
                  <NumericInput
                    name={element.name}
                    title={element.title}
                    onChange={this.dataOnChange}
                  ></NumericInput>
                );
                break;
              case "Date":
                item = (
                  <MyDatePicker
                    name={element.name}
                    title={element.title}
                    onChange={this.dataOnChange}
                  ></MyDatePicker>
                );
                break;
              case "Location":
                item = (
                  <Map
                    name={element.name}
                    title={element.title}
                    onChange={this.dataOnChange}
                  ></Map>
                );
                break;
              default:
            }
          items.push(
            <Form.Item
              label={element.title}
              name={element.title}
              rules={[{ required: element.required }]}
            >
              {item}
            </Form.Item>
          );
        }
        items.push(
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        );
        this.setState({ form: response.data, items: items });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dataOnChange = (name, value) => {
    this.data[name] = value;
  };

  render() {
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        {this.state.items}
      </Form>
    );
  }
}
