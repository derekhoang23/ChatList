import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input.jsx';
class FriendsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }


  showUserAndInput(e) {
    this.props.click();
    this.props.user(e.target.innerHTML);
  }



  render() {
    return (
      <div>
        <div className='friend' onClick={this.showUserAndInput.bind(this)}>
          {this.props.friend}
        </div>
      </div>
    );
  }
}

export default FriendsEntry;
