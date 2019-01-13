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
      <Menu style={{ borderRadius: 0 }}>
        <Menu.Item>
          <Link to="/">{this.props.isSignedIn && this.props.school ? `Youni @ ${this.props.school.charAt(0).toUpperCase() + this.props.school.slice(1)}`: "Youni"}</Link>
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
  return { isSignedIn: state.auth.isSignedIn, school: state.auth.userSchool };
}

export default connect(mapStateToProps)(withRouter(Navbar));