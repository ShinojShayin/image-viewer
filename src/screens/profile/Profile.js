import React, { Component } from "react";
import "./Profile.css";
import Header from "../../common/header/Header";
import { withStyles } from "@material-ui/core/styles";

class Profile extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <Header
          isloggedin={this.props.isloggedin}
          page="profile"
          logoutCall={this.props.logoutCall}
          profilepicture={this.props.profilepicture}
        />
        Test profile
      </div>
    );
  }
}

const styles = (theme) => ({});

export default withStyles(styles)(Profile);
