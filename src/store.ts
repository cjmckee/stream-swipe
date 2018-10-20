import * as React from "react";
import { observable } from "mobx";
import { data } from "./get-data";

class Store {

    @observable api = {
        name: null,
        game: null,
        bio: null,
        channel: null,
        viewers: null,
    };
    @observable streams = null;
    @observable showBio = false;
    @observable swipe = null;
    iterator = 0;

    requestData() {

        if (!this.streams || this.iterator >= this.streams.length) {
            data.getStreams(this.nextBatch()).then((result) => {
                this.streams = result.streams;
                console.log(result);
                this.iterator = 0;
                this.updateStream(this.nextStream());
            });
        } else {
            this.updateStream(this.nextStream());
        }

        this.showBio = false;
    }

    nextStream() {
        return this.streams[this.iterator++];
    }

    nextBatch() {
        return Math.floor(Math.random() * 25000);
    }

    updateStream(stream) {
        this.api.name = stream.channel.display_name;
        this.api.game = stream.channel.game;
        this.api.bio = stream.channel.status;
        this.api.channel = stream.channel.name;
        this.api.viewers = stream.viewers;
    }
}

export const store = new Store();