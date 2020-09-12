



document.querySelector('.search-results').addEventListener('click', async e => {
    const target = e.target;
    console.log(target.nodeName)
    if (target.nodeName === "svg") {
        const parent = target.parentElement;
        const songId = parent.id;
        console.log(songId)
        try {
            await fetch(`/api/songs/favorites/new`, {
                method: 'POST',
                body: JSON.stringify({ songId }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            target.classList.remove('far');
            target.classList.add('fas');
        } catch (e) {

        }
    }
})






















const getFavoriteArtists = async () => {
    const res = await fetch("/api/artists/favorite-artists");
    const data = await res.json();
    // console.log('here', data)
    return data.favoriteArtists;
};

const createFavoriteArtist = (artist) => {
    // console.log("artist", artist)
    const artistName = artist.name
    // console.log("name", artistName)
    let favoriteArtistDiv = document.querySelector(".favoriteArtists")
    favoriteArtistDiv.innerHTML = favoriteArtistDiv.innerHTML + `| ${artistName} |`

}

const populateFavoriteArtist = async () => {
    const artists = await getFavoriteArtists()
    // console.log(artists)
    for (let i = 0; i < artists.length; i++) {
        if (!artists[i]) continue;
        createFavoriteArtist(artists[i]);
    }
}

populateFavoriteArtist();
