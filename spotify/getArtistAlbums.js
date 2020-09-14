const a = require('./getTopArtists');
const s = require('./getSpotifyApiInstance');

const getArtistAlbums = async() => {

   let albums = [];

   const spotifyApi = await s();
   const artists = await a(); //repalce witth DB query.

   //spotifyApi.

   for (let i = 0; i < artists.length; i++)
   {
       let albs = await (await spotifyApi.getArtistAlbums( artists[i].id)).body.items

     albs.forEach(album => {

            let found = false;
            albums.forEach(a => {
                if (album.id === a.id) found = true;
            })

           if (found === false) albums.push(album);
       })
   }
   console.log(albums.length);
   return albums;
}


getArtistAlbums();
