import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import HomePost from "./HomePost";

class Home extends Component {
  loggedInCheck(props) {
    if (props.isloggedin !== true) props.history.push("/");
  }

  constructor(props) {
    super(props);
    this.loggedInCheck(props);
  }

  render() {
    return (
      <div>
        <Header
          isloggedin={this.props.isloggedin}
          logoutCall={this.props.logoutCall}
          profilepicture={this.props.profilepicture}
          page="home"
        />

        <HomePost
          instagrampost={this.props.instagrampost}
          profilepicture={this.props.profilepicture}
        />
      </div>
    );
  }
}

export default Home;
