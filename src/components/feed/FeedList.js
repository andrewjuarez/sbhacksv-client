import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon, Button, Popup } from "semantic-ui-react";
import _ from "lodash";

import formatDate from "../../utils/formatDate";
import FeedReminder from "../feed/FeedReminder";

class FeedList extends Component {

  state = {};

  pickIconName = (category) => {

    switch(category) {
      case "parties": return "fire";
      case "professional": return "handshake";
      case "promotion": return "money";
      case "gaming": return "game";
      case "entertainment": return "star";
      case "food": return "food";
      case "social": return "users";
      default:
        return "question";
    }
  }

  remindMePopup = (posting) => {
    return (
      <Popup
        
        on="click"
        trigger={<Button fluid basic color="green">Remind me</Button>}
      >
        <Popup.Content>
          <FeedReminder eventId={posting._id} eventData={posting} />
        </Popup.Content>
      </Popup>
    );
  }

  renderFeed = () => {
    const cardArray =  _.map(this.props.event, (posting, key) => {
      return (
        <Card key={key}>
          <Card.Content>
            <Card.Header>{posting.name}</Card.Header>
            <Card.Meta>{posting.userName}</Card.Meta>
            <Card.Description>
              {posting.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <p>
              <Icon name={this.pickIconName(posting.category)} />{posting.category}
            </p>
            <p>
              <Icon name="map marker" />{posting.location}
            </p>
            <p>
              <Icon name="calendar outline" />{`${formatDate(new Date(posting.eventdatestart))} - ${formatDate(new Date(posting.eventdateend))}`}
            </p>
            {this.remindMePopup(posting)}
          </Card.Content>
        </Card>
      );
    });

    return (
      <Card.Group style={{ height: "80vh", overflow: "scroll" }}>
        {cardArray}
      </Card.Group>
    );
  }

  render() {
    return (
      <div>
        {this.renderFeed()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { event: state.event };
}

export default connect(mapStateToProps)(FeedList);