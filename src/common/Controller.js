import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../screens/login/Login";
import Home from "../screens/home/Home";

class Controller extends Component {
  loggedInCheck() {
    let token = sessionStorage.getItem("access-token");
    return !(token === "" || token == null);
  }

  logoutHandler = () => {
    sessionStorage.clear();
    window.location.replace("/");
  };

  fetchData = (url, callback, httpmethod, extra) => {
    let data = null;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        callback(JSON.parse(this.responseText), extra);
      }
    });
    xhr.open(httpmethod, url);
    xhr.send(data);
  };

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
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default Controller;
