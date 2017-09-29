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
      companyName:""
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


  render() {
    return (
      <div className="container">
        <Helmet title="SignUp" meta={[ { name: 'description', content: 'Description of SignUp' }]}/>
          <div className="sign-up-container">
            <div className="hello-div"><h1>Sign up for Job Weasel!</h1></div>

              <div className="button-div">
                <input type="button" className="choose-seeker" value="Job-Sekker"/>
                <input type="button" className="choose-employer" value="Employer"/>
              </div>
                <div className="sign-up-seeker">

                  <input type="text" className="first-name" value={this.state.firstName} onChange={this.handleFirstName} placeholder="First-Name" />
                  <input type="text" className="last-name" value="Last-name" />
                  <input type="text" className="email" value="email"/>
                  <input type="password" className="password" value="Password"/>
                  <input type="password" className="passwordValidation" value="Validate"/>
                </div>

              <div className="sign-up-employer">

               <input type="text" className="companyName" value="Company name" />
               <input type="text" className="email" value="email"/>
               <input type="password" className="password" value="Password"/>
               <input type="password" className="password-validation" value="Validate"/>
             </div>
          </div>
      </div>
    );
  }
}

SignUp.contextTypes = {
  router: React.PropTypes.object
};
