const express = require('express');
const router = express.Router();

const db = require('../../db/models');
const { Song, Album, Artist, UserReaction, User } = db;

const { csrfProtection, asyncHandler } = require('./utils');

const findASong = require("../../search/findASong.js");

// router.get(
//   '/',
//   asyncHandler(async (req, res, next) => {
//     const songs = await Song.findAll({ include: Artist });
//     const artist = await Artist.findOne({ where: { id: await songs[0].dataValues.artistId } });
//     console.log(artist);
//     res.render('songs', {
//       title: 'Songs',
//       songs,
//     });
//   })
// );
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const songs = await Song.findAll({ include: Artist });
    res.json({ songs });
  })
);

router.post('/reactions/:reaction/new', async (req, res, next) => {
  const { songId } = req.body;
  const reactionId = req.params.reaction;

  const userId = req.user.id
  // const userId = 1;

  const newUserReaction = await UserReaction.create({
    reactionTypeId: 1,
    userId,
    songId,
  });

  // console.log(await newUserReaction);

  const userReaction = await UserReaction.findByPk(newUserReaction.id, {
    include: [
      { model: User, attributes: ['email'] },
      { model: Song, attributes: ['spotifyId', 'title'] },
    ],
  });
  res.json({ userReaction });
});

// router.post('/:userId/songs', async (req, res, next) => {
//   const userId = req.params.userId;
//   const
// });
// router.get('/:userId/songs', async (req, res, next) => {
//   const userId = req.params.userId;

//   const favoriteSongs = await UserReaction.findAll({
//     where: {
//       [Op.and]: [
//         { id: userId },
//         {
//           songId: {
//             [Op.gte]: 1,
//           },
//         },
//       ],
//     },
//   });
//   console.log(await favoriteSongs);
// });
router.post('/', asyncHandler(async (req, res) => {
  const { search } = req.body;
  const song = await findASong(search);
  res.json({ song });
}))

// router.get(
//   '/:id',
//   asyncHandler(async (req, res, next) => {
//     const exercise = await Exercise.findOne({ where: { id: req.params.id }, include: [Muscle, Instruction] });
//     const muscle = exercise.Muscles[0];

//     const instructions = exercise.Instructions.reduce((accum, ele) => {
//       accum.push(ele.dataValues.instruction);
//       return accum;
//     }, []);

//     console.log(exercise.dataValues);
//     console.log(instructions);
//     res.render('exercise/exercise', {
//       title: exercise.dataValues.name,
//       exercises,
//       muscles,
//       muscle: muscle.dataValues.name,
//       instructions,
//     });
//   })
// );

module.exports = router;
