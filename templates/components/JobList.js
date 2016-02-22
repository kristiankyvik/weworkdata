import React from 'react';
import Job from '../components/Job';

class JobList extends React.Component {
  render() {
    var checkTagged = function(job_tags, selected_tags) {
      for (var i = 0; i < selected_tags.length; i++) {
        if (job_tags.indexOf(selected_tags[i]) <= -1) {
          return false;
        }
       }
      return true;
    }
    var rows = [];
    this.props.theJobs.forEach(function(job) {
      var text_to_search = (job.title + " " + job.location + " " + job.company).toLowerCase();
      if ((text_to_search.indexOf(this.props.filter.toLowerCase()) >= 0) && (checkTagged(job.tags, this.props.selectedTags)))  {
        if (this.props.jobTypes.length > 0) {
          if (this.props.jobTypes.indexOf(job.type) >= 0) {
            rows.push(<Job
                        tagDicc={this.props.tagDicc}
                        key={job.id} logo={job.logo}
                        title={job.title}
                        tags={job.tags}
                        company={job.company}
                        location={job.location}
                        url={job.url}
                        published={job.published}
                        premium={job.premium == 1 ? true : false}
                      />);
          }
        } else {
          rows.push(<Job
                      tagDicc={this.props.tagDicc}
                      key={job.id} logo={job.logo}
                      title={job.title}
                      tags={job.tags}
                      company={job.company}
                      location={job.location}
                      url={job.url}
                      published={job.published}
                      premium={job.premium == 1 ? true : false}
                    />);
        }
      }
    }.bind(this));

    var show;
    if (this.props.loading) {
      show = (<div className="loader">
                <img src="/static/pics/loading.gif"/>
              </div>);
    }
    else if (rows.length <= 0) {
      show = (<div>No result match your search</div>);
    } else {
      show = rows;
    }
    return (<div>{show}</div>);
  }
}

export default JobList
