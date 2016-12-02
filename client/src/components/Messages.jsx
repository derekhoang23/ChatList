import React from 'react';
import ReactDOM from 'react-dom';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedImage: false,
      image: ''
    };
  }





  render() {
    var img = <img src={this.props.image} />;
    console.log('is htis img', this.props.image);
    return (
      <div className='messages'>
        {this.props.message}
        {/* {this.props.image !== null ? img : null} */}
        <img src={this.props.image} />;
      </div>
    );
  }
}

export default Messages;
