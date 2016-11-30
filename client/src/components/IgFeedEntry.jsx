import React from 'react';

class IgFeedEntry extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    var style = {
      backgroundImage: `url(${this.props.images})`
    };

    var cx = `item ${this.props.index}`;
    return (
          <li className={cx} style={style}></li>
    );
  }
}

export default IgFeedEntry;
