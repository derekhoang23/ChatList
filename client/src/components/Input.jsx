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
      displayIg: false
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
  }

  displayIg() {
    this.setState({
      displayIg: !this.state.displayIg
    });
    
  }

  render() {
    var showIg = <IgFeed />;
    return (
      <div className='input'>
        <div className='messageContainer'>
          {this.state.send.map(message => {
            return <Messages message={message}/>;
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
