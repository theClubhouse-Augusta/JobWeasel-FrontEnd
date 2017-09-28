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
          <div className="sign-up-container">
             <div className="sign-up-info"
              <input type="text" className="username" value={this.state.username} onChange={this.handleUsername}/>
             </div>
          </div>
      </div>
    );
  }
}

SignUp.contextTypes = {
  router: React.PropTypes.object
};
