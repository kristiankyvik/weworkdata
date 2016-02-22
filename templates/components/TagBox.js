import React from 'react';
import classNames from 'classnames';

class TagBox extends React.Component {
  constructor() {
    super();
    this.state = {
                  showing: false
                };
    this.showFilter = this.showFilter.bind(this);
    this.updateTags = this.updateTags.bind(this);
  }

  showFilter() {
    var currentState = this.state.showing;
    this.setState({showing: !currentState});
  }

  updateTags(val) {
    var tags = [];
    val.forEach(function(tag) {
      tags.push(tag.value);
    });
    this.props.updateTags(tags);
  }

  render() {
    var tagBoxClasses = classNames({
        'tags': true,
        'showFilter': this.state.showing
        });
    var tags = [];
    var dicc = this.props.tagDicc;
    for (var k in dicc){
        if (dicc.hasOwnProperty(k)) {
          var tag = dicc[k];
          var option = {
            value: parseInt(k),
            label: tag
          };
          tags.push(option);
        }
    }
    return (<div className={tagBoxClasses}>
              <Select
                    className="tag-select"
                    name="form-field-name"
                    value={this.props.selectedTags}
                    options={tags}
                    onChange={this.updateTags}
                    multi={true}
                    placeholder="Add tools/framework tags..."
                />
                <span className="small-important-info" onClick={this.showFilter}>
                </span>
            </div>);
  }
}

export default TagBox

