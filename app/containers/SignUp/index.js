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

  constructor() {
    super();
    this.state = {
      name:"",
      email:"",
      password:"",
      passwordValidation:"",
      companyName:"",
      passMatch:"",
      notification:"",
      NotificationTwo:"",
      activeTab: 1
    }
  }

  signUp = () => {
    let data = new FormData;
    let _this = this;
    data.append('email', this.state.email);
    data.append('name', this.state.name);
    data.append('password', this.state.password);
    data.append('role_id', this.state.activeTab);

    fetch('http://localhost:8000/api/signUp', {
      method:'Post',
      body:data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json.error) {
        _this.setState({
          notification:json.error
        })
      }
      else if(json.success) {
        _this.setState({
          notification:json.success
        })
        _this.signIn();
      }
    })
      this.forceUpdate();
  };

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
          notificationTwo:json.error
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
        }, 1000)
      }
    }.bind(this))
  }

  handleName =(event) => {
    this.setState({
      name:event.target.value
    })
  };

  handleEmail = (event) => {
    this.setState({
      email:event.target.value
    })
  };

  handlePassword = (event) => {
    this.setState({
      password:event.target.value
    }, function() {
      if(this.state.password != this.state.passwordValidation)
      {
        this.setState({
          passMatch:"passwords must match"
        });
      }
      else
      {
        this.setState({
          passMatch:"passwords match"
        })
      }
    })
  };

  handlePasswordValidation = (event) => {
    this.setState({
      passwordValidation:event.target.value
    }, function() {
      if(this.state.password != this.state.passwordValidation)
      {
        this.setState({
          passMatch:"passwords must match"
        });
      }
      else
      {
        this.setState({
          passMatch:"passwords match"
        })
      }
    })
  };

 changeTab = (tab) => {
   this.setState({
     activeTab:tab
   })
 };

 renderTab = () => {
   if (this.state.activeTab === 1) {
     return(
       <div className="sign-up-seeker">

         <input type="text" className="name" value={this.state.name} onChange={this.handleName} placeholder="Full-Name" />
         <input type="text" className="name" value={this.state.email} onChange={this.handleEmail} placeholder="Email"/>
         <input type="password" className="password" value={this.state.password} onChange={this.handlePassword}  placeholder="Password"/>
         <input type="password" className="passwordValidation" value={this.state.passwordValidation} onChange={this.handlePasswordValidation} placeholder="Password-Validation"/>
         <input type="submit" className="submitButton" onClick={this.signUp}/>
         <p className="passValidation">{this.state.passMatch}</p>
         <p className="submitNote">{this.state.notification}</p>
         <p className="submitNote">{this.state.notificationTwo}</p>
       </div>
     )

   }
   else if (this.state.activeTab === 2) {
     return (
       <div className="sign-up-employer">

        <input type="text" className="name" value={this.state.Name} onChange={this.handleName} placeholder="Company-Name"/>
        <input type="text" className="name" value={this.state.email} onChange={this.handleEmail} placeholder="Email"/>
        <input type="password" className="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password"/>
        <input type="password" className="passwordValidation" value={this.state.passwordValidation} onChange={this.handlePasswordValidation} placeholder="Password-Validation"/>
        <input type="submit" className="submitButton" onClick={this.signUp}/>
        <p className="passValidation">{this.state.passMatch}</p>
        <p className="submitNote">{this.state.notification}</p>
        <p className="submitNote">{this.state.notificationTwo}</p>
      </div>
     )
   }
 }

  render() {
    return (
      <div className="signUpContainer">
        <Helmet title="SignUp" meta={[ { name: 'description', content: 'Description of SignUp' }]}/>
          <div className="sign-up-container">
            <div className="hello-div"><h1>Sign up for Job Weasel!</h1></div>

              <div className="button-div">
                <input type="button" className="choose-seeker" value="Job-Seeker" onClick={()=> this.changeTab(1)}/>
                <input type="button" className="choose-employer" value="Employer" onClick={()=> this.changeTab(2)}/>
              </div>
                {this.renderTab()}

          </div>
      </div>
    );
  }
}

SignUp.contextTypes = {
  router: React.PropTypes.object
};
