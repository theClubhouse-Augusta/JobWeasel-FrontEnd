/*
 *
 * SignUp
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class SignUp extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="SignUp" meta={[ { name: 'description', content: 'Description of SignUp' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

SignUp.contextTypes = {
  router: React.PropTypes.object
};
