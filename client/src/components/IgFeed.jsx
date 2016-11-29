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

  render() {
    return (
      <div className='Ig'>
        {this.state.images.map(image =>
          <IgFeedEntry images={image} />
        )}
      </div>
    )
  }
}

export default IgFeed;
