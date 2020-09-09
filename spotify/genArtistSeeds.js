const { Artist } = require('../db/models');
const getTopArtists = require('./getTopArtists');

const genArtistSeeds = async () => {
  const topArtists = await getTopArtists();
  for (artist of topArtists) {
    await Artist.create({
      spotifyId: artist.id,
      name: artist.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
};

genArtistSeeds();
