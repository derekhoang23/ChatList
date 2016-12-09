import React from 'react';
import ReactDOM from 'react-dom';
import Messages from './Messages.jsx';
import IgFeed from './IgFeed.jsx';
var socket = io.connect('http://localhost:3000');
var messages = [];
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: '',
      send: [],
      // send eeds to be updated with the image val and then passed on to Messages component for renderi
      displayIg: false,
      image: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messageContainer !== this.state.send) {
      this.setState({
        send: nextProps.messageContainer
      });
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({messages: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var userInput = {
      text: this.state.messages,
      senderName: this.props.currentUser,
      receiverName: this.props.user
    };

    socket.emit('new message', {id: this.props.conversationId, friend:this.props.user, text: this.state.messages});
    this.props.sentMessageTo(this.props.user);
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

    this.setState({
      messages: ''
    });

  }

  displayIg() {
    this.setState({
      displayIg: !this.state.displayIg
    });
  }

  handleImg(val) {

    socket.emit('new message', {id: this.props.conversationId, friend: this.props.user, text: val});
    // this.setState({
    //   send: this.state.send.concat([img])
    // });
  }


  render() {

    var showIg = <IgFeed handleImg={this.handleImg.bind(this)}/>;
    return (
      <div className='input'>
        <div className='selectedUser'>
          {this.props.user}
        </div>
        <div className='messageContainer'>
          {this.state.send.map((message, i) => {
            return <Messages key={i} message={message}/>;
          })}
        </div>
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
