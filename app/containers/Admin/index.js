/*
 *
 * Admin
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Admin extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Admin" meta={[ { name: 'description', content: 'Description of Admin' }]}/>
        <div className="adminFullOverlay">
        </div>
        <div className="recruiterReview">
          <header>Recruiters to Review:</header>
        </div>

        <div className="profileReview">
          <header>Profiles to Review:</header>
        </div>

        <div className="changeRecruitersStatus">
          <header>Accepted Recruiters:</header>
          (Click the recruiter to change the review approved status)
        </div>

        <div className="changeProfileStatus">
          <header>Accepted Profiles:</header>
          (Click the profile to change review approved status)
        </div>
      </div>
    );
  }
}

Admin.contextTypes = {
  router: React.PropTypes.object
};
