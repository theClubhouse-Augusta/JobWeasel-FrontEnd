/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Home extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>
          <div className="welcome-text">
            <div className="sign-in-button"><input type="submit" className="sign-in" value="Sign-in"/></div>
              <h1>Welcome to Job Weasel</h1>
                <h3>A place to find your next job or your next employee.</h3>
                  <div className="sign-up-button"><input type="submit" className="sign-up" value="Sign-up"/></div>


          </div>



      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};
