'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Album.belongsToMany(models.Artist, { through: models.ArtistAlbum, foreignKey: 'albumId', otherKey: 'artistId' });
      Album.belongsToMany(models.User, { through: models.UserReaction, foreignKey: 'albumId', otherKey: 'userId' });
      Album.belongsToMany(models.Song, { through: models.ArtistSong, foreignKey: 'albumId', otherKey: 'songId' });
    }
  }
  Album.init(
    {
      spotifyId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      artistId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Album',
    }
  );
  return Album;
};
