import React from 'react';
import ReactDOM from 'react-dom';
import Messages from './Messages.jsx';
import IgFeed from './IgFeed.jsx';

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

  handleChange(e) {
    e.preventDefault();
    this.setState({messages: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      send: this.state.send.concat([this.state.messages])
    });

    this.setState({
      messages: ''
    });

    fetch('http://localhost:3000/postMessages', {
      mode: 'POST',
      credentials: 'include',
      mode: 'no-cors',
      body: JSON.stringify({
        text: this.state.send,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res =>
      res.json())
      .then(data => {
        console.log('received message', data);
      })
      .catch(err => {
        console.log('did not save messages', err );
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

    this.setState({
      send: this.state.send.concat([img])
    });
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
