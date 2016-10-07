import react from 'react';
import ReactDOM from 'react-dom';
import FriendsEntry from './FriendsEntry.jsx';

class Friendslist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  // on load pull all friends data


  render() {
    return (
      <div>
        {this.state.friends.map((friend) =>
          <FriendsEntry friend={friend} />
        )}
      </div>
    );
  }
}
