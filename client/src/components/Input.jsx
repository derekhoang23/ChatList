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
      <div className='flex-outer'>
        <button className='option'>
          <span className='igpic'></span>
        </button>
        <input className='input' type='text'
        value={this.state.messages}
        onChange={this.handleChange.bind(this)}/>
      </div>


    );
  }
}

export default Input;
