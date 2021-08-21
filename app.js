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

/** 
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



const _getPlaylists = async (token) => {

      const result = await fetch('https://api.spotify.com/v1/playlists/' + playlistId, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
      });

      const data = await result.json();
      document.getElementById("result").innerHTML = data
      return data.categories.items;

  }
*/
const _getPlaylists = async (BQCkudjlJQHvOPLzj9AFV8lye0SoOuXzyibyTgQBw5gyDI4NyztYQsiIQaTEzYSzzUQWYhWp-xMyN_VuuARQNeXuHPH3_aZ0WQs2JFj9_bbpqYsFQfiWuVYs806t816BL9-X5dpUzExW_5_bIcbos1NS) => {

      const result = await fetch('https://api.spotify.com/v1/playlists/2UEOgAtDT49WHsYzYew65f, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + BQCkudjlJQHvOPLzj9AFV8lye0SoOuXzyibyTgQBw5gyDI4NyztYQsiIQaTEzYSzzUQWYhWp-xMyN_VuuARQNeXuHPH3_aZ0WQs2JFj9_bbpqYsFQfiWuVYs806t816BL9-X5dpUzExW_5_bIcbos1NS}
      });

      const data = await result.json();

      console.log(data);
/**
      document.getElementById("result").innerHTML = data
      return data.playlist.items;
*/
  }
