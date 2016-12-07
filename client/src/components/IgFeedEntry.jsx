import React from 'react';

class IgFeedEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedImage: false
    };
  }

  handleOnClickImage(e) {
    var img = e.target.style.backgroundImage.slice(5, -2);
    // this.setState({
    //   clickedImage: !this.state.clickedImage
    // });
    console.log('image tag', e.target.style.backgroundImage);
    console.log('after slice', img.length);
    this.props.handleImg(img, !this.state.clickedImage);

  }


  render() {
    var style = {
      backgroundImage: `url(${this.props.images})`
    };

    var cx = `item ${this.props.index}`;
    return (
          <li className={cx} style={style} onClick={this.handleOnClickImage.bind(this)}></li>
    );
  }
}

export default IgFeedEntry;
