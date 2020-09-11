const favoritesForm = document.querySelector('#songs-form');

const getSongs = async () => {
  const res = await fetch('/api/songs');
  const data = await res.json();
  return data.songs;
};

const createTableOfSongs = async () => {
  const table = document.querySelector('#songs-table');
  const songs = await getSongs();
  populateSongs(table, songs);
  generateTableHead(table, songs);
};

const generateTableHead = async (table, songs) => {
  let thead = table.createTHead();
  let row = thead.insertRow();
  const keys = Object.keys(songs[0]);
  // TODO: set cols as hidden

  console.log(keys);
  for (let key of keys) {
    let th = document.createElement('th');
    let text = document.createTextNode(key);
    th.appendChild(text);
    th.setAttribute('id', `th-${key}`);
    th.setAttribute('name', key);
    row.appendChild(th);
  }
  const heartIconTH = document.createElement('th');
  heartIconTH.setAttribute('id', 'th-heartIcon');
  heartIconTH.setAttribute('name', 'heartIcon');
  row.appendChild(heartIconTH);
};

const populateSongs = async (table, songs) => {
  for (let song of songs) {
    let row = table.insertRow();
    for (let key in song) {
      let cell = row.insertCell();
      let text = document.createTextNode(song[key]);
      cell.appendChild(text);
    }
    let heartIcon = row.insertCell();
    heartIcon.classList.add('heartIcon');
    heartIcon.innerHTML = `<i class="far fa-heart heartIcon"></i>`;
  }
};

const getSongId = parent => {
  return parent.nodeName === 'TR' ? parent.firstChild.innerText : parent.parentElement.firstChild.innerText;
};

createTableOfSongs();

favoritesForm.addEventListener('click', async e => {
  e.preventDefault();

  if (e.target.classList.contains('heartIcon')) {
    const songId = getSongId(e.target.parentElement);
    console.log(songId);

    // TODO: getSpotifyId

    const body = { songId };

    // TODO: dynamic reactionId
    const reactionId = 3;

    try {
      await fetch(`/api/songs/reactions/${3}/new`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });

      updateHeartIcon(e.target);
    } catch (err) {
      console.log(err);
    }

    const data = await res.json();

    // const icon = document.querySelector(`#icon-${userReaction.Songs[0].id}`);

    // icon.classList.remove('far');
    // icon.classList.add('fas');
  }
});
