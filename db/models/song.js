'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsToMany(models.User, { through: models.UserReaction, foreignKey: 'songId', otherKey: 'userId' });
      Song.belongsToMany(models.Artist, { through: models.ArtistSong, foreignKey: 'songId', otherKey: 'artistId' });
      Song.belongsToMany(models.Album, { through: models.AlbumSong, foreignKey: 'songId', otherKey: 'albumId' });
    }
  }
  Song.init(
    {
      spotifyId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      artistId: DataTypes.INTEGER,
      albumId: DataTypes.INTEGER,
      isArtistTopTrack: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Song',
    }
  );
  return Song;
};
