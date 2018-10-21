

const URL = "https://api.twitch.tv/kraken/streams/";
const clientId = "n64yujbrc3geoobvcwnr427qqcuzq8";

function buildUrl(offset) {
    return URL + "?client_id=" + clientId + 
        "&limit=5" +
        ((offset != null) ? "&offset=" + offset : "");
}

class GetData {

    getStreams(next) {
        return fetch(buildUrl(next))
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

    followStream(channelId) {
        this.getUserId().then((userId)=>{
            console.log(userId);
            return fetch("https://api.twitch.tv/kraken/users/" + userId._id + "/follows/channels/" + channelId, {
            method: "PUT"
            })
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
        });
        
    }

    getUserId() {
        return fetch("https://api.twitch.tv/kraken/user", {
            method: "GET",
            headers: {
                "Client-ID": clientId,
                "Authorization": "OAuth " + window.localStorage.getItem("access_token"),
            }
        }).then((result)=> {
            return result.json();
        });
    }
}

export const data = new GetData();