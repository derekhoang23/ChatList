import React from 'react';
import ReactDOM from 'react-dom';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ''
    };
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({messages: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.enter(this.state.messages);
  }

  render() {
    return (
      <div className='input'>
        <div className='messages'>
          {this.state.messages}
        </div>
        <div className='end'>
          <button className='option' >
          <span className='igpic'></span>
          </button>
          <input className='input-box' type='text'
          value={this.state.messages}
          onChange={this.handleChange.bind(this)}/>
        </div>
      </div>


    );
  }
}

export default Input;
