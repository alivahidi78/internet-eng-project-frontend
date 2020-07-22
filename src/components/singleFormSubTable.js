import React from "react";
import "antd/dist/antd.css";
require("dotenv").config();

const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export default class SingleFormSubTable extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    return (
      <>
        <p>form details comes here...</p>
      </>
    );
  }
}
