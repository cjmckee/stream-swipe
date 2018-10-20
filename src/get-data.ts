import * as React from "react";
const fakeData = require("../fake-data/fake-data.json");

class GetData {

    getData() {
        const pick = Math.floor(Math.random() * 3);
        return fakeData.data[pick];
    }

    clientId = "n64yujbrc3geoobvcwnr427qqcuzq8";

    getStreams() {
        return fetch("https://api.twitch.tv/kraken/streams/?client_id=" + this.clientId)
        .then(
            (response) => {
                if (response.status !== 200) {
                    console.log("fetch failed to get data");
                    console.log(response.status);
                    return;
                }

                return response.json();
            }
        );
    }
}

export const data = new GetData();