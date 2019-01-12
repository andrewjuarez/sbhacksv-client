import React, { Component } from "react";
import GoogleMap from "google-map-react";
import { connect } from "react-redux";
import _ from "lodash";

import Marker from "./Marker";
import { calcCenterWithBounds } from "../../utils/geolocationUtils";

class RenderGoogleMap extends Component {

  renderMarkers = () => {
    return _.map(this.props.event, (posting, key) => {
      return (<Marker key={key} lat={posting.lat} lng={posting.long} data={posting} />);
    });
  }

  render() {
    console.log("Map rerendered");
    return (
      <div style={{height: '100vh', width: '100%'}}>
        <GoogleMap
          key={"uci"} // forces a re-render of the component when the polyline changes
          bootstrapURLKeys={{key: "AIzaSyB10UMIWfiikx9uiADwx7XS53xb9Jm-MPM" }}
          yesIWantToUseGoogleMapApiInternals={true}
          defaultCenter={calcCenterWithBounds(this.props.center)}
          defaultZoom={this.props.zoom || 11}
        >
          {this.renderMarkers()}
        </GoogleMap>
      </div>
    );  
  }
}

RenderGoogleMap.defaultProps = {
  center: {
    northeast: { lat: 33.8365977, lng: -117.7962931 },
    southwest: { lat: 33.68453230000001, lng: -117.9142825 }
  },
  zoom: 13
};

const mapStateToProps = state => {
  return { event: state.event }
}

export default connect(mapStateToProps)(RenderGoogleMap);