import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEvents } from "../../actions";

class Home extends Component {

  state = { prevAuth: null };

  componentDidMount() {
    if (this.props.auth.isSignedIn)
      this.props.fetchEvents()
    this.setState({ prevAuth: this.props.auth });
  }

  componentDidUpdate() {
    if (this.props.auth !== this.state.prevAuth) {
      this.props.fetchEvents();
      this.setState({ prevAuth: this.props.auth });
      console.log("Refetched");
    }
  }

  render() {
    return (
      <div>
        Homepage New
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { fetchEvents })(Home);