

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
}

export const data = new GetData();