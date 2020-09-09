const SpotifyWebApi = require('spotify-web-api-node');

const getSpotifyApiInstance = async() => {

    const spotifyApi = new SpotifyWebApi({
        clientId: '2bbdaed80909444e937b449b483ea544',
        clientSecret: '27455d67774448a19455d88b7e6cfad4',
        redirectUri: 'http://www.example.com/callback'
      })
      

      const accessData = await spotifyApi.clientCredentialsGrant()
        
         // console.log('The access token expires in ' + data.body['expires_in']);
         // console.log('The access token is ' + data.body['access_token']);
      
        spotifyApi.setAccessToken(await accessData.body['access_token']);

        return spotifyApi;
}

  
module.exports = getSpotifyApiInstance;