

const getArtists = async () => {
    const res = await fetch("/artists");
    const data = await res.json();
    return data;
};

const createArtistLi = (artist) => {
    const artistName = artist.name
    console.log(artist.name)
    const li = document.createElement("li");
    li.innerHTML = `${artistName}`
    const checkbox = document.createElement('input')
    checkbox.type = "checkbox"
    checkbox.setAttribute("name", `${artist.name}`)
    li.appendChild(checkbox);
    return li

}

const populateArtistList = async () => {
    const { artists } = await getArtists();
    for (let artist of artists) {
        const li = createArtistLi(artist)
        console.log(li)
        const artistList = document.querySelector(".artistList");
        artistList.appendChild(li)

    }
}

populateArtistList();

const artistForm = document.querySelector("#favoriteArtistForm");

artistForm.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(artistForm);
    console.log(formData.get(values))
})
