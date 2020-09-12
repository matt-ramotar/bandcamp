// Get the input field
const input = document.getElementById("search");



// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", async (event) => {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // window.location.href = '/search';
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    // document.getElementById("search").click();
    console.log("SEARCH")
    // const formData = new FormData(form);
    // const search = formData.get('search');
    const search = input.value;

    const body = { search };
    console.log(search)
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
    const searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = `<div id="search-results">SONG RESULTS...</div> ${HTMLString}`;

    // -- ANYTHING IN THIS IF BLOCK will happen when the user hits ENTER
  }
});
