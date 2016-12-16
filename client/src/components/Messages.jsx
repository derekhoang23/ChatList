import React from 'react';
import ReactDOM from 'react-dom';
import ReceivedMessages from './ReceivedMessages.jsx'
import Message from './Message.jsx';
class Messages extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidUpdate() {
    var objDiv = document.getElementById('messageContainer');
    objDiv.scrollTop = objDiv.scrollHeight;
  }


  render() {
    console.log('am i getting messages', this.props.messages)
    // var isImg = (this.props.receiver === undefined || this.props.receiver.length > 100 && this.props.receiver.slice(0, 33) === 'https://scontent.cdninstagram.com');
    // var isImg2 = (this.props.sender === undefined || this.props.sender.length > 100 && this.props.sender.slice(0, 33) === 'https://scontent.cdninstagram.com');
    var messages = this.props.messages.map((message, i) => {
      return (
        <Message key={i} currentUser={this.props.currentUser} messages={message.msg}  name={message.name} />
      )
    })
    return (

      <div id='messageContainer'>
      {messages}
      </div>
    );
  }
}

export default Messages;
