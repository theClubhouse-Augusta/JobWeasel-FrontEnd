/*
 *
 * Admin
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Admin extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Admin" meta={[ { name: 'description', content: 'Description of Admin' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

Admin.contextTypes = {
  router: React.PropTypes.object
};
