import React from 'react';
import ReactDOM from 'react-dom';
import FriendsEntry from './FriendsEntry.jsx';
import Input from './Input.jsx';
var socket = io.connect('http://localhost:3000');
import update from 'react-addons-update';

class Friendslist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      show: false,
      socketId: null

    };
  }

  componentDidMount() {
    // fetch('http://localhost:3000/userList', {
    //   method: 'GET',
    //   credentials: 'include',
    //   mode: 'no-cors',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(res =>
    //   res.json())
      // .then(data => {
        // this.setState({
        //   friends: this.state.friends.concat([data.name])
        // });
        // socket.emit('username', data.name)
      // })
      // .catch(err => {
      //   console.log('error in getting instagram feedback', err);
      // });

    socket.on('userList', (data, socketId) => {
      for (let i = 0; i < data.length; i++) {
        if (this.state.socketId === null) {
          this.props.currentUserSocket(socketId)
          this.setState({
            socketId: socketId
          });
        }
        if (this.props.currentUser !== data[i].userName) {
          this.setState({
            friends: this.state.friends.concat(data[i])
          });
        }
      }
    });

    socket.on('exit', user => {
      // this.state.friends.findIndex(u => {
      //   return u === user;
      var index = this.state.friends.indexOf(user);

      // }).slice()
      this.setState({
        friends: update(this.state.friends, {$splice: [[index, 1]]})
      });
    });

  }





  render() {

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
