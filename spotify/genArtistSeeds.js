const { Artist } = require('../db/models');
const getTopArtists = require('./getTopArtists');

const genArtistSeeds = async () => {
  const artists = [];
  const topArtists = await getTopArtists();
  for (artist of topArtists) {
    artists.push({
      spotifyId: artist.id,
      name: artist.name,
      createdAt: 'new Date()',
      updatedAt: 'new Date()',
    });

    // await Artist.create({
    //   spotifyId: artist.id,
    //   name: artist.name,
    //   updatedAt: new Date(),
    //   createdAt: new Date(),
    // });
  }
  console.log(artists);
};

genArtistSeeds();
