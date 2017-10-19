/*
 *
 * AddJob
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';
import '../../global.css';


export default class AddJob extends React.PureComponent {


  constructor(){
    super();
    this.state = {
      jobTitle: "",
      jobDescription: "",
      jobLocation:"",
      workersNeeded:"",
      budget:"",
      startDate:"",
      timeFrame:"",
      notification:"",
      token:sessionStorage.getItem('token')
    }
  }

  postJob = () => {
    console.log(this.state.token);
    let data = new FormData;
    let _this = this;
    data.append('name', this.state.jobTitle);
    data.append('location', this.state.jobLocation);
    data.append('description', this.state.jobDescription);
    data.append('workers_needed', this.state.workersNeeded);
    data.append('budget', this.state.budget);
    data.append('start_date', this.state.startDate);
    data.append('time_frame', this.state.timeFrame);
    fetch('http://localhost:8000/api/postJob', {
      method:'POST',
      body:data,
      headers:{"Authorization":"Bearer "+ this.state.token}
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json.error) {
        _this.setState({
          notification:json.error
        })
      }
      else if(json.success){

        _this.setState({
          notification:json.success
        })
      }
      setTimeout(function(){
        let user = JSON.parse(sessionStorage.getItem('user'));
        let url = '/Profile/' + user.id;
        _this.context.router.history.push(url);
      }, 500);
    });
    this.forceUpdate();

  };

  handleJobTitle = (event) => {
    this.setState({
      jobTitle:event.target.value
    })
  }

  handleJobDescription = (event) => {
    this.setState({
      jobDescription:event.target.value
    })
  }


  handleJobLocation = (event) => {
    this.setState({
      jobLocation:event.target.value
    })
  }

  handleWorkersNeeded = (event) => {
    this.setState({
      workersNeeded:event.target.value
    })
  }

  handleBudget = (event) => {
    this.setState({
      budget:event.target.value
    })
  }

  handleStartDate = (event) => {
    this.setState({
      startDate:event.target.value
    })
  }

  handleTimeFrame = (event) => {
    this.setState({
      timeFrame:event.target.value
    })
  }

  render() {

    let date = new Date();
    date = date.toDateString();

    return (
      <div className="addJobContainer">
        <Helmet title="AddJob" meta={[ { name: 'description', content: 'Description of AddJob' }]}/>
        <div className="addJobFullOverlay">
        </div>
        <div className="jobDetailContainer">

          <div className="jobTitle">
            <p><b>Job Title:</b></p>
            <p><input type="text" placeholder="Job Title" onChange={this.handleJobTitle}/></p>
          </div>

          <div className="jobDesc">
            <p><b>Job Description:</b></p>
            <p><textarea rows="10" cols="30" wrap="hard"
            placeholder="Job Description" onChange={this.handleJobDescription}/></p>
          </div>

          <div className="jobLocation">
            <b>Job Location: </b>
            <p><input type="text" placeholder="Location" onChange={this.handleJobLocation}/></p>
          </div>

          <div className="workers">
            <b>Workers Needed: </b>
            <p><input type="text" placeholder="Workers Needed" onChange={this.handleWorkersNeeded}/></p>
          </div>

          <div className="budget">
            <b>Budget: </b>
            <p><input type="text" placeholder="Budget" onChange={this.handleBudget}/></p>
          </div>

          <div className="startDate">
            <b>Start Date: </b>
            <p><input type="text" placeholder="Start Date" onChange={this.handleStartDate}/></p>
          </div>

          <div className="timeFrame">
            <b>Time Frame: </b>
            <b>(In Months) </b>
            <p><input type="text" placeholder="Time Frame" onChange={this.handleTimeFrame}/></p>
          </div>

          <div className="timeStamp">
            <b>Todays Date: </b>
            <p>{date}</p>
          </div>

          <input type="submit" className="postJobButton" value="Post Job" onClick={this.postJob}/>


          <p className="submitNote">{this.state.notification}</p>

        </div>


      </div>
    );
  }
}

AddJob.contextTypes = {
  router: React.PropTypes.object
};
