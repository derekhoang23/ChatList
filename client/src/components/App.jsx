import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input.jsx';
import Messages from './Messages.jsx';
import Friendslist from './Friendslist.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/auth', {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then((res) =>
  //     res.json()
  //   )
  //   .then((data) => {
  //     console.log('data', data);
  //   })
  //   .catch(err => {
  //     console.log('err auth');
  //   });



  // }
  //
  enterMessage(value) {
    this.setState({messages: this.state.messages.concat([value])});
  }

  render() {
    return (
      <div>
        <div>
          <Friendslist />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
