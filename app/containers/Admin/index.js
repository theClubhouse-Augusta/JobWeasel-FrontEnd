/*
 *
 * Admin
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Admin extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      users: {data: {}}
    };

  }

  getUsers = () => {
    let url = "http://localhost:8000/api/getUsers";
    let _this = this;

    fetch(url, {'method': 'GET'}).then(
      function(response) {
        return response.json();
      }).then(
      function(json) {
        if (json.users) {
          _this.setState({
            users: json.users
          });
        }

        console.log('Users Data:');
        console.log(json);
      }
    );
  }

  getPendingReviews = () => {
    let users = Object.values(this.state.users.data);
    return users.filter(function(u) {
      return u.reviewed === 0;
    });
  }

  getFinishedReviews = () => {
    let users = Object.values(this.state.users.data);
    return users.filter(function(u) {
      console.log(u.reviewed);
      return (u.reviewed === 1) && (u.approved === 1);
    });
  }

  renderUser = (user, index) => {
    let role = ""
    if (user.role_id === 1) {role = "Employer"}
    if (user.role_id === 2) {role = "Job Seeker"}

    return (
      <div className="userRow" key={index}>
        <div className="userInfo">
          {user.name} <span className="roleLabel"> {role} </span>
        </div>

        {this.renderApprovalPanel(user)}
      </div>
    );
  }

  renderApprovalPanel = (user) => {
    let reviewed = user.reviewed === 1;

    if (reviewed) {
      return (
        <div className="approvalPanel">
          <span className="approvalButton" onClick={() => this.changeUserApproval(user, 0)}>
            Revoke Approval
          </span>
        </div>
      )
    }
    else {
      return (
        <div className="approvalPanel">
          <span className="approvalButton" onClick={() => this.changeUserApproval(user, 1)}>
            Approve
          </span>

          <span className="approvalButton" onClick={() => this.changeUserApproval(user, 0)}>
            Reject
          </span>
        </div>
      )
    }
  }

  changeUserApproval = (user, status) => {
    console.log(user);
    let url = "http://localhost:8000/api/reviewUser";
    let _this = this;

    let data = new FormData();
    data.append('user_id', user.id);
    data.append('approved', status);

    let auth = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    };

    fetch(url, {
       method: 'POST',
       body: data,
       headers: auth
    }).then(
      function(response) {
        return response.json();
      }).then(
      function(json) {

        // if (json.error) {
        //   alert(json.error);
        // }
        if (json.success) {
          _this.getUsers();
          // alert(json.success);
        }

        console.log('Approval Data:');
        console.log(json);
      }
    );
  }

  componentWillMount() {
    this.getUsers();
  }

  render() {
    let pending = this.getPendingReviews();
    let reviewed = this.getFinishedReviews();

    return (
      <div className="adminContainer">
        <Helmet title="Admin" meta={[ { name: 'description', content: 'Description of Admin' }]}/>
        {/*<div className="adminFullOverlay">
        </div>*/}

        <div className="usersPanel_pending">
          <h4>Profiles to Review:</h4>
          {pending.map((user, index) => (this.renderUser(user, index)))}
        </div>

        <div className="usersPanel_approved">
          <h4>Approved Profiles:</h4>
          {reviewed.map((user, index) => (this.renderUser(user, index)))}
        </div>

      </div>
    );
  }
}

Admin.contextTypes = {
  router: React.PropTypes.object
};
