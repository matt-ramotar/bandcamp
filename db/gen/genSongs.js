const { Song } = require('../models');

const genSongs = async () => {
  let songs = Array(10)
    .fill({})
    .map((song, i) => {
      return {
        spotifyId: `id-${i}`,
        title: `title-${i}`,
        artistId: Number(i + 1),
        isArtistTopTrack: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

  for (song of songs) {
    console.log(song);
    await Song.create(song);
  }
};

genSongs();
