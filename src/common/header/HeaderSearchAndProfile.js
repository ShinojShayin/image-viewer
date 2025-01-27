import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  appHeader: {
    backgroundColor: "#263238",
    boxShadow: "none",
  },
  searchContainer: {
    flexGrow: 1,
  },
  searchBox: {
    flexGrow: 1,
    position: "relative",
    borderRadius: "4px",
    backgroundColor: "#c0c0c0",
    marginLeft: 0,
    width: "300px",
    float: "right",
    marginRight: 20,
  },
  searchIcon: {
    width: theme.spacing(4),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
  },
  popover: {
    backgroundColor: "#efefef",
    padding: "10px",
    boxShadow: "inherit !important",
  },
  searchInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: 300,
      "&:focus": {
        width: 200,
      },
    },
  },
  divider: {
    height: "1px",
    backgroundColor: "#74747463",
  },
  avatar: {
    height: 40,
    width: 40,
  },
});

class HeaderSearchAndProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  logoutHandler = () => {
    sessionStorage.clear();
    this.props.history.push("/");
  };

  profileClickHandler = (obj) => {
    this.setState({
      anchorEl: obj.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {this.props.page !== "profile" && (
          <div className={classes.searchContainer}>
            <div className={classes.searchBox}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={(e) => {
                  this.props.searchPostHandler(e.target.value);
                }}
                placeholder="Search…"
                classes={{
                  input: classes.searchInput,
                }}
              />
            </div>
          </div>
        )}

        <div className="profle-container">
          <IconButton
            onClick={this.profileClickHandler}
            className="float-right"
          >
            <Avatar
              alt="Profile Pic"
              src={this.props.profilepicture}
              className={classes.avatar}
              style={{ border: "1px solid #fff" }}
            />
          </IconButton>

          <Popover
            id="profile-popover"
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div className={classes.popover}>
              {this.props.page === "home" && (
                <React.Fragment>
                  <Link to="/profile">
                    <MenuItem>
                      <Typography>My Account</Typography>
                    </MenuItem>
                  </Link>
                  <div className={classes.divider} />
                </React.Fragment>
              )}

              <MenuItem onClick={this.logoutHandler}>
                <Typography>Logout</Typography>
              </MenuItem>
            </div>
          </Popover>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HeaderSearchAndProfile);
