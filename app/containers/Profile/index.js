
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
      // user:JSON.parse(sessionStorage.getItem('user'))

      user:{
        name:" Business Weasel",
        email:" businessWeasel@JobWeasel.com",
        location:" None, YA",
        bio:" All I do is business, business, business, business, business, business, business, business, business, business, business, business, business, business, business, business, business, business, business,  business, business, business, business, business, business, business, business, business, business, business,  business, business, business, business, business, business, business, business, business, business, business, business, business, business, business, business, business... Is this working??",


      }
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

        <section className="profileDisplay">

          <div className="profileName">
            <p>Name:</p>
            <h1>{this.state.user.name}
            </h1>
          </div>

          <div className="profileEmail">
            <p>Email:{this.state.user.email}
            </p>
          </div>

          <div className="profileLocation">
            <p>Location:{this.state.user.location}
            </p>
          </div>

          <div className="profileBio">
            <p>Description:{this.state.user.bio}
            </p>
          </div>

        </section>

        <section className="linksBox">
          <p><a href="https://www.resume.com">My Resume</a></p>
          <p><a href="https://www.portfolio.com">My Portfolio or Website</a></p>
          <p><a href="https://www.linkedin.com">My LinkedIn or Social Media</a></p>
          <p><a href="https://www.github.com">My Github</a></p>
        </section>

        <UserProfile open={this.state.openUserProfile} onClose={this.handleUpdateProfile}>
        </UserProfile>

      </div>
    );
  }
}

Profile.contextTypes = {
  router: React.PropTypes.object
};
