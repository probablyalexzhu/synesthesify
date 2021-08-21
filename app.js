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

function bigApp() {
	let playlistId = parsePlaylist();
	console.log(playlistId);


	let token = "BQDUQDglDL4v-2Lc3-L2YPyNgROVwu5w4KhePhF5pPKV0oMAcXeBM-wEz9xkOD-5Vak4yiufGBnsO7-_45n-m0VZ39373F1rgbXnX2GVlmkcbp7TXPjvlcVxrJin37V7NenW5yRO0G2KUGovobIFIyPa";

	var settings = {
	    "url": "https://api.spotify.com/v1/playlists/" + playlistId,
	    "method": "get",
	    "timeout": 0,
	    "headers": {
		"Content-Type": "application/json"
		"Authorization" : token
	    },
	};

	$.ajax(settings).done(function (response) {
	    document.getElementById("result").innerHTML = response;
	});

	/**
	let request = require("request");
	let token = "BQDUQDglDL4v-2Lc3-L2YPyNgROVwu5w4KhePhF5pPKV0oMAcXeBM-wEz9xkOD-5Vak4yiufGBnsO7-_45n-m0VZ39373F1rgbXnX2GVlmkcbp7TXPjvlcVxrJin37V7NenW5yRO0G2KUGovobIFIyPa";
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
	
	
	function getSongsFromPlaylist(e){
		//  Create the XHR, intitalize the connection with open()) 
		//  and send the request  
	  var xhr = new XMLHttpRequest();
	  xhr.open("GET","https://api.spotify.com/v1/playlists/" + playlistId , true);
	  xhr.send();

	  //  Check here for new state and HTTP response code
		//  and write the response to the output
	  xhr.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      //alert(this.response);
	      //console.log(this.response);
	      //console.log(JSON.parse(this.response).name);
	      console.log(this.response);
	      
	      logMessage("Album Name: " + JSON.parse(this.response).name, "output");
	      logMessage("Release Date: " + JSON.parse(this.response).release_date, "output");
	      logMessage("Number of Tracks: " + JSON.parse(this.response).tracks["total"], "output");
	      
	
	    }
	  }
	}
	*/
	//getSongsFromPlaylist(playlistId)
}
