/*
 *
 * JobDetails
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

import Nav from 'components/Nav';

export default class JobDetails extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      search:"",
      job:[]
    }
  }

  componentWillMount() {
    this.showJob();
  }

  showJob = () => {
    let _this=this;
    fetch('http://localhost:8000/api/showJob/'+this.props.match.params.id,{
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      _this.setState({
        job: json.job
      })
    }.bind(this))
  };

  render() {
    return (
      <div className="jobDetailsContainer">
        <Helmet title="JobDetails" meta={[ { name: 'description', content: 'Description of JobDetails' }]}/>
        <div className="jobDetailFullOverlay">
        </div>

        <div className="detailContainer">
         <h3><b>Job: {this.state.job.name}</b></h3>
         <p>Location: {this.state.job.location}</p>
         <p>Description: {this.state.job.description}</p>
         <p>Budget: {this.state.job.budget}</p>
         <p>Workers Needed: {this.state.job.workers_needed}</p>
         <p>Start Date: {this.state.job.start_date}</p>
         <p>Project Length in Months: {this.state.job.time_frame}</p>
         <p>Job Posted on: {this.state.job.created_at}</p>
        </div>

        <Nav/>

      </div>
    )
  }
}

JobDetails.contextTypes = {
  router: React.PropTypes.object
};
