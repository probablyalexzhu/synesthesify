const clientId = '8efe66c9553141b682d78450628421a1';
const clientSecret = '4ccb23d3318f467ab1faec5a6a03cb42';

var songFeaturesArray = [];

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
  let embedURL = playlistURL.slice(0,24) + "/embed" + playlistURL.slice(24);
  document.getElementById("embed").src = embedURL;
  document.getElementById("embed").style.visibility = "visible";
  //console.log(embedURL);
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
    return "You entered an invalid playlist URL!";
  }
  return playlistId[0];
  //https://open.spotify.com/playlist/2UEOgAtDT49WHsYzYew65f?si=ab5ad01c816a48c1
}

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

	let token = "BQBOC8DNo_UNMlmeo1WMy0A0pYX5MMUeISAspG_wfytKAmi6HdFULjNqB4g-BsiQfIegVlkU7IdyZYSMZDu8ZAO9RkhG9mIjfQDNofMA57S-TIPtt8LDB1FNaGYLRvAjGylC8CLp7ex_eYm_dwF79CNH";
	function getSongsFromPlaylist(){
		//  Create the XHR, intitalize the connection with open()) 
		//  and send the request
	  
		var songIds = '';

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
	      
	      let response = JSON.parse(this.response);
	      //console.log(typeof response);
	      response = response["items"];
	      
	      //console.log(typeof response);
	      
	      response.forEach(function(r) {
	      	songIds = songIds + r["track"]["id"] + ',';
		console.log(r["track"]["id"]);
              })
			  
			  getSongsFeatures(songIds);
	    }
	   }
//document.getElementById("parsed").innerHTML = JSON.stringify(response);
//document.getElementById("parsed").innerHTML = response[0]["track"]["id"];

	  

           

      
	      /**
	      logMessage("Album Name: " + JSON.parse(this.response).name, "output");
	      logMessage("Release Date: " + JSON.parse(this.response).release_date, "output");
	      logMessage("Number of Tracks: " + JSON.parse(this.response).tracks["total"], "output");
	      */
	    
	
	}

	// important variable for putting into drawing part of program
	//var songFeaturesArray = [];

	getSongsFromPlaylist()
	
	function getSongsFeatures(songIds) {
	  var xhr = new XMLHttpRequest();

		console.log(songIds);

	  let songIdsEncoded = encodeURI(songIds);

	  xhr.open("GET","https://api.spotify.com/v1/audio-features?ids=" + songIdsEncoded, true);
	  xhr.setRequestHeader("Authorization", "Bearer " + token);
	  xhr.send();
		
	  xhr.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      //alert(this.response);
	      //console.log(this.response);
	      //console.log(JSON.parse(this.response).name);
	      //console.log(this.response);
	      
	      console.log(this.response);
	      console.log(typeof this.response);

		  let songFeaturesObject = JSON.parse(this.response);
	      //console.log(typeof response);
	      songFeaturesObject = songFeaturesObject["audio_features"];

		  // let songFeaturesArray = [];

		  songFeaturesObject.forEach(function(r) {
			
			songFeaturesArray.push(r);
		  });
			
		  console.log(songFeaturesArray);

	    }
	
	  }

	}

	console.log(songFeaturesArray);
}
