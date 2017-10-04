/**
*
* UserProfile
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

import PhotoUpload from "components/PhotoUpload";

export default class UserProfile extends React.PureComponent {

  constructor (props) {
    super(props);
    this.state={
      notification:""
    }
  };

  handleUpdateProfile = () => {
    this.setState({
      openUserProfile: !this.state.openUserProfile
    })
  }


  render() {
    if(this.props.open === true)
    {
      return (
        <div>
          <div className="fullOverlay" onClick={this.props.onClose}>
        </div>
        <div className="profileBox">


          <div className="profileImage">
            <img src={require("../../images/businessWeasel.jpg")} />
          </div>


          <PhotoUpload>
          </PhotoUpload>


          <header>
            <div className="profileUser">
                <h2> Profile Name
                  <p><input type="text" placeholder="Name" /></p>
                </h2>
            </div>
          </header>

          <section>
            <div className="profileTitle">Title
              <p><input type="text" placeholder="Title"/></p>
            </div>

            <div className="profileStatus"> Availability
              <p><input type="text" placeholder="Availability"/></p>
            </div>

            <div className="profileLocation">Location
              <p><input type="text" placeholder="Location" /></p>
            </div>

            <div className="profileEmail">Email
              <p><input type="text" placeholder="Email address"/></p>
            </div>
          </section>


          <article className="profileBio">Profile Bio
            <p><textarea rows="10" cols="45" wrap="hard"
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
      </div>
      );
    }
      else {
        return (
        <div className="dialogOverlayHidden">
        </div>
      );
    }
  }
}

UserProfile.contextTypes = {
  router: React.PropTypes.object
};
