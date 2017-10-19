/*
 *
 * JobDetails
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';

import './style.css';
import './styleM.css';
import '../../global.css';

import Nav from 'components/Nav';
import ShowJob from 'components/ShowJob';
import ShowJobApplicants from 'components/ShowJobApplicants';
import EditJob from 'components/EditJob';

export default class JobDetails extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      notification: "",
      openEditJob: false,
      job: ""
    }
  }

  componentWillMount() {
    this.getJob(this.props.match.params.id);
  }

  getJob = (id) => {
    let url = "http://localhost:8000/api/showJob/" + id;
    let _this = this;

    fetch(url, {method: 'GET'}).then(
      function(response) {
        return response.json();
      }
    ).then(
      function(json) {
        if (!json.error) {
          _this.setState({
            job: json.job
          });
        }

        _this.getNotification(json);
        console.log(url);
        console.log(json.job);
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

  handleSubmitApplication = () => {
    let url = "http://localhost:8000/api/submitApplication/";
    let _this = this;

    let data = new FormData;
    data.append('job_id', this.state.job.id);

    let token = sessionStorage.getItem("token");
    let auth = {"Authorization": "Bearer " + token};

    fetch(url, {method: 'POST', body: data, headers: auth})
    .then(
      function(response) {
        return response.json();
      }
    ).then(
      function(json) {
        _this.getNotification(json);

        console.log(url);
        console.log(json);
        setTimeout(function(){
          let user = JSON.parse(sessionStorage.getItem('user'));
          let url = '/Jobs';
          _this.context.router.history.push(url);
        }, 500)
      }.bind(this)
    );
  }

  openEditJobPanel = () => {
    let open = this.state.openEditJob;

    this.setState({
      openEditJob: !open
    });

    if(open) {
      this.child.getJob(this.props.match.params.id);
      this.child.getLinks(this.props.match.params.id);
    }
  }

  renderLeftPanel = () => {
    let login = JSON.parse(sessionStorage.getItem("user"));
    let role = 0;
    let ownJob = false;

    if (login) {
      role = login.role_id;
      ownJob = login.id == this.state.job.user_id;
    }

    let editJob = "";
    if (ownJob) {
      editJob = this.renderPanelButton("Edit Job", this.openEditJobPanel)
    }

    let apply = "";
    if (role == 2) {
      apply = this.renderPanelButton("Apply for Job", this.handleSubmitApplication)
    }

    let addJob = "";
    if (role == 1) {addJob = this.renderPanelLink("/AddJob", "Add Job")}

    let viewJobs = this.renderPanelLink("/Jobs", "View Jobs");

    let viewProfiles = this.renderPanelLink("/viewProfiles", "View Profiles");

    if (this.state.user !== "") {
      return (
        <div className="sidePanel">
          {editJob}
          {apply}
          {addJob}
          {viewJobs}
          {viewProfiles}
        </div>
      );
    }
    else {
      return (
        <div></div>
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

  renderNotification = (text) => {
    return (
      <div className="jsonNotification">
        {text}
      </div>
    );
  }

  render() {
    let leftPanel = "";
    let job = "";
    let applicants = "";
    let edit = "";
    let notification = "";

    if (this.state.job !== "") {
      leftPanel = this.renderLeftPanel();
      job = <ShowJob jobId={this.state.job.id}  ref={instance => { this.child = instance; }}/>;
      edit = <EditJob jobId={this.state.job.id}  open={this.state.openEditJob} onClose={this.openEditJobPanel}/>;

      let login = JSON.parse(sessionStorage.getItem("user"));
      if (login) {
        if (login.id == this.state.job.user_id) {
          applicants = <ShowJobApplicants jobId={this.state.job.id} />;
        }
      }
    }

    if (this.state.notification !== "") {
      notification = this.renderNotification(this.state.notification);
    }

    return (
      <div className="jobDetailsContainer">
        <Helmet title="JobDetails" meta={[ { name: 'description', content: 'Description of JobDetails' }]}/>

        {leftPanel}
        {job}
        {applicants}
        {edit}
        {notification}

      </div>
    );
  }
}

JobDetails.contextTypes = {
  router: React.PropTypes.object
};
