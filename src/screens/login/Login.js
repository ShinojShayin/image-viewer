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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      usernameRequired: "dispHide",
      username: "",
      loginPasswordRequired: "dispNone",
      loginPassword: "",
      incorrectPassword: "dispNone",
    };
  }

  inputUsernameChangeHandler = (e) => {
    this.setState({ username: e.target.value });
  };

  inputPasswordChangeHandler = (e) => {
    this.setState({ loginPassword: e.target.value });
  };

  loginClickHandler = () => {
    // Following mock username and password used for login
    let username = "admin";
    let password = "admin";

    /**
     * Following accessToken (Created On: 29-04-2021) used for instagram api's,
     * currently declared access-token is long-lived accesstoken which will last 60 days
     * */
    let accessToken =
      "IGQVJWQVVtTnhxbGlOc0dMVlBwNlI0WkpXamg5aUdTbzdURnkxZAjBvVzhTeGN1ZATBkeEtSdzRxMGNfdWl4aVEyLWlsYTNESG1rUmdhMXRvWE9pRWlGbUdJRERWbWgyRDgxUGNTUzV3";

    let isUserPresent = this.state.username === "";
    let isPasswordPresent = this.state.loginPassword === "";

    isUserPresent
      ? this.setState({ usernameRequired: "dispBlock" })
      : this.setState({ usernameRequired: "dispHide" });

    isPasswordPresent
      ? this.setState({ loginPasswordRequired: "dispBlock" })
      : this.setState({ loginPasswordRequired: "dispNone" });

    if (!isUserPresent && !isPasswordPresent) {
      if (
        this.state.username === username &&
        this.state.loginPassword === password
      ) {
        this.setState({ incorrectPassword: "dispNone" });
        sessionStorage.setItem("access-token", accessToken);
        this.props.history.push("/home");
      } else {
        this.setState({ incorrectPassword: "dispBlock" });
      }
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
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

export default withStyles(styles)(Login);
