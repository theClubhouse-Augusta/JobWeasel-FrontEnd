/**
*
* EditAdmins
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class EditAdmins extends React.PureComponent {
  constructor () {
    super (),
    this.state = {
      users: [],
      notification: "",
    }
  }

  componentWillMount() {
    this.getUsers();
  }

  getUsers = () => {
    let url = "http://localhost:8000/api/getUsers";
    let _this = this;

    fetch(url, {'method': 'GET'}).then(
      function(response) {
        return response.json();
      }).then(
      function(json) {
        if (json.users) {
          _this.setState({
            users: json.users.data
          });
        }
      }
    );
  }

  makeAdmin = (id) => {
    let data = new FormData;
    let _this = this;
    data.append('user_id', id);

    fetch('http://localhost:8000/api/makeAdmin', {
      method: 'POST',

      body:data,
      headers:{"Authorization":"Bearer "+ sessionStorage.getItem('token')}
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json.error) {
        _this.setState({
          notification: json.error
        })
      }
      else {
        _this.setState({
          notification: json.success
        })
      }
      setTimeout(function(){
        _this.setState({
          notification: ""
        })
      }, 2500)
    }.bind(this));
  }

  render() {
    if(this.props.open === true) {
      return (
        <div>
            <div className="editAdminsUnderlay" onClick={this.props.onClose}>
            </div>
          <div className="editAdminsContainer">
            <div className="editAdminsInput">
              <h3>Add Administrators</h3>
              <div className="usersList">
                <div className="adminUsersDisplay">
                  {this.state.users.map((t,i) => (<div key={i} onClick={()=>this.makeAdmin(t.id)}>
                  {t.name}
                  </div>))}
                </div>
              </div>
              <p className="submitNote">{this.state.notification}</p>
            </div>
          </div>
        </div>
      );
    }
    else {
      return(
        <div></div>
      )
    }


  }
}

EditAdmins.contextTypes = {
  router: React.PropTypes.object
};
