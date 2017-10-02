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
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      passwordValidation:"",
      companyName:"",
      activeTab: 1
    }
  }

  handleFirstName =(event) => {
    this.setState({
      firstName:event.target.value
    })
  }
  handleLastName = (event) => {
    this.setState({
      lastName:event.target.value
    })
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
  handlePasswordValidation = (event) => {
    this.setState({
      passwordValidation:event.target.value
    })
  }
  handleCompanyName = (event) => {
    this.setState({
      companyName:event.target.value
    })
  }

 changeTab = (tab) => {
   this.setState({
     activeTab:tab
   })
 }

 renderTab = () => {
   if (this.state.activeTab === 1) {
     return(
       <div className="sign-up-seeker">

         <input type="text" className="first-name" value={this.state.firstName} onChange={this.handleFirstName} placeholder="First-Name" />
         <input type="text" className="last-name" value={this.state.lastName} onChange={this.handleLastName} placeholder="Last-Name" />
         <input type="text" className="email" value={this.state.email} onChange={this.handleEmail} placeholder="Password"/>
         <input type="password" className="password" value={this.state.password} onChange={this.handlePassword}  placeholder="Password"/>
         <input type="password" className="passwordValidation" value={this.state.passwordValidation} onChange={this.handlePasswordValidation} placeholder="Password-Validation"/>
       </div>
     )

   }
   else if (this.state.activeTab === 2) {
     return (
       <div className="sign-up-employer">

        <input type="text" className="companyName" value={this.state.companyName} onChange={this.handleCompanyName} placeholder="Company-Name"/>
        <input type="text" className="email" value={this.state.email} onChange={this.handleEmail} placeholder="Email"/>
        <input type="password" className="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password"/>
        <input type="password" className="password-validation" value={this.state.passwordValidation} onChange={this.handlePasswordValidation} placeholder="Validate"/>
      </div>
     )
   }
 }

  render() {
    return (
      <div className="container">
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
