import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import _ from "lodash";

class FeedList extends Component {

  renderFeed = () => {
    const cardArray =  _.map(this.props.event, (posting, key) => {
      return (
        <Card key={key}>
          <Card.Content>
            <Card.Header>{posting.name}</Card.Header>
            <Card.Meta>Elliot</Card.Meta>
            <Card.Description>
              {posting.description}
            </Card.Description>
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