import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import Tag from '../components/Tag';

class Filter extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  handleChange() {
    this.props.onUserInput(this.refs.searchInput.value);
  }

  clearFilter() {
    this.props.updateTags([]);
  }

  updateTags(val) {
    var current_tags = this.props.selectedTags;
    if (current_tags.indexOf(val.value) <= -1) {
      current_tags.push(val.value);
    } else {
      var index = current_tags.indexOf(val.value);
      current_tags.splice(index, 1);
    }
    this.props.updateTags(current_tags);
  }

  render() {
    var tags = [];
    var dicc = this.props.tagDicc;
    for (var k in dicc){
        if (dicc.hasOwnProperty(k) && (this.props.selectedTags.indexOf(parseInt(k)) <= -1)) {
          var tag = dicc[k];
          var option = {
            value: parseInt(k),
            label: tag
          };
          tags.push(option);
        }
    }
    var selected_tags = [];
    this.props.selectedTags.forEach(function(tag) {
      selected_tags.push(
        <Tag
          key={tag}
          tagName={dicc[tag]}
          tagId={tag}
          updateTags={this.updateTags}
        />
      );
    }.bind(this));
    var tagged = selected_tags.length > 0;
    var taggerClasses = classNames({
        'tags': true,
        'active-tags': tagged
      });
    var filterClasses = classNames({
        'clearable': tagged,
        'active-filters': true,
        'Select--multi': true
        });

    var text;
    switch(selected_tags.length) {
      case 0:
        text =  "Add tags";
        break;
      case 1:
        text = "1 tag selected";
        break;
      default:
        text = selected_tags.length + " tags selected";
    }
    tags.push({
                value: "0",
                label: text
              });
    return (
      <div className="container no-padding">
        <div className="row filter">
          <div className="eight columns">
            <div className='search'>
              <input
                className="filterInput"
                type="text"
                placeholder="Filter out Jobs, Companies or Locations..."
                value={this.props.searchText}
                ref="searchInput"
                onChange={this.handleChange}/>
            </div>
          </div>
          <div className="four columns">
            <div className={taggerClasses}>
              <Select
                className="tag-select"
                name="form-field-name"
                value="0"
                options={tags}
                onChange={this.updateTags}
                />
            </div>
          </div>
        </div>
        <div className="active-filters Select--multi" className={filterClasses}>
          {selected_tags}
          <span className="clear-filter" onClick={this.clearFilter}>
            clear x
          </span>
        </div>
      </div>
    )
  }
}

export default Filter

