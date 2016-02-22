import React from 'react';
import classNames from 'classnames';

class SideFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      activeJobTypes: []
    };
    this.updateJobTypes = this.updateJobTypes.bind(this);
  }

  updateJobTypes(id) {
    var activeJobTypes = this.state.activeJobTypes
    var index = activeJobTypes.indexOf(id);
    if (index < 0) {
      activeJobTypes.push(id);
      this.setState({activeJobTypes: activeJobTypes});
    } else {
      activeJobTypes.splice(index, 1);
      this.setState({activeJobTypes: activeJobTypes});
    }
    this.props.updateJobTypes(activeJobTypes);
  }

  render() {
    return (
      <div className="square side-filters">
        <h3> Browse Job Categories </h3>
        <div className="container no-padding grid">
          <div className="row top">
            <div className="six columns item">
              <GridButton
                updateJobTypes={this.updateJobTypes}
                id={0} pic="statistical-analysis"
                title="Statistical Analaysis"
              />
            </div>
            <div className="six columns item second">
              <GridButton
                updateJobTypes={this.updateJobTypes}
                id={1} pic="query-reporting"
                title="Query and Reporting"
              />
            </div>
          </div>
          <div className="row middle">
            <div className="six columns item">
              <GridButton
                updateJobTypes={this.updateJobTypes}
                id={2} pic="database-administration"
                title="Database Administration"
              />
            </div>
            <div className="six columns item second">
              <GridButton
                updateJobTypes={this.updateJobTypes}
                id={3}
                pic="warehouse-management"
                title="Warehouse Management"
              />
            </div>
          </div>
          <div className="row bottom">
            <div className="six columns item">
              <GridButton
                updateJobTypes={this.updateJobTypes}
                id={4} pic="data-integration"
                title="Data Integration"
              />
            </div>
            <div className="six columns item second">
              <GridButton
                updateJobTypes={this.updateJobTypes}
                id={5}
                pic="all-jobs"
                title="All The Other Jobs"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class GridButton extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: false
                };
    this.toggleGridButton = this.toggleGridButton.bind(this);
  }

  toggleGridButton(id, event) {
    this.props.updateJobTypes(id);
    this.setState({selected: !this.state.selected});
  }

  render() {
    var buttonClasses = classNames({
        "selected": this.state.selected
      });
    var color = this.state.selected ?  "-blue.png" : "-gray.png";
    return (
      <div className={buttonClasses} onClick={this.toggleGridButton.bind(null, this.props.id)}>
        <img className="gray" src={"/static/pics/" + this.props.pic + "-gray.png"}/>
        <img className="blue" src={"/static/pics/" + this.props.pic + "-blue.png"}/>
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}

export default SideFilter

