import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../screens/login/Login";
import Home from "../screens/home/Home";

class Controller extends Component {
  loggedInCheck() {
    let token = sessionStorage.getItem("access-token");
    return !(token === "" || token == null);
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
              <Home {...props} isloggedin={this.loggedInCheck()} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default Controller;
