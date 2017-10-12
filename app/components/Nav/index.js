/**
*
* Nav
*
*/

import React from 'react';
import {Link} from 'react-router-dom'

import './style.css';
import './styleM.css';
import Bars from 'react-icons/lib/fa/bars';

export default class Nav extends React.PureComponent {
  constructor () {
    super();
    this.state = {
      menuOpen:false
    }
  }

    handleMenu = () => {
      if (this.state.menuOpen === true) {
        this. setState ({
          menuOpen:false
        })
      }
      else if (this.state.menuOpen === false) {
        this.setState ({
          menuOpen:true
        })
      }
    }

    renderMenu() {
      if(this.state.menuOpen === true){
        return (
          <nav className="navMobile">
          <Link to="/Profile" className="navButton">Home</Link>
          <Link to="/Jobs" className="navButton">Jobs List</Link>
          <Link to="/ViewProfiles" className="navButton">Profiles List</Link>
          </nav>
        )
      }
    }
  render() {
    return (
      <div className="navContainer">
      <div className="siteName">Job Weasel</div>

      <nav className="nav">
        <Link to="/Profile" className="navButton">Home</Link>
        <Link to="/Jobs" className="navButton">Jobs List</Link>
        <Link to="/ViewProfiles" className="navButton">Profiles List</Link>
      </nav>
        <Bars className="menuIcon" onClick={this.handleMenu}/>

      {this.renderMenu()}
      </div>
    );
  }
}

Nav.contextTypes = {
  router: React.PropTypes.object
};
