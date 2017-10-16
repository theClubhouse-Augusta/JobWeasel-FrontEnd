/**
*
* EditUser
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

import Skills from 'components/Skills';

export default class EditUser extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      notification: "",
      user: {},
      location: "",
      phone: "",
      bio: "",
      linkText: "",
      linkUrl: "",
      skills: [],
      links: []
    }
  }

  componentWillMount() {
    this.getUser(this.props.userId);
    this.getLinks(this.props.userId);
  }

  handleLocation = (event) => {
    this.setState({
      location: event.target.value
    });
  }

  handlePhone = (event) => {
    this.setState({
      phone: event.target.value
    });
  }

  handleBio = (event) => {
    this.setState({
      bio: event.target.value
    });
  }

  handleLinkText = (event) => {
    this.setState({
      linkText: event.target.value
    });
  }

  handleLinkUrl = (event) => {
    this.setState({
      linkUrl: event.target.value
    });
  }

  getLinks = (id) => {
    let url = "http://localhost:8000/api/getUserLinks/" + id;
    let _this = this;

    fetch(url, {method: 'GET'}).then(
      function(response) {
        return response.json();
      }
    ).then(
      function(json) {
        _this.setState({
          links: json.links
        });
      }.bind(this)
    );
  }

  getUser = (id) => {
    let url = "http://localhost:8000/api/showUser/" + id;
    let _this = this;

    fetch(url, {method: 'GET'}).then(
      function(response) {
        return response.json();
      }
    ).then(
      function(json) {
        _this.setState({
          user: json.user,
          location: json.user.location,
          phone: json.user.phone,
          bio: json.user.bio
        });
      }.bind(this)
    );
  }

  getNotification = (json) => {
    if (json.success) {
      this.setState({notification: json.success});
    }

    if (json.error) {
      this.setState({notification: json.error});
    }

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

  handleUpdateProfile = () => {
    let user = this.state.user;
    let url = "http://localhost:8000/api/editUser";
    let _this = this;

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
      .then(function(json) {
        console.log("editUser");
        console.log(json);

        _this.getNotification(json)
      }
    );
  }

  handleAddLink = () => {
    let user = this.state.user;
    let url = "http://localhost:8000/api/addLinkToUser";
    let _this = this;

    let data = new FormData;
    data.append("text", this.state.linkText);
    data.append("url", this.state.linkUrl);

    let token = sessionStorage.getItem("token");
    let auth = {"Authorization": "Bearer " + token};

    fetch(url, {method: 'POST', body: data, headers: auth})
      .then(function(response) {return response.json();})
      .then(function(json) {
        console.log("addLinkToUser");
        console.log(json);

        _this.getNotification(json);
      }
    );
  }

  handleRemoveLink = (id) => {
    let user = this.state.user;
    let url = "http://localhost:8000/api/removeLink";
    let _this = this;

    let data = new FormData;
    data.append('link_id', id);

    let token = sessionStorage.getItem("token");
    let auth = {"Authorization": "Bearer " + token};

    fetch(url, {method: 'POST', body: data, headers: auth})
      .then(function(response) {return response.json();})
      .then(function(json) {
        console.log("removeLink");
        console.log(json);
        let note = "";
        if (json.error) {note = json.error}
        if (json.success) {note = json.success}

        _this.getNotification(json);
      }
    );
  }

  renderUser = (user) => {
    let photo = "";
    if (user.photo !== "") {
      photo = this.renderPhotoUpload()
    }

    return (
      <div className="profileSection">
        {photo}

        {this.renderField("Location", this.state.location, this.handleLocation)}
        {this.renderField("Phone", this.state.phone, this.handlePhone)}

        {this.renderBio(this.state.bio, this.handleBio)}

        <input type="submit" value="Update Profile"
         className="submitButton" onClick={this.handleUpdateProfile}/>

      </div>
    );
  }

  renderPhotoUpload = () => {
   return (
     <div className="profileImageUpload"><p>Upload Profile Image</p>
       <input type="file" onChange={this.handlePhoto} />
       <img src={this.state.preview} className="imagePreview" />
     </div>
   );
 }

  renderField = (name, value, handle) => {
    return (
      <div className="profileField panel">

        <div className="profileField label">{name}:</div>

        <input className="profileField value" value={value} onChange={handle}/>

      </div>
    );
  }

  renderBio = (bio, handle) => {
    return (
      <div className="profileField panel">
        <div className="profileField label">Bio:</div>
        <textarea className="bio" value={bio}  onChange={handle}>
        </textarea>
      </div>
    );
  }

  renderSkills = (user) => {
    return(
      <div className="skillsSection">
        <div className="skills panel">
          <div className="skills label">Skills:</div>

          <div className="skills value">
            <Skills id={user.id} />
          </div>
        </div>
      </div>
    );
  }

  renderLinks = (user) => {
    return (
      <div className="linksSection">
        <div className="addLink panel">
          <input placeholder="url" onChange={this.handleLinkUrl}/>
          <input placeholder="text" onChange={this.handleLinkText}/>
          <input type="submit" value="Add Link"
           className="submitButton" onClick={this.handleAddLink}/>
        </div>

        <div className="links panel">
          <div className="links label">Links:</div>

          <div className="links value">
            {this.state.links.map((link, index) => (
              <div className="userLink" key={index}>

                <a href={link.url}>{link.text}</a>
                <span className="deleteButton" onClick={() => this.handleRemoveLink(link.id)}>
                  X
                </span>

              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }

  renderNotification = (text) => {
    return (
      <div className="jsonNotification">
        {text}
      </div>
    );
  }

  render() {
    let user = "";
    let links = "";
    let skills = "";
    let notification = "";

    if (this.state.user !== {}) {
        user = this.renderUser(this.state.user);
    }

    if (this.state.links !== []) {
      links = this.renderLinks(this.state.user);
    }

    if (this.state.user !== {}) {
      skills = this.renderSkills(this.state.user);
    }

    if (this.state.notification !== "") {
      notification = this.renderNotification(this.state.notification);
    }

    return (
      <div className="editUser">
        {user}
        {notification}
        {skills}
        {links}
      </div>
    );
  }
}

EditUser.contextTypes = {
  router: React.PropTypes.object
};
