const clientId = '8efe66c9553141b682d78450628421a1'; //sets the Spotify application client ID 
const clientSecret = '4ccb23d3318f467ab1faec5a6a03cb42'; //sets the Spotify application secret ID

var songFeaturesArray = [];
var finalToken = '';
var totalRuns = 0;
var oldEmbedURL = ''
var timesClicked = 1;
var timesClickedImage = 1; //initialization of some global variables used in functions

/**
Function which counts and stores the amount of times user clicks on "Create" button.
Interacts with HTML to make elements visible or hidden.
*/
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

/**
Function which takes string of entered playlist link, and parses it to get an embed URL and playlist ID.
Playlist ID is then used in subsequent methods for API responses.
*/
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

//Major function which runs nested functions that use Spotify's API to ultimately pull the song features for each song in a playlist.
function mainApi() {
	let playlistId = parsePlaylist();
	
	/**
	Constant-defined function which asynchronously fetches a token from Spotify's server using the client credentials authorization flow.
	See https://developer.spotify.com/documentation/general/guides/authorization-guide/ for more information.
	Stores the token ID as variable finalToken.
	*/
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
	Function which passes the "token" parameter to post "GET" request from Spotify's API to obtain all songs from a playlist.
	Uses XMLHtppRequest() method to communicate with Spotify's server from the Web App.
	When the XML method receives a response, stores response as a JSON file and parses, storing response as an array titled "SongIds".
	*/
	function getSongsFromPlaylist(token){
		var songIds = '';
		
	  var xhr = new XMLHttpRequest();
	  xhr.open("GET","https://api.spotify.com/v1/playlists/" + playlistId + "/tracks?fields=items%28track%28id%29%29" , true);
	  xhr.setRequestHeader("Authorization", "Bearer " + token);
	  xhr.send();
		
	  xhr.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      
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
	}
	getSongsFromPlaylist()
		
	/**
	Function which posts another "GET" request from Spotify's API to obtain the features from each song through iteration.
	Uses XMLHtppRequest() method to communicate with Spotify's server from the Web App.
	When the XML method receives a response, stores response as an array of all dictionaries representing each song's features, as "songFeaturesArray".
	*/
	function getSongsFeatures(songIds, token) {
	  var xhr = new XMLHttpRequest();

		console.log(songIds);

	  let songIdsEncoded = encodeURI(songIds);

	  xhr.open("GET","https://api.spotify.com/v1/audio-features?ids=" + songIdsEncoded, true);
	  xhr.setRequestHeader("Authorization", "Bearer " + token);
	  xhr.send();
		
	  xhr.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {	      
	      console.log(this.response);
	      console.log(typeof this.response);

		  let songFeaturesObject = JSON.parse(this.response);
	      //console.log(typeof response);
	      songFeaturesObject = songFeaturesObject["audio_features"];

		  songFeaturesObject.forEach(function(r) {
			
			songFeaturesArray.push(r);
		  });
			
		  console.log(songFeaturesArray);

	    }
	
	  }

	}
}
