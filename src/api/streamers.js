const url='https://api.twitch.tv/helix/streams/metadata?first=100';
const clientID = 'n64yujbrc3geoobvcwnr427qqcuzq8';
const DEPTH = 8;

function initGetStreamers() {
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.setRequestHeader('Client-ID', clientID);
    req.send();

    req.onreadystatechange= (e) => {
        var toReturn;
        var page = req.response.pagination.cursor;
        for(var i = 0; i < DEPTH; i++) {
            var req = new XMLHttpRequest();
            req.open('GET', url + '&after=' + page);
            req.setRequestHeader('Client-ID', clientID);
            req.send();
            page = req.response.pagination.cursor;
            toReturn = req.response;
        }
        return toReturn;
    }
}

function getStreamers(page) {
    const req = new XMLHttpRequest();
    req.open('GET', url + '&after=' + page);
    req.setRequestHeader('Client-ID', clientID);
    req.send();

    req.onreadystatechange= (e) => {
        return req.response;
    }
}