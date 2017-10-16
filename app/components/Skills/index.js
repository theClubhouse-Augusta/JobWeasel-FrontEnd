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

  handleDelete (i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  handleAddition (tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
  }

  render () {
    return (
      <ReactTags className=""
        tags={this.state.tags}
        suggestions={this.state.suggestions}
        handleDelete={this.handleDelete.bind(this)}
        handleAddition={this.handleAddition.bind(this)}
        allowNew={true}
      />
    )
  }
}

Skills.contextTypes = {
  router: React.PropTypes.object
};
