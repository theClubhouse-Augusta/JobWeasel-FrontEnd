
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
        name:" Business Weasel, Esq.",
        title:"Head Weasel at Job Weasel",
        email:" businessWeasel@JobWeasel.com",
        location:" None,YA  ",
        availability:"Maybe",
        bio:" All I do is business, business, business, business, business, business, business, business, business, business, business, business, business, business, business, business, business, business, business,  business, business, business, business, business, business, business, business, business, business, business,  business, business, business, business, business, business, business, business, business, business, business, business, business, business, business, business, business... Is this working??"



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
          <div className= "profileFullOverlay">
          </div>
          <div className="updateProfileButton" onClick={this.handleUpdateProfile}>

            <header>Update Profile
            </header>

          </div>

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
              <b>Location:</b>{this.state.user.location}
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
