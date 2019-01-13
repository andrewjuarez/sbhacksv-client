import React, { Component } from "react";
import { Icon, Popup, Card, Button } from "semantic-ui-react";
import formatDate from "../../utils/formatDate";
import FeedReminder from "../feed/FeedReminder";

class Marker extends Component {

  state = { enableReminderForm: false }

  pickIconStyle = () => {
    const { category } = this.props.data;

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
      <React.Fragment>
        <Button disabled={this.state.enableReminderForm} fluid basic color="green" onClick={() => this.setState({ enableReminderForm: true })}>Remind me</Button>
        {this.state.enableReminderForm && <FeedReminder eventId={posting._id} eventData={posting} />}
      </React.Fragment>
      
       
    );
  }

  renderType = () => {
    const { name, userName, description, category, location, eventdatestart, eventdateend } = this.props.data
    const iconStyle = this.pickIconStyle(category);
    return (
      <Popup
        on="click"
        size="mini"
        onClose={() => this.setState({ enableReminderForm: false })}
        trigger={
          <Icon 
            name={iconStyle.name} 
            color={iconStyle.color || null} 
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
              <Icon name={iconStyle.name} color={iconStyle.color} />{category}
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