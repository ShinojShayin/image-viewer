import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardHeader } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  card: {
    maxWidth: 1100,
  },
  avatar: {
    margin: 10,
  },
  girdContainer: {
    width: "88%",
    margin: "auto",
    paddingTop: 10,
  },
  caption: {
    fontSize: "15px",
  },
  hashtags: {
    fontSize: "15px",
    color: "#0ab7ff",
  },
  likeIcon: { fontSize: 30, cursor: "pointer" },
  likeIconClicked: { color: "red", fontSize: 30, cursor: "pointer" },
  commentuser: { margin: "0 0 10px 0" },
  postHeader: { padding: "16px 25px" },
  postBody: { padding: "16px 25px" },
});

class HomePost extends Component {
  likeClickHandler = (index) => {
    let post = this.props.instagrampost[index];

    if (post.likeclicked) {
      post.likeclicked = false;
      post.likeCount -= 1;
    } else {
      post.likeclicked = true;
      post.likeCount += 1;
    }

    this.setState({
      instagrampost: this.props.instagrampost,
    });
  };

  submitCommentHandler = (e, index, username) => {
    let post = this.props.instagrampost[index];
    var commentlist = this.state.tempcomment;
    post.comments.push({ username: username, text: commentlist[index].text });
    commentlist[index].text = "";
    this.setState({
      instagrampost: this.props.instagrampost,
      tempcomment: commentlist,
    });
  };

  commentTypeHandler = (e, index) => {
    var commentlist = this.state.tempcomment;
    commentlist[index] = { text: e.target.value };
    this.setState({
      tempcomment: commentlist,
    });
  };

  constructor() {
    super();
    this.state = {
      tempcomment: [],
    };
  }

  render() {
    let getTime = (postDate) => {
      let createdTime = new Date(postDate);

      let yyyy = createdTime.getFullYear();
      let mm = (createdTime.getMonth() + 1).toString().padStart(2, "0");
      let dd = createdTime
        .getDate()
        .toString()
        .padStart(2, "0");

      let HH = createdTime
        .getHours()
        .toString()
        .padStart(2, "0");

      let MM = createdTime
        .getMinutes()
        .toString()
        .padStart(2, "0");

      let ss = createdTime
        .getSeconds()
        .toString()
        .padStart(2, "0");

      return dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MM + ":" + ss;
    };

    const { classes } = this.props;

    return (
      <React.Fragment>
        {/* {JSON.stringify(this.props.instagrampost)} */}
        <Grid
          alignContent="center"
          container
          spacing={3}
          justify="flex-start"
          direction="row"
          className={classes.girdContainer}
        >
          {this.props.instagrampost.map(
            (post, index) =>
              post.show === true &&
              post.media_type === "IMAGE" && (
                <Grid item xs={6} key={"grid_" + index}>
                  <Card key={"card_" + index}>
                    <CardHeader
                      avatar={
                        <Avatar
                          variant="circular"
                          src={this.props.profilepicture}
                        />
                      }
                      title={post.username}
                      subheader={getTime(post.timestamp)}
                      className={classes.postHeader}
                    />
                    <CardContent className={classes.postBody}>
                      <img
                        src={post.media_url}
                        alt={post.media_url}
                        className="post-img"
                      />

                      <div className="post-divider">
                        <Divider variant="fullWidth" />
                      </div>

                      {post.shortcaption && (
                        <Typography className={classes.caption}>
                          {post.shortcaption}
                        </Typography>
                      )}

                      {post.hashtags !== "" && (
                        <Typography className={classes.hashtags}>
                          {post.hashtags}
                        </Typography>
                      )}

                      <div className="post-icon-div">
                        {post.likeclicked ? (
                          <FavoriteIcon
                            className={classes.likeIconClicked}
                            onClick={() => this.likeClickHandler(index)}
                          />
                        ) : (
                          <FavoriteBorderIcon
                            className={classes.likeIcon}
                            onClick={() => this.likeClickHandler(index)}
                          />
                        )}
                        <Typography style={{ paddingLeft: 15 }}>
                          {post.likeCount} Likes
                        </Typography>
                      </div>

                      <div className="comment-div">
                        {post.comments.length > 0
                          ? post.comments.map((comment, i) => (
                              <div
                                key={"comment_user_" + index + "_" + i}
                                className={classes.commentuser}
                              >
                                <b>{comment.username}:</b> {comment.text}
                              </div>
                            ))
                          : ""}
                      </div>

                      <div>
                        <FormControl
                          style={{ marginRight: 10 }}
                          className="comment-input"
                        >
                          <InputLabel htmlFor={"comment_" + index}>
                            Add a comment
                          </InputLabel>
                          <Input
                            type="input"
                            value={
                              this.state.tempcomment[index] &&
                              this.state.tempcomment[index].text
                                ? this.state.tempcomment[index].text
                                : ""
                            }
                            onChange={(e) => {
                              this.commentTypeHandler(e, index);
                            }}
                          />
                        </FormControl>
                        <FormControl style={{ verticalAlign: "bottom" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                              this.submitCommentHandler(
                                e,
                                index,
                                post.username
                              );
                              e.target.value = "";
                            }}
                          >
                            ADD
                          </Button>
                        </FormControl>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              )
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HomePost);
