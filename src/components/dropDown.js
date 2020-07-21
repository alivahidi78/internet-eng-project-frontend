import React from "react";
import { Dropdown, Button, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

export default class DropDownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.title,
    };
  }

  handleMenuClick = (e) => {
    this.setState({ label: e.item.props.label });
    this.props.onChange(this.props.name, e.key);
    // console.log(e);
  };

  render() {
    let items = [];
    for (let i = 0; i < this.props.options.length; i++) {
      const element = this.props.options[i];
      items.push(
        <Menu.Item key={element.label} label={element.value}>
          {element.value}
        </Menu.Item>
      );
    }
    this.menu = <Menu onClick={this.handleMenuClick}>{items}</Menu>;
    return (
      <Dropdown overlay={this.menu}>
        <Button>
          {this.state.label} <DownOutlined />
        </Button>
      </Dropdown>
    );
  }
}
