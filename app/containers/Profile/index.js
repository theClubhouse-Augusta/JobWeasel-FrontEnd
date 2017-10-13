
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
      openUserProfile: false,
      user: "",
      token:sessionStorage.getItem('token'),
      links: ""
    }
  };

    handleUpdateProfile = () => {
      this.setState({
        openUserProfile: !this.state.openUserProfile
      })
    }

  componentWillMount() {
    let user_id = this.props.match.params.id;
    let url = "http://localhost:8000/api/showUser/" + user_id;
    let _this = this;

    fetch(url, {method: 'GET'}).then(
      function(response) {
        return response.json();
      }
    ).then(
      function(json) {
        _this.setState({
          user: json.user
        })
      }.bind(this)
    );

    url = "http://localhost:8000/api/getUserSkills/" + user_id;
    fetch(url, {method: 'GET'}).then(
      function(response) {
        return response.json();
      }
    ).then(
      function(json) {
        _this.setState({
          links: json.links
        })
      }
    );
  }

  renderUpdateBox = () => {
    if(this.state.user !== "") {
      return(
        <UserProfile open={this.state.openUserProfile} onClose={this.handleUpdateProfile} user={this.state.user}>
        </UserProfile>
      )
    }
  }
  renderProfile = (user) => {
    let photoUrl = user.photo;
    if (!photoUrl) {photoUrl = require("../../images/businessWeasel.jpg")}

    let availability = user.availability;
    if (availability == 1) {availability = "Ok"}
    if (availability == 2) {availability = "Busy"}

    let phoneField = "";
    if (user.phone != 0) {phoneField = this.renderProfileField("Phone", user.phone)}

    if (this.state.user !== "") {
      return (
        <div className="profileDisplay">
          {this.renderProfilePhoto(photoUrl)}

          <div className="profileName">
            {user.name}
          </div>

          {this.renderProfileField("Email", user.email)}
          {this.renderProfileField("Location", user.location)}
          {phoneField}
          {this.renderProfileField("Availability", availability)}
          <div className="profileBio">
            <p>
            {user.bio}
            </p>
          </div>
        </div>
      );
    }
  }

  renderProfilePhoto = (url) => {
    // alert(url);
    return (
      <img className="profilePhoto" src={url} />
    );
  }

  renderProfileField = (name, value) => {
    return (
      <div className="profileField">
        <span className="profileLabel">{name}:</span>
        <span className="profileValue">{value}</span>
      </div>
    );
  }

  renderLeftPanel = (user) => {
    let role = user.role_id;
    let user_id = user.id;
    let ownProfile = user_id == this.state.user.id;

    let editProfile = "";
    if (ownProfile) {editProfile = this.renderPanelButton(
      "Update Profile", this.handleUpdateProfile
    )}

    let addJob = "";
    if (role == 1) {addJob = this.renderPanelLink("/AddJob", "Add Job")}

    let viewJobs = "";
    if (role == 2) {viewJobs = this.renderPanelLink("/Jobs", "View Jobs")}

    let viewProfiles = this.renderPanelLink("/viewProfiles", "View Profiles");

    if (this.state.user !== "") {
      return (
        <div className="sidePanel">
          {editProfile}
          {addJob}
          {viewJobs}
          {viewProfiles}
        </div>
      );
    }
  }

  renderRightPanel = (user) => {
    return (
      <div className="sidePanel">
      </div>
    );
  }

  renderPanelButton = (text, clickFunc) => {
    return (
      <span className="sideButton" onClick={clickFunc}>
        {text}
      </span>
    );
  }
  renderPanelLink = (url, text) => {
    return (
      <Link to={url} className="sideButton">{text}</Link>
    );
  }
  renderProfileLink = (url, text) => {
    return (
      <a href={url} className="sideButton">{text}</a>
    );
  }
  render() {
    return (
      <div className="profileContainer">
        <Helmet title="Profile" meta={[ { name: 'description', content: 'Description of Profile' }]}/>
          <div className= "profileFullOverlay">
          </div>
          {this.renderLeftPanel(JSON.parse(sessionStorage.getItem("user")))}
          {this.renderProfile(this.state.user)}
          {this.renderRightPanel(this.state.user)}
          {this.renderUpdateBox()}
        </div>
      );
    }
}
Profile.contextTypes = {
  router: React.PropTypes.object
};
