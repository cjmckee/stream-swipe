import * as React from "react";
import { observable } from "mobx";
import { data } from "./get-data";

class Store {

    @observable api = {
        name: null,
        game: null,
        bio: null,
        pic: null
    };
    @observable streams = null;
    @observable showBio = false;
    @observable swipe = null;
    iterator = 0;

    requestData() {

        if (!this.streams || this.iterator >= this.streams.length) {
            data.getStreams().then((result) => {
                this.streams = result.streams;
                this.iterator = 0;

                const stream = this.nextStream();
                this.api.name = stream.channel.display_name;
                this.api.game = stream.channel.game;
                this.api.bio = stream.channel.status;
                this.api.pic = stream.preview.medium;
            });
        }
        else {
            const stream = this.nextStream();
            this.api.name = stream.channel.display_name;
            this.api.game = stream.channel.game;
            this.api.bio = stream.channel.status;
            this.api.pic = stream.preview.medium;
        }
    }

    nextStream() {
        return this.streams[this.iterator++];
    }
}

export const store = new Store();