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
            <div className="innerBox">

              <div className="updateImage">
                  <img src={require("../../images/businessWeasel.jpg")} />
              </div>

              <div className="updateUser">
                <p><b>Profile Name:</b></p>
                <p><input type="text" placeholder="Profile Name" /></p>
              </div>

              <div className="updateTitle">
                <b>Title: </b>
                <p><p><input type="text" placeholder="Title" /></p>
                </p>
              </div>

              <div className="updateEmail">
                <b>Email: </b>
                <p><p><input type="text" placeholder="Email"/></p>
                </p>
              </div>

              <div className="updateLocation">
                <b>Location: </b>
                <p><p><input type="text" placeholder="Location" /></p>
                </p>
              </div>

              <div className="updateStatus">
                <b>Availability: </b>
                <p><p><input type="text" placeholder="Availability" /></p>
                </p>
              </div>


              <div className="updateBio">
                <p><b>Profile Bio:</b></p>
                <p><textarea rows="10" cols="30" wrap="hard"
                placeholder="Profile Bio"/></p>
              </div>

              <div className ="updateProfile">
                <a href="#">Update</a>
              </div>

              <PhotoUpload>
              </PhotoUpload>

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
