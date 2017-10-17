
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

import ShowProfile from 'components/ShowProfile';
import EditUser from "components/EditUser";

export default class Profile extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      notification: "",
      openUpdateProfile: false,
      user: "",
    };
  }

  componentWillMount() {
    this.getUser(this.props.match.params.id);
  }

  getUser = (user_id) => {
    let url = "http://localhost:8000/api/showUser/" + user_id;
    let _this = this;

    fetch(url, {method: 'GET'}).then(
      function(response) {
        return response.json();
      }
    ).then(
      function(json) {
        if (!json.error) {
          _this.setState({
            user: json.user
          })
        }

        _this.getNotification(json);
        //alert(_this.state.user.bio);
      }.bind(this)
    );
  }

  getNotification = (json) => {
    if (json.error) {
      this.setState({notification: json.error});
    }

    if (json.success) {
      this.setState({notification: json.success});
    }

    this.forceUpdate();
  }

  renderLeftPanel = () => {
    let login = JSON.parse(sessionStorage.getItem("user"));
    let role = 0;
    let ownProfile = false;

    if (login) {
      role = login.role_id;
      ownProfile = login.id == this.state.user.id;
    }

    let editProfile = "";
    if (ownProfile) {
      editProfile = this.renderPanelButton("Update Profile", this.openUpdateProfilePanel)
    }

    let addJob = "";
    if (role == 1) {addJob = this.renderPanelLink("/AddJob", "Add Job")}

    let viewJobs = this.renderPanelLink("/Jobs", "View Jobs");

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

  openUpdateProfilePanel = () => {
    let open = this.state.openUpdateProfile;

    this.setState({
      openUpdateProfile: !open
    });

    if(open) {
      this.child.getUser(this.props.match.params.id);
      this.child.getLinks(this.props.match.params.id);
      this.child.getSkills(this.props.match.params.id);
    }
  }

  renderNotification = (text) => {
    return (
      <div className="jsonNotification">
        {text}
      </div>
    );
  }

  render() {
    let user = "";
    let edit = "";
    let leftPanel = "";
    let notification = "";

    if (this.state.user !== "") {
      leftPanel = this.renderLeftPanel();
      user = <ShowProfile userId={this.state.user.id} ref={instance => { this.child = instance; }}/>;
      edit = <EditUser userId={this.state.user.id} open={this.state.openUpdateProfile} onClose={this.openUpdateProfilePanel}/>;
    }

    if (this.state.notification !== "") {
      notification = this.renderNotification(this.state.notification);
    }

    return (
      <div className="profileContainer">
        <Helmet title="Profile" meta={[ { name: 'description', content: 'Description of Profile' }]}/>

          {leftPanel}
          {user}
          {edit}
          {notification}

      </div>
      );
    }
}
Profile.contextTypes = {
  router: React.PropTypes.object
};
