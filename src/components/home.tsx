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
                <Jumbotron>
                    <TinderCard />
                </Jumbotron>
            </div>
        );
    }
}