import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input.jsx';
import Messages from './Messages.jsx';
import Friendslist from './Friendslist.jsx';
import Logout from './Logout.jsx'
import IgFeed from './IgFeed.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      currentSelectedUser: '',
      currentUser: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/userInfo', {
      method: 'GET',
      credentials: 'include',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(user => {
      console.log('user', user);
      this.setState({
        currentUser: user.username
      });
    })
    .catch(err => {
      console.log('did not auth in', err);
    });
  }

  enterMessage(value) {
    this.setState({messages: this.state.messages.concat([value])});
  }

  clickUser() {
    this.setState({
      show: !this.state.show
    });
  }

  showClickedUsername(val) {
    this.setState({
      currentSelectedUser: val
    })
  }


  render() {
    var input = <Input currentUser={this.state.currentUser} user={this.state.currentSelectedUser} />;

    return (
      <div>
          <Logout />
          <Friendslist user={this.showClickedUsername.bind(this)} click={this.clickUser.bind(this)}/>
          {this.state.show ? input : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
