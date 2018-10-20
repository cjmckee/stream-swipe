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
    width: "80%",
    backgroundColor:"#ff0000",
    margin: "auto"
};
const box = {
    top:"10%",
    bottom:"10%",
    backgroundColor:"#00ff00",
    textAlign: "center" as "center",
};
const media = {
    width: "100%",
    minHeight: "250px"
};
const game = {
    color: "purple"
};
const buttonStyle = {
    margin: "40px 10% 40px 10%"
};

@observer
export class TinderCard extends React.Component {

  componentDidMount() {
    store.requestData();
  }

  swipeRight() {
      console.log("you swiped right");
      store.swipe = "right";
      store.requestData();
  }

  swipeLeft() {
      console.log("you have swiped left");
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
    if (store.swipe === "right") {
        prevSwipe = <div><h3>You swiped <span style={{color: "green"}}>right</span>.</h3></div>;
    }
    if (store.swipe === "left") {
        prevSwipe = <div><h3>You swiped <span style={{color: "red"}}>left</span>.</h3></div>;
    }

    return (
    /*
        I have no idea why, but this keydown function only works once you've clicked onto the card.
        It won't work if you click away from it or before you click on it. Who knows man.
    */
    <div onKeyDown={(event) => {
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
                    <CardMedia
                    style={media}
                    image={store.api.pic}
                    title={store.api.name}
                    />
                    <CardContent>
                        <Typography variant="h2">
                            {store.api.name}
                        </Typography>
                        <Typography>
                            Playing <span style={game}>{store.api.game}</span>
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