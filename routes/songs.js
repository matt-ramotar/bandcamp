const express = require('express');
const router = express.Router();

const { Song, Album, Artist } = require('../db/models');

const { csrfProtection, asyncHandler } = require('./utils');

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const songs = await Song.findAll({ include: Artist });
    const artist = await Artist.findOne({ where: { id: await songs[0].dataValues.artistId } });
    console.log(artist);
    res.render('songs', {
      title: 'Songs',
      songs,
    });
  })
);

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
