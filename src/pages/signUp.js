import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Select } from "antd";

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

export default class SingUp extends React.Component {
  onFinish = (values) => {
    //TODO
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    //TODO
    console.log("Failed:", errorInfo);
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
            name="role"
            rules={[
              {
                required: true,
                message: "Please input your role!",
              },
            ]}
          >
            <Select defaultValue={"select your role"}>
              <Select.Option value="CA">Control Agent</Select.Option>
              <Select.Option value="FA">Feild Agent</Select.Option>
            </Select>
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
