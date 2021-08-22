const clientId = '8efe66c9553141b682d78450628421a1';
const clientSecret = '4ccb23d3318f467ab1faec5a6a03cb42';

var songFeaturesArray = [];
var finalToken = '';
var totalRuns = 0;
var oldEmbedURL = ''
var timesClicked = 1;
var timesClickedImage = 1;

function counter() {
    if (timesClicked == 1) {   
		setTimeout(function() {
			document.getElementById("reminder").style.visibility = "visible";
      		timesClicked++;
		}, 1000);
	} else {
      document.getElementById("reminder").style.visibility = "hidden";
      timesClicked++;
    }
	if (timesClickedImage > 1) {
		document.getElementById("downloader").style.visibility = "visible";
		timesClickedImage++;
	} else {
		document.getElementById("downloader").style.visibility = "hidden";
      	timesClickedImage++;
	}
}

function parsePlaylist() {
  let playlistURL = document.getElementById("enterLink").value; let playlistId=0;
  let embedURL = playlistURL.slice(0,24) + "/embed" + playlistURL.slice(24);
  if (oldEmbedURL !== embedURL) {
	document.getElementById("embed").src = embedURL;
  }
  oldEmbedURL = embedURL;

  //console.log(embedURL);
  if (playlistURL.includes("https://open.spotify.com/playlist/")) {
    playlistId = playlistURL.split("/");
    playlistId = playlistId[4].split("?");
    document.getElementById("playlist-id").innerHTML = "";
	if (totalRuns == 0) {
		document.getElementById("embed").style.visibility = "visible";
		totalRuns += 1;
	}
	    

  } else if (playlistURL.includes("https://open.spotify.com/user/")) {
    playlistId = playlistURL.split("/");
    playlistId = playlistId[6].split("?");
    document.getElementById("playlist-id").innerHTML = ""; 
	if (totalRuns == 0) {
		document.getElementById("embed").style.visibility = "visible";
		totalRuns += 1;
	}

  } else {
    document.getElementById("playlist-id").innerHTML = "You entered an invalid playlist URL!";
    timesClicked--;
    setTimeout(function() {
	document.getElementById("reminder").style.visibility = "hidden";
    }, 1000);
    return "You entered an invalid playlist URL!";
  }
  return playlistId[0];
  //https://open.spotify.com/playlist/2UEOgAtDT49WHsYzYew65f?si=ab5ad01c816a48c1
}

function bigApp() {
	let playlistId = parsePlaylist();

	const getToken = async () => {
	
		const result = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded', 
				'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
			},
			body: 'grant_type=client_credentials'
		});
	
		const data = await result.json();
		finalToken = data.access_token;
		console.log(typeof finalToken[0]);
		getSongsFromPlaylist(finalToken);
	}

	console.log(playlistId);
	getToken();

	

	
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

	
	function getSongsFromPlaylist(token){
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
			  
			  getSongsFeatures(songIds, token);
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
	
	function getSongsFeatures(songIds, token) {
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
}
