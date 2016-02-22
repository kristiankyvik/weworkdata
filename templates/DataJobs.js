import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router'
import routes from './config/routes';

class DataJobs extends React.Component {
  render() {
    return (
      <div>
        <Router>{routes}</Router>
      </div>
    )
  }
}

export default DataJobs
