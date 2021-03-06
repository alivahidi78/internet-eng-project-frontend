import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Select } from "antd";
import { withRouter } from "react-router-dom";
const axios = require("axios");
require("dotenv").config();

const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
  style: {},
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const itemStyle = {
  style: {
    width: "100%",
    "margin-left": "auto",
    "margin-right": "auto",
  },
};

class SignUp extends React.Component {
  onFinish = (values) => {
    axios({
      method: "post",
      url: serverBaseUrl.concat("/users"),
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(values),
    })
      .then((response) => {
        console.log(response);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onFinishFailed = (errorInfo) => {
    alert("Submit Failed:", errorInfo);
  };

  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "45%",
          "margin-top": "-50px",
          "margin-left": "-50px",
          //"width": "100px",
          //"height": "100px",
        }}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            {...itemStyle}
            label="Role"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input your role!",
              },
            ]}
          >
            <Select defaultValue={"select your role"}>
              <Select.Option value="ControlAgent">Control Agent</Select.Option>
              <Select.Option value="FieldAgent">Feild Agent</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            {...itemStyle}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...itemStyle}
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...itemStyle}
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} {...itemStyle}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(SignUp);
