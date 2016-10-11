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
      <form className='message' onSubmit={this.handleSubmit.bind(this)} >
        <input
        type='text'
        value= {this.state.messages}
        onChange={this.handleChange.bind(this)}
        />
      </form>
    );
  }
}

export default Input;
