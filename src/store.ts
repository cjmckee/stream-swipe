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

    @observable showBio = false;
    @observable swipe = null;

    requestData() {
        const api = data.getData();
        console.log(api);
        this.api = api;
        this.showBio = null;
    }
}

export const store = new Store();