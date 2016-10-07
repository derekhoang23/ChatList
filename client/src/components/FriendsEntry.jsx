import React from 'react';
import ReactDOM from 'react-dom';

class FriendsEntry extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
          {this.props.friend}
      </div>
    );
  }
}
