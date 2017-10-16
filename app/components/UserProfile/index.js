/**
*
* UserProfile
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

import Skills from 'components/Skills';
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
    let _this = this;
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
      .then(function(json) {
        console.log(json);
        if (json.error) {
          _this.setState({notification: json.error})
        }
        if (json.success) {
          _this.setState({notification: json.success})
        }
      }
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

  renderPhotoUpload = () => {
    return (
      <div className="profileImageUpload">
        Upload Profile Image
        <input type="file" onChange={this.handlePhoto} />
        <img src={this.state.preview} className="imagePreview" />
      </div>
    );
  }

  renderNotification = () => {
    return (
      <div className="notification">
        {this.state.notification}
      </div>
    );
  }

  renderUpdateForm = () => {
    let phoneField = "";
    if (this.state.phone !== 0) {
      phoneField = <input type="text" value={this.state.phone} onChange={this.handlePhone}/>;
    }
    else {
      phoneField = <input type="text" placeholder="Phone Number" onChange={this.handlePhone}/>
    }

    return (
      <div className="updateForm">

        <div className="updateField">
          <span className="updateFormLabel">Location: </span>
          <input type="text" value={this.state.location} onChange={this.handleLocation}/>
        </div>

        <div className="updateField">
          <span className="updateFormLabel">Phone: </span>
          {phoneField}
        </div>

        <div className="updateField">
          <span className="updateFormLabel">Profile Bio:</span>
          <textarea rows="10" cols="30" wrap="hard"
           onChange={this.handleBio}>{this.state.bio}
          </textarea>
        </div>
      </div>
    );
  }

  render() {
    if(this.props.open === true)
    {
      return (
        <div>
          <div className="fullOverlay" onClick={this.props.onClose}>
          </div>

          <div className="updateBox">
            {this.renderUpdateForm()}

            {this.renderPhotoUpload()}

            <div className="updateProfileButton" onClick={this.updateProfile}>
              Update
            </div>

            {this.renderNotification()}

            <Skills />
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
