import React from 'react';
import classNames from 'classnames';

class Tag extends React.Component {
  constructor() {
    super();
    this.updateTags = this.updateTags.bind(this);
  }

  updateTags(data, event) {
    var tag = {value: data}
    this.props.updateTags(tag);
  }
  render() {
    return (<div className="Select-value">
              <span className="Select-value-icon" onClick={this.updateTags.bind(null, this.props.tagId)}>
                x
              </span>
              <span className="Select-value-label">
                {this.props.tagName}
              </span>
              </div>)
  }
}

export default Tag

