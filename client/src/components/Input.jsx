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
      // send needs to be updated with the image val and then passed on to Messages component for renderi
      displayIg: false,
      image: null
    };
  }

  componentDidMount() {
    socket.on('received', data => {
      console.log('data', data)
      this.setState({
        send: this.state.send.concat([data])
      });
    });
  }




  handleChange(e) {
    e.preventDefault();
    this.setState({messages: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('stock', this.state.socket)
    this.setState({
      send: this.state.send.concat([this.state.socket])
    })
    var userInput = {
      text: this.state.send,
      senderName: this.props.currentUser,
      receiverName: this.props.user
    };


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
    console.log('lenfth', this.state.messages.length)
    socket.emit('sender', this.state.messages);

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
    console.log('val', val);
    var imgSrc = `${val}`;
    var img = <img src={imgSrc} />;

    // this.setState({
    //   send: this.state.send.concat([img])
    // });
    socket.emit('sender', val);
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
