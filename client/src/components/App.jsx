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

  componentDidMount() {
    var name = prompt('What is your username?');
    this.setState({
      users: this.state.users.concat([name])
    });
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
