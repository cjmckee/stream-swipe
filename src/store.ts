import * as React from "react";
import { observable } from "mobx";
import { data } from "./get-data";

class Store {

    @observable api = {
        name: null,
        game: null,
        bio: null,
        pic: null,
        channel: null
    };
    @observable streams = null;
    @observable showBio = false;
    @observable swipe = null;
    iterator = 0;
    next = 200;

    requestData() {

        if (!this.streams || this.iterator >= this.streams.length) {
            data.getNextStreams(this.next).then((result) => {
                this.streams = result.streams;
                this.iterator = 0;
                this.updateStream(this.nextStream());
                this.next += this.streams.length;
            });
        } else {
            this.updateStream(this.nextStream());
        }

        this.showBio = false;
    }

    nextStream() {
        return this.streams[this.iterator++];
    }

    updateStream(stream) {
        this.api.name = stream.channel.display_name;
        this.api.game = stream.channel.game;
        this.api.bio = stream.channel.status;
        this.api.pic = stream.preview.medium;
        this.api.channel = stream.channel.name;
    }
}

export const store = new Store();