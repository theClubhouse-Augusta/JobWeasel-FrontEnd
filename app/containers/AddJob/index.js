/*
 *
 * AddJob
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class AddJob extends React.PureComponent {
  render() {
    return (
      <div className="addJobContainer">
        <Helmet title="AddJob" meta={[ { name: 'description', content: 'Description of AddJob' }]}/>


      </div>
    );
  }
}

AddJob.contextTypes = {
  router: React.PropTypes.object
};
