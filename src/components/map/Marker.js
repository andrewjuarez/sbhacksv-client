import React, { Component } from "react";
import { Icon, Popup, Card } from "semantic-ui-react";
import formatDate from "../../utils/formatDate";
class Marker extends Component {

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