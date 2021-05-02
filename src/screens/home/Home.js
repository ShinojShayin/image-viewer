import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import HomePost from "./HomePost";

class Home extends Component {
  loggedInCheck(props) {
    if (props.isloggedin !== true) props.history.push("/");
  }

  searchPostHandler = (value) => {
    let postList = this.props.instagrampost;
    if (!value || value === "") {
      postList.forEach((post, index) => {
        post.show = true;
      });
    } else {
      postList.forEach((post, index) => {
        if (
          post.shortcaption &&
          post.shortcaption.toUpperCase().indexOf(value.toUpperCase()) > -1
        ) {
          post.show = true;
        } else {
          post.show = false;
        }
      });
    }

    this.setState({
      instagrampost: postList,
    });

    console.log(JSON.stringify(this.props.instagrampost));
  };

  constructor(props) {
    super(props);
    this.loggedInCheck(props);
  }

  componentDidMount() {
    this.searchPostHandler("");
  }

  render() {
    return (
      <div>
        <Header
          isloggedin={this.props.isloggedin}
          logoutCall={this.props.logoutCall}
          profilepicture={this.props.profilepicture}
          searchPostHandler={this.searchPostHandler}
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
