import React from 'react';
import ReactDOM from 'react-dom';
import Messages from './Messages.jsx';
import ReceivedMessages from './ReceivedMessages.jsx';
import IgFeed from './IgFeed.jsx';
var socket = io.connect('http://localhost:3000');
import update from 'react-addons-update';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: '',
      // send: [{receiver: [], sender: []}],
      // send eeds to be updated with the image val and then passed on to Messages component for renderi
      displayIg: false,
      image: null
    };
  }


  handleChange(e) {
    e.preventDefault();
    this.setState({messages: e.target.value});
  }


  handleSubmit(e) {
    e.preventDefault();


    // socket.emit('new message', {id: this.props.conversationId, friend:this.props.user, text: this.state.messages});
    // this.props.sentMessageTo(this.props.user);
    // fetch('http://localhost:3000/postMessages', {
    //   method: 'POST',
    //   credentials: 'include',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(userInput)
    // })
    // .then(res =>
    //   res.json())
    //   .then(data => {
    //     console.log('received message', data);
    //   })
    //   .catch(err => {
    //     console.log('did not save messages', err );
    //   });
    // socket.emit('getMsg', {
    //   toid: this.props.socketId,
    //   msg: this.state.messages,
    //   name: this.props.currentUser
    // })

    // this.setState({
    //   send: update(this.state.send, {0: {sender: {$push: [this.state.messages]}}})
    // })

    this.props.send(this.state.messages);
    this.setState({
      messages: ''
    });
    // this.props.notify();
  }

  displayIg() {
    this.setState({
      displayIg: !this.state.displayIg
    });
  }

  handleImg(val) {
    this.props.send(val);
    // socket.emit('new message', {id: this.props.conversationId, friend: this.props.user, text: val});
    // this.setState({
    //   send: this.state.send.concat([img])
    // });
  }


  render() {
    var showIg = <IgFeed handleImg={this.handleImg.bind(this)}/>;
    return (
      <div className='input'>
        <div className='selectedUser'>
          {this.props.selectedUser}
        </div>
          <Messages currentUser={this.props.currentUser} messages={this.props.messageContainer}/>
          {this.state.displayIg ? showIg : null}
        {/* <div className='form'> */}
          <form className='form' onSubmit={this.handleSubmit.bind(this)}>
          {/* <button className='option' >
          <span className='igpic'>
            <img src='./assets/igicon.png' />
          </span>
          </button> */}
          <img src='./assets/igicon.png' className='option' onClick={this.displayIg.bind(this)}/>
          <input className='input-box' type='text'
          value={this.state.messages}
          onChange={this.handleChange.bind(this)}/>
          </form>
        {/* </div> */}
      </div>


    );
  }
}

export default Input;
