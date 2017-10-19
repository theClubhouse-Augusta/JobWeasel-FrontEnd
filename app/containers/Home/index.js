/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import SignIn from 'components/SignIn';
import { Link } from 'react-router-dom';
import Nav from 'components/Nav';

import './style.css';
import './styleM.css';
import '../../global.css';

export default class Home extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      signIn:false
    }
  }

  handleSignIn = () => {
    this.setState({
      signIn:!this.state.signIn
    })
  }

  renderSignIn = () => {
    if(this.state.signIn === true) {
      return (
        <SignIn open={this.state.signIn} onClose={this.handleSignIn}/>
      )
    }
  }

  render() {
    let login = JSON.parse(sessionStorage.getItem("user"))

    if (login) {
        let url = "/Profile/" + login.id;
        this.context.router.history.push(url);
    }

    return (
      <div className="homeContainer">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>
          <div className="siteTitle">Job Weasel
          </div>
          {this.renderSignIn()}
          <div className="homeFullOverlay">
          </div>
          <div className="welcome-text">
              <h1 className="helloJob">Welcome to Job Weasel</h1>
              <h3 className="subHeader">A place to find your next job or your next employee.</h3>
            <div className="entranceButtons">
              <Link to="/SignUp" className="sign-up">Sign-Up</Link>
              <input type="submit" className="sign-in" value="Sign-in" onClick={this.handleSignIn}/>
            </div>
          </div>
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};
