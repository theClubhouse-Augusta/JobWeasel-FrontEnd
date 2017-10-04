
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
      openUserProfile:false,
      user:JSON.parse(sessionStorage.getItem('user'))
    }
  };

    handleUpdateProfile = () => {
      this.setState({
        openUserProfile: !this.state.openUserProfile
      })
    }

  render() {
    console.log(this.state.user.id);
    return (
      <div className="profileContainer">
        <Helmet title="Profile" meta={[ { name: 'description', content: 'Description of Profile' }]}/>
        <div className="updateProfileButton" onClick={this.handleUpdateProfile}>
          <header>Update Profile
          </header>
          <p>Email:{this.state.user.email}
          </p>
          <p>Name:{this.state.user.name}
          </p>
          <p>Description:{this.state.user.bio}
          </p>
          <p>Created:{this.state.user.created_at}
          </p>
          <p>Updated:{this.state.user.updated_at}
          </p>
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
