const a = require('./getTopArtists');
const s = require('./getSpotifyApiInstance');

const getArtistAlbums = async() => {

   let albums = [];

   const spotifyApi = await s(); 
   const artists = await a(); //repalce witth DB query.
 
   for (let i = 0; i < artists.length; i++)
   {
       let albs = await (await spotifyApi.getArtistAlbums( artists[i].id)).body.items
  
     albs.forEach(album => {

           albums.push(album);
       })
   }

   return albums;
}


getArtistAlbums();
