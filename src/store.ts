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
        picture: null,
        link: null
    };
    downloadingStreams = false;
    @observable streams = null;
    @observable showBio = false;
    @observable swipe = null;
    @observable likedStreams = [];
    iterator = 0;

    requestData() {
        // guard statement; don't do NOTHIN if there is no active stream atm.
        if (this.downloadingStreams) {
            return;
        } else if (!this.streams || this.iterator >= this.streams.length) {
            this.downloadingStreams = true;
            data.getStreams(this.nextBatch()).then((result) => {
                this.streams = result.streams;
                this.iterator = 0;
                this.updateStream(this.nextStream());
                this.downloadingStreams = false;
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
      return 100 + Math.floor(9900 * (Math.random() ** 2));
    }

    addLikedStreamAPI(streamAPI) {
        this.likedStreams.unshift(JSON.parse(JSON.stringify(streamAPI)));
    }

    updateStream(stream) {
        this.api.name = stream.channel.display_name;
        this.api.game = stream.channel.game;
        this.api.bio = stream.channel.status;
        this.api.channel = stream.channel.name;
        this.api.viewers = stream.viewers;
        this.api.id = stream.channel._id;
        this.api.picture = stream.channel.logo;
        // lol
        this.api.link = "https://www.twitch.tv/" + this.api.channel;
    }
}

export const store = new Store();
