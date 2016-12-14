import React from 'react';
import ReactDOM from 'react-dom';
import FriendsEntry from './FriendsEntry.jsx';
import Input from './Input.jsx';
var socket = io.connect('http://localhost:3000');

class Friendslist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      show: false,
      socketId: null

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
        // this.setState({
        //   friends: this.state.friends.concat([data.name])
        // });
        // socket.emit('username', data.name)
      })
      .catch(err => {
        console.log('error in getting instagram feedback', err);
      });

    socket.on('userList', (data, socketId) => {
      // this.setState({
      //   friends: this.state.friends.concat(data)
      // });
      console.log('wuergregt', data)
      console.log('id', socketId)
      for (let i = 0; i < data.length; i++) {
        if (this.state.socketId === null) {
          this.setState({
            socketId: socketId
          });
        }
        console.log('erfhurghthjrg', this.props.currentUser)
        if (this.props.currentUser !== data[i].userName) {
          this.setState({
            friends: this.state.friends.concat(data[i])
          });
        }
      }
    });
  }





  render() {
    console.log('friends', this.state.friends)
    // var displayText = <Input />;
    console.log('current socket', this.state.socketId)
    return (
      <div className='friends'>
        {this.state.friends.map((friend, i) =>
          <FriendsEntry user={this.props.user} key={i} click={this.props.click} friend={friend.userName} socketId={friend.id} />
        )}
        {/* {this.state.show ? displayText : null} */}
      </div>
    );
  }
}

export default Friendslist;
