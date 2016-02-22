import React from 'react';
import jQuery from 'jquery';
import {Link} from 'react-router';
import SubscribeBox from '../components/SubscribeBox';
import JobList from '../components/JobList';
import TagBox from '../components/TagBox';
import Filter from '../components/Filter';
import SideFilter from '../components/SideFilter';

class JobBoard extends React.Component {
  constructor() {
    super();
    var self = this;
    this.state = {
                  loading: true,
                  data: [],
                  searchText: '',
                  tagDicc: {},
                  selectedTags: [],
                  board: true,
                  jobTypes: []
                };
    this.handleChange = this.handleChange.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.updateJobTypes = this.updateJobTypes.bind(this);
  }

  componentDidMount() {
    jQuery.get( "http://127.0.0.1:8000/jobs", function(data) {
      this.setState({
                      data: data.jobs,
                      tagDicc: data.tags,
                      loading: false
                    });
    }.bind(this));
  }

  handleChange(searchText) {
    this.setState({searchText: searchText});
  }
  updateTags(selectedTags) {
    this.setState({ selectedTags: selectedTags});
  }

  updateJobTypes(selectedJobTypes) {
    this.setState({ jobTypes: selectedJobTypes});
  }

  render(){
    return (
      <div>
        <div className="eight columns">
          <Filter
            onUserInput={this.handleChange}
            searchText={this.state.searchText}
            selectedTags={this.state.selectedTags}
            updateTags={this.updateTags}
            tagDicc={this.state.tagDicc}
          />
          <JobList
            loading={this.state.loading}
            selectedTags={this.state.selectedTags}
            theJobs={this.state.data}
            filter={this.state.searchText}
            tagDicc={this.state.tagDicc}
            jobTypes={this.state.jobTypes}
          />
        </div>
        <div className="four columns sidebar">
          <SideFilter  updateJobTypes={this.updateJobTypes} jobTypes={this.state.jobTypes}/>
          <div className="post-job square">
            <h3>Data Science talent is hard to find</h3>
            <p>Post your data job today. One easy step. Completely free.</p>
            <Link className="btn" to='postjob'>
              <i className="fa fa-paper-plane"></i>
              Post a Job
            </Link>
            <div className="small-info">for free</div>
          </div>
          <SubscribeBox/>
          <div className="jobfeeds square">
            <h3>Featuring Jobs From</h3>
             <div>
              <img src="/static/pics/so-logo.png"/>
             </div>
          </div>
        </div>
      </div>
    )
  }
}

export default JobBoard
