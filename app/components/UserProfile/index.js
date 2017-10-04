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


        <div className="profileUser">
          <h2> Profile Name
            <p><input type="text" /></p>
          </h2>
        </div>


        <div className="profileImage">
          <img src={require("../../images/businessWeasel.jpg")} />
        </div>

        <div className="profileImageUpload">Profile Image
          <p><input type="text" placeholder="User Image"/></p>
        </div>



        <div className="profileTitle">Title
          <p><input type="text" placeholder="title"/></p>
        </div>

        <div className="profileEmail">Email
          <p><input type="text" placeholder="email"/></p>
        </div>

        <div className="profileLocation">Location
          <p><input type="text" placeholder="location" /></p>
        </div>

        <div className="profileStatus">Status
          <p><input type="text" placeholder="status"/></p>
        </div>

        <article className="profileBio">Profile Bio
          <p><textarea rows="20" cols="45" wrap="hard"
          placeholder="Profile Bio"/></p>
        </article>

        <footer>
          <section className="linksBox">
            <p><a href="https://www.resume.com">My Resume</a></p>
            <p><a href="https://www.portfolio.com">My Portfolio or Website</a></p>
            <p><a href="https://www.linkedin.com">My LinkedIn or Social Media</a></p>
            <p><a href="https://www.github.com">My Github</a></p>
          </section>

          <div className ="submitButton">
            <b><input type="button" value="submit"  /></b>
          </div>

        </footer>

      </div>
    );
  }
}

UserProfile.contextTypes = {
  router: React.PropTypes.object
};
