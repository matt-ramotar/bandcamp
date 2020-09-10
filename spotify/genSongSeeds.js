const fs = require('fs').promises;

const { Song } = require('../db/models');
const getArtistTopTracks = require('./getArtistTopTracks');

const genSongSeeds = async () => {
  const songs = [];
  const albums = [];
  const albumSongs = [];
  const artistSongs = [];

  const topTrax = await getArtistTopTracks();
  for (track of topTrax) {
      
    songs.push({
      spotifyId: track.id,
      title: track.name,
      createdAt: 'new Date()',
      updatedAt: 'new Date()',
    });


    let found = false
    albums.forEach(album => {
        if (album.spotifyId === track.album.id) found = true;
    })
    if (found === false){
     albums.push({
          spotifyId: track.album.id,
          name: track.album.name,
          createdAt: 'new Date()',
          updatedAt: 'new Date()',
    })
    }

    albumSongs.push({
      albumId: track.album.id,
      songId: track.id,
      createdAt: 'new Date()',
      updatedAt: 'new Date()',
    })

    // artistSongs.push({
    //   artistId: track.artist.id,
    //   songId: track.id
    // })

    // await Artist.create({
    //   spotifyId: artist.id,
    //   name: artist.name,
    //   updatedAt: new Date(),
    //   createdAt: new Date(),
    // });
  }
  console.log(albums.length)
  await fs.writeFile('./data/songs.txt', JSON.stringify(songs), err => console.err(err));
  await fs.writeFile('./data/albums.txt', JSON.stringify(albums), err => console.err(err));
  await fs.writeFile('./data/albumSongs.txt', JSON.stringify(albumSongs), err => console.err(err));
  // await fs.writeFile('./data/artistSongs', JSON.stringify(artistSongs), err => console.err(err));
};

genSongSeeds();

//module.exports genSongSeeds;
