import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

import GoogleAuth from "../GoogleAuth";

class Navbar extends Component {
  renderAuthLinks() {
    if (this.props.isSignedIn) {
      return (
        <Menu.Item>
          <Link to="/post">Make Post</Link>
        </Menu.Item>
      );
    }
    return null;
  }

  render() {
    return (
      <Menu>
        <Menu.Item>
          <Link to="/">Youni</Link>
        </Menu.Item>
        {this.renderAuthLinks()}
        <Menu.Item position="right">
          <GoogleAuth />
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps)(withRouter(Navbar));