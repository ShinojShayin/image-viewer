import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import { withStyles } from "@material-ui/core/styles";
import HomePost from "./HomePost";
import instagramapi from "../../common/config/instagramapi";
import profilepic from "../../assets/profilepic.png";

const styles = (theme) => ({});

class Home extends Component {
  loadInstagramData(that) {
    let instagramPost = [];
    let token = sessionStorage.getItem("access-token");
    let mediaListUrl = instagramapi.medialist.replace("{token}", token);
    let randLikeCounter = 5;
    let mediaDetailResponse = (mediaDetail, index) => {
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

      mediaDetail.likeclicked = false;
      mediaDetail.likeCount = randLikeCounter;
      instagramPost[index] = mediaDetail;

      that.setState({
        instagrampost: instagramPost,
      });
      randLikeCounter++;
    };

    let mediaListRespone = (mediaList) => {
      mediaList["data"].forEach((media, index) => {
        let mediaDetailsUrl = instagramapi.mediadetails
          .replace("{token}", token)
          .replace("{mediaid}", media.id);

        this.props.fetchData(
          mediaDetailsUrl,
          mediaDetailResponse,
          "GET",
          index
        );
      });
    };

    this.props.fetchData(mediaListUrl, mediaListRespone, "GET");
  }

  loggedInCheck(props, object) {
    props.isloggedin === true
      ? (object.state.accesstoken = sessionStorage.getItem("access-token"))
      : props.history.push("/");
  }

  constructor(props) {
    super(props);
    this.state = {
      accesstoken: "",
      instagrampost: [],
      profile_picture: profilepic,
    };
    this.loggedInCheck(props, this);
    this.loadInstagramData(this);
  }

  render() {
    return (
      <div>
        <Header
          isloggedin={this.props.isloggedin}
          logoutCall={this.props.logoutCall}
          profilepicture={this.state.profile_picture}
        />
        {/* {JSON.stringify(this.state.instagrampost)} */}
        <HomePost
          instagrampost={this.state.instagrampost}
          profilepicture={this.state.profile_picture}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
