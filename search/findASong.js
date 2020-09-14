const {Op} = require("sequelize");
const {sequelize, Song, Artist, Album} = require("../db/models")

let findASong = async (searchString) => {

    let hits = [];

    const songs = await Song.findAll({
            where: {
                title: {
                   [Op.iLike]: "%"+searchString +"%"
                }
            }
    });
    console.log(JSON.stringify(songs, null, 2));


    songs.forEach(song =>{
        hits.push(song);
    })

    const artists = await Artist.findAll({
            where: {
                name: {
                    [Op.iLike]: "%"+searchString+"%"
                }
            }
    })

    artists.forEach(artist => {
        hits.push(artist);
    })

    const albums = await Album.findAll({
        where: {
            name: {
                [Op.iLike]: "%"+searchString+"%"
            }
        }
    })

    albums.forEach(album =>{
        hits.push(album);
    })

    console.log(hits);
    return hits;
}



module.exports = findASong;
