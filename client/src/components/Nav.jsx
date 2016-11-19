import React from 'react';
import ReactDOM from 'react-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendSearch: '',
      response: '',
      error: 'No friend has matched your search'
    };
  }

  searchFriend() {

  }

  submitSearch() {
    fetch('http://localhost:3000/search', {
      mode: 'POST',
      credentials: 'include',
      mode: 'no-cors',
      body: {
        search: this.state.friendSearch
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res =>
      res.json())
      .then(data => {
        this.setState({
          response: data
        });
      })
      .catch(err => {
        console.log('did not receive data', err);
      });
  }

  render() {
    return (
      <div>
        // include log out button here
        // switch chatroom
        // add or remove friend
        // search for specific friend
      </div>
    );
  }
}
