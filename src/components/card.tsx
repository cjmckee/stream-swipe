import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, CardActionArea } from "../../node_modules/@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import { store } from "../store";
import { observer } from "mobx-react";

const card = {
        width: "40%",
        margin: "auto"
    };
const box = {
        textAlign: "center" as "center",
    };
const media = {
    width: "100%",
    minHeight: "250px"
};
const game = {
    color: "purple"
};

@observer
export class TinderCard extends React.Component {

  componentDidMount() {
    store.name = "Nael";
    store.game = "League of Legends";
    store.bio = "Nael is a cute GT boy who is interested in memes and raw SQL";
    store.showBio = false;
  }

  render() {

    const bio = store.showBio ? 
    <CardContent>
        <Typography>
            {store.bio}
        </Typography>
    </CardContent> : <div></div>;

    return (
    /*
        I have no idea why, but this keydown function only works once you've clicked onto the card.
        It won't work if you click away from it or before you click on it. Who knows man.
    */
    <div onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
            console.log("You swiped right");
        }
        if (event.key === "ArrowLeft") {
            console.log("You swiped left");
        }
    }}>
      <div style={box}>
      <Card style={card}>
      <CardActionArea onClick={() => {store.showBio = !store.showBio; }}>
        <CardMedia
          style={media}
          image="assets/neel.jpg"
          title="Neel"
        />
        <CardContent>
            <Typography variant="h2">
                {store.name}
            </Typography>
            <Typography>
                Playing <span style={game}>{store.game}</span>
            </Typography>
        </CardContent>
        {bio}
      </CardActionArea>
      </Card>
      </div>
      </div>
    );
  }
}