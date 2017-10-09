/*
 *
 * Jobs
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';
import LeftIcon from 'react-icons/lib/fa/chevron-left';
import RightIcon from 'react-icons/lib/fa/chevron-right';

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

  handleSearch = (event) => {
    this.setState({
      search:event.target.value
    })
  }

  renderRow = (t, i) => {
    if (i % 2 == 0){
      return (
        <div key={i} className="resultBox">
          <div className="companyDiv">{t.name}</div>
          <div className="descriptionDiv"><p>{t.description}</p></div>
          <div className="budgetDiv"><p>{t.budget}</p></div>
        </div>
      )
    }
    else {
      return(
        <div key={i} className="resultBox">
          Job Listings: {t.name}
          <p>{t.description}</p>
          <p>{t.budget}</p>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="jobsContainer">
        <Helmet title="Jobs" meta={[ { name: 'description', content: 'Description of Jobs' }]}/>
          <div className="searchHolder">
            <input type="text" className="jobSearch" value={this.state.search} onChange={this.handleSearch} placeholder="Search"/>
            <LeftIcon className="nextIcon"/>
              <RightIcon className="nextIcon"/>
          </div>
        <div className="jobsList">
          <div className="jobDisplay">
            {this.state.jobs.map((t, i) => (
              this.renderRow(t, i)
            ))}
          </div>
        </div>

      </div>
    );
  }
}

Jobs.contextTypes = {
  router: React.PropTypes.object
};
