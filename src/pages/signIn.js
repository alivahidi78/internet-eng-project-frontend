import React from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import { withRouter, Link } from "react-router-dom";

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

class SignIn extends React.Component {
  onFinish = (values) => {
    //TODO
    this.props.history.push("/FAHomePage");
    this.props.setTokenAndRole("mytoken", "FA");
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
              Sign In
            </Button>
          </Form.Item>
          <Form.Item {...tailLayout} {...itemStyle}>
            <Link to="/SignUp">
              <Button>
                Sign Up.
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(SignIn);
