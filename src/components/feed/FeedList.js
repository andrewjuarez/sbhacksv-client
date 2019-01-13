import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon, Button, Popup } from "semantic-ui-react";
import _ from "lodash";

import formatDate from "../../utils/formatDate";
import FeedReminder from "../feed/FeedReminder";

class FeedList extends Component {

  pickIconStyle = (category) => {

    switch(category) {
      case "party": return { name: "fire", color: "orange" };
      case "professional": return { name: "handshake", color: "blue" };
      case "promotion": return { name: "money", color: "green" };
      case "gaming": return { name: "game", color: "purple" };
      case "entertainment": return { name: "star", color: "yellow" };
      case "food": return { name: "food", color: "olive" };
      case "social": return { name: "users", color: "teal" };
      case "sports": return { name: "football ball", color: "brown" };
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
      const iconStyle = this.pickIconStyle(posting.category);
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
              <Icon name={iconStyle.name} color={iconStyle.color} />{posting.category}
            </p>
            <p>
              <Icon name="map marker" color="red"/>{posting.location}
            </p>
            <p>
              <Icon name="calendar outline" color="violet" />{`${formatDate(new Date(posting.eventdatestart))} - ${formatDate(new Date(posting.eventdateend))}`}
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