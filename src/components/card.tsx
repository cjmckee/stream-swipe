import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, CardActionArea } from "../../node_modules/@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import CancelIcon from "@material-ui/icons/Cancel";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";

import { store } from "../store";
import { observer } from "mobx-react";

const card = {
        minWidth: "645",
        minHeight: "365",
        margin: "auto",
        display: "inline-block"
    };

const box = {
    marginTop: "2.0%",
    marginBottom:"2.5%",
    textAlign: "center" as "center"
};
const media = {
    width: "100%",
    minHeight: "250px"
};
const game = {
    color: "purple"
};
const buttonStyle = {
    margin: "10px 10% 10px 10%"
};

@observer
export class TinderCard extends React.Component {

  componentDidMount() {
    store.requestData();
  }

  swipeRight() {
    console.log("you swiped right");
    if (!store.downloadingStreams) {
      store.swipe = store.api.name;

      store.followStream();
      // Retrieves the stream that is currently being displayed
      // THIS IS THE SPAGHETTI WAY OF DOING IT!!! AHHHHHHH
      store.addLikedStreamAPI(store.api);
      store.requestData();
    }
  }

  swipeLeft() {
      console.log("you swiped left");
      store.swipe = "left";
      store.requestData();
  }

  render() {

    const bio = store.showBio ? 
    <CardContent>
        <Typography>
            {store.api.bio}
        </Typography>
    </CardContent> : <div></div>;

    let prevSwipe = <div></div>;
    if (store.swipe === "left") {
        prevSwipe = <div><h3>You swiped <span style={{color: "red"}}>left</span>.</h3></div>;
    }
    else if (store.swipe) {
        prevSwipe = <div><h3>You followed <span style={{color: "green"}}>{store.swipe}</span>.</h3></div>;
    }
    

    return (
    /*
        I have no idea why, but this keydown function only works once you've clicked onto the card.
        It won't work if you click away from it or before you click on it. Who knows man.
    */
    <div onKeyDownCapture={(event) => {
        console.log(event);
        if (event.key === "ArrowRight") {
            this.swipeRight();
        }
        if (event.key === "ArrowLeft") {
            this.swipeLeft();
        }
    }}>
        <div style={box}>
            <Card style={card}>
                <CardActionArea onClick={() => {store.showBio = !store.showBio; }}>
                    <CardContent>
                    <iframe
                        src={"https://player.twitch.tv/?channel=" + store.api.channel + "&muted=true"}
                        height="360"
                        width="640"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen={true}>
                    </iframe>
                    </CardContent>
                    <CardContent>
                        <Typography variant="h2">
                            {store.api.name}
                        </Typography>
                        <Typography>
                            Playing <span style={game}>{store.api.game}</span>
                        </Typography>
                        <Typography>
                        {store.api.viewers} Viewers
                        </Typography>
                    </CardContent>
                    {bio}
                </CardActionArea>
            </Card>
        </div>
        <div style={box}>
            <Button variant="fab" style={buttonStyle} aria-label="dislike" color="secondary">
                <CancelIcon onClick={this.swipeLeft}/>
            </Button>
            <Button variant="fab" style={buttonStyle} aria-label="like" color="primary">
                <FavoriteIcon onClick={this.swipeRight} />
            </Button>
        { prevSwipe }
        </div>
      </div>
    );
  }
}