import React from 'react';

class ReceivedMessages extends React.Component {
  constructor(props) {
    super(props);
  }
  //
  render() {
    var isImg = (this.props.receiver === undefined || this.props.receiver.length > 100 && this.props.receiver.slice(0, 33) === 'https://scontent.cdninstagram.com');
    // var isImg2 = (this.props.sender === undefined || this.props.sender.length > 100 && this.props.sender.slice(0, 33) === 'https://scontent.cdninstagram.com');

    return (
      // <div className='messages'>
      //   { isImg ? <img src={this.props.receiver} /> : this.props.receiver }
      //   {/* { isImg2 ? <img src={this.props.sender} /> : this.props.sender } */}
      // </div>\
      <div>
        {this.props.sender}
      </div>
    );
  }
}

export default ReceivedMessages;
