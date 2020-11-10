# Bandcamp

<https://hackmd.io/@bandcamp/HJ1yoAy4P/edit>


# songcamp



1. What features are needed to make this an app that people would use?
  - Generic home page
  - Sign up/sign-in
  - Search/browse by artist, etc.
  - Display song data (album, info, etc)
  - Upload songs
  - Download song
    - Play music
  - Navbar

Required:
  Artist page
  Song player
  Search
  Upload/download songs
  Bonus: Purchase songs
  Bonus: Follows

online space for artists to showcase their songs and thereby gain exposure and discover other artists.

Artist page with photo, description, song list...
search artists, songs,
download audio files from an online database.

Artist Class properties and methods?
User properties and methods?

---

1. As a typical user, I want to learn more about music I love, and discover more music like it, so that I can be happy.
2. As a typical user, I want to organize my music by how it makes me feel, so that I can express my emotions.
3. As a casual brower, I want to see how others feel about the music they like, in order to be in the know.
4. As a typical user, I want to react to music as I listen to it, so that I and others can be presented with those reactions.
-------

## Features

### MVP
- [x] OAuth
    - [x] Sign up with name, email, and password
    - [x] Log in with email and password
- [x] See favorite artists and songs on home page
- [x] Search for songs and artists 
- [x] Add favorite artists
- [x] Add favorite songs

---
DATA



- [ ] Create registration survey
    - What data do we need?
- [ ] Spotify
    - [x] Client Id
    - [x] Secret Key
    - [ ] Access token


### Stretch

2. What features would be nice to have if the minimum viable product gets finished?

  - DJ
  - Map API for sync up, venues
  - Log in with Spotify?

<https://bandcamp.com/developer>
<https://rapidapi.com/blog/top-free-music-data-apis/>
- [ ] Generate a form that surveys users and then recommends songs and artists
- [ ] Suggested page, possibly by icon filter or other user-generated data
- [ ] Generate playlist based on current emotion
- [ ] A profile page for users
- [ ] Ability to search for, follow other users
- [ ] - [x] Home page where you can see the songs you've reacted to and associated icons, filterable by reaction


- Genres, Artists, Emotions at registration
    - [ ] Get via Spotify API

- Adhoc boolean after providing data on music wanted
    - Want to experience emotion
    - Want to listen to music like this artist
    - Want to listen to music like this song

---

## Schema
![](https://i.imgur.com/y2bsGLa.png)

### Models
1. User - isArtist(t/f)
    Listener
    Artist
      Reactions
2. Song
    3. Reactions
4. Artist
5. Album

## Endpoints

Our API uses a root path of `/api`


| HTTP Verb| Endpoint | Description |
| -------- | -------- | -------- |

| GET     | /artist     | Text     |
| Text     | /songs     | Text     |
| Text     | /users     | Text     |


## Views

1. Landing Page / Login / Sign-up / Search 
    - Sign-up => Initial survey
    - Login => Home
    - Search => Public Results
3. Home
    - Favorites
    - Library List..
    - Discover Suggestions
    - Discover Prompt
5. Search Results
    - Direct Results
    - Discover Suggestions
6. Song View
    - Name
    - Artist
    - Add To Library
7. Album View
     - Name
     - Artist
     - Song List
     - Add To Library
11. Artist View
    - People also like => Discover
    - Add To Library

### Components




## Roadmap

