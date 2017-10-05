/**
*
* Nav
*
*/

import React from 'react';
import {Link} from 'react-router-dom'

import './style.css';
import './styleM.css';

export default class Nav extends React.PureComponent {
  render() {
    return (
      <div className="navContainer">
        <Link className="navButtons" to={'/Profile'}>
        Home
        </Link>
        <Link className="navButtons" to={'/Jobs'}>
        Jobs List
        </Link>
      </div>
    );
  }
}

Nav.contextTypes = {
  router: React.PropTypes.object
};
