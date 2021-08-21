const clientId = '8efe66c9553141b682d78450628421a1';
const clientSecret = '4ccb23d3318f467ab1faec5a6a03cb42';

let playlistId = 0;

function parsePlaylist() {
  playlistURL = document.getElementById("myText").value;
  if (playlistURL.includes("https://open.spotify.com/playlist/")) {
    playlistId = playlistURL.split("/");
    playlistId = playlistId[4].split("?");
    document.getElementById("playlist-id").innerHTML = playlistId[0];
  } else if (playlistURL.includes("https://open.spotify.com/user/")) {
    playlistId = playlistURL.split("/");
    playlistId = playlistId[6].split("?");
    document.getElementById("playlist-id").innerHTML = playlistId[0];
  } else {
    document.getElementById("playlist-id").innerHTML = "You entered an invalid playlist URL!";
  }
  //https://open.spotify.com/playlist/2UEOgAtDT49WHsYzYew65f?si=ab5ad01c816a48c1
}

/**
let request = require("request");
let token = "Bearer ";
let playlist_request = "https://api.spotify.com/v1/playlists/" + playlistId;

request({url:playlist_request, headers:{"Authorization":token}}, function(err, res) {
  if (res) {
    let songs = JSON.parse(res.body);
    console.log("song: " + songs.name);
    songs.tracks.forEach (function(track) {
      console.log(track.track.name);
    });
  }
})
*/

let token = "BQCIo4vPzm9b6Kf8xnTQ4UXqn-sMoFQ4m0kTYziQP3VNljm1s2_DOBKPUICwLm5qKI5xSgvDuFfqTMsOwd_ssM_VHt0XRD_2JzAHQ1AY8o67mFs2Hiic7nvxPEcY2XGdEfaFHYQtQxkaE8wwn6aGA6WP"

var settings = {
    "url": "https://api.spotify.com/v1/playlists/" + playlistId,
    "method": "get",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    },
};

$.ajax(settings).done(function (response) {
    document.getElementById("result").innerHTML = response;
});
