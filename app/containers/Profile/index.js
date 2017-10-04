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
  constructor (props) {
    super(props);
    this.state = {
      openUserProfile:false
    }
  };

    handleUpdateProfile = () => {
      this.setState({
        openUserProfile: !this.state.openUserProfile,

      })
    }

  render() {
    return (
      <div className="profileContainer">
        <Helmet title="Profile" meta={[ { name: 'description', content: 'Description of Profile' }]}/>
        <div className="updateProfileButton" onClick={this.handleUpdateProfile}>
          <header>Update Profile
          </header>
        </div>
        <UserProfile open={this.state.openUserProfile} onClose={this.handleUpdateProfile}>
          </UserProfile>
      </div>
    );
  }
}

Profile.contextTypes = {
  router: React.PropTypes.object
};
