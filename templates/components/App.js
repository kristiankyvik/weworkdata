import React from 'react';
import {Link} from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="nav">
          <div className="container nav-container">
            <div className="left">
              <div className="brand">
                <Link className="logo-link" to='/'>
                  <img src="/static/pics/logo-blue.png" alt=""/>WeWork
                    <span>
                      Data
                    </span>
                    <span className="beta">
                      beta@
                    </span>
                </Link>
              </div>
            </div>
            <div className="options">
              <ul className="list">
                <li>
                  <Link className="nav-link active" to='/'>
                    Job Board
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to='postjob'>
                    Post Job
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container main-container">
          <div className="row">
            {this.props.children}
          </div>
        </div>
        <div className="footer">
          <div className="container main-container">
            <div className="row">
              <div className="six columns">
                <div className="menu">
                  <ul className="list">
                    <li>Job Board</li>
                    <li>About</li>
                  </ul>
                </div>
              </div>
              <div className="six columns">
                <div className="legal">
                  © 2016 WeWorkData / Made by Kristian Kyvik
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
