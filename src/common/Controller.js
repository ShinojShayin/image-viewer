import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../screens/login/Login";
import Home from "../screens/home/Home";
import Profile from "../screens/profile/Profile";
import instagramapi from "../common/config/instagramapi";
import profilepic from "../assets/profilepic.png";

class Controller extends Component {
  loggedInCheck() {
    let token = sessionStorage.getItem("access-token");
    return !(token === "" || token == null);
  }

  logoutHandler = () => {
    sessionStorage.clear();
    window.location.replace("/");
  };

  loadInstagramData(that) {
    let instagramPost = [];
    let userInfo = { fullname: "Upgard Education", followed: 4, followers: 6 };
    let token = sessionStorage.getItem("access-token");
    let mediaListUrl = instagramapi.medialist.replace("{token}", token);
    let randLikeCounter = 5;
    let mediaDetailResponse = (mediaDetail, index) => {
      userInfo.username = mediaDetail.username;
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
      mediaDetail.comments = [];
      instagramPost[index] = mediaDetail;

      that.setState({
        instagrampost: instagramPost,
        userinfo: userInfo,
      });
      randLikeCounter++;
    };

    let mediaListResponse = (mediaList) => {
      mediaList["data"].forEach((media, index) => {
        let mediaDetailsUrl = instagramapi.mediadetails
          .replace("{token}", token)
          .replace("{mediaid}", media.id);

        this.fetchData(mediaDetailsUrl, mediaDetailResponse, "GET", index);
      });

      userInfo.posts = mediaList["data"].length;
    };

    //  this.fetchData(mediaListUrl, mediaListResponse, "GET");
    let dummyData = [
      {
        id: "17888128313076865",
        media_type: "IMAGE",
        media_url:
          "https://scontent.cdninstagram.com/v/t51.29350-15/179834216_510244940155374_8709518673781617416_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=Lj01QiD_maUAX8W6QNm&_nc_ht=scontent.cdninstagram.com&oh=9075702861e1735e5af4c9e0c6f45221&oe=60B19BB1",
        username: "iiitb_shinoj",
        timestamp: "2021-04-30T09:59:11+0000",
        caption: "Post3 is a quote",
        hashtags: "",
        shortcaption: "Post3 is a quote",
        likeclicked: false,
        likeCount: 6,
        comments: [],
      },
      {
        id: "17881588511317467",
        media_type: "IMAGE",
        media_url:
          "https://scontent.cdninstagram.com/v/t51.29350-15/178528904_128250822630819_8305680138891382163_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=B518FfaQK-sAX_owgGF&_nc_ht=scontent.cdninstagram.com&oh=395a9e95c708c0c128154151c8e9233e&oe=60B36529",
        username: "iiitb_shinoj",
        timestamp: "2021-04-30T09:58:02+0000",
        caption: "#maza Second post is a mango trophy #mangohai #masthai",
        hashtags: "#maza #mangohai #masthai",
        shortcaption: " Second post is a mango trophy",
        likeclicked: false,
        likeCount: 7,
        comments: [],
      },
      {
        id: "17904614599784191",
        media_type: "IMAGE",
        media_url:
          "https://scontent.cdninstagram.com/v/t51.29350-15/177639852_275211150886642_4555143060469393267_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=sQeKBSpWzsEAX-KnJOl&_nc_oc=AQmv3rjJVk23CwuyDvXAbu3SO1zRPozSo2JSz6sYRlJ8vsV4wE69w8wFa-7jOXVag_7YYkQfFjQjFL19G2w_nNsz&_nc_ht=scontent.cdninstagram.com&oh=ed6b10eda621e7adda1d523506d2af62&oe=60B4BA54",
        username: "iiitb_shinoj",
        timestamp: "2021-04-24T16:53:35+0000",
        caption: "First post",
        hashtags: "",
        shortcaption: "First post",
        likeclicked: false,
        likeCount: 5,
        comments: [],
      },
    ];

    userInfo.posts = dummyData.length;
    userInfo.username = dummyData[0].username;
    that.setState({
      instagrampost: dummyData,
      userinfo: userInfo,
    });
  }

  fetchData = (url, callback, httpmethod, extra) => {
    let data = null;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          callback(JSON.parse(this.responseText), extra);
        } else {
          alert("Token might have expired or rate limit exceeded");
        }
      }
    });
    xhr.open(httpmethod, url);
    xhr.send(data);
  };

  constructor(props) {
    super(props);
    this.state = { instagrampost: [], userinfo: {} };
  }

  componentDidMount() {
    if (this.loggedInCheck()) {
      this.loadInstagramData(this);
    }
  }

  render() {
    return (
      <Router>
        <div className="main-container">
          <Route
            exact
            path="/"
            render={(props) => (
              <Login {...props} isloggedin={this.loggedInCheck()} />
            )}
          />
          <Route
            exact
            path="/home"
            render={(props) => (
              <Home
                {...props}
                isloggedin={this.loggedInCheck()}
                logoutCall={this.logoutHandler}
                fetchData={this.fetchData}
                instagrampost={this.state.instagrampost}
                profilepicture={profilepic}
                loadInstagramData={this.loadInstagramData}
              />
            )}
          />
          <Route
            exact
            path="/profile"
            render={(props) => (
              <Profile
                {...props}
                isloggedin={this.loggedInCheck()}
                logoutCall={this.logoutHandler}
                profilepicture={profilepic}
                userinfo={this.state.userinfo}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default Controller;
