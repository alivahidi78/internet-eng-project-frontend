import React from "react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";

export default class MyDatePicker extends React.Component {
  onChange = (date, dateString) => {
    this.props.onChange(this.props.name, dateString);
  };
  render() {
    return (
      <DatePicker onChange={this.onChange} addonBefore={this.props.title} />
    );
  }
}
