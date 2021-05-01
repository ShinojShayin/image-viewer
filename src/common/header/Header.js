import React, { Component } from "react";
import "./Header.css";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HeaderSearchAndProfile from "./HeaderSearchAndProfile";

const styles = (theme) => ({
  appHeader: {
    backgroundColor: "#263238",
    boxShadow: "none",
  },
});

class Header extends Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar className={classes.appHeader} position="static">
        <Toolbar>
          <Typography>
            <span className="logo-text">Image Viewer</span>
          </Typography>

          {this.props.isloggedin === true && (
            <HeaderSearchAndProfile
              logoutCall={this.props.logoutCall}
              profilepicture={this.props.profilepicture}
            />
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
