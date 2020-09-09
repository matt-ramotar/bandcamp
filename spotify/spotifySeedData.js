const SpotifyWebApi = require('spotify-web-api-node');

const fs = require('fs');


const spotifyApi = new SpotifyWebApi({
    clientId: '2bbdaed80909444e937b449b483ea544',
    clientSecret: '27455d67774448a19455d88b7e6cfad4',
    redirectUri: 'http://www.example.com/callback'
  })

  //var code = 'MQCbtKe23z7YzzS44KzZzZgjQa621hgSzHN';
  //var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

    spotifyApi.setAccessToken('<your_access_token>');
  // Retrieve an access token
<<<<<<< HEAD
    spotifyApi.clientCredentialsGrant().then(
=======
  spotifyApi.clientCredentialsGrant().then(
>>>>>>> master
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
<<<<<<< HEAD
    });



=======
    //});


>>>>>>> master
  var seedArtists = [];
  var topTrax;

  var topFifty = spotifyApi.searchPlaylists("Global")

    .then(function(data){
     // console.log('Search artists by "Love"', data.body);

      return data.body;
    })
    .then(function(response){

    topTraxId = response.playlists.items[0].id
      spotifyApi.getPlaylistTracks(topTraxId)
        .then(function(trax){

          trax.body.items.forEach(track => {
            track["track"]["artists"].forEach(artist => {

                var dbArtist = {
                    "spotifyId": artist.id,
                    name: artist.name,
                    createdAt: "new Date()",
                    updatedAt: "new Date()"
                };

                seedArtists.push(dbArtist);
            });
          })
          console.log(seedArtists);

          fs.writeFile("./seedArtists.txt", JSON.stringify(seedArtists), err => {
              console.log(err);
          });


          return seedArtists;
        });
    },
    function(err) {
      console.error(err);
    })
