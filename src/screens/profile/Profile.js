import React, { Component } from "react";
import "./Profile.css";
import Header from "../../common/header/Header";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Divider from "@material-ui/core/Divider";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import instagramapi from "../../common/config/instagramapi";

class Profile extends Component {
  // This method will redirect to login page if user is not loggedin
  loggedInCheck(props) {
    if (props.isloggedin !== true) props.history.push("/");
  }

  // This method loads user's instagram post data using 2 instagram graph API endpoints provided in upgrad assignment requirments
  loadInstagramData(that) {
    let instagramPost = [];
    let userinfo = this.props.userinfo;
    let token = sessionStorage.getItem("access-token");
    let mediaListUrl = instagramapi.medialist.replace("{token}", token);
    let randLikeCounter = 5;
    let mediaDetailResponse = (mediaDetail, index) => {
      userinfo.username = mediaDetail.username;
      if (mediaDetail.caption) {
        mediaDetail.hashtags = mediaDetail.caption
          .split(" ")
          .filter((str) => str.startsWith("#"))
          .join(" ");

        mediaDetail.shortcaption = mediaDetail.caption.replace(
          /(^|\s)#[a-zA-Z0-9][^\\p{L}\\p{N}\\p{P}\\p{Z}][\w-]*\b/g,
          ""
        );
      }

      var modifiedPostData = this.props.modifiedPostData[index];
      mediaDetail.likeclicked =
        modifiedPostData && modifiedPostData.likeclicked
          ? modifiedPostData.likeclicked
          : false;
      mediaDetail.likeCount =
        modifiedPostData && modifiedPostData.likeCount
          ? modifiedPostData.likeCount
          : randLikeCounter;
      mediaDetail.comments =
        modifiedPostData && modifiedPostData.comments
          ? modifiedPostData.comments
          : [];

      mediaDetail.show = true;
      instagramPost[index] = mediaDetail;

      that.setState({
        instagrampost: instagramPost,
        userinfo: userinfo,
      });
      randLikeCounter++;
    };

    let mediaListResponse = (mediaList) => {
      mediaList["data"].forEach((media, index) => {
        let mediaDetailsUrl = instagramapi.mediadetails
          .replace("{token}", token)
          .replace("{mediaid}", media.id);

        // Second API Endpoint for Instagram Called here
        this.props.fetchData(
          mediaDetailsUrl,
          mediaDetailResponse,
          "GET",
          index
        );
      });

      userinfo.posts = mediaList["data"].length;
    };

    // First API Endpoint for Instagram Called here
    this.props.fetchData(mediaListUrl, mediaListResponse, "GET");
  }

  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      showPostModal: false,
      fullnameRequired: "dispHide",
      userfullname: "",
      postIndex: 0,
      post: {},
      tempcomment: [],
      instagrampost: [],
    };
    this.loggedInCheck(props);
  }

  componentDidMount() {
    if (this.props.isloggedin === true) this.loadInstagramData(this);
  }

  // This method handle editing for user name in profile
  updateHandler = (e) => {
    if (this.state.userfullname.trim().length > 0) {
      this.props.userinfo.fullname = this.state.userfullname;
      this.setState({ userfullname: "", fullnameRequired: "dispHide" });
      this.setState({ showEditModal: false });
    } else {
      this.setState({ fullnameRequired: "dispBlock" });
    }
  };

  fullnameHandler = (e) => {
    this.setState({ userfullname: e.target.value });
  };

  openEditModalHandler = () => {
    this.setState({ showEditModal: true });
  };

  closeEditModalHandler = () => {
    this.setState({ showEditModal: false });
  };

  closePostModalHandler = () => {
    this.setState({ showPostModal: false });
  };

  // Opens individual post in modal in profile page
  openPostModalHandler = (index) => {
    let selectedPost = this.state.instagrampost[index];
    this.setState({
      showPostModal: true,
      post: selectedPost,
      postIndex: index,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          isloggedin={this.props.isloggedin}
          page="profile"
          profilepicture={this.props.profilepicture}
          history={this.props.history}
        />
        <div className="profile-head">
          <Avatar
            variant="circular"
            alt="Profile Picture"
            src={this.props.profilepicture}
            className={classes.avatar}
          />
          <div className="profile-details">
            <Typography variant="h4">{this.props.userinfo.username}</Typography>
            <div className="user-stats">
              <div>
                <Typography variant="body1">
                  <span>Posts: </span>
                  {this.props.userinfo.posts}
                </Typography>
              </div>
              <div>
                <Typography variant="body1">
                  <span>Follows: </span>
                  {this.props.userinfo.follows}
                </Typography>
              </div>
              <div>
                <Typography variant="body1">
                  <span>Followed By: </span>
                  {this.props.userinfo.followers}
                </Typography>
              </div>
            </div>

            <div>
              <Typography variant="h6">
                <span>{this.props.userinfo.fullname}</span>
                <Fab
                  size="medium"
                  color="secondary"
                  aria-label="edit"
                  className={classes.editIcon}
                  onClick={this.openEditModalHandler}
                >
                  <EditIcon />
                </Fab>
              </Typography>
            </div>
          </div>
        </div>

        <div className="post-tiles">
          <GridList cols={3} cellHeight={450}>
            {this.state.instagrampost.map(
              (post, index) =>
                post.media_type === "IMAGE" && (
                  <GridListTile
                    onClick={() => this.openPostModalHandler(index)}
                    key={"tile_" + post.id}
                  >
                    <img
                      src={post.media_url}
                      alt={post.caption}
                      className="post-tile-img"
                    />
                  </GridListTile>
                )
            )}
          </GridList>
        </div>

        <Modal
          open={this.state.showEditModal}
          onClose={this.closeEditModalHandler}
        >
          <div className={classes.editModalBody}>
            <FormControl>
              <Typography variant="h4">Edit</Typography>
            </FormControl>
            <br />
            <br />
            <FormControl required>
              <InputLabel htmlFor="fullName">Full Name</InputLabel>
              <Input
                type="text"
                id="fullName"
                onChange={this.fullnameHandler}
              />
              <FormHelperText className={this.state.fullnameRequired}>
                <span className="required red">required</span>
              </FormHelperText>
            </FormControl>
            <br />
            <br />

            <Button
              variant="contained"
              color="primary"
              onClick={this.updateHandler}
            >
              UPDATE
            </Button>
          </div>
        </Modal>

        <Modal
          open={this.state.showPostModal}
          onClose={this.closePostModalHandler}
        >
          <div className={classes.postModalContainer}>
            <div className="post-modal-left">
              <img
                src={this.state.post.media_url}
                alt={this.state.post.media_url}
                className="post-modal-img"
              />
            </div>
            <div className="post-modal-right">
              <div className="post-modal-right-header">
                <Avatar
                  variant="circular"
                  alt="Insta-Profile Pic"
                  src={this.props.profilepicture}
                />

                <Typography variant="h6" className={classes.postModalUsername}>
                  {this.state.post.username}
                </Typography>
              </div>
              <div className="header-divide">
                <Divider variant="fullWidth" />
              </div>

              <div className="post-caption">
                <Typography className={classes.captionText}>
                  {this.state.post.shortcaption}
                </Typography>
                <Typography className={classes.hashtagText}>
                  {this.state.post.hashtags}
                </Typography>
              </div>

              <div className="modal-comment-div">
                {this.getModifiedPostData(this.state.postIndex) &&
                this.getModifiedPostData(this.state.postIndex).comments &&
                this.getModifiedPostData(this.state.postIndex).comments.length >
                  0
                  ? this.getModifiedPostData(this.state.postIndex).comments.map(
                      (comment, i) => (
                        <div
                          key={"comment_user_" + this.state.postIndex + "_" + i}
                          className={classes.commentuser}
                        >
                          <b>{comment.username}:</b> {comment.text}
                        </div>
                      )
                    )
                  : ""}
              </div>

              <div className="post-icon-div">
                {this.getModifiedPostData(this.state.postIndex) &&
                this.getModifiedPostData(this.state.postIndex).likeclicked ? (
                  <FavoriteIcon
                    className={classes.likeIconClicked}
                    onClick={() => this.likeClickHandler(this.state.postIndex)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className={classes.likeIcon}
                    onClick={() => this.likeClickHandler(this.state.postIndex)}
                  />
                )}
                <Typography className={classes.likeText}>
                  {this.getModifiedPostData(this.state.postIndex) &&
                    this.getModifiedPostData(this.state.postIndex)
                      .likeCount}{" "}
                  Likes
                </Typography>
              </div>

              <div className="post-input-comment-div">
                <FormControl
                  style={{ marginRight: 10 }}
                  className="post-comment-form-control"
                >
                  <InputLabel htmlFor="comment-input">Add a comment</InputLabel>
                  <Input
                    id="comment-input"
                    type="text"
                    value={
                      this.state.tempcomment[this.state.postIndex] &&
                      this.state.tempcomment[this.state.postIndex].text
                        ? this.state.tempcomment[this.state.postIndex].text
                        : ""
                    }
                    onChange={(e) =>
                      this.commentTypeHandler(e, this.state.postIndex)
                    }
                  />
                </FormControl>
                <FormControl style={{ verticalAlign: "bottom" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) =>
                      this.submitCommentHandler(
                        this.state.postIndex,
                        this.state.post.username
                      )
                    }
                  >
                    ADD
                  </Button>
                </FormControl>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  getModifiedPostData = (index) => {
    if (this.props.modifiedPostData[index]) {
      return this.props.modifiedPostData[index];
    } else {
      return this.state.instagrampost[index];
    }
  };

  saveModifiedData = (instagrampost, index) => {
    let modifiedData = this.props.modifiedPostData;
    modifiedData[index] = instagrampost[index];
    this.setState({
      modifiedPostData: this.props.modifiedPostData,
    });
  };

  // On heart-shaped like button click this method is called
  likeClickHandler = (index) => {
    let post = this.state.instagrampost[index];

    if (post.likeclicked) {
      post.likeclicked = false;
      post.likeCount -= 1;
    } else {
      post.likeclicked = true;
      post.likeCount += 1;
    }
    this.saveModifiedData(this.state.instagrampost, index);
    this.setState({
      instagrampost: this.state.instagrampost,
    });
  };

  commentTypeHandler = (e, index) => {
    var commentlist = this.state.tempcomment;
    commentlist[index] = { text: e.target.value };
    this.setState({
      tempcomment: commentlist,
    });
  };

  // Submits comment typed in profile page post-modal
  submitCommentHandler = (index, username) => {
    let post = this.state.instagrampost[index];
    var commentlist = this.state.tempcomment;
    if (
      commentlist[index] &&
      commentlist[index].text &&
      commentlist[index].text.trim() !== ""
    ) {
      post.comments.push({ username: username, text: commentlist[index].text });
      commentlist[index].text = "";
      this.saveModifiedData(this.state.instagrampost, index);
      this.setState({
        instagrampost: this.state.instagrampost,
        tempcomment: commentlist,
      });
    }
  };
}

const styles = (theme) => ({
  avatar: {
    width: 145,
    height: 145,
  },
  editIcon: {
    margin: "10px 0 0 17px",
  },
  editModalBody: {
    backgroundColor: "white",
    width: 200,
    padding: 25,
    borderRadius: 4,
    border: "2px solid #dcd6d6",
    outline: 0,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
  postModalContainer: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: 800,
    padding: 25,
    borderRadius: 4,
    border: "2px solid #dcd6d6",
    outline: 0,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
  postModalUsername: {
    paddingLeft: "15px",
    paddingTop: "5px",
  },
  captionText: {
    fontSize: "14px",
  },
  likeText: { paddingLeft: 15 },
  hashtagText: {
    fontSize: "14px",
    color: "#0ab7ff",
  },
  commentuser: {},
  likeIcon: { fontSize: 30, cursor: "pointer" },
  likeIconClicked: {
    fontSize: 30,
    cursor: "pointer",
    color: "red",
  },
});

export default withStyles(styles)(Profile);
