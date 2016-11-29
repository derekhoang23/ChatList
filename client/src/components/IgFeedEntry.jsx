import React from 'react';

class IgFeedEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img className='inner-flex' src={this.props.images} />
      </div>
    );
  }
}

export default IgFeedEntry;
