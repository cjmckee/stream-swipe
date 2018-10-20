import * as React from "react";
import {
    Jumbotron,
    Container,
} from "reactstrap";
import {
    Column,
    Row
} from "simple-flexbox";
import { TinderCard } from "./card";
import { StreamerGrid } from "./streamerGrid";

const iconGrid = {
    height:"100%",
    width:"20%",
    top:0,
    left:0,
    backgroundColor:"#6441a4",
    position:"fixed",
    padding:4
};

const cardViewStyle = {
    backgroundColor:"#f1f1f1",
    width:"80%",
    height:"100%",
    top:0,
    right:0,
    position:"fixed"
};

export class Home extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Column style={iconGrid}>
                        <StreamerGrid />
                    </Column>
                    <Column style={cardViewStyle}>
                        <TinderCard />
                    </Column>
                </Row>
            </Container>
        );
    }
}