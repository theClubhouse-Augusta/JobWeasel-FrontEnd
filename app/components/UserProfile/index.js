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
      notification:"",
      location:"",
      bio:"",
      phone:0,
      photo:null,
      preview: ""
    }
  };

  componentWillMount() {
    this.setState({
      location: this.props.user.location,
      bio:this.props.user.bio,
      phone: this.props.user.phone,
      photo:this.props.user.photo
    });
  }

  handleLocation = (event) => {
    this.setState({
      location:event.target.value
    })
  }

  handlePhone = (event) => {
    this.setState({
      phone:event.target.value
    })
  }

  handleBio = (event) => {
    this.setState({
      bio:event.target.value
    })
  }

  updateProfile = () => {
    let user = this.state.user;
    let url = "http://localhost:8000/api/editUser"
    let data = new FormData;
    data.append("location", this.state.location);
    data.append("bio", this.state.bio);
    data.append("phone", this.state.phone);

    if (this.state.photo !== "") {
      data.append("photo", this.state.photo);
    }

    let token = sessionStorage.getItem("token");
    let auth = {"Authorization": "Bearer " + token};
    fetch(url, {method: 'POST', body: data, headers: auth})
      .then(function(response) {return response.json();})
      .then(function(json) {console.log(json);} );
  }

  renderPhotoUpload = () => {
    return (
      <div className="profileImageUpload"><p>Upload Profile Image</p>
        <input type="file" onChange={this.handlePhoto} />
        <img src={this.state.preview} className="imagePreview" />
      </div>
    );
  }

  handlePhoto = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        photo: file,
        preview: reader.result
      })
    }
    reader.readAsDataURL(file);
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    if(this.props.open === true)
    {
      let phoneField = "";
      if (this.state.phone !== 0) {
        phoneField = <input type="text" value={this.state.phone} onChange={this.handlePhone}/>;
      }
      else {
        phoneField = <input type="text" placeholder="Phone Number" onChange={this.handlePhone}/>
      }

      return (
        <div>
          <div className="fullOverlay" onClick={this.props.onClose}>
          </div>


          <div className="updateBox">
            <div className="innerBox">

              <div className="updateField">
                <b>Location: </b>
                <input type="text" value={this.state.location} onChange={this.handleLocation}/>
              </div>

              <div className="updateField">
                <b>Phone: </b>
                {phoneField}
              </div>

              <div className="updateField">
                <b>Profile Bio:</b>
                <textarea rows="10" cols="30" wrap="hard"
                 onChange={this.handleBio}>
                  {this.state.bio}
                </textarea>
              </div>

              <div className ="updateProfile" onClick={this.updateProfile}>
                Update
              </div>

              {this.renderPhotoUpload()}

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
