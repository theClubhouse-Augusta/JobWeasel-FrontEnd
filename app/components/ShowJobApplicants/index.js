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
        applications: []
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

  renderApplication = (app, index) => {
    let url = "/Profile/" + app.user_id;

    return (
      <div className="jobApplications panel" key={index}>
        <div className="jobApplications label">Applicant:</div>
        <div className="jobApplications value">
          <Link to={url}>{app.name}</Link>
        </div>

      </div>
    );
  }

  render() {
    return (
      <div className="jobApplications section">
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
