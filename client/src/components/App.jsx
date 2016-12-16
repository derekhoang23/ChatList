import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input.jsx';
import Messages from './Messages.jsx';
import Friendslist from './Friendslist.jsx';
import Logout from './Logout.jsx';
import IgFeed from './IgFeed.jsx';
import ShowConversation from './showConversation.jsx';
var socket = io.connect('http://localhost:3000');
import { Notification } from 'react-notification';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      receivedMessage: false,
      currentSelectedUser: null,
      seletectedUserSocketId: null,
      currentUser: null,
      messageContainer: [],
      // need to serch database for conversation id in future otherwise this will be fine for now
      socketId: null
    };
  }
  componentDidMount() {
    fetch('http://localhost:3000/userInfo', {
      method: 'GET',
      credentials: 'include',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(user => {
      console.log('user', user);
      this.setState({
        currentUser: user.username
      });
      socket.emit('username', user.username);
    })
    .catch(err => {
      console.log('did not auth in', err);
    });
    //
    // socket.on('currentInfo', (list, socketId) => {
    //   if (this.state.socketId === null) {
    //     this.setState({
    //       socketId: socketId
    //     })
    //   }
    // })
    // socket.on('userList', (userList, socketId) => {
    //   if (this.state.socketId === null) {
    //     this.setState({
    //       socketId: socketId
    //     })
    //   }
    // });

    // socket.on(this.props.currentUser, data => {
    //   console.log('data', data)
    // })
    socket.on('sendMsg', this.refreshMessages.bind(this))
    // socket.on('sendMsg', this.refreshMessages.bind(this));
  }

  refreshMessages(data) {
    console.log('data', data);
    // var messages = this.state.messages;
    if (data.name !== this.state.currentUser) {
      this.setState({
        receivedMessage: true
      });
    }
    this.addMessage(data);
  }

  sendHandler(value) {
    var messageObj = {
      toid: this.state.seletectedUserSocketId,
      msg: value,
      name: this.state.currentUser
    }

    socket.emit('getMsg', messageObj);
    this.addMessage(messageObj);
  }

  addMessage(message) {
    var messages = this.state.messageContainer;
    messages.push(message);
    this.setState({messages});
  }

  clickUser() {
    this.setState({
      show: !this.state.show
    });


    // if (this.state.show === false) {
    //   socket.emit('leave conversation', this.state.currentSelectedUser);
    // }

  }


  showClickedUsername(val, socketId) {
    console.log('current state socket', this.state.socketId);
    console.log('selected user socket id', socketId)
    if (socketId === this.state.socketId) {
      alert('cant message to yourself')
    } else {
      this.setState({
        currentSelectedUser: val,
        seletectedUserSocketId: socketId
      })
    }

    // socket.emit('enter conversation', this.state.conversationId);
  }





  render() {
    var input = <Input send={this.sendHandler.bind(this)} messageContainer={this.state.messageContainer} socketId={this.state.seletectedUserSocketId} currentUser={this.state.currentUser} selectedUser={this.state.currentSelectedUser} />;
    // var friendInput = <ShowConversation />;
    return (
      <div>
          <Logout />
          <Friendslist currentUser={this.state.currentUser} user={this.showClickedUsername.bind(this)} click={this.clickUser.bind(this)}/>
          {this.state.show ? input : null}
          {/* <Notification
          isActive={this.state.messageNotify}
          message={input}
          /> */}
          {this.dis}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
