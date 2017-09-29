/**
*
* UserProfile
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class UserProfile extends React.PureComponent {

  constructor() {
    super();
    this.state={



    }
  }

  handleUser = (event) => {
    this.setState({
      user:event.target.value
    })
  }




  render() {
    return (
      <div className="profileBox">


      <div className="user">
        <h2> User Name
            <p><input type="text" value={this.state.user} onChange={this.handleUser} /></p>
        </h2>
      </div>

      <div className="userImage">User Image
        <p><input type="text" placeholder="User Image"/></p>
        <img src={require("../../images/businessWeasel.jpg")} className="profileImage"/>
      </div>

      <section>
        <form>
          <div className="title">Title
          <p><input type="text" placeholder="title"/></p>
          </div>
          <div className="email">Email
          <p><input type="text" placeholder="email"/></p>
          </div>
          <div className="location">Location
          <p><input type="text" placeholder="location" /></p>
          </div>
          <div className="status">Status
          <p><input type="text" placeholder="status"/></p>
          </div>
        </form>


        <article>
          <div className="userBio" >User Bio
          <p><input type="textarea" placeholder="User Bio"/></p>
          </div>
        </article>

        <section>
          <p><button><a href="https://www.resume.com">My Resume</a></button></p>
          <p><button><a href="https://www.portfolio.com">My Portfolio or Website</a></button></p>
          <p><button><a href="https://www.linkedin.com">My LinkedIn or Social Media</a></button></p>
          <p><button><a href="https://www.github.com">My Github</a></button></p>
        </section>


        <button className ="submit">
          <input type="submit"  />
        </button>

      </section>

      </div>
    );
  }
}

UserProfile.contextTypes = {
  router: React.PropTypes.object
};
