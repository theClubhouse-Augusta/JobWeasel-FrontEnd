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

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

JobDetails.contextTypes = {
  router: React.PropTypes.object
};
