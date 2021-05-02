import React, { Component } from "react";
import "./Header.css";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HeaderSearchAndProfile from "./HeaderSearchAndProfile";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  appHeader: {
    backgroundColor: "#263238",
    boxShadow: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

class Header extends Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar className={classes.appHeader} position="static">
        <Toolbar className={classes.toolbar}>
          <Link to="/">
            <Typography>
              <span className="logo-text">Image Viewer</span>
            </Typography>
          </Link>

          {this.props.isloggedin === true && (
            <HeaderSearchAndProfile
              logoutCall={this.props.logoutCall}
              profilepicture={this.props.profilepicture}
              page={this.props.page}
              searchPostHandler={this.props.searchPostHandler}
            />
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
