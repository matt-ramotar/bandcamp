const express = require('express');
const router = express.Router();

const { csrfProtection, asyncHandler } = require('./utils');

const { User: User, Artist, ReactionType, UserReaction } = require('../../db/models');



router.get("/", asyncHandler(async (req, res) => {
    let artists = await Artist.findAll();
    res.json({ artists });
}));

router.post("/", csrfProtection, asyncHandler(async (req, res) => {
    console.log("request body", Object.keys(req.body))
    for (const key in req.body) {
        artistId = key
        reactionTypeId = req.body[key]
        console.log("Artist" + artistId, "Reaction" + reactionTypeId)
        UserReaction.create({
            artistId,
            reactionTypeId
        })
    };
    let artists = await UserReaction.findAll({
        where: {
            userId: User.id
        },
        include: [Artist, User, ReactionType]

    });

    res.json({ artists });
}));

module.exports = router;
