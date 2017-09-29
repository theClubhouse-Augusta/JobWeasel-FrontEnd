/*
 *
 * Profile
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

import UserProfile from "components/UserProfile";

export default class Profile extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Profile" meta={[ { name: 'description', content: 'Description of Profile' }]}/>

        <UserProfile/>
      </div>
    );
  }
}

Profile.contextTypes = {
  router: React.PropTypes.object
};
