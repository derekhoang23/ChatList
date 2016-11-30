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

  }

  next() {

  }



  render() {
    return (
      <div className='Ig'>
        <button className='prev' onClick={this.prev.bind(this)} ></button>
        {/* <div className='stroller'> */}
          <ul className='items'>
            {this.state.images.map((image, i) =>
              <IgFeedEntry key={i} index={i} images={image} />
            )}
          </ul>
        {/* </div> */}
        <button className='next' onClick={this.next.bind(this)}></button>
      </div>
    );
  }
}

export default IgFeed;
