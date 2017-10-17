/**
*
* ShowProfile
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class ShowProfile extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      skills: [],
      links: []
    }
  }

  componentWillMount() {
    this.getUser(this.props.userId);
    this.getSkills(this.props.userId);
    this.getLinks(this.props.userId);
  }

  getSkills = (id) => {
    let url = "http://localhost:8000/api/getUserSkills/" + id;
    let _this = this;

    fetch(url, {method: 'GET'}).then(
      function(response) {
        return response.json();
      }
    ).then(
      function(json) {
        _this.setState({
          skills: json.skills
        });
        console.log("getUserSKills");
        console.log(json.skills);
      }.bind(this)
    );
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

        console.log(json.links);
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
          user: json.user
        });
        console.log(json.user);
        
      }.bind(this)
    );
  }

  renderUser = (user) => {
    let photo = "";
    if (user.photo !== "") {
      photo = this.renderPhoto(user.photo)
    }

    return (
      <div className="profileSection">
        {photo}

        {this.renderField("Name", user.name)}

        {this.renderField("Location", user.location)}
        {this.renderField("Phone", user.phone)}

        {this.renderBio(user.bio)}
      </div>
    );
  }

  renderField = (name, value) => {
    return (
      <div className="profileField panel">

        <div className="profileField label">{name}:</div>

        <div className="profileField value">
          {value}
        </div>

      </div>
    );
  }

  renderBio = (bio) => {
    return (
      <div className="profileField panel">
        <div className="profileField label">Bio:</div>

        <p className="profileField value">{bio}</p>
      </div>
    );
  }

  renderPhoto = (url) => {
    return (
      <div className="profilePhoto">
        <img src={url} className="profilePhoto" />
      </div>
    );
  }

  renderSkills = (user) => {
    return(
      <div className="skillsSection">
        <div className="skills panel">
          <div className="skills label">Skills:</div>

          <div className="skills value">
            {this.state.skills.map((skill, index) => (
              <div className="userSkill" key={index}>
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  renderLinks = (user) => {
    return (
      <div className="linksSection">
        <div className="links panel">
          <div className="links label">Links:</div>

          <div className="links value">
            {this.state.links.map((link, index) => (
              <div className="userLink" key={index}>
                <a href={link.url}>{link.text}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    let user = "";
    let links = "";
    let skills = "";

    if (this.state.user !== {}) {
        user = this.renderUser(this.state.user);
    }

    if (this.state.links !== []) {
      links = this.renderLinks(this.state.user);
    }

    if (this.state.skills !== []) {
      skills = this.renderSkills(this.state.user);
    }

    return (
      <div className="userProfile">

        {user}
        {skills}
        {links}
      </div>
    );
  }
}

ShowProfile.contextTypes = {
  router: React.PropTypes.object
};
