import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input.jsx';
import Messages from './Messages.jsx';
import Friendslist from './Friendslist.jsx';
import Logout from './Logout.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
  }


  enterMessage(value) {
    this.setState({messages: this.state.messages.concat([value])});
  }

  render() {
    return (
      <div>
        <div>
          <Friendslist />
        </div>
        <div>
          <Logout />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
