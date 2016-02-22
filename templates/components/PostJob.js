import React from 'react';
import jQuery from 'jquery';
import moment from 'moment';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';
import { History, Link } from 'react-router';
import SubscribeBox from '../components/SubscribeBox';
import Checkbox from '../components/Checkbox';
import MyInput from '../components/MyInput';
import StripeButton from '../components/StripeButton';
import reactMixin from 'react-mixin';
import {ReactScriptLoaderMixin} from 'react-script-loader';

class PostJob extends React.Component {
  constructor() {
    super();
    var self = this;
    this.state = {
                  tagDicc: {},
                };
  }

  componentDidMount() {
    jQuery.get( "http://127.0.0.1:8000/jobs", function(data) {
      this.setState({ tagDicc: data.tags });
    }.bind(this));
  }

  render() {
    return (
      <div className="submit-job">
        <div className="eight columns">
          <Form tagDicc={this.state.tagDicc} />
        </div>
        <div className="four columns sidebar">
          <SubscribeBox/>
          <div className="jobfeeds square">
            <h3>Featuring Jobs From</h3>
             <div>
              <img src="/static/pics/so-logo.png"/>
              <img src="/static/pics/indeed-logo.png"/>
             </div>
          </div>
        </div>
      </div>
    )
  }
}

class Form extends React.Component {
  static contextTypes= {
    history: React.PropTypes.object,
    location: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {  posted: false,
                    upgrade: false,
                    company: "",
                    jobtitle: "",
                    location: "",
                    requirement: -1,
                    type: -1,
                    url: "",
                    tags: [],
                    dirty: false,
                    validations: {
                      company: false,
                      jobtitle: false,
                      location: false,
                      requirement: false,
                      type: false,
                      url: false,
                      tags: false
                    }
                  };
    this.updateModel = this.updateModel.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.updateCheckBox = this.updateCheckBox.bind(this);
    this.updateRequirement = this.updateRequirement.bind(this);
    this.updateType = this.updateType.bind(this);
  }

  updateModel(model, value) {
    switch(model) {
      case 'company':
        this.setState({company: value});
        break;
      case 'jobtitle':
        this.setState({jobtitle: value});
        break;
      case 'location':
        this.setState({location: value});
        break;
      case 'url':
        this.setState({url: value});
        break;
      default:
        this.setState({tags: value});
    }
  }

  updateTags(val) {
    this.setState({tags: val});
  }

  updateRequirement(val) {
    this.setState({requirement: val.value});
  }

  updateType(val) {
    this.setState({type: val.value});
  }

  updateCheckBox(val) {
    this.setState({upgrade: val});
  }

