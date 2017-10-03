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
          <input type="text" className="search-field" placeholder="Search" value="search" />

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
>>>>>>> a7487428a812168935be89e734ecc56cf2720b3d
        </div>
      </div>
    );
  }
}

JobDetails.contextTypes = {
  router: React.PropTypes.object
};
