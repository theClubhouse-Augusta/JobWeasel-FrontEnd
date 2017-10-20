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
import '../../global.css';

import LeftIcon from 'react-icons/lib/fa/chevron-left';
import RightIcon from 'react-icons/lib/fa/chevron-right';

import Nav from 'components/Nav';


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
    fetch('http://localhost:8000/api/getUsers?page='+nextPage, {
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
        this.setState({
          nextPage: nextPage,
          lastPage: json.users.last_page,
          currentPage: json.users.current_page,
          searchResults: json.users.data
        })
      }
    }.bind(this));
  }

  previousPageclick = () => {
    if(this.state.nextPage > 1) {
      let pageNum = this.state.nextPage;
      pageNum = pageNum - 2;
      this.setState({
        nextPage:pageNum
      }, function() {
        this.getUsers();
      })
    }
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  previousPageclick = () => {
    if(this.state.nextPage > 1) {
      let pageNum = this.state.nextPage;
      pageNum = pageNum - 2;
      this.setState({
        nextPage:pageNum
      }, function() {
        this.getUsers();
      })
    }
  }

  render() {
    return (
      <div className="viewProfilesContainer">
        <Helmet title="ViewProfiles" meta={[ { name: 'description', content: 'Description of ViewProfiles' }]}/>
          <Nav/>
        <div className="usersFullOverlay">
        </div>
        <div className="usersListTitle">Users List
        </div>
        <div className="usersList">
          <div className="usersDisplay">
            {this.state.searchResults.map((t,i) => (
              <Link key={i} to={`/Profile/${t.id}`} className="viewResult">
                User: {t.name}
                <p>{t.location}</p>
              </Link>
            ))}
          </div>
        </div>

        <LeftIcon className="previousIcon"
          onClick={this.previousPageclick}
          />

        <RightIcon className="nextIcon"
          onClick={this.getUsers}
          />

      </div>
    );
  }
}

ViewProfiles.contextTypes = {
  router: React.PropTypes.object
};
