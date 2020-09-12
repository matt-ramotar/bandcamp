document.querySelector('#favorite-songs-button').addEventListener('click', async e => {
  // console.log("fav button pressed");


  const res = await fetch('/api/users/get');
  const id = await res.json();

  if (!res.ok) {
    const { message } = id;
    const errorsContainer = document.querySelector('#errors-container');
    errorsContainer.innerHTML = "Error:" + message + ", please try again.";
    return;
  }
  const res2 = await fetch(`/api/users/${id}/favorites`);
  const songTitlesObj = await res2.json();
  const songTitles = songTitlesObj.songTitles;

  console.log(songTitles)
  let HTMLString = "";
  for (let i = 0; i < songTitles.length; i++) {
    let title = songTitles[i];
    console.log(title)
    if (!title) continue;
    HTMLString += `
      <div class="heartIcon search-results-result" id=${title}>
      <i class="far fa-heart heartIcon"></i>
      ${title}
      </div>`
  }
  console.log(HTMLString)
  // console.log("test")
  // console.log(HTMLString);
  const favoriteSongs = document.querySelector('#favorite-songs');
  favoriteSongs.innerHTML = `<div id="favorite-songs-list">MY FAVORITES:</div> ${HTMLString}`;
})
