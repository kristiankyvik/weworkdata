import React from 'react';

class Img extends React.Component {
  constructor() {
    super();
    var self = this;
    this.fixImages = this.fixImages.bind(this);
  }
  componentWillMount() {
    this.state = {source: this.props.src};
  }

  fixImages() {
    this.setState( { source: "/static/pics/logo-thumbnail-2.png" });
  }

  render() {
    return <img src={this.state.source} onError={this.fixImages}/>
  }
}

export default Img
