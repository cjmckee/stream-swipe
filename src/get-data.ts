import * as React from "react";
const fakeData = require("../fake-data/fake-data.json");

class GetData {

    /*getData() {
        fetch("fake-data/fake-data.json")
        .then(
            (response) => {
                if (response.status !== 200) {
                    console.log("fetch failed to get data");
                    console.log(response.status);
                    return;
                }

                response.json().then(
                    (data) => console.log(data)
                );
            }
        );
    }*/

    getData() {
        const pick = Math.floor(Math.random() * 3);
        return fakeData.data[pick];
    }
}

export const data = new GetData();