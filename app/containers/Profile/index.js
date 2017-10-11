
/*
 *
 * Profile
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';

import './style.css';
import './styleM.css';

import UserProfile from "components/UserProfile";

export default class Profile extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      openUserProfile:false,
      user:JSON.parse(sessionStorage.getItem('user')),
      token:sessionStorage.getItem('token')
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
        <div className= "profileFullOverlay">
        </div>

          <div className="updateProfileButton" onClick={this.handleUpdateProfile}>

            <header>Update Profile
            </header>

          </div>

          <Link to="/AddJob" className="addJobButton">Add Job</Link>
          <Link to="/Jobs" className="viewJobsButton">View Jobs</Link>

        <section className="profileDisplay">


            <div className="profileImage">
              <img src={require("../../images/businessWeasel.jpg")} />
            </div>

            <div className="profileName">
              <p><b>Name:</b></p>
              <h1>{this.state.user.name}
              </h1>
            </div>

            <div className="profileTitle">
              <p><b>Title: </b>{this.state.user.title}
              </p>
            </div>

            <div className="profileEmail">
              <p><b>Email: </b>{this.state.user.email}
              </p>
            </div>

            <div className="profileLocation">
              <p><b>Location:</b>{this.state.user.location}</p>
              <b>Availability: </b>{this.state.user.availability}
            </div>

            <div className="profileBio">
              <p><b>Its All About Me: </b>{this.state.user.bio}
              </p>
            </div>


          </section>

          <section className="linksBox">
            <p><a href="https://www.resume.com">My Resume</a></p>
            <p><a href="https://www.portfolio.com">My Portfolio</a></p>
            <p><a href="https://www.linkedin.com">My LinkedIn</a></p>
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
