import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Message, Segment } from "semantic-ui-react";

import { fetchEvents } from "../../actions";

import FeedList from "../feed/FeedList";
import RenderGoogleMap from "../map/RenderGoogleMap";
import FeedFilter from "../feed/FeedFilter";

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
    if (this.props.auth.isSignedIn === false) {
      return (
        <div>
          <Message info>
            <Message.Header>Hi. Welcome to Youni, a board where you can post events located around your University of California campus.</Message.Header>
            <p>Log in with your .edu email to get started!</p>
          </Message>

        </div>
      );
    } else if (this.props.auth.isSignedIn === null) {
      return null;
    }

    return (
      <div>
        
        <Grid stackable doubling style={{ marginLeft: "5px" }}>
          <Grid.Column width={4}>
            <FeedFilter />
            <Segment><FeedList /></Segment>
          </Grid.Column>
          <Grid.Column stretched width={12} >
            <RenderGoogleMap />
          </Grid.Column>
        </Grid>
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { fetchEvents })(Home);