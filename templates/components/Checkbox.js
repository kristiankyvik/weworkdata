import React from 'react';
import classNames from 'classnames';

class Checkbox extends React.Component {
  constructor() {
    super();
    this.state = {
                  checked: false,
                  expanded: true
                };
    this.handleClick = this.handleClick.bind(this);
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
  }

  handleClick(e) {
      this.setState({checked: e.target.checked});
      this.props.updateCheckBox(e.target.checked);
  }

  toggleMoreInfo() {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    var checkBoxClasses = classNames({"expanded": this.state.expanded});
    var more = (<div>
                  <i className="fa fa-plus-circle"></i>
                  Learn more
                </div>);
    var less = (<div>
                  <i className="fa fa-minus-circle"></i>
                  Show less
                </div>);
    var text = this.state.expanded? less : more;

    return (
      <div className={checkBoxClasses}>
        <div className="container no-padding">
          <div className="row">
            <div className="eight columns left">
              <label>
                <input
                  type="checkbox"
                  checked={this.state.checked || this.props.checked}
                  onChange={this.handleClick}
                />
                <span className="main-cta">
                  Feature my job posting
                  <span className="cost">
                    (20<i className="fa fa-eur"></i>)
                  </span>
                </span>
              </label>
            </div>
            <div className="four columns right">
              <span className="small-important-info" onClick={this.toggleMoreInfo}>
                {text}
              </span>
            </div>
            <div className="twelve columns extra-info">
              <ul>
                <li>
                  Make you posting <span className="bold">stick to the top</span> of the job board for <span className="bold">three weeks</span>
                </li>
                <li>
                  <span className="bold">Highlight</span> the job posting and making it <span className="bold">more eye-catching</span>
                </li>
                <li>
                  Make the job posting appear at the top of the board, <span className="bold">even when searching or filtering</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkbox

