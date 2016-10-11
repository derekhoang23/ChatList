import React from 'react';
import ReactDOM from 'react-dom';
import FriendsEntry from './FriendsEntry.jsx';

class Friendslist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: ['Kimberley Duong', 'Barry Thach', 'Chris Trinh']
    };
  }

  // on load pull all friends data


  render() {
    return (
      <div className='friends'>
        {this.state.friends.map((friend) =>
          <FriendsEntry friend={friend} />
        )}
      </div>
    );
  }
}

export default Friendslist;
