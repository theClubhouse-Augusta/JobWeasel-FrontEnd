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
      <div className="addJobContainer">
        <Helmet title="AddJob" meta={[ { name: 'description', content: 'Description of AddJob' }]}/>

        <div className="jobDetailContainer">

          <div className="jobTitle">
            <p><b>Job Title:</b></p>
            <p><input type="text" placeholder="Job Title" /></p>
          </div>

          <div className="jobDesc">
            <p><b>Job Description:</b></p>
            <p><textarea rows="10" cols="30" wrap="hard"
            placeholder="Job Description"/></p>
          </div>


          <div className="companyName">
            <b>Company Name: </b>
            <p><p><input type="text" placeholder="Company Name" /></p>

            </p>
          </div>

          <div className="companyWebsite">
            <b>Company Website: </b>
            <p><p><input type="text" placeholder="Company Website"/></p>
            </p>
          </div>

          <div className="jobLocation">
            <b>Job Location: </b>
            <p><p><input type="text" placeholder="Location" /></p>
            </p>
          </div>

          <div className="workers">
            <b>Workers Needed: </b>
            <p><p><input type="text" placeholder="Workers Needed" /></p>
            </p>
          </div>

          <div className="budget">
            <b>Budget: </b>
            <p><p><input type="text" placeholder="Budget" /></p>
            </p>
          </div>

          <div className="startDate">
            <b>Start Date: </b>
            <p><p><input type="text" placeholder="Start Date" /></p>
            </p>
          </div>

          <div className="timeFrame">
            <b>Time Frame: </b>
            <p><p><input type="text" placeholder="Time Frame" /></p>
            </p>
          </div>

          <div className="timeStamp">
            <p><b>Posted On: </b>
            <p>10/05/2017</p>
            </p>
          </div>

          <div className ="postJobButton">
            <a href="#">Post Job</a>
          </div>



        </div>


      </div>
    );
  }
}

AddJob.contextTypes = {
  router: React.PropTypes.object
};
