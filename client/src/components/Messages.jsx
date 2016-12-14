import React from 'react';
import ReactDOM from 'react-dom';
import ReceivedMessages from './ReceivedMessages.jsx'
class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wtf: null
    }
  }

componentDidMount() {
  this.setState({
    wtf: this.props.sender
  })
}


  render() {
    var isImg = (this.props.receiver === undefined || this.props.receiver.length > 100 && this.props.receiver.slice(0, 33) === 'https://scontent.cdninstagram.com');
    var isImg2 = (this.props.sender === undefined || this.props.sender.length > 100 && this.props.sender.slice(0, 33) === 'https://scontent.cdninstagram.com');

    return (

      <div className='messages'>
        {this.state.wtf.map(message => {
          <ReceivedMessages sender={message}/>
        })}
        {/* <div>
        {this.props.sender}

        </div> */}
        {/* { isImg ? <img src={this.props.receiver} /> : this.props.receiver } */}
        {/* { isImg2 ? <img src={this.props.sender} /> : <div>{this.props.sender}</div> } */}
      </div>
    );
  }
}

export default Messages;
