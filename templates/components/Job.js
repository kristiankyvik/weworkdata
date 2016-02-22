import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import Img from '../components/Img';
import ReactTooltip from 'react-tooltip';

class Job extends React.Component {
  constructor() {
    super();
    this.toggleExtraRow = this.toggleExtraRow.bind(this);
    this.state = { show: false };
  }

  toggleExtraRow(e) {
    this.setState({show: !this.state.show});
  }

  goToJobSite(e) {
    e.stopPropagation();
    window.open(this.props.url);
  }

  render() {
    var extraRowClasses = classNames({
        'job-row-extra': true,
        'show': this.state.show
        });

    var jobClasses = classNames({
        'featured': this.props.premium,
        'job': true
      });

    var getDaysSincePublished = function(day) {
      var days = moment().diff(moment(day), 'days');
      var diff;
      if (days == 0)
        diff = moment().diff(moment(day), 'hours').toString() + "h ago";
      else
        diff = days.toString() + "d ago";
      return diff;
    }

    var getTags = function(tag_dicc, tags) {
      if (tags.length == 0) {
        return  <div className="cell tag-cell">
                  <span className="no-tags"> No tags have been added to this job </span>
                </div>;
      } else {
        var ready_tags = [];
        tags.forEach(function(tag) {
          ready_tags.push( <span className="tag">{tag_dicc[tag]}</span>);
        }.bind(this));
        return (<div className="cell tag-cell">{ready_tags}</div>);
      }
    }

    return (
      <div className={jobClasses} key={this.props.id} onClick={this.toggleExtraRow}>
        <div className="job-row">
          <div className="logo-col job-col">
            <Img src={"https://logo.clearbit.com/" + this.props.logo + ".com"}/>
          </div>
          <div className="first-col job-col">
            <div className="title">
              {this.props.title}
            </div>
            <div className="company">
              {this.props.company}
            </div>
          </div>
          <div className="second-col job-col">
            <div className="tags">
            </div>
          </div>
          <div className="third-col job-col">
            <div className="location">
              <i className="fa fa-map-marker"></i>
              {this.props.location}
            </div>
            <div className="published">
              <span className="featured-tag">featured</span> {getDaysSincePublished(this.props.published)}
            </div>
          </div>
        </div>
        <div className={extraRowClasses}>
          {getTags(this.props.tagDicc, this.props.tags)}
          <div className="cell left-cell">
            <a
              data-tip="StackOverflow"
              className="btn"
              href={this.props.url}
              target="_blank"
              onClick={this.goToJobSite}
            >
              <i className="fa fa-bolt"></i>
              View Job
            </a>
            <ReactTooltip
              place="bottom"
              type="dark"
              effect="solid"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Job
