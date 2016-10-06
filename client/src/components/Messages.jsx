import React from 'react';
import ReactDOM from 'react-dom';

class Messages extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        {this.props.message}
      </div>
    );
  }
}

export default Messages;
