import * as React from "react";
import { observable } from "mobx";

class Store {

    @observable name = null;
    @observable game = null;
    @observable bio = null;
    @observable showBio = false;

}

export const store = new Store();