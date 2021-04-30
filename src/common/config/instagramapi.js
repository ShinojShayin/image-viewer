let instagramapi = {
  medialist:
    "https://graph.instagram.com/me/media?fields=id,caption&access_token={token}",
  mediadetails:
    "https://graph.instagram.com/{mediaid}?fields=id,media_type,media_url,username,timestamp&access_token={token}",
};

export default instagramapi;
