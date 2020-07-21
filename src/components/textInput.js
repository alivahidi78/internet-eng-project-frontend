import React from "react";
import { Input } from "antd";
import "antd/dist/antd.css";

export default class TextInput extends React.Component {
  componentWillUnmount() {}

  handler() {}

  render() {
    return (
      <Input
        placeholder="Input text"
        maxLength={50}
        onChange={(event) =>
          this.props.onChange(this.props.name, event.target.value)
        }
      />
    );
  }
}
