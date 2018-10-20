import * as React from "react";
import {
    Button,
    Jumbotron,
} from "reactstrap";
import { TinderCard } from "./card";

export class Home extends React.Component {

    render() {
        return (
            <div>
                <Jumbotron className="text-center">
                    <h1>Tinder Garbage</h1>
                    <p>You might be able to invest with the power of Typescript and React!</p>

                    <Button onClick={() => console.log("button works")}>Check if things are working</Button>
                </Jumbotron>
                <TinderCard />
            </div>
        );
    }
}