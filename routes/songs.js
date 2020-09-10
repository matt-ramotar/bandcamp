const express = require('express');
const router = express.Router();

const { Song } = require('../db/models');

const { csrfProtection, asyncHandler } = require('./utils');

router.get('/', (req, res) => {
  const songs = Song.findAll();
  res.render('songs', {});
});

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const exercise = await Exercise.findOne({ where: { id: req.params.id }, include: [Muscle, Instruction] });
    const muscle = exercise.Muscles[0];

    const instructions = exercise.Instructions.reduce((accum, ele) => {
      accum.push(ele.dataValues.instruction);
      return accum;
    }, []);

    console.log(exercise.dataValues);
    console.log(instructions);
    res.render('exercise/exercise', {
      title: exercise.dataValues.name,
      exercises,
      muscles,
      muscle: muscle.dataValues.name,
      instructions,
    });
  })
);

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    res.render('exercise/exercises', {
      title: 'Exercises',
      exercises,
      muscles,
    });
  })
);

module.exports = router;
