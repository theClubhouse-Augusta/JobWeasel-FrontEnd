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
      <div className="jobDetailsContainer">
        <Helmet title="JobDetails" meta={[ { name: 'description', content: 'Description of JobDetails' }]}/>
        <div className="detailContainer">


      </div>
      </div>
    );
  }
}

JobDetails.contextTypes = {
  router: React.PropTypes.object
};
