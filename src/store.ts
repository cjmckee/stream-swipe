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
        id: null,
        picture: null
    };
    @observable streams = null;
    @observable showBio = false;
    @observable swipe = null;
    @observable likedStreams = [];
    iterator = 0;

    requestData() {
        if (!this.streams || this.iterator >= this.streams.length) {
            data.getStreams(this.nextBatch()).then((result) => {
                this.streams = result.streams;
                this.iterator = 0;
                this.updateStream(this.nextStream());
            });
        } else {
            this.updateStream(this.nextStream());
        }

        this.showBio = false;
    }

    followStream() {
        return data.followStream(this.api.id);
    }

    nextStream() {
        return this.streams[this.iterator++];
    }

    nextBatch() {
        return Math.floor(Math.random() * 25000);
    }

    addLikedStreamAPI(streamAPI) {
        this.likedStreams.unshift(JSON.parse(JSON.stringify(streamAPI)));
        console.log(streamAPI.picture);
    }

    updateStream(stream) {
        this.api.name = stream.channel.display_name;
        this.api.game = stream.channel.game;
        this.api.bio = stream.channel.status;
        this.api.channel = stream.channel.name;
        this.api.viewers = stream.viewers;
        this.api.id = stream.channel._id;
        this.api.picture = stream.channel.logo;
    }
}

export const store = new Store();