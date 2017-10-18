/**
*
* ShowJobApplicants
*
*/

import React from 'react';
import {Link} from 'react-router-dom';

import './style.css';
import './styleM.css';

export default class ShowJobApplicants extends React.PureComponent {
  constructor(props) {
      super(props);

      this.state = {
        applications: [],
        notification: ""
      };
  }

  componentWillMount() {
    this.getApplications(this.props.jobId);
  }

  getApplications = (id) => {
    let url = "http://localhost:8000/api/getApplications/" + id;
    let _this = this;

    fetch(url, {method: 'GET'}).then(
      function(response) {
        return response.json();
      }
    ).then(
      function(json) {
        if (!json.error) {
          _this.setState({
            applications: json.applications
          });
        }

        console.log(url);
        console.log(json.applications);
      }
    );
  }

  getNotification = (json) => {
    if (json.success) {
      this.setState({notification: json.success});
    }

    if (json.error) {
      this.setState({notification: json.error});
    }
  }

  handleReviewApplicant = (app, value) => {
    let url = "http://localhost:8000/api/reviewApplication";
    let _this = this;

    let data = new FormData;
    data.append('application_id', app.id);
    data.append('employer_approves', value);

    let token = sessionStorage.getItem("token");
    let auth = {"Authorization": "Bearer " + token};

    fetch(url, {method: 'POST', body: data, headers: auth})
      .then(function(response) {return response.json();})
      .then(function(json) {
        console.log(url);
        console.log(json);

        _this.getNotification(json);
        _this.getApplications(_this.props.jobId);
      }
    );
  }

  renderApplication = (app, index) => {
    let url = "/Profile/" + app.user_id;
    let buttons = "";
    let status = "";
    let message = "";
    let deal = "";

    if (app.applicant_reviewed === 0) {
      buttons = this.renderApplicationButtons(app);
    }

    else {
      if (app.employer_approves === 1) {message = "Approved";}
      if (app.employer_approves === 0) {message = "Rejected";}
      status = <div className="jobApplications label">{message}</div>;
    }

    if (app.employee_accepts ===1) {
      deal = <div className="jobApplications label">Employee has accepted your offer!</div>;
    }

    return (
      <div className="jobApplications panel" key={index}>

        <div className="jobApplications label">Applicant:</div>
        <div className="jobApplications value">
          <Link to={url}>{app.name}</Link>
        </div>

        {buttons}

        {status}
        {deal}

      </div>
    );
  }

  renderApplicationButtons = (app) => {
    return (
      <div className="applicationButtons">
        <input type="button" className="acceptApplicant button"
         value="Accept Applicant" onClick={() => this.handleReviewApplicant(app, 1)}/>
        <input type="button" className="rejectApplicant button"
         value="Reject Applicant" onClick={() => this.handleReviewApplicant(app, 0)}/>
      </div>
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
    let notification = "";

    if (this.state.notification !== "") {
      notification = this.renderNotification(this.state.notification);
    }

    return (
      <div className="jobApplications section">
        {notification}
        {this.state.applications.map(
          (app, index) => (this.renderApplication(app, index))
        )}

      </div>
    );
  }
}

ShowJobApplicants.contextTypes = {
  router: React.PropTypes.object
};
