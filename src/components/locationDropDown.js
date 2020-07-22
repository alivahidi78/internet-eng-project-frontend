import React from "react";
import { Dropdown, Button, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

export default class LocationDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.title,
    };
  }

  handleMenuClick = (e) => {
    this.setState({
      label: `lat:${e.item.props.value.lat} long:${e.item.props.value.long}`,
    });
    this.props.onChange(this.props.name, e.key);
  };

  render() {
    let items = [];
    for (let i = 0; i < this.props.options.length; i++) {
      const element = this.props.options[i];
      items.push(
        <Menu.Item key={element.label} value={element.value}>
          lat:{element.value.lat} long:{element.value.long}
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
