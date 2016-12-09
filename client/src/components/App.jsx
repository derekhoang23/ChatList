import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input.jsx';
import Messages from './Messages.jsx';
import Friendslist from './Friendslist.jsx';
import Logout from './Logout.jsx'
import IgFeed from './IgFeed.jsx';
import ShowConversation from './showConversation.jsx';
var socket = io.connect('http://localhost:3000');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      receivedMessage: false,
      currentSelectedUser: '',
      currentUser: null,
      messageContainer: [],
      // need to serch database for conversation id in future otherwise this will be fine for now
      conversationId: 1,
      messageSentTo: null
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
    })
    .catch(err => {
      console.log('did not auth in', err);
    });

    socket.on('refresh', this.refreshMessages.bind(this));
  }
  //
  // componentWillMount() {
  //   if (this.state.messageSentTo !== this.state.currentUser) {
  //     return  <Input sentMessageTo={this.sentMessageTo.bind(this)} id={this.state.conversationId} messageContainer={this.state.messageContainer} currentUser={this.state.currentUser} user={this.state.currentSelectedUser} />;
  //   } else {
  //     return null;
  //   }
  // }

  refreshMessages(data) {
    console.log('data', data);
    if (data.text.length > 130 && data.text.slice(0, 33) === 'https://scontent.cdninstagram.com') {
      var img = <img src={data.text}/>
      this.setState({
        messageContainer: this.state.messageContainer.concat([img]),
        messageSentTo: data.friend

      })
    } else {
      this.setState({
        messageContainer: this.state.messageContainer.concat([data.text]),
        messageSentTo: data.friend
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

  showClickedUsername(val) {
    this.setState({
      currentSelectedUser: val
    })
    socket.emit('enter conversation', this.state.conversationId);

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
    var input = <Input sentMessageTo={this.sentMessageTo.bind(this)} conversationId={this.state.conversationId} messageContainer={this.state.messageContainer} currentUser={this.state.currentUser} user={this.state.currentSelectedUser} />;
    var friendInput = <ShowConversation />;
    return (
      <div>
          <Logout />
          <Friendslist user={this.showClickedUsername.bind(this)} click={this.clickUser.bind(this)}/>
          {this.state.show ? input : null}
          {/* {this.state.sentMessageTo !== this.state.currentUser ? null : input} */}
          {/* {this.displayNewConversation()} */}
          {this.state.currentUser === this.state.messageSentTo && this.state.messageSentTo !== null ? friendInput : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
