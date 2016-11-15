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
      show: false
    };
  }


  enterMessage(value) {
    this.setState({messages: this.state.messages.concat([value])});
  }

  clickUser() {
    this.setState({
      show: !this.state.show
    });
  }


  render() {
    var input = <Input/ >;

    return (
      <div>
          <Logout />
          <Friendslist click={this.clickUser.bind(this)}/>
          {this.state.show ? input : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
