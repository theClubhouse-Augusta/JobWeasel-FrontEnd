/*
 *
 * Jobs
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Jobs extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      search:"",
      jobs:[]
    }
  }

  componentWillMount() {
    this.getJobs();
  }

  getJobs = () => {
    fetch('http://localhost:8000/api/getJobs', {
      method:'Get'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        jobs:json.jobs.data
      }, function() {
      });
    }.bind(this))
  };

  render() {
    return (
      <div className="container">
        <Helmet title="Jobs" meta={[ { name: 'description', content: 'Description of Jobs' }]}/>
        <div className="jobsList">


          <div className="jobDisplay">
            {this.state.jobs.map((t, i) => (
           <div key={i}> Job Listings: {t.name}
             <p>{t.description}</p>
             <p>{t.budget}</p>
           </div>))};
          </div>
        </div>
      </div>
    );
  }
}

Jobs.contextTypes = {
  router: React.PropTypes.object
};
