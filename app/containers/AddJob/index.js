/*
 *
 * AddJob
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class AddJob extends React.PureComponent {

  constructor(){
    super();
    this.state = {
      jobTitle: "",
      jobDescription:""
    }
  }

  handleJobTitle = (event) => {
    this.setState({
      jobTitle:event.target.value
    })
  }

  handleJobDescription = (event) => {
    this.setStae({
      jobDescription:event.target.value
    })
  }
  render() {
    return (
      <div className="container">
        <Helmet title="AddJob" meta={[ { name: 'description', content: 'Description of AddJob' }]}/>
         <div className="addJobContainer">
            <input type="text" className="jobTitle" value={this.state.jobTitle} onChange={this.handleJobTitle} placeholder="Job Title"/>
            <input type="text" className="jobDescription" value={this.state.jobDescription} onChange={this.handleJobDescription} placeholder="Job description"/>

         </div>

      </div>
    );
  }
}

AddJob.contextTypes = {
  router: React.PropTypes.object
};
