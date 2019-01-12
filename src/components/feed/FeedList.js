import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon } from "semantic-ui-react";
import _ from "lodash";

class FeedList extends Component {

  pickIconName = (category) => {

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
            
            <Icon name={this.pickIconName(posting.category)} />{posting.category}
            
          </Card.Content>
        </Card>
      );
    });

    return (
      <Card.Group>
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