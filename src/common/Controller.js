import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../screens/login/Login";
import Home from "../screens/home/Home";
import Profile from "../screens/profile/Profile";
import instagramapi from "../common/config/instagramapi";
import profilepic from "../assets/profilepic.png";

class Controller extends Component {
  // Check whether current session loggedin or not
  loggedInCheck() {
    let token = sessionStorage.getItem("access-token");
    return !(token === "" || token == null);
  }

  // On-logout this method will clear session and redirect to login page
  logoutHandler = () => {
    sessionStorage.clear();
    window.location.replace("/");
  };

  // This method load user post data user 2 instagram graph api endpoints
  loadInstagramData(that) {
    let instagramPost = [];
    let userInfo = { fullname: "Upgard Education", follows: 4, followers: 6 };
    let token = sessionStorage.getItem("access-token");
    let mediaListUrl = instagramapi.medialist.replace("{token}", token);
    let randLikeCounter = 5;
    let mediaDetailResponse = (mediaDetail, index) => {
      userInfo.username = mediaDetail.username;
      if (mediaDetail.caption) {
        mediaDetail.hashtags = mediaDetail.caption
          .split(" ")
          .filter((str) => str.startsWith("#"))
          .join(" ");

        mediaDetail.shortcaption = mediaDetail.caption.replace(
          /(^|\s)#[a-zA-Z0-9][^\\p{L}\\p{N}\\p{P}\\p{Z}][\w-]*\b/g,
          ""
        );
      }

      mediaDetail.likeclicked = false;
      mediaDetail.likeCount = randLikeCounter;
      mediaDetail.comments = [];
      mediaDetail.show = true;
      instagramPost[index] = mediaDetail;

      that.setState({
        instagrampost: instagramPost,
        userinfo: userInfo,
      });
      randLikeCounter++;
    };

    let mediaListResponse = (mediaList) => {
      mediaList["data"].forEach((media, index) => {
        let mediaDetailsUrl = instagramapi.mediadetails
          .replace("{token}", token)
          .replace("{mediaid}", media.id);

        // Second API Endpoint for Instagram Called here
        this.fetchData(mediaDetailsUrl, mediaDetailResponse, "GET", index);
      });

      userInfo.posts = mediaList["data"].length;
    };

    // First API Endpoint for Instagram Called here
    this.fetchData(mediaListUrl, mediaListResponse, "GET");
  }

  // This method is used for fetching url data and callback method is fired on successful request
  fetchData = (url, callback, httpmethod, extra) => {
    let data = null;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          callback(JSON.parse(this.responseText), extra);
        } else {
          alert("Token might have expired or rate limit exceeded");
        }
      }
    });
    xhr.open(httpmethod, url);
    xhr.send(data);
  };

  constructor(props) {
    super(props);
    this.state = { instagrampost: [], userinfo: {} };
  }

  componentDidMount() {
    if (this.loggedInCheck()) {
      this.loadInstagramData(this);
    }
  }

  render() {
    return (
      <Router>
        <div className="main-container">
          <Route
            exact
            path="/"
            render={(props) => (
              <Login {...props} isloggedin={this.loggedInCheck()} />
            )}
          />
          <Route
            exact
            path="/home"
            render={(props) => (
              <Home
                {...props}
                isloggedin={this.loggedInCheck()}
                logoutCall={this.logoutHandler}
                fetchData={this.fetchData}
                instagrampost={this.state.instagrampost}
                profilepicture={profilepic}
              />
            )}
          />
          <Route
            exact
            path="/profile"
            render={(props) => (
              <Profile
                {...props}
                isloggedin={this.loggedInCheck()}
                logoutCall={this.logoutHandler}
                profilepicture={profilepic}
                userinfo={this.state.userinfo}
                instagrampost={this.state.instagrampost}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default Controller;
