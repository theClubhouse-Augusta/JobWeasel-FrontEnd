/*
 *
 * Jobs
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Jobs extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Jobs" meta={[ { name: 'description', content: 'Description of Jobs' }]}/>
        <div className="jobsList">
          <div className="jobTitle">
          </div>
          <div className="jobDesc">
          </div>
          <div className="jobBudget">
          </div>
          <div className="timeFrame">
          </div>
        </div>
      </div>
    );
  }
}

Jobs.contextTypes = {
  router: React.PropTypes.object
};
