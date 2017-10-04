/**
*
* PhotoUpload
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class PhotoUpload extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      photo:"",
      preview:""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
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
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="profileImageUpload">Upload Profile Image
          <p><input type="file" onChange={this.handlePhoto} /></p>
          <p><input type="submit" value="Submit"  /></p>
          <p><img src={this.state.preview}/></p>
        </div>
      </form>
    );
  }
}

PhotoUpload.contextTypes = {
  router: React.PropTypes.object
};
