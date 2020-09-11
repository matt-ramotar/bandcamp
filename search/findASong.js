const {Op} = require("sequelize");
const {sequelize, Song} = require("../db/models")

let findASong = async (searchString) => {

    const songs = await Song.findAll({
  
            where: {
                title: {
                    
                   // [Op.eq] : searchString
                   [Op.iLike]: "%"+searchString +"%"
                }
            }
    
    });

    console.log(JSON.stringify(songs, null, 2));
}

//findASong();

module.exports = findASong;