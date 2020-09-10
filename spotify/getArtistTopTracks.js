 const a = require('./getTopArtists');
 const s = require('./getSpotifyApiInstance');

const getArtistTopTracks = async() => {

    let songs = [];

    const spotifyApi = await s(); 
    const artists = await a(); //repalce witth DB query.
  
    for (let i = 0; i < artists.length; i++)
    {
        let topTrax = await (await spotifyApi.getArtistTopTracks( artists[i].id, "US")).body.tracks
       
        topTrax.forEach(track => {

           let found = false;
           songs.forEach(song => {
               if (song.id === track.id) found = true;
           })
           if (found === false) songs.push(track);
           found = false;
        })
    }

 //   console.log(songs.length);
    return songs;
}

//getArtistTopTracks();
module.exports = getArtistTopTracks;
