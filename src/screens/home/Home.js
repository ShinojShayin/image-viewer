import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class Home extends Component {
  loggedInCheck(props, object) {
    props.isloggedin === true
      ? (object.state.accesstoken = sessionStorage.getItem("access-token"))
      : props.history.push("/");
  }

  constructor(props) {
    super(props);
    this.state = {
      accesstoken: "",
    };
    this.loggedInCheck(props, this);
  }

  render() {
    return (
      <div>
        <Header isloggedin={this.props.isloggedin} />
        Homepage
      </div>
    );
  }
}

export default withStyles(styles)(Home);
