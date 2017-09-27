/*
 *
 * Profile
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Profile extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Profile" meta={[ { name: 'description', content: 'Description of Profile' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

Profile.contextTypes = {
  router: React.PropTypes.object
};
