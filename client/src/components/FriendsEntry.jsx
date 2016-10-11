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

  showText() {
    this.setState({
      show: !this.state.show
    })
  }



  render() {
    var displayText = <Input />;
    return (
      <div>
        <div className='friend' onClick={this.showText.bind(this)}>
          {this.props.friend}
        </div>
        <div>
          {this.state.show ? displayText : null}
        </div>
      </div>
    );
  }
}

export default FriendsEntry;
