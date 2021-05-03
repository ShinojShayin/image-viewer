import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import HomePost from "./HomePost";
import instagramapi from "../../common/config/instagramapi";

class Home extends Component {
  // This method will redirect to login page if user is not loggedin
  loggedInCheck(props) {
    if (props.isloggedin !== true) props.history.push("/");
  }

  // This method load user post data user 2 instagram graph api endpoints
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
    };

    // First API Endpoint for Instagram Called here
    this.props.fetchData(mediaListUrl, mediaListResponse, "GET");
  }

  // This method handles searching of post by caption in header search input box
  searchPostHandler = (value) => {
    let postList = this.state.instagrampost;
    if (!value || value === "") {
      postList.forEach((post, index) => {
        post.show = true;
      });
    } else {
      postList.forEach((post, index) => {
        if (
          post.shortcaption &&
          post.shortcaption.toUpperCase().indexOf(value.toUpperCase()) > -1
        ) {
          post.show = true;
        } else {
          post.show = false;
        }
      });
    }

    this.setState({
      instagrampost: postList,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      instagrampost: [],
    };
    this.loggedInCheck(props);
  }

  componentDidMount() {
    if (this.props.isloggedin === true) this.loadInstagramData(this);
  }

  render() {
    return (
      <div>
        <Header
          isloggedin={this.props.isloggedin}
          profilepicture={this.props.profilepicture}
          searchPostHandler={this.searchPostHandler}
          page="home"
          history={this.props.history}
        />

        <HomePost
          instagrampost={this.state.instagrampost}
          profilepicture={this.props.profilepicture}
          modifiedPostData={this.props.modifiedPostData}
        />
      </div>
    );
  }
}

export default Home;
