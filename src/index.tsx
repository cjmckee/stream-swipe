import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom";

const jwt = require('jsonwebtoken');

import { Home } from "./components/home";
import { TinderCard } from "./components/card";

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        TinderCard.swipeRight();
    }
    if (event.key === "ArrowLeft") {
        TinderCard.swipeLeft();
    }
});

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
  window.localStorage.setItem("user_id", jwt.decode(hash.id_token).sub);
  window.location.replace("https://stream-swipe.com/");
} else if (!accessToken) {
  window.location.href = "https://id.twitch.tv/oauth2/authorize?client_id=n64yujbrc3geoobvcwnr427qqcuzq8&redirect_uri=http%3A%2F%2Fstream-swipe.com%&response_type=token+id_token&scope=user_follows_edit+openid";
} else {
  ReactDOM.render(
      <Home />,
      document.getElementById("example"),
  );
}
