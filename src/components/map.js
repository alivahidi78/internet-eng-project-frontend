import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
require("dotenv").config();
export class MainMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: { lat: 35.699, long: 51.337 },
    };
  }

  onClick = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const long = latLng.lng();

    this.setState({ position: { lat, long } });
    this.props.onChange(this.props.name, this.state.position);
  };

  render() {
    return (
      <div style={{ width: "100%", height: 400, margin: "auto" }}>
        <Map
          google={this.props.google}
          wrapperCol={{ sm: 24 }}
          initialCenter={{ lat: 35.699, lng: 51.337 }}
          style={{ width: "100%", height: "100%", margin: "auto" }}
          className={"map"}
          onClick={this.onClick}
          zoom={14}
        >
          <Marker
            position={{
              lat: this.state.position.lat,
              lng: this.state.position.long,
            }}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
})(MainMap);
