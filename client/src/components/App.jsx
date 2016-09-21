import React from 'react';
import ReactDOM from 'react-dom';
import Users from './Users.jsx';

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

  render() {
    return (
      <div>
        <div>
          <Users />
        </div>
        {this.state.users}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
