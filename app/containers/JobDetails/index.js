/*
 *
 * JobDetails
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class JobDetails extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="JobDetails" meta={[ { name: 'description', content: 'Description of JobDetails' }]}/>
        <div className="detailContainer">
          <div className="jobTitle">
          </div>
          <div className="jobDesc">
          </div>
          <div className="workers">
          </div>
          <div className="budget">
          </div>
          <div className="startDate">
          </div>
          <div className="timeFrame">
          </div>
          <div className="jobStatus">
          </div>
          <div className="detailsCreated">
          </div>
          <div className="detailsUpdated">
          </div>
        </div>
      </div>
    );
  }
}

JobDetails.contextTypes = {
  router: React.PropTypes.object
};
