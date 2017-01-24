import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    var messages = this.props.messages;
    var selectedUser = this.props.name;
    var currentUser = this.props.currentUser;
    var media = function() {
      if (messages.length > 130 && messages.slice(0, 33) === 'https://scontent.cdninstagram.com') {
        var img = <img src={messages}/>;
        if (selectedUser !== currentUser) {
          return <div className='friendMessenger' >{img}</div>
        } else {
          return <div className='Me' >{img}</div>
        }
      } else {
        if (selectedUser !== currentUser) {
          return <div className='friendMessenger' ><span className='letter'>{selectedUser.slice(0, 1).toUpperCase()}</span>{messages}</div>
        } else {
          return <div className='Me' >{messages}<span>{currentUser.slice(0, 1).toUpperCase()}</span></div>
        }
      }
    };
    return (
      <div>
      {/* {this.props.messages.length > 130 && this.props.messages.slice(0, 33) === 'https://scontent.cdninstagram.com'
      ? <img src={this.props.messages} /> : this.props.messasges} */}
      {media()}
      </div>
    );
  }

}

export default Message;
