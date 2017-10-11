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
      password: "",
      NotificationTwo:""
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

  signIn =() => {
    let data = new FormData;
    let _this = this;
    data.append('email', this.state.email);
    data.append('password', this.state.password);

  fetch('http://localhost:8000/api/signIn', {
    method:'Post',
    body:data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json.error) {
        _this.setState({
          notificationTwo: json.error
        })
      }
      else {
        _this.setState({
          notificationTwo: json.success
        })
        sessionStorage.setItem('token', json.token);
        sessionStorage.setItem('user', JSON.stringify(json.user));
        setTimeout(function(){
          _this.context.router.history.push("/Profile");
        }, 500)
      }
    }.bind(this))
  }


  render() {
    return (
      <div>
        <div className="signInContainer">
          <div className="signInInput">
            <input type="text" className="emailSignIn" value={this.state.email} onChange={this.handleEmail} placeholder="E-mail"/>

            <input type="password" className="passwordSignIn" value={this.state.password} onChange={this.handlePassword} placeholder="Password"/>
            <input type="submit" className="signInButton" placeholder="Sign-In" onClick={this.signIn}/>
            <p className="submitNote">{this.state.notificationTwo}</p>
          </div>

        </div>
      </div>
    );
  }
}

SignIn.contextTypes = {
  router: React.PropTypes.object
};
