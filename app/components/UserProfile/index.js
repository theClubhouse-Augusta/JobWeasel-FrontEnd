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
        <div className="updateBox">


          <div className="updateImage">
            <img src={require("../../images/businessWeasel.jpg")} />
          </div>


          <PhotoUpload>
          </PhotoUpload>


          <header>
            <div className="updateUser">
                <h2>Profile Name
                  <p><input type="text" placeholder="Name" /></p>
                </h2>
            </div>
          </header>

          <section>
            <div className="updateTitle">Title
              <p><input type="text" placeholder="Title"/></p>
            </div>

            <div className="updateStatus">Availability
              <p><input type="text" placeholder="Availability"/></p>
            </div>

            <div className="updateLocation">Location
              <p><input type="text" placeholder="Location" /></p>
            </div>

            <div className="updateEmail">Email
              <p><input type="text" placeholder="Email address"/></p>
            </div>
          </section>

          <footer>
            <section className="bioBox">
              <article className="updateBio">Profile Bio
                <p><textarea rows="10" cols="45" wrap="hard"
                placeholder="Profile Bio"/></p>
              </article>


              <div className ="updateButton">
                <b><input type="button" value="Update"  /></b>
              </div>

            </section>
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
