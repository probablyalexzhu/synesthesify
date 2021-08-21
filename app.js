const clientId = '8efe66c9553141b682d78450628421a1';
const clientSecret = '4ccb23d3318f467ab1faec5a6a03cb42';



/*function parsePlaylist() {
  let playlistURL = document.getElementById("myText").value; let playListId=0;
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
  return playlistId;
}*/

function parsePlaylist() {
  let playlistURL = document.getElementById("myText").value; let playlistId=0;
  if (playlistURL.includes("https://open.spotify.com/playlist/")) {
    playlistId = playlistURL.split("/");
    playlistId = playlistId[4].split("?");
    document.getElementById("playlist-id").innerHTML = playlistId[0];

  } else if (playlistURL.includes("https://open.spotify.com/user/")) {
    playlistId = playlistURL.split("/");
    playlistId = playlistId[6].split("?");
    document.getElementById("playlist-id").innerHTML = playlistId[0];

  } else {
    return "You entered an invalid playlist URL!";
  }
  return playlistId[0];
  //https://open.spotify.com/playlist/2UEOgAtDT49WHsYzYew65f?si=ab5ad01c816a48c1
}

let response = 0;

function bigApp() {
	let playlistId = parsePlaylist();
	console.log(playlistId);




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
	token = "BQAm_h_FtHQH4bHUTbqbBeenbgOVs_3EW5Ipr59qevj1axziW-ejg8Df7TzJ0HMfdI0E4_D1GYZbiHB1wqo0KHJ1_NKSMjRPvvYQfjB6I0xqHVugHb4rNqND7vP_Nl6eo15E9UCrv6yTjIrHeCNDBbTh";
	function getSongsFromPlaylist(){
		//  Create the XHR, intitalize the connection with open()) 
		//  and send the request  
	  var xhr = new XMLHttpRequest();
	  xhr.open("GET","https://api.spotify.com/v1/playlists/" + playlistId + "/tracks?fields=items%28track%28id%29%29" , true);
	  xhr.setRequestHeader("Authorization", "Bearer " + token);
	  xhr.send();

	  //  Check here for new state and HTTP response code
		//  and write the response to the output
	  xhr.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      //alert(this.response);
	      //console.log(this.response);
	      //console.log(JSON.parse(this.response).name);
	      //console.log(this.response);
	      response = this.response;
	      response = response["items"];
	      console.log(response);
	    }
	   }
//document.getElementById("parsed").innerHTML = JSON.stringify(response);
//document.getElementById("parsed").innerHTML = response[0]["track"]["id"];

	   let songIds = '';

           response.forEach(function(r) {
	     songIds = songIds + r["track"]["id"] + ',';
           })  

      console.log(songIds);
	      /**
	      logMessage("Album Name: " + JSON.parse(this.response).name, "output");
	      logMessage("Release Date: " + JSON.parse(this.response).release_date, "output");
	      logMessage("Number of Tracks: " + JSON.parse(this.response).tracks["total"], "output");
	      */
	    
	
	}

	getSongsFromPlaylist()
}
