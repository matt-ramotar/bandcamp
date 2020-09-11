const getFavoriteArtists = async () => {
    const res = await fetch("/api/artists/favorite-artists");
    const data = await res.json();
    console.log('here', data)
    return data.favoriteArtists;
};

const createFavoriteArtist = (artist) => {
    console.log("artist", artist)
    const artistName = artist.name
    console.log("name", artistName)
    let favoriteArtistDiv = document.querySelector(".favoriteArtists")
    favoriteArtistDiv.innerHTML = favoriteArtistDiv.innerHTML + `| ${artistName} |`

}

const populateFavoriteArtist = async () => {
    const artists = await getFavoriteArtists()
    console.log(artists)
    for (let i = 0; i < artists.length; i++) {

        createFavoriteArtist(artists[i]);
    }
}

populateFavoriteArtist();
