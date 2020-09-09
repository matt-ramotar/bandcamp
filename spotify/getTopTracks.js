//const SpotifyWebApi = require('spotify-web-api-node');

const s = require('./getSpotifyApiInstance');


const getTopTracks = async() => {

  const spotifyApi = await s(); 

  var seedArtists = [];
  var topTrax;

  var topFiftyId = (await spotifyApi.searchPlaylists("Global")).body.playlists.items[0].id;
  
  var topFiftyTracks = (await spotifyApi.getPlaylistTracks(await topFiftyId)).body.items;

  return topFiftyTracks;
  //for (track of topFiftyTracks){
    //  console.log(track.artists);
      //for (artist of track.artists){
       //   console.log(artist);
          //check for double
        //  seedArtists.push(artist)
      //}
  //}
  

    // .then(function(data){
    //   return data.body;
    // }) 
//     .then(function(response){

//     const ids = 
  
//     topTraxId = response.playlists.items[0].id
//       spotifyApi.getPlaylistTracks(topTraxId)
//         .then(function(trax){

//             console.log(trax.body.items);
//             return trax.body.items;
//         });
//     },
//     function(err) {
//       console.error(err);
//     })
 }
getTopTracks();
module.exports = getTopTracks;






  