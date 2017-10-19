/**
*
* EditJob
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

import FaClose from "react-icons/lib/fa/close";

export default class EditJob extends React.PureComponent {
  constructor(props) {
      super(props);

      this.state = {
        notification: "",
        job: {},
        location: "",
        description: "",
        time_frame: "",
        workers_needed: "",
        budget: "",
        created_at: "",
        links: [],
        linkText: "",
        linkUrl: ""
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
          job: json.job,
          name: json.job.name,
          location: json.job.location,
          description: json.job.description,
          time_frame: json.job.time_frame,
          start_date: json.job.start_date,
          workers_needed: json.job.workers_needed,
          budget: json.job.budget,
          created_at: json.job.created_at
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

  handleUpdateJob = () => {
    let url = "http://localhost:8000/api/editJob";
    let _this = this;

    let data = new FormData;
    data.append("name", this.state.name);
    data.append("location", this.state.location);
    data.append("workers_needed", this.state.workers_needed);
    data.append("description", this.state.description);
    data.append("time_frame", this.state.time_frame);
    data.append("budget", this.state.budget);
    data.append("start_date", this.state.start_date);
    data.append("job_id", this.props.jobId);

    if (this.state.photo !== "") {
      data.append("photo", this.state.photo);
    }

    let token = sessionStorage.getItem("token");

    let auth = {"Authorization": "Bearer " + token};

    fetch(url, {method: 'POST', body: data, headers: auth})
      .then(function(response) {return response.json();})
      .then(function(json) {
        console.log(url);
        console.log(json);
        _this.getNotification(json);
      }
    );
  }

  handleDeleteJob = () => {
    let url = "http://localhost:8000/api/removeJob";
    let _this = this;

    let data = new FormData;
    console.log("FORM DATA");
    console.log(this.state.job);
    data.append("job_id", this.state.job.id)

    let token = sessionStorage.getItem("token");
    let auth = {"Authorization": "Bearer " + token};

    fetch(url, {method: 'POST', body: data, headers: auth})
      .then(function(response) {return response.json();})
      .then(function(json) {
        console.log(url);
        console.log(json);
        _this.getNotification(json);
      }
    );
  }

  handleAddLink = () => {
    let user = this.state.user;
    let url = "http://localhost:8000/api/addLinkToJob";
    let _this = this;

    let data = new FormData;
    data.append("text", this.state.linkText);
    data.append("url", this.state.linkUrl);
    data.append("job_id", this.state.job.id);

    let token = sessionStorage.getItem("token");
    let auth = {"Authorization": "Bearer " + token};

    fetch(url, {method: 'POST', body: data, headers: auth})
      .then(function(response) {return response.json();})
      .then(function(json) {
        console.log("addLinkToJob");
        console.log(json);

        _this.getNotification(json);
        _this.getLinks(_this.props.jobId);
      }
    );
  }

  handleRemoveLink = (id) => {
    let user = this.state.user;
    let url = "http://localhost:8000/api/removeLink";
    let _this = this;

    let data = new FormData;
    data.append('link_id', id);

    let token = sessionStorage.getItem("token");
    let auth = {"Authorization": "Bearer " + token};

    fetch(url, {method: 'POST', body: data, headers: auth})
      .then(function(response) {return response.json();})
      .then(function(json) {
        console.log("removeLink");
        console.log(json);

        _this.getNotification(json);
        _this.getLinks(_this.props.jobId);
      }
    );
  }

  handleName = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  handleLocation = (event) => {
    this.setState({
      location: event.target.value
    });
  }

  handleDescription = (event) => {
    this.setState({
      description: event.target.value
    });
  }

  handleBudget = (event) => {
    this.setState({
      budget: event.target.value
    });
  }

  handleWorkers = (event) => {
    this.setState({
      workers_needed: event.target.value
    });
  }

  handleDate = (event) => {
    this.setState({
      start_date: event.target.value
    });
  }

  handleTime = (event) => {
    this.setState({
      time_frame: event.target.value
    });
  }

  handleLinkText = (event) => {
    this.setState({
      linkText: event.target.value
    });
  }

  handleLinkUrl = (event) => {
    this.setState({
      linkUrl: event.target.value
    });
  }

  renderJob = () => {
    return (
      <div className="jobSection">
        {this.renderField("Name", this.state.name, this.handleName)}
        {this.renderField("Location", this.state.location, this.handleLocation)}
        {this.renderField("Description", this.state.description, this.handleDescription)}
        {this.renderField("Budget", this.state.budget, this.handleBudget)}
        {this.renderField("Workers Needed", this.state.workers_needed, this.handleWorkers)}
        {this.renderField("Start Date", this.state.start_date, this.handleDate)}
        {this.renderField("Time Frame", this.state.time_frame,  this.handleTime)}

        <input type="submit" value="Update Job"
         className="submitButton button" onClick={this.handleUpdateJob}/>

        <input type="button" value="Delete Job"
         className="submitButton button" onClick={this.handleDeleteJob}/>

      </div>
    );
  }

  renderField = (name, value, handle) => {
    return (
      <div className="profileField panel">

        <div className="profileField label">{name}:</div>

        <input className="profileField value" value={value} onChange={handle}/>

      </div>
    );
  }

  renderLinks = () => {
    return (
      <div className="jobSectionLinksSection">
        <div className="addLink panel">
          <input placeholder="url" onChange={this.handleLinkUrl}/>
          <input placeholder="text" onChange={this.handleLinkText}/>
          <input type="submit" value="Add Link"
           className="submitButton button" onClick={this.handleAddLink}/>
        </div>

        <div className="links panel">
          <div className="links label">Links:</div>

          <div className="links value">
            {this.state.links.map((link, index) => (
              <div className="userLink" key={index}>

                <a href={link.url}>{link.text}</a>
                <span className="deleteButton" onClick={() => this.handleRemoveLink(link.id)}>
                  <FaClose/>
                </span>

              </div>
            ))}

          </div>
        </div>
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
    let job = "";
    let links = "";
    let notification = "";

    if (this.state.job !== {}) {
      job = this.renderJob();
    }

    if (this.state.links !== []) {
      links = this.renderLinks();
    }

    if (this.state.notification !== "") {
      notification = this.renderNotification(this.state.notification);
    }
    if(this.props.open === true) {
      return (
        <div>
          <div className="fullOverlay" onClick={this.props.onClose}>
          </div>

          <div className="renuiDialogOverlay">
            <div className="renuiDialog">

            {job}
            {links}
            {notification}

            </div>
          </div>
        </div>
      );
    }
    else {
      return(
        <div></div>
      )
    }

  }
}

EditJob.contextTypes = {
  router: React.PropTypes.object
};
