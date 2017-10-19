/**
*
* ShowJob
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class ShowJob extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      job: {},
      links: []
    }
  }

  componentWillMount() {
    this.getJob(this.props.jobId);
    this.getLinks(this.props.jobId);
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
        _this.setState({
          job: json.job
        });
        console.log("showJob");
        console.log(json.job);
      }.bind(this)
    );
  }

  getLinks = (id) => {
    let url = "http://localhost:8000/api/getJobLinks/" + id;
    let _this = this;

    fetch(url, {method: 'GET'}).then(
      function(response) {
        return response.json();
      }
    ).then(
      function(json) {
        _this.setState({
          links: json.links
        });

        console.log(url);
        console.log(json.links);
      }.bind(this)
    );
  }

  renderJob = (job) => {
    return (
      <div className="jobSection">
        {this.renderField("Job Title", job.name)}
        {this.renderField("Location", job.location)}
        {this.renderField("Description", job.description)}
        {this.renderField("Budget", job.budget)}
        {this.renderField("Workers Needed", job.workers_needed)}
        {this.renderField("Start Date", job.start_date)}
        {this.renderField("Time Frame", job.time_frame)}
        {this.renderField("Posted on", job.created_at)}
      </div>
    );
  }

  renderField = (name, value) => {
    return (
      <div className="jobField panel">

        <div className="jobField label">{name}:</div>

        <div className="jobField value">
          {value}
        </div>

      </div>
    );
  }

  renderLinks = () => {
    return (
      <div className="jobSectionLinksSection">
        <div className="links panel">
          <div className="links label">Links:</div>

          <div className="links value">
            {this.state.links.map((link, index) => (
              <div className="userLink" key={index}>
                <a href={link.url}>{link.text}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    let job = "";
    let links = "";

    if (this.state.job !== {}) {
      job = this.renderJob(this.state.job);
    }

    if (this.state.links !== []) {
      links = this.renderLinks();
    }

    return (
      <div className="job">

        {job}
        {links}
      </div>
    );
  }
}

ShowJob.contextTypes = {
  router: React.PropTypes.object
};
