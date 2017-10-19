/**
*
* ShowUserApplications
*
*/

import React from 'react';
import {Link} from 'react-router-dom';

import './style.css';
import './styleM.css';

export default class ShowUserApplications extends React.PureComponent {
  constructor(props) {
      super(props);

      this.state = {
        applications: [],
        notification: ""
      };
  }

  componentWillMount() {
    this.getApplications(this.props.userId);
  }

  getApplications = (id) => {
    let url = "http://localhost:8000/api/getUserApplications/" + id;
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

  handleAcceptOffer = (app) => {
    let url = "http://localhost:8000/api/acceptOffer";
    let _this = this;

    let data = new FormData;
    data.append('application_id', app.id);
    data.append('employee_accepts', 1);

    let token = sessionStorage.getItem("token");
    let auth = {"Authorization": "Bearer " + token};

    fetch(url, {method: 'POST', body: data, headers: auth})
      .then(function(response) {return response.json();})
      .then(function(json) {
        console.log(url);
        console.log(json);

        _this.getNotification(json);
        _this.getApplications(_this.props.userId);
      }
    );
  }

  renderApplication = (app, index) => {
    let url = "/JobDetails/" + app.job_id;
    let message = "";
    let accept = "";

    if (app.applicant_reviewed === 0) {
      message = "Pending Employer Review";
    }
    else {
      if (app.employer_approves === 1) {
        message = "Application Approved!";
        accept = <input type="button" value="Accept Offer"
                  className="acceptOffer button"
                  onClick={() => this.handleAcceptOffer(app)} />;
      }
      if (app.employer_approves === 0) {message = "Application Denied";}
    }

    if (app.employee_accepts === 1) {
      message = "You have accepted this job offer!";
      accept = "";
    }

    return (
      <div className="jobApplications panel" key={index}>
        <div className="jobApplications label">Job:</div>
        <div className="jobApplications panel">
          <Link to={url}>{app.name}</Link>
        </div>

        <div className="jobApplications">{message}</div>

        {accept}

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
      <div className="jobApplications">
        {notification}

        {this.state.applications.map(
          (app, index) => (this.renderApplication(app, index))
        )}

      </div>
    );
  }
}

ShowUserApplications.contextTypes = {
  router: React.PropTypes.object
};
