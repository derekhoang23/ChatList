import React from 'react';

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  logout() {
    fetch('http://localhost:3000/logout', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log('res', res)
        return res.json();
      })
      .then(data => {
        console.log('data', data);
        window.location.assign(data.url)
      })
      .catch(err => {
        console.log('error', err);
      })
  }

  render() {
    return (
      <button className='button' onClick={this.logout.bind(this)}>Log Out</button>
    );
  }
}

export default Logout;
