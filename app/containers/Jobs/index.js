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

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

Jobs.contextTypes = {
  router: React.PropTypes.object
};
