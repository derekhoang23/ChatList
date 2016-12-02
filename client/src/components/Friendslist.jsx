import React from 'react';
import ReactDOM from 'react-dom';
import FriendsEntry from './FriendsEntry.jsx';
import Input from './Input.jsx';

class Friendslist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      show: false

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

  showText() {
    this.setState({
      show: !this.state.show
    });
  }


  render() {
    // var displayText = <Input />;
    return (
      <div className='friends'>
        {this.state.friends.map((friend, i) =>
          <FriendsEntry user={this.props.user} key={i} click={this.showText.bind(this)} click={this.props.click} friend={friend} />
        )}
        {/* {this.state.show ? displayText : null} */}
      </div>
    );
  }
}

export default Friendslist;
