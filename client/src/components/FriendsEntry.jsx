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




  render() {
    return (
        <div className='friend' onClick={this.props.click}>
          {this.props.friend}
        </div>
    );
  }
}

export default FriendsEntry;
