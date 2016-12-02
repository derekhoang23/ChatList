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
      // send needs to be updated with the image val and then passed on to Messages component for rendering
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
  }

  displayIg() {
    this.setState({
      displayIg: !this.state.displayIg
    });
  }

  handleImg(val) {
    this.setState({
      image: val
    });
  }


  render() {
    console.log('wtrefre', this.state.image)
    var showIg = <IgFeed handleImg={this.handleImg.bind(this)}/>;
    return (
      <div className='input'>
        <div className='selectedUser'>
          {this.props.user}
        </div>
        <div className='messageContainer'>
          {this.state.send.map(message => {
            return <Messages image={this.state.image} message={message}/>;
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
