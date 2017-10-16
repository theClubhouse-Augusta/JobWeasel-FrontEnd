/**
*
* Skills
*
*/

import React from 'react';
import ReactTags from 'react-tag-autocomplete';

import './style.css';
import './styleM.css';

export default class Skills extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      notification: "",
      user_id: "",
      tags: [],
      suggestions: []
    };
  }

  componentWillReceiveProps(props) {
    this.getTags(this.props.id);
    this.getSuggestions();
  }

  getTags = (id) => {
    let url = "http://localhost:8000/api/getUserSkills/" + id;
    let _this = this;

    fetch(url, {method: 'GET'}).then(
      function(response) {
        return response.json();
      }
    ).then(
      function(json) {
        _this.setState({
          tags: json.skills
        });
      }.bind(this)
    );
  }

  getSuggestions = () => {
    let url = "http://localhost:8000/api/getSkills/";
    let _this = this;

    fetch(url, {method: 'GET'}).then(
      function(response) {
        return response.json();
      }
    ).then(
      function(json) {
        _this.setState({
          suggestions: json.skills
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

  handleDelete (i) {
    let skill_name = this.state.tags[i].name;
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
    this.handleRemoveUserSkill(skill_name);
  }

  handleRemoveUserSkill = (skill_name) => {
    let url = "http://localhost:8000/api/removeUserSkill";
    let _this = this;

    let data = new FormData;
    data.append('skill_name', skill_name);

    let token = sessionStorage.getItem("token");
    let auth = {"Authorization": "Bearer " + token};

    fetch(url, {method: 'POST', body: data, headers: auth})
      .then(function(response) {return response.json();})
      .then(function(json) {
        console.log("removeUserSkill");
        console.log(json);

        _this.getNotification(json);
      }
    );
  }

  handleAddUserSkill = (skill_name) => {
    let url = "http://localhost:8000/api/addUserSkill";
    let _this = this;

    let data = new FormData;
    data.append('skill_name', skill_name);

    let token = sessionStorage.getItem("token");
    let auth = {"Authorization": "Bearer " + token};

    fetch(url, {method: 'POST', body: data, headers: auth})
      .then(function(response) {return response.json();})
      .then(function(json) {
        console.log("addUserSkill");
        console.log(json);

        _this.getNotification(json);
      }
    );
  }

  handleAddition (tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
    console.log(tags);
    this.handleAddUserSkill(tag.name);
  }

  renderNotification = (text) => {
    return (
      <div className="jsonNotification">
        {text}
      </div>
    );
  }

  render () {
    let notification = "";

    if (this.state.notification !== "") {
      notification = this.renderNotification(this.state.notification);
    }

    return (
      <div className="userSkills">
        <ReactTags className=""
          tags={this.state.tags}
          suggestions={this.state.suggestions}
          handleDelete={this.handleDelete.bind(this)}
          handleAddition={this.handleAddition.bind(this)}
          allowNew={true}
        />

        {notification}
      </div>
    )
  }
}

Skills.contextTypes = {
  router: React.PropTypes.object
};
