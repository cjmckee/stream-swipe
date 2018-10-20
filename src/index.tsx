import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Home } from "./components/home";

const accessToken = window.localStorage.getItem("access_token");
const hash = (window.location.hash ?
  window.location.hash
    .slice(1)
    .split("&")
    .map(kv => kv.split("="))
    .reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {}) :
  {}) as any;

if (hash.access_token) {
  window.localStorage.setItem("access_token", hash.access_token);
  window.location.replace("http://stream-swipe.s3-website-us-east-1.amazonaws.com");
} else if (!accessToken) {
  window.location.href = "https://id.twitch.tv/oauth2/authorize?client_id=n64yujbrc3geoobvcwnr427qqcuzq8&redirect_uri=http%3A%2F%2Fstream-swipe.s3-website-us-east-1.amazonaws.com%2F&response_type=token&scope=user_follows_edit";
} else {
  ReactDOM.render(
      <Home />,
      document.getElementById("example"),
  );
}
