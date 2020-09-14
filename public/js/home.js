window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("favorite-songs-button").classList.remove("hidden");
})


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


            const response = await fetch('/api/songs/favorites/play', {
                method: 'POST',
                body: JSON.stringify({songId}),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const resp = await response.json();
            const previewUrl = resp.previewUrl;
            const image = resp.image;

            document.querySelector('.audio_player').classList.remove('hidden');
            document.querySelector('.art').classList.remove('hidden');

            document.querySelector('.audio_player').setAttribute("src", previewUrl);
            document.querySelector('.art').setAttribute("src", image);


        } catch (e) {
            console.log(e)
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
    console.log("name", artistName)
    let button = document.createElement('button');
    button.setAttribute('value', artistName);
    button.innerHTML = `${artistName}`
    // console.log("name", artistName)
    let favoriteArtistDiv = document.querySelector(".favoriteArtists")
    favoriteArtistDiv.appendChild(button);

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

const favoriteArtistContainer = document.querySelector('.favoriteArtists');
favoriteArtistContainer.addEventListener('click', async (e) => {
    e.preventDefault();
    let search = await e.target.value;
    const body = { search };
    console.log(body)
    const searchResults = document.querySelector('.search-results');
    const res = await fetch('/api/songs', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    if (!res.ok) {
        const { message } = data;
        const errorsContainer = document.querySelector('#errors-container');
        errorsContainer.innerHTML = "Error:" + message + ", please try again.";
        return;
    }
    console.log(data.song);
    const songs = data.song;
    let HTMLString = "";
    for (let i = 0; i < songs.length; i++) {
        let song = songs[i];
        let title = song.title;
        if (!title) continue;
        HTMLString += `
      <div class="heartIcon search-results-result" id=${song.id}>
      <i class="far fa-heart heartIcon"></i>
      ${title}
      </div>`
    }
    console.log("test")
    console.log(HTMLString);
    searchResults.innerHTML = `<div id="search-results">SONG RESULTS...</div> ${HTMLString}`;
})
