const fs = require('fs');
const a = require('./getTopTracks');

const getTopArtists = async () => {
  const tracks = await a();
  const seedArtists = [];

  tracks.forEach(track => {
    track.track.artists.forEach(artist => {
      let found = false;

      seedArtists.forEach(seedArtist => {
        if (seedArtist.name === artist.name) found = true;
      });
      if (found === false) seedArtists.push(artist);
      found = false;
    });
  });

  //console.log(seedArtists);
  //console.log(seedArtists.length);

  fs.writeFile('./seedArtists.txt', JSON.stringify(seedArtists), err => {
   // console.log(err);
  });

  return seedArtists;
};

getTopArtists();

module.exports = getTopArtists;
