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
      emailSignIn:event.target.value
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
          <input type="text" className="emailSignIn" value={this.state.email} onChange={this.handleEmail} placeholder="E-mail"/>
          <input type="text" className="passwordSignIn" value={this.state.password} onChange={this.handlePassword} placeholder="Passwprd"/>

        </div>
      </div>
    );
  }
}

SignIn.contextTypes = {
  router: React.PropTypes.object
};