  submitForm() {
    var that = this;

    // Close Checkout on page navigation
    jQuery(window).on('popstate', function() {
      handler.close();
    });

    var that = that;
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    var hist = this.context.history;
    this.setState({dirty: true});
    if ((this.state.company.length <= 0) || this.state.jobtitle.length <= 0 || (this.state.location.length <= 0) || (this.state.requirement == -1) || (this.state.location.type == -1) || (!this.state.url.match(regex))){
      this.setState({
        validations: {
          company: this.state.company.length > 0 ? true : false,
          jobtitle: this.state.jobtitle.length > 0 ? true : false,
          location: this.state.location.length > 0 ? true : false,
          requirement: this.state.requirement > -1 ? true : false,
          type: this.state.type > -1 ? true : false,
          url: this.state.url.match(regex) ? true : false
        }
      });
    } else {
      this.setState({
        validations: { company: true, jobtitle: true, location: true, requirement: true, type: true, url: true } });
      var jobData = {
        company: this.state.company,
        title: this.state.jobtitle,
        location: this.state.location,
        requirement: this.state.requirement,
        type: this.state.type,
        url: this.state.url,
        tags: this.state.tags,
        published: moment(),
        premium: 0
      };

      if (this.state.upgrade) {
        jobData['premium'] = 1;
        var handler = StripeCheckout.configure({
          key: 'pk_test_vPdZ6gYcL8KBa2JQxv5erZGo',
          image: '/static/pics/logo-blue.png',
          locale: 'auto',
          description: 'Premium Job Listing',

          token: function(token) {
            var data = {
              stripeData: token,
              jobData: jobData
             };
            jQuery.ajax({
              type : "POST",
              url :  "http://127.0.0.1:8000/charge",
              data: JSON.stringify(data, null, '\t'),
              contentType: 'application/json;charset=UTF-8',
              success: function(res) {
                console.log(res.msg);
                if (res.status == 202) {
                  that.setState({posted: true});
                  window.scrollTo(0,0);
                }
              }
            });
          }
        });
        handler.open({
          name: 'WeWorkData',
          description: 'Premium Job Listing',
          currency: "eur",
          amount: 1000
        });
      } else {
        jQuery.ajax({
          type : "POST",
          url :  "http://127.0.0.1:8000/submitJob",
          data: JSON.stringify(jobData, null, '\t'),
          contentType: 'application/json;charset=UTF-8',
          success: function(result) {
            console.log(result);
            that.setState({posted: true});
            window.scrollTo(0,0);
          }
        });
      }
    }
  }
  render() {
    var formClasses = classNames({
      'dirty': this.state.dirty,
      'form' : true,
      'requirementWrong':  this.state.dirty && !this.state.validations.requirement,
      'typeWrong': this.state.dirty && !this.state.validations.type
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
    var backgrounds = [
                      {value: 0, label: "Phd"},
                      {value: 1, label: "Msc"},
                      {value: 2, label: "Bsc"}
                    ];
    var types = [
                  {value: 0, label: "Statistical Analysis"},
                  {value: 1, label: "Query and Reporting"},
                  {value: 2, label: "Database Administration"},
                  {value: 3, label: "Data Warehouse Management"},
                  {value: 4, label: "Data Integration"}
                ];
    var formHTML = (<div className={formClasses}>
                      <div>
                        <h1>Please submit your details below</h1>
                        <div className="subtitle">
                          Get your job posting up and running in no time
                        </div>
                        <div className="instructions container">
                          <div className="row">
                            <div className="four columns">
                              <div className="step">
                                <div className="icon">
                                  <img src="/static/pics/laptop.png"/>
                                </div>
                                <span className="number">
                                  01
                                </span>
                                <span className="text">
                                  You fill in the form
                                </span>
                              </div>
                            </div>
                            <div className="four columns">
                              <div className="step">
                                <div className="icon">
                                  <img src="/static/pics/clock.png"/>
                                </div>
                                <span className="number">
                                  02
                                </span>
                                <span className="text">
                                  We review the info
                                </span>
                              </div>
                            </div>
                            <div className="four columns">
                              <div className="step">
                                <div className="icon">
                                  <img src="/static/pics/joblist.png"/>
                                </div>
                                <span className="number">
                                  03
                                </span>
                                <span className="text">
                                  The job goes live!
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <MyInput
                          updateModel={this.updateModel}
                          model={'company'}
                          placeholder='e.g. WeWorkData Inc.'
                          correct={this.state.validations.company}
                          validationMessage="Company name is required"
                          label="Company"
                        />
                      </div>
                      <div>
                        <MyInput
                          updateModel={this.updateModel}
                          model={"jobtitle"}
                          placeholder='e.g. Senior Data Scientist'
                          correct={this.state.validations.jobtitle}
                          validationMessage="Job Title is required"
                          label="Job Title"
                          explanation="Please try to be as specific as possible"
                        />
                      </div>
                      <div>
                        <MyInput
                          updateModel={this.updateModel}
                          model={"location"}
                          placeholder='e.g. Barcelona, Spain'
                          correct={this.state.validations.location}
                          validationMessage="Location is required"
                          label="Job Location"
                          explanation="If remote then leave empty"
                        />
                      </div>
                      <div className="requirement">
                        <label>Minimal Educational Credentials</label>
                        <span className="input-explanation"> What background are you looking for in the candidate</span>
                        <Select
                          placeholder="Msc, Phd, BSc"
                          name="requirement"
                          value={this.state.requirement}
                          options={backgrounds}
                          onChange={this.updateRequirement}
                          searchable={false}
                          clearable={false}
                        />
                        <span className="validation">
                          <i className="fa fa-exclamation-circle"></i>
                          This field is required
                        </span>
                      </div>
                      <div className="type">
                        <label>What is the job going to do with data?</label>
                        <span className="input-explanation"> Please try to select the most relevant option</span>
                        <Select
                          placeholder="Please select option that best describes tasks"
                          name="requirement"
                          value={this.state.type}
                          options={types}
                          onChange={this.updateType}
                          searchable={false}
                          clearable={false}
                        />
                        <span className="validation">
                          <i className="fa fa-exclamation-circle"></i>
                          This field is required
                        </span>
                      </div>
                      <div>
                        <MyInput
                          updateModel={this.updateModel}
                          model={"url"}
                          placeholder='e.g. https://www.example.com/jobs/32432432'
                          correct={this.state.validations.url}
                          validationMessage="URL must be a valid URL"
                          label="Job URL"
                          explanation="Link to the application form or jobs website"
                        />
                      </div>
                      <div>
                        <label>Add Tags</label>
                        <span className="input-explanation">
                          Please add technologies or frameworks the position requires knowledge of
                        </span>
                        <Select
                          name="tags"
                          value={this.state.tags}
                          options={tags}
                          onChange={this.updateTags}
                          multi={true}
                        />
                      </div>
                        <div className="upgrade">
                          <Checkbox updateCheckBox={this.updateCheckBox}/>
                        </div>
                      <div>
                      <button onClick={this.submitForm}>
                        <i className="fa fa-paper-plane"></i> Post Job
                        </button>
                      </div>
                    </div>
                  );

    var postedHTML = (<div className="succes-msg">
                        <h1>Congratulations!</h1>
                        <div className="job-title">
                          <div className="bold">
                            {this.state.jobtitle}
                          </div>
                          <div className="subtitle">
                             has been added to our database!
                          </div>
                          <Link className="btn" to='/'>
                            Take me to the Job Board
                          </Link>
                        </div>
                      </div>
                      );

    var renderHTML = this.state.posted ? postedHTML : formHTML;

    return (
      <div>
        {renderHTML}
      </div>
    )
  }
}

export default PostJob
