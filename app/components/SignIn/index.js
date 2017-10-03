/**
*
* SignIn
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class SignIn extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      email:"",
      password: ""
    }
  }

  handleEmail = (event) => {
    this.setState({
      email:event.target.value
    })
  }
  handlePassword = (event) => {
    this.setState({
      password:event.target.value
    })
  }


  render() {
    return (
      <div>
        <div className="signInContainer">
          <div className="signInInput">
            <input type="text" className="emailSignIn" value={this.state.email} onChange={this.handleEmail} placeholder="E-mail"/>
            <input type="password" className="passwordSignIn" value={this.state.password} onChange={this.handlePassword} placeholder="Passwprd"/>
            <input type="submit" className="signInButton" placeholder="Sign-In"/>
          </div>

        </div>
      </div>
    );
  }
}

SignIn.contextTypes = {
  router: React.PropTypes.object
};
