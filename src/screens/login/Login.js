import React, { Component } from "react";
import "./Login.css";
import Header from "../../common/header/Header";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

class Login extends Component {
  loginClickHandler = () => {
    // Following mock username and password used for login
    let username = "admin";
    let password = "admin";

    /**
     * Following accessToken (Created On: 29-04-2021) used for instagram api's,
     * currently declared access-token is long-lived accesstoken which will last for 60 days
     * */
    // let accessToken =
    //   "IGQVJWQVVtTnhxbGlOc0dMVlBwNlI0WkpXamg5aUdTbzdURnkxZAjBvVzhTeGN1ZATBkeEtSdzRxMGNfdWl4aVEyLWlsYTNESG1rUmdhMXRvWE9pRWlGbUdJRERWbWgyRDgxUGNTUzV3";
    let accessToken =
      "IGQVJYTWFZAdGtRby0yc2M2TXZAqNHRKV0xwMVJQSzdxUVNIalRWWjE2R016VVFWYzB5cE9uWTltMkZATNmlVYXJDUVFHVWd6dmp2NjJmQVBablM4LVBoMGE1eVlJRTdVSXMyWVhKUGp3OFlPNW5vaHVmUgZDZD";
    let isUserPresent = this.state.usernameInput === "";
    let isPasswordPresent = this.state.passwordInput === "";

    isUserPresent
      ? this.setState({ usernameRequired: "dispBlock" })
      : this.setState({ usernameRequired: "dispHide" });

    isPasswordPresent
      ? this.setState({ loginPasswordRequired: "dispBlock" })
      : this.setState({ loginPasswordRequired: "dispNone" });

    if (!isUserPresent && !isPasswordPresent) {
      if (
        this.state.usernameInput === username &&
        this.state.passwordInput === password
      ) {
        this.setState({ incorrectPassword: "dispNone" });
        sessionStorage.setItem("access-token", accessToken);
        window.location.replace("/home");
      } else {
        this.setState({ incorrectPassword: "dispBlock" });
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      usernameRequired: "dispHide",
      usernameInput: "",
      loginPasswordRequired: "dispNone",
      passwordInput: "",
      incorrectPassword: "dispNone",
    };

    if (props.isloggedin) {
      props.history.push("/home");
    }
  }

  inputUsernameChangeHandler = (e) => {
    this.setState({ usernameInput: e.target.value });
  };

  inputPasswordChangeHandler = (e) => {
    this.setState({ passwordInput: e.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header isloggedin={this.props.isloggedin} page="login" />
        <div className="loginbox">
          <Card className="card-container">
            <CardContent>
              <Typography className={classes.title} color="textPrimary">
                LOGIN
              </Typography>
              <FormControl required>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  type="text"
                  className={classes.form_field}
                  onChange={this.inputUsernameChangeHandler}
                />
                <FormHelperText className={this.state.usernameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <FormControl required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  className={classes.form_field}
                  onChange={this.inputPasswordChangeHandler}
                />
                <FormHelperText className={this.state.loginPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.incorrectPassword}>
                  <span className="red">
                    Incorrect username and/or password
                  </span>
                </FormHelperText>
              </FormControl>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
                className={classes.loginBtn}
              >
                LOGIN
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: "20px",
    marginBottom: "10px",
  },
  form_field: {
    width: "325px",
  },
  loginBtn: {
    marginTop: "30px",
  },
});

export default withStyles(styles)(Login);
