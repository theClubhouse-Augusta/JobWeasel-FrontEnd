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
      search:""
    }
  }

  handleSearch = (event) => {
    this.setState({
      search:event.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Jobs" meta={[ { name: 'description', content: 'Description of Jobs' }]}/>
        <div className="jobsList">


          <div className="searchHolder"><input type="text" className="searchBar" placeholder="Search" value={this.state.search} onChange={this.handleSearch}/></div>

          <input type="text" className="searchBar" placeholder="Search" value={this.state.search} onChange={handleSearch}/>


            <div className="jobDisplay">

            </div>

        </div>
      </div>
    );
  }
}

Jobs.contextTypes = {
  router: React.PropTypes.object
};
