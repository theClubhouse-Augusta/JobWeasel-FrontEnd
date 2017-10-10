import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';

import Home from 'containers/Home';
import Profile from 'containers/Profile';
import NotFound from 'containers/NotFound';
import AddJob from 'containers/AddJob';
import JobDetails from 'containers/JobDetails';
import Jobs from 'containers/Jobs';
import SignUp from 'containers/SignUp';
import Admin from 'containers/Admin';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/AddJob' component={AddJob}/>
      <Route path='/JobDetails/:id' component={JobDetails}/>
      <Route path='/Jobs' component={Jobs}/>
      <Route path='/Profile' component={Profile}/>
      <Route path='/SignUp' component={SignUp}/>
      <Route path='/Admin' component={Admin}/>
      <Route path='*' component={NotFound}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('app'));

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
