import React from 'react';
import ReactDOM from 'react-dom';

class Messages extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    var isImg = (this.props.message === undefined || this.props.message.length > 100 && this.props.message.slice(0, 33) === 'https://scontent.cdninstagram.com');
    return (
      <div className='messages'>
        { isImg ? <img src={this.props.message} /> : this.props.message }
      </div>
    );
  }
}

export default Messages;
