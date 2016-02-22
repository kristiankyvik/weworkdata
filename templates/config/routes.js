import React from 'react';
import App from '../components/App';
import JobBoard from '../components/JobBoard';
import PostJob from '../components/PostJob';

import {Route, IndexRoute} from 'react-router';

module.exports = (
  <Route name="app" path="/" component={App}>
    <IndexRoute component={JobBoard}/>
    <Route name="postjob" path="/postjob" component={PostJob}/>
  </Route>
);
