import React, { Component } from "react";
import { connect } from "react-redux";

import { signIn, signOut, saveEmail } from "../actions";

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
      this.props.saveEmail(this.auth.currentUser.get().getBasicProfile().getEmail());
      if (this.auth.currentUser.get().getBasicProfile().getEmail().slice(-4) !== ".edu") {
        console.log("Not an .edu student, logged out");
        this.auth.signOut();
      }
    } else
      this.props.signOut();
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return <div></div>
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In with Google
        </button>
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

export default connect(mapStateToProps, { signIn, signOut, saveEmail })(GoogleAuth);