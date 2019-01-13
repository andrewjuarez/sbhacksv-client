import React, { Component } from "react";
import { Icon, Popup, Card, Button } from "semantic-ui-react";
import formatDate from "../../utils/formatDate";
import FeedReminder from "../feed/FeedReminder";

class Marker extends Component {

  state = { enableReminderForm: false }

  pickIconName = () => {
    const { category } = this.props.data;

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
      <React.Fragment>
        <Button disabled={this.state.enableReminderForm} fluid basic color="green" onClick={() => this.setState({ enableReminderForm: true })}>Remind me</Button>
        {this.state.enableReminderForm && <FeedReminder eventId={posting._id} eventData={posting} />}
      </React.Fragment>
      
       
    );
  }

  renderType = () => {
    const { name, userName, description, category, location, eventdatestart, eventdateend } = this.props.data
    return (
      <Popup
        on="click"
        trigger={
          <Icon 
            name={this.pickIconName()} 
            color={"teal" || null} 
            circular size="big"
            inverted
          />
        } 
        
      >
        <Popup.Content as={Card}>
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>{userName}</Card.Meta>
            <Card.Description>
              {description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <p>
              <Icon name={this.pickIconName(category)} />{category}
            </p>
            <p>
              <Icon name="map marker" />{location}
            </p>
            <p>
              <Icon name="calendar outline" />{`${formatDate(new Date(eventdatestart))} - ${formatDate(new Date(eventdateend))}`}
            </p>
            {this.remindMePopup(this.props.data)}
          </Card.Content>
        </Popup.Content>
      </Popup>
    );
  }

  render () {
    return this.renderType();
  }
}

export default Marker;