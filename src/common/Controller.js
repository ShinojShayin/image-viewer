import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../screens/login/Login";

class Controller extends Component {
  constructor() {
    super();
    this.baseUrl = "http://3.227.145.17:8085/api/v1/";
  }

  render() {
    return (
      <Router>
        <div className="main-container">
          <Route exact path="/" render={(props) => <Login {...props} />} />
        </div>
      </Router>
    );
  }
}

export default Controller;
