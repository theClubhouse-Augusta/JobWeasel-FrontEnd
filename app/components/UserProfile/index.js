/**
*
* UserProfile
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class UserProfile extends React.PureComponent {

  constructor() {
    super();
    this.state={



    }
  }

  handleUser = (event) => {
    this.setState({
      user:event.target.value
    })
  }




  render() {
    return (
      <div className="profileBox">


      <div className="user">
      <h1> User Name
      <input type="text" value={this.state.user} onChange={this.handleUser}  />
      </h1>

      <div className="image">
        <img src=".../images/businessWeasel.jpg" className="profileImage"/>
      </div>

      <section>
        <form>
          <div className="title">
          <input type="text" value="title"   />
          </div>
          <div className="email">
          <input type="text" value="email"   />
          </div>
          <div className="location">
          <input type="text"    />
          </div>
          <div className="status">
          <input type="text"    />
          </div>
        </form>

        <button className ="submit">

          <input type="submit"  />

        </button>

    </section>

      <article>
        <div className="userBio"   />
        <input type="longtext"  />
      </article>

      <section>
        <p><a href="https://www.resume.com">My Resume</a></p>
        <p><a href="https://www.portfolio.com">My Portfolio or Website</a></p>
        <p><a href="https://www.linkedin.com">My LinkedIn or Social Media</a></p>
        <p><a href="https://www.github.com">My Github</a></p>
      </section>


      </div>
    );
  }
}

UserProfile.contextTypes = {
  router: React.PropTypes.object
};
