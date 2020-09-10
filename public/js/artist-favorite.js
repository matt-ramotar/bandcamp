

const getArtists = async () => {
    const res = await fetch("/artists");
    const data = await res.json();
    return data;
};

const createArtistLi = (artist) => {
    const artistName = artist.name
    const li = document.createElement("li");
    li.innerHTML = `${artistName}`
    const checkbox = document.createElement('input')
    checkbox.type = "checkbox"
    checkbox.setAttribute("name", "selection")
    checkbox.setAttribute("value", `${artist.name}`)
    li.appendChild(checkbox);
    return li

}

const populateArtistList = async () => {
    const { artists } = await getArtists();
    for (let artist of artists) {
        const li = createArtistLi(artist)
        const artistList = document.querySelector(".artistList");
        artistList.appendChild(li)

    }
}

populateArtistList();

const artistForm = document.querySelector("#favoriteArtistForm");

artistForm.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(artistForm);
    let favoriteArtistArray = [];
    favoriteArtistArray = formData.getAll("selection");
    const _csrf = formData.get("_csrf")
    console.log(favoriteArtistArray);

    const body = { favoriteArtistArray, _csrf };

    const res = await fetch('/api/artists', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })


})
