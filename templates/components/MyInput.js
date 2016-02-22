import React from 'react';
import classNames from 'classnames';

class MyInput extends React.Component {
  constructor() {
    super();
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      value: evt.target.value
    });
    this.props.updateModel(this.props.model, evt.target.value);
  }

  render() {
    var inputClasses = classNames({
      'showErrorMsg': !this.props.correct
    });
    return (
      <div className={inputClasses}>
        <div>
          <label>{this.props.label}</label>
          <span className="input-explanation"> {this.props.explanation}</span>
        </div>
        <input
          className="formInput"
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
        />
        <span className="validation">
          <i className="fa fa-exclamation-circle"></i>
          {this.props.validationMessage}
        </span>
      </div>
    )
  }
}

export default MyInput
