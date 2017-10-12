/*
 *
 * ViewProfiles
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import './style.css';
import './styleM.css';
import LeftIcon from 'react-icons/lib/fa/chevron-left';
import RightIcon from 'react-icons/lib/fa/chevron-right';

export default class ViewProfiles extends React.PureComponent {

  constructor () {
    super();
    this.state = {
      search:"",
      searchResults:[],
      nextPage: 1,
      currentPage: 0,
      lastPage: 1,
      users:[]
    }
  }

  componentWillMount () {
    this.getUsers();
  }

  getUsers = () => {
    let nextPage = this.state.nextPage;
    let searchResults = this.state.searchResults;
    if(this.state.currentPage != this.state.lastPage)
    {
      fetch('http://localhost:8000/api/getUsers', {
        method: 'GET'
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        if(json.error)
        {
          console.log(json.error)
        }
        else {
          if(json.current_page != json.last_page)
          {
            nextPage = nextPage + 1;
          }
          for(var i = 0; i < json.users.data.length;
          i++)
          {
            searchResults.push(json.users.data[i]);
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

  handleSearch = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  renderRow = (t,i) => {
    if (i % 2 == 0){
      return (
        <div key={i} className="usersResultsBox">
          <div className="userDiv">{t.name}</div>
          <div className="userDescriptionDiv"><p>{t.location}</p></div>
          </div>
      )
    }
    else {
      return(
        <div key={i} className="usersResultsBox">
          User Listing: {t.name}
          <p>{t.description}</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container">
        <Helmet title="ViewProfiles" meta={[ { name: 'description', content: 'Description of ViewProfiles' }]}/>

        <div className="usersFullOverlay">
        </div>
        <div className="usersList">
          <div className="usersDisplay">
            {this.state.searchResults.map((t,i) => (<Link key={i} to={'/Profile/${t.id}'}>
            User Listings: {t.name}
            <p>{t.location}</p>
            </Link>))}
          </div>
        </div>
      </div>
    );
  }
}

ViewProfiles.contextTypes = {
  router: React.PropTypes.object
};
