import React, { Component } from "react";
import GoogleMap from "google-map-react";
import { connect } from "react-redux";
import _ from "lodash";

import Marker from "./Marker";

class RenderGoogleMap extends Component {

  pickSchoolCenter = () => {
    switch(this.props.school) {
      case "uci": return { lat: 33.6482478, lng: -117.8408066 };
      case "berkeley": return { lat: 37.87156239999999, lng: -122.2581763 };
      case "ucr": return { lat: 33.9745645, lng: -117.3245204 };

      case "ucsb": return { lat: 34.4135868, lng: -119.8496976 };

      case "ucm": return { lat: 37.3637343, lng: -120.4311096 };
      case "ucsc": return { lat: 36.9776276, lng: -122.0543109 };
      case "ucsd": return { lat: 32.8802438, lng: -117.2426505 }
      case "ucla": return { lat: 34.070264, lng: -118.4440562 };
      
      default: 
        return { lat: 33.6482478, lng: -117.8408066 };
    }
  }

  renderMarkers = () => {
    return _.map(this.props.event, (posting, key) => {
      return (<Marker key={key} lat={posting.lat} lng={posting.long} data={posting} />);
    });
  }

  render() {
    console.log("Map rerendered");
    if (!this.props.school) {
      return null;
    }
    return (
      <div style={{height: '80vh', width: '100%'}}>
        <GoogleMap
          key={this.props.school || "noschool"} // forces a re-render of the component when the polyline changes
          bootstrapURLKeys={{key: "AIzaSyB10UMIWfiikx9uiADwx7XS53xb9Jm-MPM" }}
          yesIWantToUseGoogleMapApiInternals={true}
          defaultCenter={this.pickSchoolCenter()}
          defaultZoom={13}
        >
          {this.renderMarkers()}
        </GoogleMap>
      </div>
    );  
  }
}

const mapStateToProps = state => {
  return { event: state.event, school: state.auth.userSchool }
}

export default connect(mapStateToProps)(RenderGoogleMap);