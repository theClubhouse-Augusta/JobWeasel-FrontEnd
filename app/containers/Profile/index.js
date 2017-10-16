
/*
 *
 * Profile
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import ShowProfile from 'components/ShowProfile';

import './style.css';
import './styleM.css';

import UserProfile from "components/UserProfile";
import EditUser from "components/EditUser";

export default class Profile extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
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
        _this.setState({
          user: json.user
        })

        //alert(_this.state.user.bio);
      }.bind(this)
    );
  }

  renderLeftPanel = (user) => {
    let login = JSON.parse(sessionStorage.getItem("user"));

    let role = login.role_id;
    let ownProfile = login.id == this.state.user.id;

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

  renderUpdateBox = (id) => {
    return (
      <div className="updateProfile">
        <EditUser userId={id} />
      </div>
    );
  }

  openUpdateProfilePanel = () => {
    let open = this.state.openUpdateProfile;

    this.setState({
      openUpdateProfile: !open
    });

    if(open) {
      this.child.getUser(this.props.match.params.id);
      //this.getUser(this.props.match.params.id);
    }
  }



  render() {
    let user = "";
    let leftPanel = "";
    let updatePanel = "";

    if (this.state.user !== "") {
      leftPanel = this.renderLeftPanel(this.state.user);
      user = <ShowProfile userId={this.state.user.id} ref={instance => { this.child = instance; }}/>;
    }

    return (
      <div className="profileContainer">
        <Helmet title="Profile" meta={[ { name: 'description', content: 'Description of Profile' }]}/>


          {leftPanel}
          {user}
          <EditUser userId={this.state.user.id} open={this.state.openUpdateProfile} onClose={this.openUpdateProfilePanel}/>
      </div>
      );
    }
}
Profile.contextTypes = {
  router: React.PropTypes.object
};
