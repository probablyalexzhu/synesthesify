const clientId = '8efe66c9553141b682d78450628421a1'
const clientSecret = '4ccb23d3318f467ab1faec5a6a03cb42'


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

const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }
//https://api.spotify.com/v1/playlists/{playlist_id}

const _getPlaylists = async () => {

        const result = await fetch('https://api.spotify.com/v1/playlists/' + playlistId, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + 'BQDwP4jRgyh1MH_XijiGJSsp1u0kRTOGGggcUHmYVM38ckP3PzK5CWDRakb8cQGaXR1Wuzh5338QaFtN-AJDKBz3lEW2rF4UW-0_Y1JYbOU9xN9vZaV-REjpkEda84EDRXZfFOzAHfyuup7qSOht12qLIfM'}
        });

        const data = await result.json();
        document.getElementById("result").innerHTML = data
        return data.categories.items;
        
    }
