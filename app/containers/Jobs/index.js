/*
 *
 * Jobs
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';

import './style.css';
import './styleM.css';
import LeftIcon from 'react-icons/lib/fa/chevron-left';
import RightIcon from 'react-icons/lib/fa/chevron-right';
import Nav from 'components/Nav';

export default class Jobs extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      search:"",
      searchResults:[],
      nextPage: 1,
      currentPage: 0,
      lastPage:1,
      jobs:[],
      result:[],
      taskContent:""
    }
  }

  componentWillMount() {
    this.getJobs();
  }
  getJobs = () => {
    let nextPage = this.state.nextPage;
    let searchResults = this.state.searchResults;
    if(this.state.currentPage != this.state.lastPage)
    {
      fetch('http://localhost:8000/api/getJobs?page='+nextPage, {
        method: 'GET'
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        if(json.error)
         {
          console.log(json.error);
        }
        else
        {
          console.log(JSON.stringify(json.jobs));
          if(json.current_page != json.last_page)
          {
            nextPage = nextPage + 1;
          }
          for(var i = 0; i < json.jobs.data.length; i++)
          {
            searchResults.push(json.jobs.data[i]);
          }
          this.setState({
            nextPage: nextPage,
            lastPage: json.last_page,
            currentPage: json.current_page,
            searchResults: searchResults
          })
        }
      }.bind(this));
    }
  }

  previousPageclick = () => {
    let pageNum = this.state.nextPage;
    pageNum = pageNum - 2;
    this.setState({
      nextPage:pageNum
    })
    this.getJobs();
  }

  handleEnter = (event) => {
    if (event.keyCode === 13)
    this.searchContent();
  };

  handleContent = (event) => {
    this.setState({
      taskContent: event.target.value
    })
  }

  searchContent = () => {
    let _this = this;
    fetch('http://localhost:8000/api/searchJobs/'+this.state.taskContent, {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      _this.setState({
        searchResults:json.jobs
      })
      console.log(json.jobs);
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
          <div className="descriptionDiv"><p>{t.location}</p></div>
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
          <Nav/>
        <div className="jobsFullOverlay">
        </div>

        <div className="jobsTitle">Job List
        </div>

        <div className="searchHolder">
          <input type="text" className="searchContentInput" placeholder="Search Job List" onKeyDown={this.handleEnter} value={this.state.taskContent} onChange={this.handleContent}/>

          <input type="submit" className="submitButton" onClick={this.searchContent}/>
        </div>

        <div className="jobsList">
          <div className="jobDisplay">

            {this.state.searchResults.map((t, i) => (
               <Link key={i} to={`/JobDetails/${t.id}`} className="jobDetailLink"> Job: {t.name}
                 <p>Job Location: {t.location}</p>
                 <p>Budget: {t.budget}</p>
               </Link>
             ))}
          </div>

           <LeftIcon className="previousIcon"
             onClick={this.previousPageclick}
             />
             
           <RightIcon className="nextIcon"
             onClick={this.getTest}
             />

        </div>
      </div>
    );
  }
}

Jobs.contextTypes = {
  router: React.PropTypes.object
};
