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

const iconGrid = {
    height:"100%",
    width:"20%",
    top:0,
    left:0,
    backgroundColor:"#6441a4",
    position:"fixed"
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
                    </Column>
                    <Column style={cardViewStyle}>
                        <TinderCard />
                    </Column>
                </Row>
            </Container>
        );
    }
}