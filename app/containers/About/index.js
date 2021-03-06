/*
 *
 * About
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';
import '../../global.css';

export default class About extends React.PureComponent {
  render() {
    return (
      <div className="aboutContainer">
        <Helmet title="About" meta={[ { name: 'description', content: 'Description of About' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

About.contextTypes = {
  router: React.PropTypes.object
};
