import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../screens/login/Login";
import Home from "../screens/home/Home";
import Profile from "../screens/profile/Profile";
import profilepic from "../assets/profilepic.png";

class Controller extends Component {
  // Utility method to check whether current user is loggedin or not. Return true if loggedin otherwise false
  loggedInCheck() {
    let token = sessionStorage.getItem("access-token");
    return !(token === "" || token == null);
  }

  // This is a utility method used for fetching url data and callback method is fired on successful request
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
    this.state = {
      modifiedPostData: [],
      userinfo: {
        fullname: "Upgard Education",
        follows: 4,
        followers: 6,
        username: "",
      },
    };
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
                profilepicture={profilepic}
                fetchData={this.fetchData}
                modifiedPostData={this.state.modifiedPostData}
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
                profilepicture={profilepic}
                fetchData={this.fetchData}
                modifiedPostData={this.state.modifiedPostData}
                userinfo={this.state.userinfo}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default Controller;
