import React from 'react';
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
  componentDidMount() {
    fetch('http://localhost:3000/userList', {
      method: 'GET',
      credentials: 'include',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res =>
      res.json())
      .then(data => {
        this.setState({
          friends: this.state.friends.concat([data.name])
        });
      })
      .catch(err => {
        console.log('error in getting instagram feedback', err);
      });
  }


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
