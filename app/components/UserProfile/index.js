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
            <div>
              <div className='spacer'>
              <div className="updateImage">
                <img src={require("../../images/businessWeasel.jpg")} />
              </div>


              <PhotoUpload>
              </PhotoUpload>
              </div>


              <header className="profileHeader">
                <div className="updateUser">
                    Profile Name
                    <p><input type="text" placeholder="Name" /></p>
                </div>

                <div className="updateTitle">
                  Title
                  <p><input type="text" placeholder="Title"/></p>
                </div>

              </header>

              <section className="updateInfoBox">

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
                    <p><textarea rows="10" cols="30" wrap="hard"
                    placeholder="Profile Bio"/></p>
                  </article>


                  <div className ="updateButton">
                    <a href="#">Update</a>
                  </div>

                </section>
              </footer>
            </div>
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
