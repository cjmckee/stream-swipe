

const URL = "https://api.twitch.tv/kraken/streams/";
const clientId = "n64yujbrc3geoobvcwnr427qqcuzq8";

function buildUrl(offset) {
    const depth = 100 + Math.floor(9900 * (Math.random() ** 2));
    return URL + "?client_id=" + clientId +
        "&limit=1" +
        ((offset != null) ? "&offset=" + offset : "");
}

class GetData {

    getStreams(next) {
        return fetch(buildUrl(next), {
          method: "GET",
          headers: {
            "Accept": "application/vnd.twitchtv.v5+json",
          }
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
    }

    followStream(channelId) {
      return fetch(
        "https://api.twitch.tv/kraken/users/" + window.localStorage.getItem("user_id") + "/follows/channels/" + channelId,
        {
          method: "PUT",
          headers: {
            "Accept": "application/vnd.twitchtv.v5+json",
            "Client-ID": clientId,
            "Authorization": "OAuth " + window.localStorage.getItem("access_token"),
          }
        },
      ).then((response) => {
        if (response.status !== 200) {
          console.log("fetch failed to get data");
          console.log(response.status);
          return;
        }
        return response.json();
      });
    }

    getUserId() {
        return fetch("https://api.twitch.tv/kraken/user", {
            method: "GET",
            headers: {
                "Accept": "application/vnd.twitchtv.v5+json",
                "Client-ID": clientId,
                "Authorization": "OAuth " + window.localStorage.getItem("access_token"),
            }
        }).then((result)=> {
            return result.json();
        });
    }
}

export const data = new GetData();
