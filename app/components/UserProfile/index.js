/**
*
* UserProfile
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class UserProfile extends React.PureComponent {




  render() {
    return (
      <div className="profileBox">


        <div className="user">
          <h2> User Name
            <p><input type="text" /></p>
          </h2>
        </div>

        <div className="userImage">User Image
          <p><input type="text" placeholder="User Image"/></p>
          <img src={require("../../images/businessWeasel.jpg")} className="profileImage"/>
        </div>


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

        <article>
          <div className="userBio">User Bio
          <p><input type="textarea" placeholder="User Bio"/></p>
          </div>
        </article>

        <section className="linksBox">
          <p><a href="https://www.resume.com">My Resume</a></p>
          <p><a href="https://www.portfolio.com">My Portfolio or Website</a></p>
          <p><a href="https://www.linkedin.com">My LinkedIn or Social Media</a></p>
          <p><a href="https://www.github.com">My Github</a></p>
        </section>


        <button className ="submitButton">
          <input type="submit" value="submit"  />
        </button>

      </div>
    );
  }
}

UserProfile.contextTypes = {
  router: React.PropTypes.object
};
