import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

import { signIn, signOut, saveName, saveSchool } from "../actions";
import getSchoolFromEmail from "../utils/getSchoolFromEmail";
import history from "../history";

class GoogleAuth extends Component {
  componentDidMount() {
    // loading google api
    window.gapi.load("client:auth2", () => { // callback after loading finishes
      window.gapi.client.init({
        clientId: "170542252560-2pos4afodu6qna1kfj56v7hhf9ni7m4b.apps.googleusercontent.com",
        scope: "email"
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        // console.log("didmount:", this.auth.currentUser.get().getBasicProfile().getEmail());
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange); 
      });
    }); 
  }

  onAuthChange = (isSignedIn) => {
    
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
      this.props.saveName(this.auth.currentUser.get().getBasicProfile().getName());
      if (this.auth.currentUser.get().getBasicProfile().getEmail().slice(-4) !== ".edu") {
        console.log("Not an .edu student, logged out");
        this.auth.signOut();
        return;
      }
      this.props.saveSchool(getSchoolFromEmail(this.auth.currentUser.get().getBasicProfile().getEmail()));
    } else
      this.props.signOut();
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
    history.push("/");
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return <div></div>
    } else if (this.props.isSignedIn) {
      return (
        <Button compact color="red" size="mini" onClick={this.onSignOutClick}>
          <Icon name="google" />
          Sign Out
        </Button>
      );
    } else {
      return (
        <Button compact color="red" size="mini" onClick={this.onSignInClick}>
          <Icon name="google" />
          Sign In with Google
        </Button>
      );
    }
  }


  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut, saveName, saveSchool })(GoogleAuth);