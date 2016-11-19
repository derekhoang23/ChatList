import React from 'react';
import ReactDOM from 'react-dom';
import Messages from './Messages.jsx';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: '',
      send: []
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

  render() {
    return (
      <div className='input'>
        {this.state.send.map(message => {
          return <Messages message={message}/>;
        })}
          <form className='form' onSubmit={this.handleSubmit.bind(this)}>
            <button className='option' >
            <span className='igpic'></span>
            </button>
            <input className='input-box' type='text'
            value={this.state.messages}
            onChange={this.handleChange.bind(this)}/>
          </form>
      </div>


    );
  }
}

export default Input;
