/*
 *
 * ProfileUpdate
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class ProfileUpdate extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="ProfileUpdate" meta={[ { name: 'description', content: 'Description of ProfileUpdate' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

ProfileUpdate.contextTypes = {
  router: React.PropTypes.object
};
