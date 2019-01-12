import React, { Component } from "react";
import { Icon, Popup, Card } from "semantic-ui-react";

class Marker extends Component {

  pickIconName = () => {
    const { category } = this.props.data;

    switch(category) {
      case "parties": return "fire";
      case "professional": return "handshake";
      case "promotion": return "money bill";
      case "gaming": return "game";
      case "entertainment": return "star";
      case "food": return "food";
      default:
        return "question";
    }
  }

  renderType = () => {
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
            <Card.Header>{this.props.data.name}</Card.Header>
            <Card.Meta>{this.props.data.userName}</Card.Meta>
            <Card.Description>
              {this.props.data.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            
            <Icon name={this.pickIconName(this.props.data.category)} />{this.props.data.category}
            
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