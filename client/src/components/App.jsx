import React from 'react';
import ReactDOM from 'react-dom';
import Users from './Users.jsx';
import Input from './Input.jsx';
import Messages from './Messages.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages: []
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
          {this.state.messages.map((message, i) =>
            <Messages key={i} message={message}/>
          )}
        </div>
        <div>
          <Input enter={this.enterMessage.bind(this)}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
