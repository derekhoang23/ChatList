import React from 'react';
import IgFeedEntry from './IgFeedEntry.jsx';

class IgFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/getPics', {
      mode: 'GET',
      credentials: 'include',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res =>
      res.json())
      .then(data => {
        this.setState({
          images: data.urls
        })
      })
      .catch(err => {
        console.log('did not receive feed from gram', err);
      });
  }

  prev() {
    var previousThree = this.state.images.splice(-3, 3);
    previousThree = previousThree.concat(this.state.images);
    this.setState({
      images: previousThree
    });
  }

  next() {
    var nextThree = this.state.images.splice(0, 3);
    this.setState({
      images: this.state.images.concat(nextThree)
    });
  }



  render() {
    return (
      <div className='Ig'>
        <button className='prev' onClick={this.prev.bind(this)} ></button>
        {/* <div className='stroller'> */}
          <ul className='items'>
            {this.state.images.map((image, i) =>
              <IgFeedEntry handleImg={this.props.handleImg} key={i} index={i} images={image} />
            )}
          </ul>
        {/* </div> */}
        <button className='next' onClick={this.next.bind(this)}></button>
      </div>
    );
  }
}

export default IgFeed;
