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
      socketId: null,
      messageSentTo: null,
      messageNotify: false
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

  addNotification() {
    this.setState({
      messageNotify: true
    });
  }

  setConversationId(val) {
    this.setState({
      conversationId: val
    })
  }

  refreshMessages(data) {
    console.log('data', data);
    if (data.msg.length > 130 && data.msg.slice(0, 33) === 'https://scontent.cdninstagram.com') {
      var img = <img src={data.msg}/>
      this.setState({
        messageContainer: this.state.messageContainer.concat([img]),
        messageSentTo: data.name

      })
    } else {
      this.setState({
        messageContainer: this.state.messageContainer.concat([data.msg]),
        messageSentTo: data.name
      })
    }
  }

  enterMessage(value) {
    this.setState({messages: this.state.messages.concat([value])});
  }


  clickUser() {
    this.setState({
      show: !this.state.show
    });


    // if (this.state.show === false) {
    //   socket.emit('leave conversation', this.state.currentSelectedUser);
    // }

  }

  sentMessageTo(val) {
    console.log('what is this', val)
    console.log('who am i', this.state.currentUser);
    this.setState({
      sentMessageTo: val
    });
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

  displayNewConversation() {
    console.log('me', this.state.currentUser);
    console.log('sending message to', this.state.messageSentTo);
    if (this.state.currentUser !== this.state.messageSentTo) {
      return <Input sentMessageTo={this.sentMessageTo.bind(this)} conversationId={this.state.conversationId} messageContainer={this.state.messageContainer} currentUser={this.state.currentUser} user={this.state.currentSelectedUser} />;
    } else if (this.state.messageSentTo === null ) {
      return null;
    } else {
      return null;
    }
  }



  render() {
    var input = <Input notify={this.addNotification.bind(this)} sentMessageTo={this.sentMessageTo.bind(this)} messageContainer={this.state.messageContainer} socketId={this.state.seletectedUserSocketId} currentUser={this.state.currentUser} selectedUser={this.state.currentSelectedUser} />;
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
